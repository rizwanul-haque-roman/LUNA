import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { event } from "../gtagEvent";

const ProductCard = ({ productData, cart, setCart }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  const navigate = useNavigate();
  const handleBuyNowClick = (product) => {
    if (typeof window.gtag === "function") {
      event({
        action: "click",
        params: { category: "button", label: "BUY NOW" },
      });
    } else {
      console.error("🚀 gtag function is not available");
    }

    navigate("/order", { state: { product } });
  };

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
    thumbnailUrl = ["thumbnail_placeholder.png"],
    brandName: brandname,
    productTitle: title,
    price,
    stock,
    _id: id,
  } = productData || {};

  // Check if stock is greater than 0
  const isInStock = stock > 0;

  return (
    <div
      className="w-full h-auto border p-3 rounded-xl flex flex-col justify-between"
      data-aos="zoom-in"
      data-aos-duration="1500"
    >
      <div>
        {productData ? (
          <Link to={`/details/${id}`} onClick={() => event("click")}>
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
        <h4 className="text-sm text-[#000000aa]  lg:my-3">{brandname}</h4>
        <Link
          className="flex-1"
          to={`/details/${id}`}
          onClick={() => event("click")}
        >
          <p className="my-3">{title}</p>
        </Link>
        <p className="text-[#F0729F] text-xl font-semibold">৳ {price} BDT</p>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-4 justify-between">
        {isInStock ? (
          <>
            <button
              className="mt-3 w-full lg:w-1/2 btn btn-sm btn-outline hover:bg-[#f54b87] hover:border-[#f54b87]"
              onClick={addToCart}
              disabled={!productData}
            >
              Add To Cart
            </button>
            {/* <Link
              className="flex-1"
              to={{ pathname: "/order" }}
              state={{ product: productData }}
              onClick={(e) => {
                setTimeout(() => {
                  event("click");
                }, 500);
              }}
            >
              <p className="mt-3 w-full btn btn-sm bg-[#F0729F] hover:bg-[#f54b87] text-white">
                BUY NOW
              </p>
            </Link> */}
            <button
              className="mt-3 flex-1 btn btn-sm bg-[#F0729F] hover:bg-[#f54b87] text-white"
              onClick={() => handleBuyNowClick(productData)}
            >
              BUY NOW
            </button>
          </>
        ) : (
          <p className="w-full text-center border bg-[#F0729F] text-white font-medium p-2 rounded-md">
            Out of Stock
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
