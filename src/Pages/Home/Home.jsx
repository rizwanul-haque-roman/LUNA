import Banner from "./Banner";
import ShopByCategory from "./ShopByCategory";

const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="mt-6">
        <Banner />
        <ShopByCategory />
      </div>
    </div>
  );
};

export default Home;
