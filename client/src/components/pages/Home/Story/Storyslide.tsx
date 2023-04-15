import React from "react";
import Story from "./Story";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Lazy } from "swiper";
import "swiper/css";
import Mainstory from "./Mainstory";

const Storyslide = ({ currentUser }: any) => {
  return (
    <section>
      {/* For mobile */}
      <div className=" px-3 w-[390px] md: lg:hidden grid grid-flow-col gap-x-3 overflow-x-auto hidden-scroll py-4 md:pb-8">
        <Mainstory username={currentUser.username} />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
      </div>
      {/* For desktop */}

      <div className="hidden lg:block w-[39.5rem]">
        <Swiper className="mySwiper" slidesPerView={6.5}>
          <SwiperSlide>
            <Mainstory username={currentUser.username} />
          </SwiperSlide>
          <SwiperSlide>
            <Story />
          </SwiperSlide>
          <SwiperSlide>
            <Story />
          </SwiperSlide>
          <SwiperSlide>
            <Story />
          </SwiperSlide>
          <SwiperSlide>
            <Story />
          </SwiperSlide>
          <SwiperSlide>
            <Story />
          </SwiperSlide>
          <SwiperSlide>
            <Story />
          </SwiperSlide>
          <SwiperSlide>
            <Story />
          </SwiperSlide>
          <SwiperSlide>
            <Story />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Storyslide;
