import React from "react";
import Speaker from "../../assets/images/speaker.jpg";
import Tv from "../../assets/images/tv.jpg";
import Laptop from "../../assets/images/laptop.jpg";
import Headphone from "../../assets/images/headphone.jpg";
import Homeapp from "../../assets/images/homeapp.jpg";
import Camera from "../../assets/images/camera.jpg";
import Accessories from "../../assets/images/acc.jpg";
import Watch from "../../assets/images/watch.jpg";
import Phone from "../../assets/images/phone.png";
import Gaming from "../../assets/images/gaming.png";

const Products = () => {
  return (
    <div className="grid grid-cols-5 gap-2 bg-white mx-[80px] px-3 py-5">
      {/* product */}
      <div className="flex items-center justify-between gap-2 w-full ">
        <div>
          <h2 className="text-sm font-semibold">Computers & Laptop</h2>
          <p className="text-sm text-gray-500">8 Items</p>
        </div>
        <img src={Laptop} alt="" className="h-[100px] w-[100px] object-cover" />
      </div>
      {/* product */}
      <div className="flex items-center justify-between gap-2 w-full ">
        <div>
          <h2 className="text-sm font-semibold">Cameras & Videos</h2>
          <p className="text-sm text-gray-500">10 Items</p>
        </div>
        <img src={Camera} alt="" className="h-[100px] w-[100px] object-cover" />
      </div>
      {/* product */}
      <div className="flex items-center justify-between gap-2 w-full ">
        <div>
          <h2 className="text-sm font-semibold">Smart Television</h2>
          <p className="text-sm text-gray-500">12 Items</p>
        </div>
        <img src={Tv} alt="" className="h-[100px] w-[100px] object-cover" />
      </div>
      {/* product */}
      <div className="flex items-center justify-between gap-2 w-full">
        <div>
          <h2 className="text-sm font-semibold">Smart watches</h2>
          <p className="text-sm text-gray-500">13 Items</p>
        </div>
        <img src={Watch} alt="" className="h-[100px] w-[100px] object-cover" />
      </div>
      {/* product */}
      <div className="flex items-center justify-between gap-2 w-full">
        <div>
          <h2 className="text-sm font-semibold">Music & Gaming</h2>
          <p className="text-sm text-gray-500">4 Items</p>
        </div>
        <img src={Gaming} alt="" className="h-[70px] w-auto" />
      </div>
      {/* product */}
      <div className="flex items-center justify-between gap-2 w-full">
        <div>
          <h2 className="text-sm font-semibold">Mobiles & Tables</h2>
          <p className="text-sm text-gray-500">8 Items</p>
        </div>
        <img src={Phone} alt="" className="h-[100px] w-[100px] object-cover" />
      </div>
      {/* product */}
      <div className="flex items-center justify-between gap-2 w-full">
        <div>
          <h2 className="text-sm font-semibold">Headphones</h2>
          <p className="text-sm text-gray-500">6 Items</p>
        </div>
        <img
          src={Headphone}
          alt=""
          className="h-[100px] w-[100px] object-cover"
        />
      </div>
      {/* product */}
      <div className="flex items-center justify-between gap-2 w-full">
        <div>
          <h2 className="text-sm font-semibold">Accessories</h2>
          <p className="text-sm text-gray-500">10 Items</p>
        </div>
        <img
          src={Accessories}
          alt=""
          className="h-[100px] w-[100px] object-cover"
        />
      </div>
      {/* product */}
      <div className="flex items-center justify-between gap-2 w-full">
        <div>
          <h2 className="text-sm font-semibold">Portable Speakers</h2>
          <p className="text-sm text-gray-500">8 Items</p>
        </div>
        <img
          src={Speaker}
          alt=""
          className="h-[100px] w-[100px] object-cover"
        />
      </div>
      {/* product */}
      <div className="flex items-center justify-between gap-2 w-full">
        <div>
          <h2 className="text-sm font-semibold">Home Appliances</h2>
          <p className="text-sm text-gray-500">6 Items</p>
        </div>
        <img
          src={Homeapp}
          alt=""
          className="h-[100px] w-[100px] object-cover"
        />
      </div>
    </div>
  );
};

export default Products;
