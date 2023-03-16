import React from "react";

import "swiper/css";
interface FeatureProps {
  title: string | undefined;
  image: string | undefined;
  key: string | undefined;
}
const FeatureCate = ({ title, image, key }: FeatureProps) => {
  return (
    <div
      key={key}
      className="flex flex-col items-center justify-center bg-[#feefea]   relative h-[200px] rounded-lg"
    >
      <div className="absolute w-full left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-center flex flex-col items-center justify-center ">
        <img src={image} alt="" className="w-[60px] h-[60px] object-cover" />
        <h2 className="text-sm font-semibold mt-4">{title}</h2>
        <p className="text-text-color">3 items</p>
      </div>
    </div>
  );
};

export default FeatureCate;
