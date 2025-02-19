import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { FreeMode, Thumbs } from "swiper/modules";
import { Link, useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditProduct = () => {
  const navigate = useNavigate();
  const product = useLoaderData();

  let loading = true;
  if (product) {
    loading = false;
  }

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [formData, setFormData] = useState({
    productTitle: product.productTitle,
    brandName: product.brandName,
    price: product.price,
    category: product.category,
    subcategory: product.subcategory,
    sub_subcategory: product.sub_subcategory,
    status: product.status,
    stock: product.stock,
    productDescription: product.productDescription,
    thumbnailUrl: product.thumbnailUrl,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://luna-server.vercel.app/updateProduct/${product._id}`,
        formData
      );
      Swal.fire("Product updated successfully!");
      navigate("/dashboard/products");
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire("Failed to update product!");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(
          `https://luna-server.vercel.app/deleteProduct/${product._id}`
        );
        alert("Product deleted successfully!");
        navigate("/dashboard/products");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product!");
      }
    }
  };

  return (
    <div className="w-11/12 lg:container mx-auto mb-6">
      {loading ? (
        "loading..."
      ) : (
        <>
          <h3 className="text-2xl font-bold mb-4">Edit Product</h3>
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="w-auto lg:w-[500px]">
              <div>
                <Swiper
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                  modules={[FreeMode, Thumbs]}
                  className="mySwiper2"
                >
                  <SwiperSlide>
                    <img src={product["thumbnailUrl"][0]} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={product["thumbnailUrl"][1]} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={product["thumbnailUrl"][2]} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={product["thumbnailUrl"][3]} />
                  </SwiperSlide>
                </Swiper>
              </div>
              <div>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Thumbs]}
                  className="mySwiper mt-3"
                >
                  <SwiperSlide>
                    <img src={product["thumbnailUrl"][0]} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={product["thumbnailUrl"][1]} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={product["thumbnailUrl"][2]} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={product["thumbnailUrl"][3]} />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="productTitle" className="text-sm font-semibold">
                Product Name
              </label>
              <input
                type="text"
                name="productTitle"
                placeholder="Product Title"
                value={formData.productTitle}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded"
              />

              <label htmlFor="brandName" className="text-sm font-semibold">
                Brand Name
              </label>
              <input
                type="text"
                name="brandName"
                placeholder="Brand Name"
                value={formData.brandName}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded"
              />

              <label htmlFor="Price" className="text-sm font-semibold">
                Price
              </label>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded"
              />

              <label htmlFor="category" className="text-sm font-semibold">
                Category
              </label>
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded"
              />

              <label htmlFor="subcategory" className="text-sm font-semibold">
                Subcategory
              </label>
              <input
                type="text"
                name="subcategory"
                placeholder="Subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded"
              />

              <label
                htmlFor="sub_subcategory"
                className="text-sm font-semibold"
              >
                Sub Subcategory
              </label>
              <input
                type="text"
                name="sub_subcategory"
                placeholder="Sub Subcategory"
                value={formData.sub_subcategory}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded"
              />

              <label htmlFor="status" className="text-sm font-semibold">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded"
              >
                <option value="">Select Status</option>
                <option value="best-selling">Best Selling</option>
                <option value="new">New</option>
                <option value="discounted">Discounted</option>
              </select>

              <label htmlFor="stock" className="text-sm font-semibold">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded"
              />

              <label
                htmlFor="productDescription"
                className="text-sm font-semibold"
              >
                Product Description
              </label>
              <textarea
                name="productDescription"
                placeholder="Product Description"
                value={formData.productDescription}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded h-24"
              ></textarea>

              <div className="flex gap-4 justify-between">
                <button
                  type="submit"
                  className="w-full text-white p-2 rounded bg-[#F0729F] hover:bg-[#ff3172] btn-sm"
                >
                  Update Product
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full text-white p-2 rounded bg-red-500 hover:bg-red-700 btn-sm"
                >
                  Delete Product
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default EditProduct;

{
  /*

    "_id": "67ae34fe5220625a78716a14",
    "brandName": "L'Oréal Paris",
    "productTitle": "Revitalift Hyaluronic Acid Serum (30ml)",
    "price": "1999",
    "category": "skincare",
    "subcategory": "serums",
    "sub_subcategory": "hydrating-serum",
    "status": "best-selling",
    "stock": "10",
    "productDescription": "L'Oréal Paris Revitalift Hyaluronic Acid Serum provides intense hydration, plumps the skin, and reduces fine lines. Formulated with micro and macro hyaluronic acid molecules for deep penetration and long-lasting moisture.",
    "thumbnailUrl": [
      "https://i.ibb.co/Y7HnKS7r/4.jpg",
      "https://i.ibb.co/VcJXt59x/3.jpg",
      "https://i.ibb.co/nqX3G7rf/2.jpg",
      "https://i.ibb.co/Fb5ZyqZx/1.jpg"    
    
*/
}
