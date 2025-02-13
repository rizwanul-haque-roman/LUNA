import { useEffect, useState } from "react";
import Banner from "./Banner";
import Product from "./Product";
import ShopByBrand from "./ShopByBrand";
import ShopByCategory from "./ShopByCategory";
import TopSeller from "./TopSeller";

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
    <div className="w-11/12 lg:container mx-auto">
      <div className="mt-6">
        <Banner />
        <ShopByCategory />
        <ShopByBrand />
        <Product cart={cart} setCart={setCart} />
        <TopSeller />
      </div>
    </div>
  );
};

export default Home;
