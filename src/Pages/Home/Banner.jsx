import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const Banner = () => {
  return (
    <div className="overflow-hidden">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={2000}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="w-full h-[43dvh]">
            <img
              className="w-full h-full object-cover rounded-3xl"
              src="/banner.webp"
              alt="Banner 1"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[43dvh]">
            <img
              className="w-full h-full object-cover rounded-3xl"
              src="/banner-2.webp"
              alt="Banner 2"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[43dvh]">
            <img
              className="w-full h-full object-cover rounded-3xl"
              src="/banner-3.jpg"
              alt="Banner 2"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
