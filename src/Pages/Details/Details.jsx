import { IoCalendarClearOutline } from "react-icons/io5";
import { PiMedal } from "react-icons/pi";
import { BsCashCoin } from "react-icons/bs";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Thumbs } from "swiper/modules";
import { Link, useLoaderData } from "react-router-dom";

const Details = () => {
  const product = useLoaderData();
  let loading = true;
  if (product) {
    loading = false;
  }
  console.log(product);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="container mx-auto">
      {loading ? (
        "loading..."
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
          <div className="flex gap-16">
            <div className="w-[500px]">
              <div>
                <Swiper
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
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
            <div className="space-y-4 w-1/2">
              <h3>{product.brandName}</h3>
              <p className="text-xl font-medium">{product.productTitle}</p>
              <p className="text-2xl font-bold text-[#F0729F]">
                ৳ {product.price} BDT
              </p>
              <div className="flex gap-6">
                <button className="btn btn-wide btn-outline hover:bg-[#f54b87] hover:border-[#f54b87] text-lg">
                  Add to cart
                </button>
                <Link
                  to={{
                    pathname: "/order",
                  }}
                  state={{ product }}
                >
                  <button className="btn btn-wide bg-[#F0729F] hover:bg-[#f54b87] text-lg">
                    Buy Now
                  </button>
                </Link>
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
                <p>{product.productDescription}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
