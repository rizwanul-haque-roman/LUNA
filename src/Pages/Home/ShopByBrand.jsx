import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../App.css";

import { Navigation, Autoplay } from "swiper/modules";

const ShopByBrand = () => {
  return (
    <div className="mt-4 lg:mt-16">
      <h1 className="text-center text-2xl lg:text-4xl font-bold">
        SHOP BY BRANDS
      </h1>
      <div className="mt-4 lg:mt-16">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          slidesPerView={2}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          speed={800}
          breakpoints={{
            // When window width is >= 640px (sm)
            640: {
              slidesPerView: 2,
            },
            // When window width is >= 768px (md)
            768: {
              slidesPerView: 2,
            },
            // When window width is >= 1024px (lg)
            1024: {
              slidesPerView: 3,
            },
            // When window width is >= 1280px (xl)
            1280: {
              slidesPerView: 4,
            },
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <img className="rounded-2xl" src="/brands/iba.webp" alt="iba" />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="rounded-2xl"
              src="/brands/focallure.webp"
              alt="focallure"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="rounded-2xl"
              src="/brands/milani.webp"
              alt="milani"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="rounded-2xl"
              src="/brands/wetnwild.webp"
              alt="wetnwild"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="rounded-2xl"
              src="/brands/zaynnmaya.webp"
              alt="zaynnmaya"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default ShopByBrand;
