import React from "react";
import Slider from "react-slick";
import Brand1 from "../../assets/images/brand-01.png";
import Brand2 from "../../assets/images/brand-02.png";
import Brand3 from "../../assets/images/brand-03.png";
import Brand4 from "../../assets/images/brand-04.png";
import Brand5 from "../../assets/images/brand-05.png";
import Brand6 from "../../assets/images/brand-06.png";
import Brand7 from "../../assets/images/brand-07.png";
import Brand8 from "../../assets/images/brand-08.png";

const Carosel = () => {
  const images = [
    Brand1,
    Brand2,
    Brand3,
    Brand4,
    Brand5,
    Brand6,
    Brand7,
    Brand8,
  ];
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
  };
  return (
    <div className="overflow-hidden relative mx-[80px] bg-white my-5 ">
      <Slider {...settings}>
        {images?.map((image: string, index: number) => {
          return (
            <div
              key={index}
              className="w-full flex items-center justify-center "
            >
              <img src={image} alt="" className="w-[100px]" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Carosel;
