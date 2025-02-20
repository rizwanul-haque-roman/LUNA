import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../App.css";
import { Navigation, Autoplay } from "swiper/modules";
import axios from "axios"; // Import axios
import ProductCard from "../../components/ProductCard";
import PropTypes from "prop-types";

const TopSeller = ({ cart, setCart }) => {
  const [topSellingProducts, setTopSellingProducts] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state

  // Fetch top-selling products from the API using axios
  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/topSellingProducts"
        ); // Replace with your API endpoint

        // Validate if the response data is an array
        if (Array.isArray(response.data)) {
          setTopSellingProducts(response.data);
          console.log(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setTopSellingProducts([]); // Set to an empty array if the response is not an array
        }
      } catch (error) {
        console.error("Error fetching top-selling products:", error);
        setError("Failed to fetch top-selling products."); // Set error message
        setTopSellingProducts([]); // Set to an empty array in case of an error
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchTopSellingProducts();
  }, []);

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error state
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
            slidesPerView={3}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            speed={800}
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
