import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const OrderLogs = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all orders when component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://luna-server.vercel.app/orderLogs"
        ); // Fetch from orders collection
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading order logs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // ✅ Filter only "approved" and "cancelled" orders for display
  const filteredOrders = orders.filter(
    (order) => order.status === "approved" || order.status === "cancelled"
  );

  return (
    <div className="p-6">
      <Helmet>
        <title>LUNA | Order History</title>
      </Helmet>
      <h3 className="text-3xl font-bold">Order Logs</h3>
      <div className="overflow-x-auto mt-8">
        <table className="table table-sm text-base w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-black font-bold text-base">
              <th className="border border-gray-300 px-4 py-2">Order No</th>
              <th className="border border-gray-300 px-4 py-2">Order Date</th>
              <th className="border border-gray-300 px-4 py-2">
                Customer Name
              </th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">
                Delivery Address
              </th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Order Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order._id}
                className={`border border-gray-300 ${
                  order.status === "approved"
                    ? "bg-green-100" // Light green for approved
                    : "bg-red-100" // Light red for cancelled
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
                  {order.Email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.Address}
                </td>
                <td className="border border-gray-300 px-4 py-2 font-bold">
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
                <td className="border border-gray-300 px-4 py-2 font-sans font-bold">
                  ৳ {order.Total} BDT
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderLogs;
