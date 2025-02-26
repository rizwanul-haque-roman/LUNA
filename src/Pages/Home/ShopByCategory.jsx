const ShopByCategory = () => {
  return (
    <div className="mt-4 lg:mt-16">
      <h1 className="text-center text-2xl lg:text-4xl font-bold">
        POPULAR CATEGORIES
      </h1>
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center mt-4 lg:mt-16">
        <a href="#">
          <img
            className="rounded-full w-[100px] lg:w-[200px] h-[100px] lg:h-[200px]"
            src="/face.webp"
            alt=""
          />
        </a>
        <a href="#">
          <img
            className="rounded-full w-[100px] lg:w-[200px] h-[100px] lg:h-[200px]"
            src="/lips.webp"
            alt=""
          />
        </a>
        <a href="#">
          <img
            className="rounded-full w-[100px] lg:w-[200px] h-[100px] lg:h-[200px]"
            src="/eyes.webp"
            alt=""
          />
        </a>
        <a href="#">
          <img
            className="rounded-full w-[100px] lg:w-[200px] h-[100px] lg:h-[200px]"
            src="/tools.webp"
            alt=""
          />
        </a>
        <a href="#">
          <img
            className="rounded-full w-[100px] lg:w-[200px] h-[100px] lg:h-[200px]"
            src="/nails.webp"
            alt=""
          />
        </a>
      </div>
    </div>
  );
};

export default ShopByCategory;
