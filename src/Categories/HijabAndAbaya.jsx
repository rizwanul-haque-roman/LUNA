import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Helmet } from "react-helmet-async";

const HijabAndAbaya = () => {
  const [abaya, setAbaya] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartlen", JSON.stringify(cart.length));
    window.dispatchEvent(new Event("storage"));
  }, [cart]);

  useEffect(() => {
    axios.get(`https://luna-server.vercel.app/hijab&abaya`).then((res) => {
      setAbaya(res.data);
    });
  }, []);
  return (
    <div className="w-11/12 lg:max-w-screen-xl min-h-screen mx-auto">
      <Helmet>
        <title>LUNA | Hijab & Abaya</title>
        <meta
          name="description"
          content="Discover stylish and high-quality Hijab and Abaya collections at LUNA. Shop our wide range of modest wear and enjoy fast shipping across Bangladesh. Explore the latest in Hijab and Abaya fashion."
        />
        <meta
          name="keywords"
          content="LUNA, Hijab, Abaya, modest wear, Hijab fashion, Abaya fashion, modest clothing, Bangladesh Hijab, Bangladesh Abaya, online Hijab store, online Abaya store, Hijab shopping, Abaya shopping"
        />
        <meta name="author" content="LUNA Store" />
        <meta property="og:title" content="LUNA | Hijab & Abaya" />
        <meta
          property="og:description"
          content="Discover stylish and high-quality Hijab and Abaya collections at LUNA. Shop our wide range of modest wear and enjoy fast shipping across Bangladesh. Explore the latest in Hijab and Abaya fashion."
        />
        <meta property="og:image" content="/hijab.jpg" />
        <meta
          property="og:url"
          content="https://lunastorebd.web.app/hijab&abaya"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="LUNA Store" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LUNA | Hijab & Abaya" />
        <meta
          name="twitter:description"
          content="Discover stylish and high-quality Hijab and Abaya collections at LUNA. Shop our wide range of modest wear and enjoy fast shipping across Bangladesh. Explore the latest in Hijab and Abaya fashion."
        />
        <meta name="twitter:image" content="/hijab.jpg" />
        <meta name="twitter:site" content="@lunastorebd" />
        <link rel="canonical" href="https://lunastorebd.web.app/hijab&abaya" />
      </Helmet>
      <div className="w-full h-[20vh] lg:h-[43dvh] overflow-hidden rounded-3xl">
        <img
          className="w-full h-full object-cover"
          src="/hijab.jpg"
          alt="Banner 2"
        />
      </div>
      <div className="breadcrumbs text-xl font-semibold my-4 lg:my-12">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={"/hijab&abaya"}>Hijab & Abaya</Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-between items-center">
        <h3 className="text-2xl lg:text-4xl font-bold">
          Hijab & Abaya{" "}
          <span className="text-2xl font-medium">
            <sup>{abaya.length} Products</sup>
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
        {abaya.map((product) => (
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

export default HijabAndAbaya;
