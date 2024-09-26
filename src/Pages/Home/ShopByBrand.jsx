const ShopByBrand = () => {
  return (
    <div className="mt-16">
      <h1 className="text-center text-4xl font-bold">SHOP BY BRANDS</h1>
      <div className="carousel gap-6 rounded-box mt-16">
        <div className="carousel-ite">
          <img className="rounded-2xl" src="/brands/iba.webp" alt="iba" />
        </div>
        <div className="carousel-item">
          <img
            className="rounded-2xl"
            src="/brands/focallure.webp"
            alt="focallure"
          />
        </div>
        <div className="carousel-item">
          <img className="rounded-2xl" src="/brands/milani.webp" alt="milani" />
        </div>
        <div className="carousel-item">
          <img
            className="rounded-2xl"
            src="/brands/wetnwild.webp"
            alt="wetnwild"
          />
        </div>
        <div className="carousel-item">
          <img
            className="rounded-2xl"
            src="/brands/zaynnmaya.webp"
            alt="zaynnmaya"
          />
        </div>
      </div>
    </div>
  );
};

export default ShopByBrand;
