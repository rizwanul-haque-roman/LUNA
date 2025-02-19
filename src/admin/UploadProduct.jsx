import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UploadProduct = () => {
  const [product, setProduct] = useState({
    brandName: "",
    productTitle: "",
    price: "",
    category: "",
    subcategory: "",
    sub_subcategory: "",
    status: "",
    stock: "",
    productDescription: "",
    thumbnailUrl: [], // Stores uploaded image URLs
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle Image Upload
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const uploadedUrls = [];

    if (!files.length) return;

    setLoading(true);
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`,
          formData
        );

        if (response.data.success) {
          uploadedUrls.push(response.data.data.url);
        }
      }

      setProduct({ ...product, thumbnailUrl: uploadedUrls });
      setImages(uploadedUrls);
      Swal.fire("Success!", "Images uploaded successfully!", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to upload images.", "error");
    }
    setLoading(false);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.thumbnailUrl.length === 0) {
      return Swal.fire("Error!", "Please upload at least one image!", "error");
    }

    try {
      const response = await axios.post(
        "https://luna-server.vercel.app/uploadProduct",
        product
      );

      if (response.status === 201) {
        Swal.fire("Success!", "Product uploaded successfully!", "success").then(
          () => {
            window.location.reload();
          }
        );
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to upload product!", "error");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Upload New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Title */}
        <input
          type="text"
          name="productTitle"
          placeholder="Product Title"
          value={product.productTitle}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Brand Name */}
        <input
          type="text"
          name="brandName"
          placeholder="Brand Name"
          value={product.brandName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Subcategory */}
        <input
          type="text"
          name="subcategory"
          placeholder="Subcategory"
          value={product.subcategory}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Sub Subcategory */}
        <input
          type="text"
          name="sub_subcategory"
          placeholder="Sub Subcategory"
          value={product.sub_subcategory}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Status */}
        <select
          name="status"
          value={product.status}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Status</option>
          <option value="best-selling">Best Selling</option>
          <option value="new">New</option>
          <option value="discounted">Discounted</option>
        </select>

        {/* Stock */}
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Description */}
        <textarea
          name="productDescription"
          placeholder="Product Description"
          value={product.productDescription}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded h-24"
        ></textarea>

        {/* Image Upload */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded"
        />

        {loading && (
          <p className="text-blue-500 flex justify-center items-center gap-6">
            Uploading images please wait{" "}
            <span className="loading loading-dots loading-lg"></span>
          </p>
        )}

        {/* Display Uploaded Images */}
        <div className="flex flex-wrap gap-2">
          {images.map((url, index) => (
            <img
              key={index}
              src={url}
              alt="Product Thumbnail"
              className="w-20 h-20 object-cover rounded border"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default UploadProduct;
