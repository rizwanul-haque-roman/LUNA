import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductCard = ({ productData, cart, setCart }) => {
  const success = () =>
    toast.success("Added to cart", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const err = () =>
    toast.error("Already in cart", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const addToCart = () => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.some(
        (item) => item._id === productData._id
      );
      if (!isProductInCart) {
        success();
        return [...prevCart, productData];
      } else {
        err();
        return prevCart;
      }
    });
  };

  const {
    thumbnailUrl = ["/default-thumbnail.jpg"],
    brandName: brandname,
    productTitle: title,
    price,
    stock,
    _id: id,
  } = productData || {};

  // Check if stock is greater than 0
  const isInStock = stock > 0;

  return (
    <div className="min-w-[300px] border p-3 rounded-xl flex flex-col justify-between">
      <div>
        {productData ? (
          <Link to={`/details/${id}`}>
            <img
              className="rounded-md w-full object-contain"
              src={thumbnailUrl[0] || "/default-thumbnail.jpg"}
              alt={title || "Product"}
            />
          </Link>
        ) : (
          <img
            className="rounded-md w-full object-contain"
            src="/loading_t.gif"
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
        {isInStock ? (
          <>
            <button
              className="mt-3 w-1/2 btn btn-sm bg-[#F0729F] text-white"
              onClick={addToCart}
              disabled={!productData}
            >
              Add To Cart
            </button>
            <Link
              className="flex-1"
              to={{ pathname: "/order" }}
              state={{ product: productData }}
            >
              <p className="mt-3 w-full btn btn-sm bg-[#F0729F] text-white">
                BUY NOW
              </p>
            </Link>
          </>
        ) : (
          <p className="text-center text-red-500 text-2xl font-semibold">
            Stock Out
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  productData: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
};
