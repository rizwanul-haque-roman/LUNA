const ShopByCategory = () => {
  return (
    <div className="mt-16">
      <h1 className="text-center text-4xl font-bold">SHOP BY CATEGORY</h1>
      <div className="flex justify-between mt-16">
        <a href="#">
          <img
            className="rounded-full w-[200px] h-[200px]"
            src="/face.webp"
            alt=""
          />
        </a>
        <a href="#">
          <img
            className="rounded-full w-[200px] h-[200px]"
            src="/lips.webp"
            alt=""
          />
        </a>
        <a href="#">
          <img
            className="rounded-full w-[200px] h-[200px]"
            src="/eyes.webp"
            alt=""
          />
        </a>
        <a href="#">
          <img
            className="rounded-full w-[200px] h-[200px]"
            src="/tools.webp"
            alt=""
          />
        </a>
        <a href="#">
          <img
            className="rounded-full w-[200px] h-[200px]"
            src="/nails.webp"
            alt=""
          />
        </a>
      </div>
    </div>
  );
};

export default ShopByCategory;
