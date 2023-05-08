import React, { useState, useRef } from "react";
//lib
import Image from "next/image";

//components
import Images from "@/src/assets/images";
import axios from "axios";
const Comment = ({
  id_comment,
  content,
  id_comment_response,
  username,
  id_post,
  socket,
  currentUser,
}: any) => {
  const [isReply, setReply] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(id_comment);
    const comment = inputRef.current?.value || "";
    const commentData = {
      data: {
        id_comment: Math.floor(Math.random() * 300000),
        content: comment,
        post: [id_post],
        user_comment: [currentUser.id],
        id_comment_response: id_comment,
      },
    };
    await socket.emit("comment", commentData);
    console.log("Check comment");
  };
  return (
    <>
      <div
        className={`${
          !id_comment_response
            ? "comment text-[13px] md:text-sm flex px-3 gap-x-2 "
            : "reply text-[13px] md:text-sm flex px-2 ml-6 my-3 gap-x-2 border-l-2"
        } py-1.5`}
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
          <div className="block mt-1">
            <button onClick={() => setReply(!isReply)}>Trả lời</button>
            {isReply && (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="p-2"
                  placeholder="Nhập câu trả lời"
                  ref={inputRef}
                />
                <button>Gửi</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
