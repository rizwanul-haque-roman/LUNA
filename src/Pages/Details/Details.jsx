import { IoCalendarClearOutline } from "react-icons/io5";
import { PiMedal } from "react-icons/pi";
import { BsCashCoin } from "react-icons/bs";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Thumbs } from "swiper/modules";
import { Link, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Details = () => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    // Save cart to localStorage every time it changes
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartlen", JSON.stringify(cart.length));
    window.dispatchEvent(new Event("storage"));
  }, [cart]);

  const product = useLoaderData();
  let loading = true;
  if (product) {
    loading = false;
  }

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
      const isProductInCart = prevCart.some((item) => item._id === product._id);
      if (!isProductInCart) {
        success();
        return [...prevCart, product];
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
  } = product || {};

  // Check if stock is greater than 0
  const isInStock = stock > 0;

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="w-11/12 max-w-screen-xl mx-auto mb-6">
      <Helmet>
        <title>LUNA | Details</title>
        <meta
          name="description"
          content="Explore detailed product information on LUNA. Discover the brand, features, and benefits of your favorite makeup and skincare items. Shop confidently with our 100% original branded products and cash on delivery option."
        />
        <meta
          name="keywords"
          content="LUNA product details, makeup details, skincare details, brand information, product features, beauty products, original branded products, cash on delivery, Dhaka shipping, Bangladesh beauty store"
        />
        <meta name="author" content="LUNA Store" />
        <meta property="og:title" content="LUNA | Details" />
        <meta
          property="og:description"
          content="Explore detailed product information on LUNA. Discover the brand, features, and benefits of your favorite makeup and skincare items. Shop confidently with our 100% original branded products and cash on delivery option."
        />
        <meta property="og:image" content="/logo_transparent.png" />
        <meta property="og:url" content="https://lunastorebd.web.app/details" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="LUNA Store" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LUNA | Details" />
        <meta
          name="twitter:description"
          content="Explore detailed product information on LUNA. Discover the brand, features, and benefits of your favorite makeup and skincare items. Shop confidently with our 100% original branded products and cash on delivery option."
        />
        <meta name="twitter:image" content="/logo_transparent.png" />
        <meta name="twitter:site" content="@lunastorebd" />
        <link rel="canonical" href="https://lunastorebd.web.app/details" />
      </Helmet>

      {loading ? (
        <span className="loading loading-infinity loading-xl"></span>
      ) : (
        <>
          <div className="breadcrumbs mt-6 text-lg">
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>{product.brandName}</li>
            </ul>
          </div>
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="w-auto lg:w-[35%]">
              <div>
                <Swiper
                  loop={true}
                  spaceBetween={10}
                  // navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Thumbs]}
                  className="mySwiper2"
                >
                  <SwiperSlide>
                    <img src={product["thumbnailUrl"][0]} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={product["thumbnailUrl"][1]} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={product["thumbnailUrl"][2]} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={product["thumbnailUrl"][3]} />
                  </SwiperSlide>
                </Swiper>
              </div>
              <div>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Thumbs]}
                  className="mySwiper mt-3"
                >
                  <SwiperSlide>
                    <img src={product["thumbnailUrl"][0]} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={product["thumbnailUrl"][1]} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={product["thumbnailUrl"][2]} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={product["thumbnailUrl"][3]} />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            <div className="space-y-4 lg:w-1/2">
              <h3>{product.brandName}</h3>
              <p className="text-xl font-medium">{product.productTitle}</p>
              <p className="text-2xl font-bold text-[#F0729F]">
                ৳ {product.price} BDT
              </p>
              <div className="flex flex-col lg:flex-row lg:gap-4 justify-between">
                {isInStock ? (
                  <>
                    <button
                      className="mt-3 w-full lg:w-1/2 btn btn-sm btn-outline hover:bg-[#f54b87] hover:border-[#f54b87]"
                      onClick={addToCart}
                      disabled={!product}
                    >
                      Add To Cart
                    </button>
                    <Link
                      className="flex-1"
                      to={{ pathname: "/order" }}
                      state={{ product: product }}
                    >
                      <p className="mt-3 w-full btn btn-sm bg-[#F0729F] hover:bg-[#f54b87] text-white">
                        BUY NOW
                      </p>
                    </Link>
                  </>
                ) : (
                  <p className="w-full text-center border bg-[#F0729F] text-white font-medium p-2 rounded-md">
                    Out of Stock
                  </p>
                )}
              </div>
              <div className="flex gap-3 items-center">
                <IoCalendarClearOutline size={25} />
                <p>
                  Delivery inside Dhaka within 2 days <br /> Outside Dhaka 3-5
                  Days.
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <PiMedal size={25} />
                <p>100% Original Branded Products.</p>
              </div>
              <div className="flex gap-3 items-center">
                <BsCashCoin size={25} />
                <p className="font-bold">CASH ON DELIVERY.</p>
              </div>
              <div>
                <h4 className="text-xl font-bold">Product Description</h4>
                <p className="text-justify">{product.productDescription}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
