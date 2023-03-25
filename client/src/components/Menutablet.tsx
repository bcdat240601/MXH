import React, { useState } from "react";
import {
  AiOutlineHome,
  AiTwotoneHome,
  AiOutlineSearch,
  AiOutlineMenu,
} from "react-icons/ai";
import { BsFillPlusSquareFill, BsMessenger } from "react-icons/bs";
import { RiMessengerLine, RiSettings4Fill } from "react-icons/ri";
import { BiBell } from "react-icons/bi";

import Images from "../assets/images";
const Menutablet = () => {
  const [isMenu, setisMenu] = useState(false);
  const handleMenu = () => {
    isMenu ? setisMenu(false) : setisMenu(true);
  };
  return (
    <div className="hidden md:block lg:hidden">
      <div className="h-screen w-18 bg-thWhite border-r-[1px] flex flex-col justify-between ">
        <div className="flex flex-col items-center pt-2 px-3 gap-y-9 ">
          <div className="mb-7 mt-5">
            <img
              src={Images.logo2.default.src}
              alt=""
              className="w-10 h-10 object-cover"
            />
          </div>
          <div>
            <AiTwotoneHome size={27} />
          </div>
          <div>
            <AiOutlineSearch size={27} />
          </div>
          <div>
            <BsFillPlusSquareFill size={26} />
          </div>
          <div className="relative">
            <div className="w-3 h-3 bg-thRed rounded-full absolute top-0 right-0"></div>
            <RiMessengerLine size={27} />
          </div>
          <div className="relative">
            <div className="w-3 h-3 bg-thRed rounded-full absolute top-0 right-0"></div>
            <BiBell size={27} />
          </div>
          <div>
            <img
              src={Images.av2.default.src}
              alt=""
              className="w-6 h-6 rounded-full object-cover"
            />
          </div>
        </div>
        {isMenu && (
          <div className="bg-thWhite w-[18.9rem] bottom-32 left-5 absolute rounded-lg border-[1px] font-normal text-base">
            <div className="flex justify-between items-center px-4 py-4 border-b-[1px]">
              Setting
              <RiSettings4Fill size={25} />
            </div>
            <div className="flex justify-between items-center px-4 py-4">
              Log-out
            </div>
          </div>
        )}
        <div className="grid place-items-center pb-7" onClick={handleMenu}>
          <AiOutlineMenu size={35} />
        </div>
      </div>
    </div>
  );
};

export default Menutablet;
