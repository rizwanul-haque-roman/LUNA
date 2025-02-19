import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TrackOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from the backend when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://luna-server.vercel.app/allOrders"
        );
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
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <div>
        <h3 className="text-3xl font-bold">Available Orders</h3>
      </div>
      <div className="overflow-x-auto mt-8">
        <table className="table table-sm text-base">
          <thead>
            <tr className="font-bold text-base">
              <th>Order No</th>
              <th>Order Date</th>
              <th>Customer Name</th>
              <th>Order Value</th>
              <th>Phone</th>
              <th>Delivery Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderNumber}</td>
                <td>{order.OrderDate}</td>
                <td>{order["customer Name"]}</td>
                <td className="font-sans font-boold text-xl">
                  ৳ {order.Total} BDT
                </td>
                <td>{order["Phone Number"]}</td>
                <td>{order.Address}</td>
                <td>
                  <div className="badge badge-warning items-center">
                    {order.status}
                  </div>
                </td>
                <td>
                  <Link to={`/dashboard/trackOrders/details/${order._id}`}>
                    <button className="btn bg-[#F0729F] hover:bg-[#eeb6c8] btn-sm">
                      Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackOrders;
