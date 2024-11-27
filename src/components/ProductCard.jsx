import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({productData}) => {
  let loading = true;
  let thumbnail = null, brandname = loading, title = loading, price = loading, id=null;
  if(productData!= null){
    thumbnail = productData["thumbnailUrl"][0];
    brandname = productData["brandName"];
    title = productData["productTitle"];
    price = productData["price"]
    id = productData["_id"]
    loading = false;
  }
  return (
    <>
      <Link to={`/details/${id}`}>
      <div className="min-w-[300px] border p-3 rounded-xl flex flex-col justify-between">
        <div>
        {loading ? (
        <img className="rounded-md w-full object-contain" src="/products/lafz.webp" alt="Loading..." />
      ) : (
        <img className="rounded-md w-full object-contain" src={thumbnail || "/default-thumbnail.jpg"} alt="Product" />
      )}
        <h4 className="text-sm text-[#000000aa] my-3">{brandname}</h4>
        <p className="my-3">{title}</p>
        <p className="text-[#F0729F] text-xl font-semibold">৳ {price} BDT</p>
        </div>
        <div className="flex gap-4 justify-between">
        <p className="mt-3 btn btn-sm flex-1 bg-[#F0729F] text-white">
          ADD TO BAG
        </p>
        <p className="mt-3 btn btn-sm flex-1 bg-[#F0729F] text-white">
          BUY NOW
        </p>
        </div>
      </div>
      </Link>
    </>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  productData: PropTypes.object
}
