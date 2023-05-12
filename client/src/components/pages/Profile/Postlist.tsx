import React, { useState } from "react";
import useSound from "use-sound";
import Images from "../../../assets/images";
import Link from "next/link";
import Image from "next/image";
import Post from "./Post";
import axios from "axios";
const Postlist = ({ currentUser, postList, likes, socket, user }: any) => {
  //declare
  const [isPopup, setisPopup] = useState();
  const [isShow, setIsShow] = useState(false);
  const [comment, setComment] = useState<boolean>(false);
  const [postImg, setpostImg] = useState<any>();
  const [isPost, setisPost] = useState<any>({
    css: "opacity-0 invisible",
    overlay: "opacity-0 invisible",
  });
  const [idPost, setidPost] = useState<number>(-1);
  const handlePost = async (id: number) => {
    if (isPost.css === "opacity-0 invisible") {
      setisPost({ css: "opacity-1 visible", overlay: "opacity-60 visible" });
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}posts/${id}?populate=files`
      );
      setpostImg(response.data.data.attributes.files.data);
      setidPost(id);
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
              <div>
                <img
                  src={`${process.env.NEXT_PUBLIC_HOSTNAME}${post.files[0].url}`}
                  alt=""
                  className="w-[130px] h-[130px] md:w-[14.584rem]  md:h-[14.584rem] object-cover block md:hidden lg:hidden"
                />
              </div>
              <div onClick={() => handlePost(post.id)}>
                <img
                  src={`${process.env.NEXT_PUBLIC_HOSTNAME}${post.files[0].url}`}
                  alt=""
                  className="w-[130px] h-[130px] md:w-[14.584rem]  md:h-[14.584rem] object-cover hidden md:block lg:block"
                />
              </div>
            </div>
          );
        })}

      <div className={`${isPost.css}`}>
        <Post
          img={postImg}
          likes={likes}
          currentUser={currentUser}
          socket={socket}
          id_post={idPost}
          user={user}
        />
      </div>
      <div
        className={`overlay ${isPost.overlay} absolute z-10 bg-black w-screen h-screen top-0 left-0 opacity-80`}
        onClick={() => handlePost(0)}
      ></div>
    </div>
  );
};

export default Postlist;
