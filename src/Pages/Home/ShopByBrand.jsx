import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Navigation, Autoplay } from "swiper/modules";

const ShopByBrand = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="mt-4 lg:mt-16" data-aos="fade-up" data-aos-duration="2000">
      <h1 className="text-center text-2xl lg:text-4xl font-bold">
        POPULAR BRANDS
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
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
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
