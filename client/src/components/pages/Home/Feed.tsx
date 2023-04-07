import React, { useEffect, useRef, useState } from "react";
//Library
import useSound from "use-sound";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import Images from "../../../assets/images";
//Components
import Optionmbl from "./Optionmbl";
import Image from "next/image";
import Comment from "./Comment";
import axios from "axios";

const Feed = ({
  caption,
  createdAt,
  id_post,
  updatedAt,
  comments,
  user_post,
  socket,
}: any) => {
  const { username } = user_post.data.attributes;
  console.log(comments);
  const inputRef = useRef<HTMLInputElement>(null);
  //declare
  const [like] = useSound("./assets/sounds/savingSound.mp3");
  const [unlike] = useSound("./assets/sounds/unsavingSound.mp3");
  const [isShow, setIsShow] = useState(false);
  const [comment, setComment] = useState<boolean>(false);
  const [isReact, setIsReact] = useState<boolean>(false);
  const [listComments, setListComments] = useState<any>(comments.data);
  const handleReact = () => {
    if (isReact === true) {
      unlike();
      setIsReact(false);
    } else {
      like();
      setIsReact(true);
    }
  };
  const handleShow = () => {
    if (isShow === true) {
      document.body.style.overflow = "auto";
      setIsShow(false);
    } else {
      document.body.style.overflow = "hidden";
      setIsShow(true);
    }
  };

  // socket.on("get-comments", async () => {
  //   const response = await axios.get(
  //     "http://localhost:1337/api/comments?pagination[pageSize]=200"
  //   );
  //   console.log(response.data.data.length);
  //   setListComments(response.data.data);
  // });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const comment = inputRef.current?.value || "";
    const commentData = {
      data: {
        id_comment: Math.floor(Math.random() * 12000),
        content: comment,
        post: [3],
        user_comment: [3],
      },
    };
    await socket.emit("comment", commentData);
    setListComments([...listComments, { attributes: commentData.data }]);
    socket.off("comment");

    // console.log(listComments);
    // // //lỗi sau này sẽ tìm cách sửa (nhưng mà chạy được)
    // inputRef.current.value = "";
  };

  //UI
  return (
    <section className="mx-3 bg-thWhite rounded-xl rectangle py-4 duration-500 md:w-[35rem] cursor-pointer">
      {isShow && (
        <div className="cursor-default">
          <div
            className="overlay absolute w-full  h-full bg-black opacity-60 top-0 left-0 z-10"
            onClick={handleShow}
          ></div>
          <Optionmbl {...handleShow} />
        </div>
      )}
      <aside className="flex justify-between items-center px-4 py-4">
        <div className="flex gap-x-3 items-center">
          <Image
            src={Images.av4.default.src}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
            width={1000}
            height={1000}
          />
          <div className="text-[13px] md:text-sm">
            <p className="font-bold">{username}</p>
            <span className="text-thGray">45 min ago</span>
          </div>
        </div>
        <div onClick={handleShow}>
          <FiMoreHorizontal size={20} />
        </div>
      </aside>
      <aside>
        <Image
          src={Images.photo1.default.src}
          alt=""
          className="object-cover w-full h-[17.5rem] md:h-[36.5rem]"
          width={1000}
          height={1000}
        />
        <p className="text-[13px] text-thGray font-light px-3 py-3 md:text-sm">
          <span className="font-bold mr-1">{username}</span>
          {caption}
        </p>
      </aside>
      <aside className="px-3 flex items-center gap-x-3">
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
              comment ? setComment(false) : setComment(true);
            }}
          >
            <AiOutlineComment size={25} />
          </div>
          <span className="text-xs ">{listComments.length}</span>
        </div>
      </aside>
      <aside className={`comment area py-3 ${comment ? "block" : "hidden"}`}>
        <div>
          {listComments.map((comment: any) => (
            <div key={comment.id}>
              <Comment id={comment.id} {...comment.attributes} />
            </div>
          ))}
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              className="outline-none border-none px-3 bg-thWhite w-full mt-3"
              placeholder="Add comment"
              ref={inputRef}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </aside>
    </section>
  );
};

export default Feed;
