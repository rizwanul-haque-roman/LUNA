import Banner from "./Banner";
import ShopByBrand from "./ShopByBrand";
import ShopByCategory from "./ShopByCategory";

const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="mt-6">
        <Banner />
        <ShopByCategory />
        <ShopByBrand />
      </div>
    </div>
  );
};

export default Home;
