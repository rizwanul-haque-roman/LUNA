import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../index.css";
import { Navigation, Autoplay } from "swiper/modules";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import PropTypes from "prop-types";

const TopSeller = ({ cart, setCart }) => {
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        const response = await axios.get(
          "https://luna-server.vercel.app/topSellingProducts"
        );

        if (Array.isArray(response.data)) {
          setTopSellingProducts(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setTopSellingProducts([]);
        }
      } catch (error) {
        console.error("Error fetching top-selling products:", error);
        setError("Failed to fetch top-selling products.");
        setTopSellingProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellingProducts();
  }, []);

  if (loading) {
    return <span className="loading loading-infinity loading-xl"></span>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-[#FDF1F5] rounded-xl my-6">
      <div className="p-4">
        <h1 className="text-left text-4xl font-bold mb-2">Top Seller</h1>
        <p className="text-xl font-semibold">Only A few left...</p>
        <div className="mt-4 lg:mt-16">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            slidesPerView={1}
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
            {topSellingProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard
                  key={product._id}
                  productData={product}
                  cart={cart}
                  setCart={setCart}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TopSeller;

TopSeller.propTypes = {
  cart: PropTypes.array,
  setCart: PropTypes.func,
};
