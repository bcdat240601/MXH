import React, { useState } from "react";
import {
  AiOutlineHome,
  AiTwotoneHome,
  AiOutlineSearch,
  AiOutlineMenu,
} from "react-icons/ai";
import { BsFillPlusSquareFill, BsPlusSquare } from "react-icons/bs";
import {
  RiMessengerLine,
  RiSettings4Fill,
  RiMessengerFill,
} from "react-icons/ri";
import { BiBell } from "react-icons/bi";
import Notification from "./Feature/Notification";
import Images from "../assets/images";
import Desktopitem from "./Desktopitem";
import Desktopfeature from "./Desktopfeature";
import Search from "./Feature/Search";
import Post from "./Feature/Post";
import Link from "next/link";
const items = [
  { id: 2, icon: <AiOutlineSearch size={26} />, title: "Tìm Kiếm" },
  { id: 5, icon: <BiBell size={26} />, title: "Thông Báo", number: 1 },
];
const Menudesktop = ({ currentUser }: any) => {
  const [isMenu, setisMenu] = useState(false);
  const [checkInout, setcheckInout] = useState(true);
  const [mode, setmode] = useState(0);
  const items2 = [
    // { id: 1, icon: <AiTwotoneHome size={26} />, title: "Trang Chủ" },
    {
      id: 3,
      iconActive: <BsFillPlusSquareFill size={24} />,
      icon: <BsPlusSquare size={24} />,
      title: "Tạo",
    },
    // {
    //   id: 4,
    //   iconActive: <RiMessengerFill size={26} />,
    //   icon: <RiMessengerLine size={26} />,
    //   title: "Tin Nhắn",
    // },
  ];
  const [css, setcss] = useState({
    w: "w-[15.25rem]",
    sopacity: "opacity-1",
    nopacity: "opacity-0 !w-0",
    scale: "scale-x-0",
    scale2: "scale-x-0 ",
  });
  const [isPost, setisPost] = useState<any>({
    css: "opacity-0 invisible",
    overlay: "opacity-0 invisible",
  });
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
    console.log(typeof id);
    if (id !== 0) {
      setcheckInout(false);
      setcss({
        ...css,
        w: "w-20",
        sopacity: "opacity-0",
        nopacity: "opacity-1",
      });
      if (id === 5) {
        setcss({
          w: "w-20",
          sopacity: "opacity-0",
          nopacity: "opacity-1",
          scale: "scale-x-100 ",
          scale2: "scale-x-0 ",
        });
      }
      if (id === 2) {
        setcss({
          w: "w-20",
          sopacity: "opacity-0",
          nopacity: "opacity-1",
          scale: "scale-x-0 ",
          scale2: "scale-x-100 ",
        });
      }
    }
    if (id === mode) {
      setcheckInout(true);
      setmode(0);
      setcss({
        w: "w-[15.25rem]",
        sopacity: "opacity-1",
        nopacity: "opacity-0 !w-0",
        scale: "scale-x-0",
        scale2: "scale-x-0 ",
      });
    }
  };
  return (
    <div className="hidden lg:flex">
      <div
        className={`h-screen  bg-thWhite border-r-[1px] flex flex-col justify-between will-change-transform transition-all duration-500 
        ${css.w}`}
      >
        <div className="flex flex-col pt-2 px-3 gap-y-9 ">
          <div className="mb-7 mt-5">
            <Link href="/home" legacyBehavior>
              <a>
                <img
                  src={Images.logo3.default.src}
                  alt=""
                  className={`w-44 ${css.sopacity} will-change-transform transition duration-500`}
                />
                <img
                  src={Images.logo2.default.src}
                  alt=""
                  className={`${css.nopacity} w-44  will-change-transform transition duration-500`}
                />
              </a>
            </Link>
          </div>
          {items.map(({ id, icon, title }) => (
            <div key={id}>
              <Desktopitem
                id={id}
                checkInout={checkInout}
                inout_transform={inout_transform}
                mode={mode}
                setmode={setmode}
                icon={icon}
                title={title}
              />
            </div>
          ))}
          {items2.map(({ id, icon, title, iconActive }) => (
            <div key={id} onClick={handlePost}>
              <Desktopfeature
                id={3}
                checkInout={checkInout}
                mode={mode}
                setmode={setmode}
                icon={icon}
                iconActive={iconActive}
                title={title}
              />
            </div>
          ))}
          <div className="px-2 flex items-center gap-x-4 text-base">
            <img
              src={Images.av2.default.src}
              alt=""
              className="w-7 h-7 rounded-full object-cover"
            />
            {checkInout && (
              <a href={`/profile/${currentUser && currentUser?.id}`}>
                Trang Cá Nhân
              </a>
            )}
          </div>
        </div>

        <div
          className="px-4 pb-7 flex items-center gap-x-4 text-base"
          onClick={handleMenu}
        >
          <AiOutlineMenu size={30} />
          {checkInout && <p>Xem Thêm</p>}
        </div>
      </div>
      {isMenu && (
        <div className="absolute z-[999] bg-thWhite w-[18.9rem] bottom-32 left-5 rounded-lg border-[1px] font-normal text-base">
          <div className="flex justify-between items-center px-4 py-4 border-b-[1px]">
            Setting
            <RiSettings4Fill size={25} />
          </div>
          <div className="flex justify-between items-center px-4 py-4">
            Log-out
          </div>
        </div>
      )}
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
        <Post css={isPost.css} currentUser={currentUser} />
      </section>
    </div>
  );
};

export default Menudesktop;
