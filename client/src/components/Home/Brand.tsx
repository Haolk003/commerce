import React from "react";
import speaker from "../../assets/images/speaker2.png";
import watch from "../../assets/images/watch-series6.png";
import laptop from "../../assets/images/laptop2.png";
import iphone from "../../assets/images/phone.png";
const Brand = () => {
  return (
    <div className="grid grid-cols-4 gap-2 px-[80px] my-10 ">
      <div className="text-white bg-black rounded-md px-3 py-2 h-[400px]    ">
        <p className="mb-2 text-xs mt-5">BIG SCREEN</p>
        <h2 className="font-semibold mb-3 text-xl">Smart Watch Series 7</h2>
        <p className="text-sm mb-10 text-text-primary2">
          From $399 or $16.62, for 24 mo.*
        </p>
        <img src={watch} alt="" className="w-[400px]" />
      </div>
      <div className="bg-white rounded-md px-3 py-2 h-[400px] ">
        {" "}
        <p className="mb-2 text-xs mt-5">STUDIO DISPLAY</p>
        <h2 className="font-semibold mb-3 text-xl ">600 nits of brightness</h2>
        <p className="text-sm mb-10 text-text-primary2">
          27-inch 5K Retna display
        </p>
        <img src={laptop} alt="" className="w-[400px]" />
      </div>
      <div className="bg-white rounded-md px-3 py-2 h-[400px]">
        {" "}
        <p className="mb-2 text-xs mt-5">SMARTPHONES</p>
        <h2 className="font-semibold mb-3 text-xl">Smartphone 14 Pro</h2>
        <p className="text-sm mb-10 text-text-primary2">
          Now in Green From $9999.00 or $41.62/mo for 24 mo.Footnote
        </p>
        <div className="mx-auto w-full flex items-center justify-center">
          <img src={iphone} alt="" className="w-[200px]" />
        </div>
      </div>
      <div className="bg-white rounded-md px-3 py-2 h-[400px]">
        {" "}
        <p className="mb-2 text-xs mt-5 uppercase">HOME Speakers</p>
        <h2 className="font-semibold mb-3 text-xl">Room-filling sound</h2>
        <p className="text-sm mb-10 text-text-primary2 ">
          From $699 or $166.58/mo for 12 mo.
        </p>
        <div className="w-full mx-auto flex items-center justify-center">
          <img src={speaker} alt="" className="w-[250px]" />
        </div>
      </div>
    </div>
  );
};

export default Brand;
