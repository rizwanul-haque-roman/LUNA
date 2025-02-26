import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { IoFilterOutline } from "react-icons/io5";
import ProductCard from "../../components/ProductCard";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Product = ({ cart, setCart }) => {
  const [loader, setLoader] = useState(true);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setLoader(true);
    axios.get(`https://luna-server.vercel.app/allProducts`).then((res) => {
      setAllProducts(res.data);
      setLoader(false);
    });
  }, []);

  return (
    <div>
      <div className="mt-4 lg:mt-16 flex justify-between items-center">
        <h3 className="text-3xl lg:text-4xl font-bold">All Products</h3>
        <div className="flex justify-between items-center gap-8 text-lg font-medium">
          <div className="flex gap-4 justify-center items-center">
            <HiOutlineArrowsUpDown size={25} />
            <p>Sort By</p>
          </div>
          {/* <div className="flex gap-4 justify-center items-center">
            <IoFilterOutline size={25} />
            <p>Filter</p>
          </div> */}
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-12">
        {allProducts.map((product) => (
          <ProductCard
            key={product._id}
            productData={product}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Product;

Product.propTypes = {
  cart: PropTypes.array,
  setCart: PropTypes.func,
};
