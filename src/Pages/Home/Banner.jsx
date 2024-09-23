import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const Banner = () => {
  return (
    <div className="">
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        speed={800}
        className="mySwiper"
      >
        <SwiperSlide>
          <div>
            <img className="w-full" src="/public/banner.webp" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img className="w-full" src="/public/banner-2.webp" alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
<h1>This is banner</h1>;
