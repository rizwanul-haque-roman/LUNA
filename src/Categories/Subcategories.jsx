import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Helmet } from "react-helmet-async";

const Subcategories = () => {
  const location = useLocation();
  const path = location.pathname.substring(1);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartlen", JSON.stringify(cart.length));
    window.dispatchEvent(new Event("storage"));
  }, [cart]);

  useEffect(() => {
    axios
      .get(`https://luna-server.vercel.app/subcategories/${path}`)
      .then((res) => {
        setProducts(res.data);
      });
  }, [path]);
  return (
    <div className="w-11/12 lg:max-w-screen-xl min-h-screen mx-auto">
      <Helmet>
        <title>LUNA | {capitalizeFirstLetter(path)}</title>
        <meta
          name="description"
          content="Explore a wide variety of makeup and skincare products in the {capitalizeFirstLetter(path)} category on LUNA. Shop now for high-quality beauty items and enjoy fast shipping across Bangladesh."
        />
        <meta
          name="keywords"
          content="LUNA, {capitalizeFirstLetter(path)}, makeup, skincare, beauty products, {capitalizeFirstLetter(path)} category, cosmetics, beauty store, Bangladesh beauty shop, beauty products online"
        />
        <meta name="author" content="LUNA Store" />
        <meta
          property="og:title"
          content="LUNA | {capitalizeFirstLetter(path)}"
        />
        <meta
          property="og:description"
          content="Explore a wide variety of makeup and skincare products in the {capitalizeFirstLetter(path)} category on LUNA. Shop now for high-quality beauty items and enjoy fast shipping across Bangladesh."
        />
        <meta property="og:image" content="/subcategories.jpg" />
        <meta property="og:url" content="https://lunastorebd.web.app/{path}" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="LUNA Store" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="LUNA | {capitalizeFirstLetter(path)}"
        />
        <meta
          name="twitter:description"
          content="Explore a wide variety of makeup and skincare products in the {capitalizeFirstLetter(path)} category on LUNA. Shop now for high-quality beauty items and enjoy fast shipping across Bangladesh."
        />
        <meta name="twitter:image" content="/subcategories.jpg" />
        <meta name="twitter:site" content="@lunastorebd" />
        <link rel="canonical" href="https://lunastorebd.web.app/{path}" />
      </Helmet>

      <div className="w-full h-[20vh] lg:h-[43dvh] overflow-hidden rounded-3xl">
        <img
          className="w-full h-full object-cover"
          src="/subcategories.jpg"
          alt="Banner 2"
        />
      </div>
      <div className="breadcrumbs text-xl font-semibold my-4 lg:my-12">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`/${path}`}>{capitalizeFirstLetter(path)}</Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-between items-center">
        <h3 className="text-3xl lg:text-4xl font-bold">
          {capitalizeFirstLetter(path)}{" "}
          <span className="text-2xl font-medium">
            <sup>{products.length} Products</sup>
          </span>
        </h3>
        <div className="flex justify-between items-center gap-8 text-lg font-medium">
          <div className="flex gap-4 justify-center items-center">
            <HiOutlineArrowsUpDown size={25} />
            <p>Sort By</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6 my-12">
        {products.map((product) => (
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

export default Subcategories;
