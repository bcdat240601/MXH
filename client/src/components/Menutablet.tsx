import React, { useState } from "react";
import {
  AiOutlineHome,
  AiTwotoneHome,
  AiOutlineSearch,
  AiOutlineMenu,
} from "react-icons/ai";
import {
  BsFillPlusSquareFill,
  BsMessenger,
  BsPlusSquare,
} from "react-icons/bs";
import { RiMessengerLine, RiSettings4Fill } from "react-icons/ri";
import { BiBell } from "react-icons/bi";

import Images from "../assets/images";
import Post from "./Feature/Post";
import Notification from "./Feature/Notification";
import Search from "./Feature/Search";
const Menutablet = () => {
  const [isMenu, setisMenu] = useState(false);
  const [checkInout, setcheckInout] = useState(true);
  const [css, setcss] = useState({
    scale: "scale-x-0 top-0 ",
    scale2: "scale-x-0 top-0",
  });
  const [isPost, setisPost] = useState<any>({
    css: "opacity-0 invisible",
    overlay: "opacity-0 invisible",
  });
  const [mode, setmode] = useState(0);
  const handleMenu = () => {
    isMenu ? setisMenu(false) : setisMenu(true);
  };
  const handlePost = () => {
    console.log("hshs");

    if (isPost.css === "opacity-0 invisible") {
      setisPost({ css: "opacity-1 visible", overlay: "opacity-60 visible" });
    } else {
      setisPost({ css: "opacity-0 invisible", overlay: "opacity-0 invisible" });
      setmode(0);
    }
  };
  const inout_transform = (id: any) => {
    console.log(mode);
    if (id !== 0) {
      setcheckInout(false);
      if (id === 5) {
        setcss({
          scale: "scale-x-100 top-0 ",
          scale2: "scale-x-0 top-0",
        });
      }
      if (id === 2) {
        setcss({
          scale: "scale-x-0 top-0 ",
          scale2: "scale-x-100 top-0",
        });
      }
    }
    if (id === mode) {
      setcheckInout(true);
      setmode(0);
      setcss({
        scale: "scale-x-0 top-0 ",
        scale2: "scale-x-0 top-0",
      });
    }
  };
  return (
    <div className="flex">
      <div className="hidden md:block lg:hidden relative">
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
            <div
              onClick={() => {
                setmode(2);
                inout_transform(2);
              }}
            >
              <AiOutlineSearch size={27} />
            </div>
            <div
              onClick={() => {
                handlePost();
                setmode(3);
              }}
            >
              {mode === 3 ? (
                <BsFillPlusSquareFill size={26} />
              ) : (
                <BsPlusSquare size={26} />
              )}
            </div>
            <div className="relative">
              <div className="w-3 h-3 bg-thRed rounded-full absolute top-0 right-0"></div>
              <RiMessengerLine size={27} />
            </div>
            <div
              className="relative"
              onClick={() => {
                setmode(5);
                inout_transform(5);
              }}
            >
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
      <section>
        <Notification css={css.scale} />
      </section>
      <section>
        <Search css={css.scale2} />
      </section>
      <section>
        <div
          className={`overlay w-screen h-full bg-black ${isPost.overlay} absolute top-0 left-0 ease-in duration-300 z-20`}
          onClick={handlePost}
        ></div>
        <Post css={isPost.css} />
      </section>
    </div>
  );
};

export default Menutablet;
