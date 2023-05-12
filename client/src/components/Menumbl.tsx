import React from "react";
import { AiOutlineHome, AiTwotoneHome, AiOutlineSearch } from "react-icons/ai";
import { BsFillPlusSquareFill, BsMessenger } from "react-icons/bs";
import { RiMessengerLine } from "react-icons/ri";
import Images from "../assets/images";
const Menumbl = () => {
  return (
    <div className="bg-thWhite fixed -bottom-1 menu_mbl md:hidden lg:hidden">
      <div className="flex items-center justify-center w-screen h-14 gap-x-14">
        <AiOutlineHome size={25} />
        <AiOutlineSearch size={25} />
        <BsFillPlusSquareFill size={24} />
        {/* <RiMessengerLine size={25} /> */}
        <img
          src={Images.av2.default.src}
          alt=""
          className="w-6 h-6 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Menumbl;
