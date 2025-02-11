import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Product from "../Home/Product";
import axios from "axios";
import Swal from "sweetalert2";

function OrderForm() {
  const [quantity, setQuantity] = useState(1);
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingArea, setShippingArea] = useState("");
  const [total, setTotal] = useState(0);

  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setShippingCost(event.target.value);
  };

  useEffect(() => {
    shippingCost == 70
      ? setShippingArea("Inside Dhaka")
      : setShippingArea("Outside Dhaka");
  }, []);

  console.log("This is inside the for:", product);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const orderDate = new Date().toLocaleDateString("en-CA"); // OutputExample: 2025-02-03

    // Build the orderInfo object with the additional fields
    const orderInfo = {
      "customer Name": form.name.value,
      "Phone Number": form.phone.value,
      Email: form.email.value,
      Address: form.address.value,
      Product: product.productTitle,
      ProductId: product._id,
      Quantity: quantity,
      "Shipping Area": shippingArea,
      Total: quantity * product.price + parseInt(shippingCost),
      status: "pending",
      OrderDate: orderDate, // Order date field
      url: product["thumbnailUrl"][0], // Product image URL
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

    // Now you can use orderInfo, e.g., send it to your server or process it further.
    console.log("Order submitted:", orderInfo);
  };

  return (
    <div className="min-h-screen pt-4 lg:pt-28 w-11/12 lg:container mx-auto">
      <div>
        <h1 className="text-5xl font-bold">Order Form</h1>
        <p className="lg:w-3/4 mt-6 text-xl">
          Please fill out this form to help us deliver your products to you.
        </p>
      </div>
      <div className="mt-4 ;g:mt-12 gap-12 flex flex-col lg:flex-row justify-center">
        <form onSubmit={handleSubmit} className="lg:w-1/2 mb-12">
          <div className="my-6 border-b-2">
            <h3 className="font-semi text-2xl pb-4">{product.productTitle}</h3>
          </div>
          <div className="">
            <label className="form-control lg:w-full">
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
            className={`mt-10 btn w-full bg-[#DF8381] hover:bg-[#DE6B87] text-xl text-white font-semibold border-none `}
          >
            Place Order
          </button>
        </form>
        <div className="lg:w-1/2">
          <div className="border-b-2 pb-5">
            <h4 className="font-semibold text-xl">Payment method</h4>
            <p>Cash on Delivery</p>
          </div>
          <div className="my-6">
            <h4 className="font-semibold text-2xl">Order Summary</h4>
          </div>
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-xl">Quantity</h4>
            <div className="flex justify-between items-center">
              <p
                onClick={() =>
                  quantity >= 1
                    ? setQuantity(quantity - 1)
                    : setQuantity(quantity)
                }
                className="text-2xl btn btn-circle border"
              >
                -
              </p>
              <p className="text-xl mx-6">{quantity}</p>
              <p
                onClick={() =>
                  quantity < product.stock
                    ? setQuantity(quantity + 1)
                    : setQuantity(quantity)
                }
                className="text-2xl btn btn-circle border"
              >
                +
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <h4 className="font-semibold text-xl">Subtotal</h4>
            <div className="flex justify-between items-center">
              <p className="text-xl mx-6 font-mono">
                ৳ {quantity * product.price} BDT
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
              <p
                onChange={() =>
                  setTotal(quantity * product.price + parseInt(shippingCost))
                }
                className="text-xl mx-6 font-mono"
              >
                ৳ {quantity * product.price + parseInt(shippingCost)} BDT
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
