import React, { useEffect, useState } from "react";
import axios from "axios";
import "chart.js/auto";

const AdminHome = () => {
  const [orders, setOrders] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [totalCompletedOrders, setTotalCompletedOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/orderLogs");
        const ordersData = response.data;

        // Calculations
        let totalIncomeCalc = 0;
        let monthlyIncomeCalc = 0;
        let completedOrdersCount = 0;
        let pendingOrdersCount = 0;
        let incomeByDate = {};

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        ordersData.forEach((order) => {
          const orderAmount = parseFloat(order.Total);
          const orderDate = new Date(order.OrderDate);
          const formattedDate = orderDate.toISOString().split("T")[0]; // YYYY-MM-DD format

          if (order.status === "approved") {
            totalIncomeCalc += orderAmount;
            completedOrdersCount++;

            if (
              orderDate.getMonth() === currentMonth &&
              orderDate.getFullYear() === currentYear
            ) {
              monthlyIncomeCalc += orderAmount;
            }

            // Track income per day
            incomeByDate[formattedDate] =
              (incomeByDate[formattedDate] || 0) + orderAmount;
          } else if (order.status === "pending") {
            pendingOrdersCount++;
          }
        });

        // Convert incomeByDate to an array for the chart
        const dailyIncomeData = Object.entries(incomeByDate).map(
          ([date, amount]) => ({
            date,
            amount,
          })
        );

        setOrders(ordersData);
        setTotalIncome(totalIncomeCalc);
        setMonthlyIncome(monthlyIncomeCalc);
        setTotalCompletedOrders(completedOrdersCount);
        setPendingOrders(pendingOrdersCount);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-[#E6E6FA] px-8 py-4 rounded-lg text-center">
          <h3 className="font-semibold text-2xl">Total Income</h3>
          <p className="text-2xl lg:text-6xl py-4 font-bold">
            ৳ {totalIncome.toFixed(2)} BDT
          </p>
        </div>
        <div className="bg-[#E6E6FA] px-8 py-4 rounded-lg text-center">
          <h3 className="font-semibold text-2xl">Monthly Income</h3>
          <p className="text-2xl lg:text-6xl py-4 font-bold">
            ৳ {monthlyIncome.toFixed(2)} BDT
          </p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-[#E6E6FA] px-8 py-4 rounded-lg text-center">
          <h3 className="font-semibold text-2xl">Total Completed Orders</h3>
          <p className="text-2xl lg:text-6xl py-4 font-bold">
            {totalCompletedOrders}
          </p>
        </div>
        <div className="bg-[#E6E6FA] px-8 py-4 rounded-lg text-center">
          <h3 className="font-semibold text-2xl">Pending Orders</h3>
          <p className="text-2xl lg:text-6xl py-4 font-bold">{pendingOrders}</p>
        </div>
      </div>

      {/* Table for Last 6 Orders */}
      {/* <div className="mt-8">
        <h2 className="font-semibold text-2xl">Last 6 Orders</h2>
        <div className="overflow-x-auto mt-4">
          <table className="table table-sm text-base w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-black font-bold text-base">
                <th className="border border-gray-300 px-4 py-2">Order No</th>
                <th className="border border-gray-300 px-4 py-2">Order Date</th>
                <th className="border border-gray-300 px-4 py-2">
                  Customer Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">
                  Delivery Address
                </th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">
                  Order Value
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 6).map((order) => (
                <tr
                  key={order._id}
                  className={`border border-gray-300 ${
                    order.status === "approved"
                      ? "bg-green-100"
                      : order.status === "cancelled"
                      ? "bg-red-100"
                      : ""
                  }`}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {order.orderNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.OrderDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order["customer Name"]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order["Phone Number"]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.Address}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div
                      className={`badge ${
                        order.status === "approved"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {order.status}
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-bold">
                    ৳ {order.Total} BDT
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
      <div className="mt-8">
        <h2 className="font-semibold text-2xl">Last 10 Orders</h2>
        <div className="overflow-x-auto mt-4">
          <table className="table table-sm text-base w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-black font-bold text-base">
                <th className="border border-gray-300 px-4 py-2">Order No</th>
                <th className="border border-gray-300 px-4 py-2">Order Date</th>
                <th className="border border-gray-300 px-4 py-2">
                  Customer Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">
                  Delivery Address
                </th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">
                  Order Value
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 10).map((order) => (
                <tr
                  key={order._id}
                  className={`border border-gray-300 ${
                    order.status === "approved"
                      ? "bg-green-100"
                      : order.status === "cancelled"
                      ? "bg-red-100"
                      : order.status === "pending"
                      ? "bg-yellow-100"
                      : ""
                  }`}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {order.orderNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.OrderDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order["customer Name"]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order["Phone Number"]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.Address}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div
                      className={`badge ${
                        order.status === "approved"
                          ? "badge-success"
                          : order.status === "cancelled"
                          ? "badge-error"
                          : order.status === "pending"
                          ? "badge-warning"
                          : ""
                      }
                      }`}
                    >
                      {order.status}
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-bold">
                    ৳ {order.Total} BDT
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
