import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ productData }) => {
  // const product = productData;
  let loading = true;
  let thumbnail = null,
    brandname = loading,
    title = loading,
    price = loading,
    id = null;
  if (productData != null) {
    thumbnail = productData["thumbnailUrl"][0];
    brandname = productData["brandName"];
    title = productData["productTitle"];
    price = productData["price"];
    id = productData["_id"];
    loading = false;
  }
  return (
    <>
      <div className="min-w-[300px] border p-3 rounded-xl flex flex-col justify-between">
        <div>
          {loading ? (
            <img
              className="rounded-md w-full object-contain"
              src="/public/loading_t.gif"
              alt="Loading..."
            />
          ) : (
            <Link to={`/details/${id}`}>
              <img
                className="rounded-md w-full object-contain"
                src={thumbnail || "/default-thumbnail.jpg"}
                alt="Product"
              />
            </Link>
          )}
          <h4 className="text-sm text-[#000000aa] my-3">{brandname}</h4>
          <p className="my-3">{title}</p>
          <p className="text-[#F0729F] text-xl font-semibold">৳ {price} BDT</p>
        </div>
        <div className="flex gap-4 justify-between">
          <Link className="flex-1" to={`/details/${id}`}>
            <p className="mt-3 w-full btn btn-sm bg-[#F0729F] text-white">
              Details
            </p>
          </Link>
          <Link
            className="flex-1"
            to={{
              pathname: "/order",
            }}
            state={{ product: productData }}
          >
            <p className="mt-3 w-full btn btn-sm bg-[#F0729F] text-white">
              BUY NOW
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  productData: PropTypes.object,
};
