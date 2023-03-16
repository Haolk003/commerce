import React, { useState } from "react";
import Slider from "react-slick";
import { GrSend } from "react-icons/gr";
import { motion } from "framer-motion";
import { useEffect } from "react";
const Intro = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,

    // beforeChange: function (currentSlide: any, nextSlide: any) {
    //   console.log("before change", currentSlide, nextSlide);
    // },
    afterChange: function (currentSlide: any) {
      setCurrentSlide(currentSlide);
      console.log("after change", currentSlide);
    },
  };
  const variants = {
    change: { y: 0 },
    exit: { y: -100 },
  };
  return (
    <div className="px-5 mt-5">
      <Slider {...settings}>
        <motion.div className="relative bg-[url('https://cdn.shopify.com/s/files/1/0652/4570/8532/files/slider-1-2.jpg?v=1659427625&width=2100')] h-[600px] bg-cover rounded-2xl ">
          <div className="absolute bottom-0  left-[100px]">
            <motion.h2
              initial={{ y: 0 }}
              variants={variants}
              animate={currentSlide ? "change" : "exit"}
              transition={{ duration: 1 }}
              className="text-6xl w-[600px] font-semibold text-heading-color mb-10"
            >
              Fresh Vegetables Big discount
            </motion.h2>
            <motion.p
              initial={{ y: 0 }}
              variants={variants}
              animate={currentSlide ? "change" : "exit"}
              transition={{ duration: 1 }}
              className="text-2xl text-text-color mb-10"
            >
              Tell your story
            </motion.p>
            <motion.div
              initial={{ y: 0 }}
              variants={variants}
              animate={currentSlide ? "change" : "exit"}
              transition={{ duration: 1 }}
              className="bg-white flex items-center w-[500px] rounded-[25px] h-[60px]"
            >
              <GrSend className="w-[10%]" />
              <input
                type="email"
                className="w-[60%] h-full outline-none"
                placeholder="Your email address "
              />
              <button className="bg-link-hover rounded-[25px] text-white w-[30%] h-full">
                Subcribe
              </button>
            </motion.div>
          </div>
        </motion.div>
        <div className="relative bg-[url('https://cdn.shopify.com/s/files/1/0652/4570/8532/files/slider-1-1.jpg?v=1659427625&width=2100')] h-[600px] bg-cover rounded-2xl ">
          <div className="absolute bottom-0  left-[100px]">
            <motion.h2
              initial={{ y: 0 }}
              variants={variants}
              animate={!currentSlide ? "change" : "exit"}
              transition={{ duration: 1 }}
              className="text-6xl w-[600px] font-semibold text-heading-color mb-10"
            >
              Dont miss amzing grocery deals
            </motion.h2>
            <motion.p
              initial={{ y: 0 }}
              variants={variants}
              animate={!currentSlide ? "change" : "exit"}
              transition={{ duration: 1 }}
              className="text-2xl text-text-color mb-10"
            >
              Sign up for the daily newsletter
            </motion.p>
            <motion.div
              initial={{ y: 0 }}
              variants={variants}
              animate={!currentSlide ? "change" : "exit"}
              transition={{ duration: 1 }}
              className="bg-white flex items-center w-[500px] rounded-[25px] h-[60px]"
            >
              <GrSend className="w-[10%]" />
              <input
                type="email"
                className="w-[60%] h-full outline-none"
                placeholder="Your email address "
              />
              <button className="bg-link-hover rounded-[25px] text-white w-[30%] h-full">
                Subcribe
              </button>
            </motion.div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Intro;
