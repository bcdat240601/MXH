import React from "react";
import Story from "./Story";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Lazy } from "swiper";
import "swiper/css";
import Mainstory from "./Mainstory";
const Storyslide = () => {
  return (
    <div className="bg-white px-3 w-[390px] grid grid-flow-col gap-x-3 overflow-x-auto hidden-scroll py-4">
      <Mainstory />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
    </div>
  );
};

export default Storyslide;
