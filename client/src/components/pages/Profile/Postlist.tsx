import React, { useState } from "react";
import useSound from "use-sound";
import Images from "../../../assets/images";
import Link from "next/link";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import Post from "./Post";
import axios from "axios";
const Postlist = ({
  currentUser,
  comments,
  postList,
  likes,
  socket,
  id_post,
}: any) => {
  const [isPopup, setisPopup] = useState();

  const [isShow, setIsShow] = useState(false);
  const [comment, setComment] = useState<boolean>(false);
  const [postImg, setpostImg] = useState<any>();
  const [isReact, setIsReact] = useState<any>({
    status:
      likes &&
      likes.data.find((like: any) => {
        return like.attributes.username === currentUser.username;
      })
        ? true
        : false,
    idPost: 0,
    // arrLikes: [likes.data.map((like: any) => like.id)],
    totalLikes: likes?.data.length,
  });
  // console.log(isReact.status);
  const [listComments, setListComments] = useState<any>({
    arrComments: comments?.data,
    totalComments: comments?.data.length,
  });
  const [isPost, setisPost] = useState<any>({
    css: "opacity-0 invisible",
    overlay: "opacity-0 invisible",
  });
  const handlePost = async (index: number) => {
    if (isPost.css === "opacity-0 invisible") {
      setisPost({ css: "opacity-1 visible", overlay: "opacity-60 visible" });
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}posts/${index + 1}?populate=files`
      );
      console.log(response.data.data.attributes.files.data);
      setpostImg(response.data.data.attributes.files.data);
    } else {
      setisPost({ css: "opacity-0 invisible", overlay: "opacity-0 invisible" });
    }
  };
  return (
    <div className="mt-10 grid grid-cols-3 gap-0 w-fit border-t-[1px] border-t-gray-400 py-5 ">
      {postList &&
        postList.map((post: any, index: number) => {
          return (
            <div key={index}>
              <Link href={{ pathname: "/user-post/[id]", query: { id: 1 } }}>
                <img
                  src={post.files[0].url}
                  alt=""
                  className="w-[130px] h-[130px] md:w-[14.584rem]  md:h-[14.584rem] object-cover block md:hidden lg:hidden"
                />
              </Link>
              <div onClick={() => handlePost(index)}>
                <img
                  src={post.files[0].url}
                  alt=""
                  className="w-[130px] h-[130px] md:w-[14.584rem]  md:h-[14.584rem] object-cover hidden md:block lg:block"
                />
              </div>
            </div>
          );
        })}

      <div className={`${isPost.css}`}>
        <Post img={postImg} />
      </div>
      <div
        className={`overlay ${isPost.overlay} absolute z-10 bg-black w-screen h-screen top-0 left-0 opacity-80`}
        onClick={() => handlePost(0)}
      ></div>
    </div>
  );
};

export default Postlist;
