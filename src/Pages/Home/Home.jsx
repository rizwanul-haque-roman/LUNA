import { useEffect, useState } from "react";
import Banner from "./Banner";
import Product from "./Product";
import ShopByBrand from "./ShopByBrand";
import ShopByCategory from "./ShopByCategory";
import TopSeller from "./TopSeller";
import { Helmet } from "react-helmet-async";

const Home = () => {
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

  return (
    <div className="w-11/12 max-w-screen-xl mx-auto">
      <Helmet>
        <title>LUNA | Home</title>
        <meta
          name="description"
          content="Discover the best makeup and skincare products at LUNA. Shop from a wide selection of beauty, cosmetics, and Korean skincare products online in Bangladesh. Find top sellers, shop by category, and explore new arrivals."
        />
        <meta
          name="keywords"
          content="make up make up, skin care, korean makeup, skincare products, cosmetics, beauty products, makeup online, beauty cosmetics, korean beauty, makeup products, skincare Bangladesh, beauty online store"
        />
        <meta name="author" content="LUNA Store" />
        <meta property="og:title" content="LUNA | Home" />
        <meta
          property="og:description"
          content="Discover the best makeup and skincare products at LUNA. Shop from a wide selection of beauty, cosmetics, and Korean skincare products online in Bangladesh. Find top sellers, shop by category, and explore new arrivals."
        />
        <meta property="og:image" content="/logo_transparent.png" />
        <meta property="og:url" content="https://lunastorebd.web.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="LUNA Store" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LUNA | Home" />
        <meta
          name="twitter:description"
          content="Discover the best makeup and skincare products at LUNA. Shop from a wide selection of beauty, cosmetics, and Korean skincare products online in Bangladesh."
        />
        <meta name="twitter:image" content="/logo_transparent.png" />
        <meta name="twitter:site" content="@lunastorebd" />
        <link rel="canonical" href="https://lunastorebd.web.app" />
      </Helmet>
      <div>
        <Banner />
        <ShopByCategory />
        <ShopByBrand />
        <Product cart={cart} setCart={setCart} />
        <TopSeller cart={cart} setCart={setCart} />
      </div>
    </div>
  );
};

export default Home;
