import Swal from "sweetalert2";
import axios from "axios";
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const OrderDetails = () => {
  const order = useLoaderData();
  const navigate = useNavigate();
  const [status, setStatus] = useState(order.status);
  const [loader, setLoader] = useState(false);

  const handleStatusUpdate = async (newStatus) => {
    try {
      setLoader(true);
      const { data } = await axios.put(
        `https://luna-server.vercel.app/updateOrder/${order._id}`,
        { status: newStatus }, // Sending status in the request body
        { headers: { "Content-Type": "application/json" } }
      );
      setLoader(false);

      "This is inside axios response:", data;

      // Update the status in state
      setStatus(newStatus);

      // ✅ Show success alert using SweetAlert2
      Swal.fire({
        title: "Success!",
        text: `Order status updated to "${newStatus}".`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Redirect to orders page after user clicks "OK"
        navigate("/dashboard/trackOrders");
      });
    } catch (error) {
      console.error("Error updating order status:", error.response || error);

      // ❌ Show error alert using SweetAlert2
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Something went wrong! Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>LUNA | Order Details</title>
      </Helmet>
      {loader ? (
        <>
          <div className="flex justify-center items-center h-[70vh] w-full">
            <span className="loading loading-infinity loading-lg"></span>
          </div>
        </>
      ) : (
        <>
          <div className="p-6">
            <h3 className="text-3xl font-bold mb-4">Order Details</h3>
            <div className="overflow-x-auto mt-8">
              <table className="table table-sm text-base">
                <thead>
                  <tr className="font-bold text-base">
                    <th>Order No</th>
                    <th>Order Date</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Delivery Address</th>
                    <th>Total Payable</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{order.orderNumber}</td>
                    <td>{order.OrderDate}</td>
                    <td>{order["customer Name"]}</td>
                    <td>{order.Email}</td>
                    <td>{order["Phone Number"]}</td>
                    <td>{order.Address}</td>
                    <td className="font-sans font-bold text-xl">
                      ৳ {order.Total} BDT
                    </td>
                    <td>
                      <div
                        className={`badge ${
                          status === "approved"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {status}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Ordered Items Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">
                      Product
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Product Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Quantity Ordered
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.productDetails.map((product, index) => (
                    <tr key={index} className="border border-gray-300">
                      <td className="border border-gray-300 px-4 py-2">
                        <img
                          src={product.thumbnailUrl}
                          alt={product.productTitle}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {product.productTitle}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.ProductIDs
                          ? order.Quantities[index]
                          : order.Quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Buttons */}
            {status.toLowerCase() === "pending" && (
              <div className="mt-6 flex justify-center items-center p-4">
                <div className="flex gap-4">
                  <button
                    className="btn btn-success"
                    onClick={() => handleStatusUpdate("approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => handleStatusUpdate("cancelled")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
