import React, { useState, useEffect } from "react";
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
  id_user_comment,
  id_post,
  socket,
  currentUser,
  setListComments,
  listComments,
}: any) => {
  const text = content;
  const formattedText = text.replace(
    /@([^\s]+)/g,
    '<span class="text-thBlue">$&</span>'
  );

  const [isReply, setReply] = useState(false);
  const [input, setInput] = useState(`@${username} `);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}users/${id_user_comment}?populate=avatar`
      );
      console.log(response.data);
      setAvatar(response.data.avatar?.url || "");
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [id_user_comment]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const commentData = {
      data: {
        id_comment: Math.floor(Math.random() * 300000),
        content: input,
        post: [id_post],
        user_comment: [currentUser.id],
        id_comment_response: id_comment,
      },
    };
    await socket.emit("comment", commentData);
    setListComments({
      arrComments: [
        ...listComments.arrComments,

        {
          attributes: {
            ...commentData.data,
            username: currentUser.username,
          },
        },
      ],
      totalComments: listComments.totalComments + 1,
    });
    console.log("Check comment");
    setInput("");
  };
  return (
    <>
      <div
        className={`${
          !id_comment_response
            ? "comment text-[13px] md:text-sm flex px-3 gap-x-2 "
            : "reply text-[13px] md:text-sm flex px-2 ml-6 my-3 gap-x-2 border-l-2 border-pink-500"
        } py-1.5`}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_HOSTNAME}${avatar}`}
          alt=""
          className="w-6 h-6 rounded-full object-cover"
          width={100}
          height={100}
        />
        <div className="block">
          <p className="font-medium float-left">{username}</p>

          <span
            className="ml-1 "
            dangerouslySetInnerHTML={{ __html: formattedText }}
          ></span>
          {!id_comment_response && (
            <div className="block mt-1">
              <button
                onClick={() => setReply(!isReply)}
                className="text-thBlue"
              >
                Trả lời
              </button>
              {isReply && (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="p-2 outline-none"
                    placeholder="Nhập câu trả lời"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <button className="text-thBlue">Gửi</button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
