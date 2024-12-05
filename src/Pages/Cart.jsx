import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartLen, setCartLen] = useState(0);
  const [quantities, setQuantities] = useState({}); // Object to store quantities

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

  useEffect(() => {
    // Save cart and quantities to localStorage
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
              {/* Head */}
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
        </div>
      </div>
    </div>
  );
};

export default Cart;
