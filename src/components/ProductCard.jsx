import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductCard = ({ productData, cart, setCart }) => {
  const addToCart = () => {
    const isProductInCart = cart.some((item) => item._id === productData._id);

    if (!isProductInCart) {
      const updatedCart = [...cart, productData];
      setCart(updatedCart);
    } else {
      alert("This product is already in your cart.");
    }
  };

  const {
    thumbnailUrl: [thumbnail] = ["/default-thumbnail.jpg"],
    brandName: brandname,
    productTitle: title,
    price,
    _id: id,
  } = productData || {};

  return (
    <div className="min-w-[300px] border p-3 rounded-xl flex flex-col justify-between">
      <div>
        {productData ? (
          <Link to={`/details/${id}`}>
            <img
              className="rounded-md w-full object-contain"
              src={thumbnail || "/default-thumbnail.jpg"}
              alt="Product"
            />
          </Link>
        ) : (
          <img
            className="rounded-md w-full object-contain"
            src="/public/loading_t.gif"
            alt="Loading..."
          />
        )}
        <h4 className="text-sm text-[#000000aa] my-3">{brandname}</h4>
        <Link className="flex-1" to={`/details/${id}`}>
          <p className="my-3">{title}</p>
        </Link>
        <p className="text-[#F0729F] text-xl font-semibold">৳ {price} BDT</p>
      </div>
      <div className="flex gap-4 justify-between">
        <button
          className="mt-3 w-1/2 btn btn-sm bg-[#F0729F] text-white"
          onClick={addToCart}
        >
          Add To Cart
        </button>
        <Link
          className="flex-1"
          to={{
            pathname: "/order",
          }}
          state={{ product: productData }}
        >
          <p className="mt-3 w-full btn btn-sm bg-[#F0729F] text-white">
            BUY NOW
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  productData: PropTypes.object,
  cart: PropTypes.array,
  setCart: PropTypes.func,
};
