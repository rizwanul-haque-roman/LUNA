import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Cart = () => {
  const [cartLen, setCartLen] = useState(0);
  const [quantities, setQuantities] = useState({}); // Object to store quantities
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingArea, setShippingArea] = useState("");
  const [total, setTotal] = useState(0);

  // Fetch cart from localStorage
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Update cart length
  const updateCartLen = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartLen(cart.length);
  };

  // Initialize quantities
  useEffect(() => {
    const initialQuantities = {};
    cart.forEach((product) => {
      initialQuantities[product._id] = 1; // Default quantity = 1
    });
    setQuantities(initialQuantities);
  }, [cart]);

  // Handle Shipping Cost and Area Change
  const handleSelectChange = (event) => {
    const cost = parseInt(event.target.value);
    setShippingCost(cost);
    setShippingArea(cost === 70 ? "Inside Dhaka" : "Outside Dhaka");
  };

  // Update Total Price on cart or quantity change
  useEffect(() => {
    const subtotal = cart.reduce(
      (sum, product) => sum + product.price * (quantities[product._id] || 0),
      0
    );
    setTotal(subtotal + parseInt(shippingCost));
  }, [cart, quantities, shippingCost]);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartlen", JSON.stringify(cart.length));
    updateCartLen();
    window.dispatchEvent(new Event("storage"));
  }, [cart]);

  // Handle quantity changes
  const changeQuantity = (productId, action) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (action === "increment") {
        newQuantities[productId] += 1;
      } else if (action === "decrement" && newQuantities[productId] > 1) {
        newQuantities[productId] -= 1;
      }
      return newQuantities;
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
  };

  // Handle order submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const orderDate = new Date().toLocaleDateString("en-CA"); // OutputExample: 2025-02-03

    const orderInfo = {
      "Customer Name": form.name.value,
      "Phone Number": form.phone.value,
      Email: form.email.value,
      Address: form.address.value,
      Products: cart
        .map((product) => `${product.productTitle} x${quantities[product._id]}`)
        .join(", "),
      ProductIDs: cart.map((product) => product._id),
      Quantities: cart.map((product) => quantities[product._id]), // Include quantities
      "Shipping Area": shippingArea,
      Total: total,
      Status: "Pending",
      OrderDate: orderDate, // Order date field
    };

    // Send the order data
    axios
      .post("http://localhost:5000/orders", orderInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data.acknowledged === true) {
          Swal.fire({
            title: "Success!",
            text: "Order Placed Successfully!",
            icon: "success",
          }).then(() => {
            navigate("/"); // Redirect to homepage after user clicks "OK"
          });

          // Clear the cart and reset quantities
          setCart([]); // Clear the cart
          setQuantities({}); // Reset quantities

          // Remove cart from localStorage
          localStorage.removeItem("cart");
          localStorage.removeItem("cartlen");
          setCartLen(0); // Reset cart length
        }
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again!",
          icon: "error",
        });
      });

    console.log("Order Data Submitted:", orderInfo);
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-between items-center my-6 pb-6 border-b-2 border-[#DF8281]">
          <h2 className="text-4xl font-bold">My Cart</h2>
          <p className="font-semibold text-xl">{cartLen} Items</p>
        </div>
        <div className="min-h-screen">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-base items-center">
                  <th>SL. NO.</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product, idx) => (
                  <tr key={product._id}>
                    <th className="text-xl">{idx + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-20 w-20">
                            <img src={product.thumbnailUrl[0]} alt="Product" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {product.productTitle}
                          </div>
                          <div className="text-sm opacity-50">
                            {product.brandName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() =>
                            changeQuantity(product._id, "decrement")
                          }
                          className="text-2xl btn-sm btn btn-circle border"
                        >
                          -
                        </button>
                        <p className="text-xl mx-6">
                          {quantities[product._id]}
                        </p>
                        <button
                          onClick={() =>
                            changeQuantity(product._id, "increment")
                          }
                          className="text-2xl btn btn-sm btn-circle border"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>৳ {product.price}</td>
                    <td>৳ {product.price * quantities[product._id]}</td>
                    <th>
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="btn btn-sm bg-red-300 hover:bg-red-500"
                      >
                        Remove
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="flex justify-between items-center my-6 pb-6 border-b-2 border-[#DF8281]">
              <h2 className="text-4xl font-bold">Place Order</h2>
            </div>
            <p className="lg:w-3/4 mt-6 text-xl">
              Please fill out this form to help us deliver your products to you.
            </p>
          </div>
          <div className="mt-12 gap-12 flex justify-center">
            <form onSubmit={handleSubmit} className="w-1/2 mb-12">
              <div className="">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-lg font-semibold">
                      Full Name
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="your name"
                    name="name"
                    className="bg-transparent w-full py-4 pl-1 border-2 rounded-lg"
                    required
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-lg font-semibold">
                      Phone Number
                    </span>
                  </div>
                  <input
                    type="tel"
                    placeholder="phone number"
                    name="phone"
                    className="bg-transparent w-full py-4 pl-1 border-2 rounded-lg"
                    required
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-lg font-semibold">
                      Email Address
                    </span>
                  </div>
                  <input
                    type="email"
                    placeholder="type your email"
                    name="email"
                    className="bg-transparent w-full py-4 pl-1 border-2 rounded-lg"
                  />
                </label>
                <label className="form-control w-full mt-6">
                  <div className="label">
                    <span className="label-text text-lg font-semibold">
                      Address
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Delivery address"
                    name="address"
                    className="bg-transparent w-full py-4 pl-1 border-2 rounded-lg"
                    required
                  />
                </label>
                <label className="form-control w-full mt-6">
                  <div className="label">
                    <span className="label-text text-lg font-semibold">
                      Shipping Area
                    </span>
                  </div>
                  <select
                    className="select w-full outline"
                    onChange={handleSelectChange}
                    defaultValue=""
                    required
                  >
                    <option value="" disabled selected>
                      Shipping Area
                    </option>
                    <option value={70}>Inside Dhaka - ৳ 70</option>
                    <option value={130}>Outside Dhaka - ৳ 130</option>
                  </select>
                </label>
              </div>

              <button
                type="submit"
                className={`mt-10 btn w-full text-xl font-semibold border-none ${
                  cartLen === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#DF8381] hover:bg-[#DE6B87] text-white"
                }`}
                disabled={cartLen === 0}
              >
                Place Order
              </button>
            </form>
            <div className="w-1/2">
              <div className="border-b-2 pb-5">
                <h4 className="font-semibold text-xl">Payment method</h4>
                <p>Cash on Delivery</p>
              </div>
              <div className="flex justify-between items-center mt-6">
                <h4 className="font-semibold text-xl">Subtotal</h4>
                <div className="flex justify-between items-center">
                  <p className="text-xl mx-6 font-mono">
                    ৳ {total - shippingCost} BDT
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <h4 className="font-semibold text-xl">Shipping Charge</h4>
                <div className="flex justify-between items-center">
                  <p className="text-xl mx-6 font-mono">
                    {shippingCost ? `৳ ${shippingCost}` : "None"}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-6 py-6 border-t-2">
                <h4 className="font-semibold text-xl">Total:</h4>
                <div className="flex justify-between items-center">
                  <p className="text-xl mx-6 font-mono">৳ {total} BDT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
