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
const Menudesktop = () => {
  const [isMenu, setisMenu] = useState(false);
  const handleMenu = () => {
    isMenu ? setisMenu(false) : setisMenu(true);
  };
  return (
    <div className="hidden lg:block">
      <div className="h-screen w-[15.25rem] bg-thWhite border-r-[1px] flex flex-col justify-between ">
        <div className="flex flex-col pt-2 px-3 gap-y-9 ">
          <div className="mb-7 mt-5">
            <img src={Images.logo3.default.src} alt="" className="w-44" />
          </div>
          <div className="flex items-center gap-x-4 text-base font-bold px-2">
            <AiTwotoneHome size={30} />
            <p>Trang Chủ</p>
          </div>
          <div className="flex items-center gap-x-4 text-base  px-2">
            <AiOutlineSearch size={30} />
            <p>Tìm Kiếm</p>
          </div>
          <div className="flex items-center gap-x-4 text-base  px-2">
            <BsFillPlusSquareFill size={28} />
            <p>Tạo</p>
          </div>
          <div className=" flex items-center gap-x-4 text-base  px-2">
            <div className="relative">
              <div className="w-4 h-4 flex justify-center items-center bg-thRed rounded-full absolute -top-1 right-0 text-[10px] text-white">
                1
              </div>
              <RiMessengerLine size={30} />
            </div>
            <p>Tin Nhắn</p>
          </div>
          <div className="relative flex items-center gap-x-4 text-base  px-2">
            <div className="relative">
              <div className="w-4 h-4 flex justify-center items-center bg-thRed rounded-full absolute -top-1 right-0 text-[10px] text-white">
                1
              </div>
              <BiBell size={30} />
            </div>
            <p>Thông báo</p>
          </div>
          <div className="px-2 flex items-center gap-x-4 text-base">
            <img
              src={Images.av2.default.src}
              alt=""
              className="w-7 h-7 rounded-full object-cover"
            />
            <p>Trang Cá Nhân</p>
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
        <div
          className="px-4 pb-7 flex items-center gap-x-4 text-base"
          onClick={handleMenu}
        >
          <AiOutlineMenu size={30} />
          <p>Xem Thêm</p>
        </div>
      </div>
    </div>
  );
};

export default Menudesktop;
