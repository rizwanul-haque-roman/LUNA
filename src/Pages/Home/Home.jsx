import Banner from "./Banner";
import Product from "./Product";
import ShopByBrand from "./ShopByBrand";
import ShopByCategory from "./ShopByCategory";
import TopSeller from "./TopSeller";

const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="mt-6">
        <Banner />
        <ShopByCategory />
        <ShopByBrand />
        <Product />
        <TopSeller />
      </div>
    </div>
  );
};

export default Home;
