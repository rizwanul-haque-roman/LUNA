import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { IoFilterOutline } from "react-icons/io5";
import ProductCard from "../../components/ProductCard";

const Product = () => {
  return (
    <div>
      <div className="my-16 flex justify-between items-center">
        <h3 className="text-6xl font-bold">Makeup</h3>
        <div className="flex justify-between items-center gap-8 text-lg font-medium">
          <div className="flex gap-4 justify-center items-center">
            <HiOutlineArrowsUpDown size={25} />
            <p>Sort By</p>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <IoFilterOutline size={25} />
            <p>Filter</p>
          </div>
        </div>
      </div>
      <div className="my-16">
        <ProductCard />
      </div>
    </div>
  );
};

export default Product;
