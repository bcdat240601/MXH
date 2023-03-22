import React, { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";
import Images from "../../assets/images";
const Feed = () => {
  const [comment, setcomment] = useState(false);
  return (
    <div className="mx-3 bg-thWhite rounded-xl rectangle py-4 duration-500">
      <div className="flex justify-between items-center px-4 py-4">
        <div className="flex gap-x-3 items-center">
          <img
            src={Images.av4.default.src}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-[13px]">
            <p className="font-bold">tricSopSki</p>
            <span className="text-thGray">45 min ago</span>
          </div>
        </div>
        <FiMoreHorizontal size={20} />
      </div>
      <div>
        <img
          src={Images.photo1.default.src}
          alt=""
          className="object-cover w-full h-[17.5rem]"
        />
        <p className="text-[13px] text-thGray font-light px-3 py-3">
          Select all the text layers you want to generate ‘Lorem ipsum’ for then
          click ‘Generate’
        </p>
      </div>
      <div className="px-3 flex items-center gap-x-3">
        <div className="flex gap-x-1 items-center text-thMagenta">
          <AiFillHeart size={30} />
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
          <div className="comment text-[13px] flex px-3 gap-x-2">
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
          <div className="reply text-[13px] flex px-2 ml-6 my-3 gap-x-2 border-l-2">
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
