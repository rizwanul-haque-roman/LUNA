import { IoCalendarClearOutline } from "react-icons/io5";
import { PiMedal } from "react-icons/pi";
import { BsCashCoin } from "react-icons/bs";

const Details = () => {
  return (
    <div className="container mx-auto">
      <div className="breadcrumbs mt-6 text-xl">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>Lafz</li>
        </ul>
      </div>
      <div className="flex gap-16">
        <div className="w-[500px] h-[500px] bg-red-200">
          <h1>Image here</h1>
        </div>
        <div className="space-y-4 w-1/2">
          <h3>LAFZ</h3>
          <p className="text-xl font-medium">
            Lafz Anti Pollution CC Cream (30ml)
          </p>
          <p className="text-2xl font-bold text-[#F0729F]">৳499</p>
          <div className="flex gap-6">
            <button className="btn btn-wide btn-outline hover:bg-[#f54b87] hover:border-[#f54b87] text-lg">
              Add to Wishlist
            </button>
            <button className="btn btn-wide bg-[#F0729F] hover:bg-[#f54b87] text-lg">
              Buy Now
            </button>
          </div>
          <div className="flex gap-3 items-center">
            <IoCalendarClearOutline size={25} />
            <p>
              Delivery inside Dhaka within 2 days <br /> Outside Dhaka 3-5 Days.
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <PiMedal size={25} />
            <p>100% Original Branded Products.</p>
          </div>
          <div className="flex gap-3 items-center">
            <BsCashCoin size={25} />
            <p>Cash On Delivery Available.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold">Product Description</h4>
            <p>
              Made for all skin types, this CC cream gives medium coverage and
              hides imperfections and discolorations. Enriched with vitamin C,
              it soothes and conceals redness and blemishes, while vitamin E,
              with its antioxidant and anti-inflammatory properties, nourishes
              your skin, making it plump and supple. Its creamy texture gives a
              beautiful, natural matte finish to your skin that lasts throughout
              the day. Free from harmful chemicals such as parabens and
              sulfates, it is safe for all skin types.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
