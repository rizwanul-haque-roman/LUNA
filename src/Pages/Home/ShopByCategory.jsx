import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const ShopByCategory = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="mt-4 lg:mt-16" data-aos="fade-up" data-aos-duration="2000">
      <h1 className="text-center text-2xl lg:text-4xl font-bold">
        POPULAR CATEGORIES
      </h1>
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center mt-4 lg:mt-16">
        <a href="/face" data-aos="flip-left" data-aos-duration="2000">
          <img
            className="rounded-full w-[100px] lg:w-[200px] h-[100px] lg:h-[200px]"
            src="/face.webp"
            alt=""
          />
        </a>
        <a href="/lips" data-aos="flip-left" data-aos-duration="2000">
          <img
            className="rounded-full w-[100px] lg:w-[200px] h-[100px] lg:h-[200px]"
            src="/lips.webp"
            alt=""
          />
        </a>
        <a href="/eyes" data-aos="flip-left" data-aos-duration="2000">
          <img
            className="rounded-full w-[100px] lg:w-[200px] h-[100px] lg:h-[200px]"
            src="/eyes.webp"
            alt=""
          />
        </a>
        <a href="/tools" data-aos="flip-left" data-aos-duration="2000">
          <img
            className="rounded-full w-[100px] lg:w-[200px] h-[100px] lg:h-[200px]"
            src="/tools.webp"
            alt=""
          />
        </a>
        <a href="/nails" data-aos="flip-left" data-aos-duration="2000">
          <img
            className="rounded-full w-[100px] lg:w-[200px] h-[100px] lg:h-[200px]"
            src="/nails.webp"
            alt=""
          />
        </a>
      </div>
    </div>
  );
};

export default ShopByCategory;
