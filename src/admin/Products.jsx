import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Fetch the products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://luna-server.vercel.app/allProducts"
        ); // Replace with your API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="overflow-y-auto max-h-[80dvh]">
      <Helmet>
        <title>LUNA | Products</title>
      </Helmet>
      <table className="min-w-full table-md border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4 border-b">Serial No.</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Product Title</th>
            <th className="py-2 px-4 border-b">Brand</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Stock</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id.$oid} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">
                <img
                  src={product.thumbnailUrl[0]}
                  alt={product.productTitle}
                  className="w-12 h-12 object-cover rounded-md"
                />
              </td>
              <td className="py-2 px-4">
                {product.productTitle}
                <div className="text-sm text-gray-500">{product.brandName}</div>
              </td>
              <td className="py-2 px-4">{product.brandName}</td>
              <td className="py-2 px-4 font-sans">{product.price} TK</td>
              <td className="py-2 px-4">{product.stock}</td>
              <td className="py-2 px-4">
                <Link to={`/dashboard/editProduct/${product._id}`}>
                  <button className="btn bg-[#F0729F] hover:bg-[#eeb6c8] btn-sm">
                    Edit
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
