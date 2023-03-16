import React from "react";
import Service from "../../assets/images/service.png";
import Service2 from "../../assets/images/service-02.png";
import Service3 from "../../assets/images/service-03.png";
import Service4 from "../../assets/images/service-04.png";
import Service5 from "../../assets/images/service-05.png";
const Programs = () => {
  return (
    <div className="flex items-center justify-between w-full px-[80px] py-10 my-5">
      {/* service */}
      <div className="flex items-center  gap-5">
        <img src={Service} alt="" />
        <div>
          <h2 className="font-semibold">Free Shipping</h2>
          <p className="text-sm">From all orders over 100</p>
        </div>
      </div>
      {/* service */}
      <div className="flex items-center gap-5">
        <img src={Service2} alt="" />
        <div>
          <h2 className="font-semibold">Daily Surprise Offers</h2>
          <p className="text-sm">Save up to 25% off</p>
        </div>
      </div>
      {/* service */}
      <div className="flex items-center  gap-5">
        <img src={Service3} alt="" />
        <div>
          <h2 className="font-semibold">Support 24/7</h2>
          <p className="text-sm">Shop with an expert</p>
        </div>
      </div>
      {/* service */}
      <div className="flex items-center  gap-5">
        <img src={Service4} alt="" />
        <div>
          <h2 className="font-semibold">Affordable Prices</h2>
          <p className="text-sm">Get Factory direct price</p>
        </div>
      </div>
      {/* service */}
      <div className="flex items-center gap-5">
        <img src={Service} alt="" />
        <div>
          <h2 className="font-semibold">Secure Payments</h2>
          <p className="text-sm">100% Protected Payments</p>
        </div>
      </div>
    </div>
  );
};

export default Programs;
