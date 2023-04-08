import React from "react";
//lib
import Image from "next/image";

//components
import Images from "@/src/assets/images";
import axios from "axios";
const Comment = ({
  id,
  content,
  id_comment_response,
  username,
  createdAt,
  updatedAt,
}: any) => {
  return (
    <div
      className={`${
        !id_comment_response
          ? "comment text-[13px] md:text-sm flex px-3 gap-x-2"
          : "reply text-[13px] md:text-sm flex px-2 ml-6 my-3 gap-x-2 border-l-2"
      }`}
    >
      <Image
        src={Images.av1.default.src}
        alt=""
        className="w-6 h-6 rounded-full object-cover"
        width={100}
        height={100}
      />
      <div className="block">
        <p className="font-medium float-left">{username}</p>

        <span className="ml-1 ">{content}</span>
      </div>
    </div>
  );
};

export default Comment;
