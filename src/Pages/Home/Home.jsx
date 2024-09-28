import Banner from "./Banner";
import Product from "./Product";
import ShopByBrand from "./ShopByBrand";
import ShopByCategory from "./ShopByCategory";

const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="mt-6">
        <Banner />
        <ShopByCategory />
        <ShopByBrand />
        <Product />
      </div>
    </div>
  );
};

export default Home;
