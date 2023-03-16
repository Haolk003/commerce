import React, { useState } from "react";
import Countdown from "react-countdown";
import Rating from "@mui/material/Rating";

import tab from "../../assets/images/tab.jpg";
import tab2 from "../../assets/images/tab1.jpg";
import tab3 from "../../assets/images/tab2.jpg";
import tab4 from "../../assets/images/tab3.jpg";
import wish from "../../assets/images/wish.svg";

interface Renderer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}
const SpecialProduct = () => {
  const [imgSelected, setImgSelected] = useState(tab);
  const countDownDate = new Date("2023-03-28T00:00:00Z").getTime();
  const renderer = ({ days, hours, minutes, seconds, completed }: Renderer) => {
    if (completed) {
      return <span>Time's up!</span>;
    } else {
      return (
        <span>
          <span className="font-semibold text-sm">{days}</span>{" "}
          <span className="text-text-primary2 mx-1">Days </span>
          <span className="bg-red-600 rounded-full p-1 text-white text-[13px]">
            {hours < 10 ? "0" + hours : hours}
          </span>{" "}
          :{" "}
          <span className="bg-red-600 rounded-full p-1 text-white text-[13px]">
            {minutes < 10 ? "0" + minutes : minutes}
          </span>
          :{" "}
          <span className="bg-red-600 rounded-full p-1 text-white text-[13px]">
            {seconds < 10 ? "0" + seconds : seconds}
          </span>{" "}
        </span>
      );
    }
  };
  return (
    <div className="flex bg-white relative">
      <div className="w-[50%] relative ">
        <img
          src={imgSelected}
          alt=""
          className="w-full h-auto object-contain mt-3"
        />
        <div className="absolute top-3 left-0 flex items-center justify-between w-full px-2">
          <p className="bg-orange rounded-[25px] text-xs font-semibold px-2 py-1">
            -25%
          </p>
          <img src={wish} alt="" />
        </div>
        <div className="absolute bottom-2 left-0  flex gap-2 w-full justify-center">
          <img
            src={tab2}
            alt=""
            onClick={() => setImgSelected(tab2)}
            className="w-[70px] h-[70px] cursor-pointer object-cover border-[2px] border-gray-300 rounded-sm shadow-sm shadow-gray-300"
          />
          <img
            src={tab3}
            alt=""
            onClick={() => setImgSelected(tab3)}
            className="w-[70px] h-[70px] cursor-pointer object-cover border-gray-300 border-[2px] rounded-sm shadow-sm shadow-gray-300"
          />
        </div>
      </div>

      <div className="py-3 px-2 w-[60%]">
        <h4 className="text-text-primary mb-3">Havelis</h4>
        <h2 className="font-semibold mb-3">Honor T1 7.0 1GB RAM 8GB ROM...</h2>
        <Rating name="read-only" value={4} readOnly />
        <div className="my-3">
          <span className="text-text-primary mr-2">$26.00</span>
          <span className="line-through text-text-primary2 ">$35.00</span>
        </div>
        <Countdown date={countDownDate} renderer={renderer} />
        <p className="text-text-primary2 mb-1 mt-4">Products:100</p>

        <div className="bg-gray-400 relative rounded-[25px] w-full h-[6px]  after:bg-green-500 after:content-[''] after:absolute after:left-0 after:top-0 after:h-full after:w-[40%] after:rounded-[25px]"></div>
        <button className="bg-header-color text-white rounded-[25px] py-2 px-3 mt-4  text-sm tracking-wider">
          OPTION
        </button>
      </div>
    </div>
  );
};

export default SpecialProduct;
