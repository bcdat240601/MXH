import React, { useState } from "react";
import useSound from "use-sound";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import Images from "../../assets/images";
import Optionmbl from "./Optionmbl";
const Feed: React.FC = () => {
  const [like] = useSound("./assets/sounds/savingSound.mp3");
  const [unLike] = useSound("./assets/sounds/unsavingSound.mp3");
  const [isShow, setisShow] = useState(false);
  const [comment, setcomment] = useState<boolean>(false);
  const [isReact, setisReact] = useState<boolean>(false);
  const handleReact = () => {
    if (isReact === true) {
      unLike();
      setisReact(false);
    } else {
      like();
      setisReact(true);
    }
  };
  const handleShow = () => {
    if (isShow === true) {
      document.body.style.overflow = "auto";
      setisShow(false);
    } else {
      document.body.style.overflow = "hidden";
      setisShow(true);
    }
  };
  return (
    <div className="mx-3 bg-thWhite rounded-xl rectangle py-4 duration-500 md:w-[35rem]">
      {isShow ? (
        <div>
          <div
            className="overlay absolute w-full h-full bg-black opacity-60 top-0 left-0 z-10"
            onClick={handleShow}
          ></div>
          <Optionmbl handleShow={handleShow} />
        </div>
      ) : (
        ""
      )}
      <div className="flex justify-between items-center px-4 py-4">
        <div className="flex gap-x-3 items-center">
          <img
            src={Images.av4.default.src}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-[13px] md:text-sm">
            <p className="font-bold">tricSopSki</p>
            <span className="text-thGray">45 min ago</span>
          </div>
        </div>
        <div onClick={handleShow}>
          <FiMoreHorizontal size={20} />
        </div>
      </div>
      <div>
        <img
          src={Images.photo1.default.src}
          alt=""
          className="object-cover w-full h-[17.5rem] md:h-[36.5rem]"
        />
        <p className="text-[13px] text-thGray font-light px-3 py-3 md:text-sm">
          <span className="font-bold mr-1">tricSopSki</span> Select all the text
          layers you want to generate ‘Lorem ipsum’ for then click ‘Generate’
        </p>
      </div>
      <div className="px-3 flex items-center gap-x-3">
        <div className="flex gap-x-1 items-center text-thMagenta">
          {isReact ? (
            <div onClick={handleReact}>
              <AiFillHeart size={30} />
            </div>
          ) : (
            <div className="text-thDark" onClick={handleReact}>
              <AiOutlineHeart size={30} />
            </div>
          )}
          <span className="text-xs text-thGray">4K</span>
        </div>
        <div className="flex gap-x-1 items-center text-thGray">
          <div
            onClick={() => {
              comment ? setcomment(false) : setcomment(true);
            }}
          >
            <AiOutlineComment size={25} />
          </div>
          <span className="text-xs ">13</span>
        </div>
      </div>
      <div className={`comment area py-3 ${comment ? "block" : "hidden"}`}>
        <div>
          <div className="comment text-[13px] md:text-sm flex px-3 gap-x-2">
            <img
              src={Images.av1.default.src}
              alt=""
              className="w-6 h-6 rounded-full object-cover"
            />
            <div className="block">
              <p className="font-medium float-left">ElanSki</p>

              <span className="ml-1 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod,
                in neque?
              </span>
            </div>
          </div>
          <div className="reply text-[13px] md:text-sm flex px-2 ml-6 my-3 gap-x-2 border-l-2">
            <img
              src={Images.av3.default.src}
              alt=""
              className="!w-6 !h-6 rounded-full object-cover"
            />
            <div className="w-[17.5rem]">
              <p className="font-medium float-left">VandevSki</p>

              <span className="ml-1 ">
                Tenetur voluptas, aliquid voluptatem eum possimus sapiente!
              </span>
            </div>
          </div>
          <input
            type="text"
            className="outline-none border-none px-3 bg-thWhite w-full mt-3"
            placeholder="add comment"
          />
        </div>
      </div>
    </div>
  );
};

export default Feed;
