import React, { useEffect, useRef, useState } from "react";
//Library
import useSound from "use-sound";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import axios from "axios";
import { useCookies } from "react-cookie";

//Components
import Optionmbl from "./Optionmbl";
import Image from "next/image";
import Comment from "./Comment";
import Images from "../../../assets/images";

const Feed = ({
  caption,
  createdAt,
  id_post,
  currentUser,
  updatedAt,
  comments,
  user_post,
  image,
  likes,
  socket,
}: any) => {
  const [cookie] = useCookies(["user"]);
  const { username } = user_post?.data.attributes;
  const inputRef = useRef<HTMLInputElement>(null);
  //declare
  const [like] = useSound("./assets/sounds/savingSound.mp3");
  const [unlike] = useSound("./assets/sounds/unsavingSound.mp3");
  const [isShow, setIsShow] = useState(false);
  const [comment, setComment] = useState<boolean>(false);
  const [isReact, setIsReact] = useState<any>({
    status: likes.data.find((like: any) => {
      return like.attributes.username === currentUser.username;
    })
      ? true
      : false,
    idPost: 0,
    // arrLikes: [likes.data.map((like: any) => like.id)],
    totalLikes: likes.data.length,
  });
  console.log(isReact.status);
  const [listComments, setListComments] = useState<any>({
    arrComments: comments.data,
    totalComments: comments.data.length,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const handleReact = async (idPost: any) => {
    let likeData = {};
    let newData = likes.data.map((like: any) => like.id);
    if (isReact.status === true) {
      unlike();
      console.log(newData.filter((data: number) => data !== currentUser.id));
      likeData = {
        data: {
          beliked: newData.filter((data: number) => data !== currentUser.id),
        },
      };
      setIsReact({
        idPost,
        status: false,
        totalLikes: isReact.totalLikes - 1,
      });
    } else {
      like();
      likeData = {
        data: {
          beliked: [...newData, currentUser.id],
        },
      };
      setIsReact({
        idPost,
        status: true,
        totalLikes: isReact.totalLikes + 1,
      });
      console.log(likeData);
    }
    await socket.emit("post", id_post, likeData);
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

  socket.on("get-comments", async () => {
    const token = cookie.user;
    console.log("socket run");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}comments?populate=user_comment&sort[0]=id%3Adesc`,
      {
        headers: {
          Authorization: `Bearer ${token.replaceAll('"', "")}`,
        },
      }
    );
    console.log(response.data.data);
    setListComments({
      totalComments: listComments.totalComments + 1,
      arrComments: response.data.data,
    });
  });

  const handleSubmit = async (e: any) => {
    const token = cookie.user;
    console.log(id_post);
    e.preventDefault();
    const comment = inputRef.current?.value || "";
    const commentData = {
      data: {
        id_comment: Math.floor(Math.random() * 12000),
        content: comment,
        post: [id_post],
        user_comment: [currentUser.id],
      },
    };
    await socket.emit("comment", commentData);
    console.log(listComments.totalComments);
    setListComments({
      arrComments: [
        ...listComments.arrComments,
        { attributes: { ...commentData.data, username: currentUser.username } },
      ],
      totalComments: listComments.totalComments + 1,
    });
    // socket.off("comment");

    //lỗi sau này sẽ tìm cách sửa (nhưng mà chạy được)
    // inputRef.current.value = "";
  };

  const handleSeeMore = async () => {
    const token = cookie.user;
    console.log("See more");
    setCurrentPage((prevValue) => prevValue + 1);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}comments?populate=user_comment&sort[0]=id%3Adesc&pagination[page]=${currentPage}&pagination[pageSize]=10`,
      {
        headers: {
          Authorization: `Bearer ${token.replaceAll('"', "")}`,
        },
      }
    );
    console.log(listComments.totalComments);
    setListComments({
      totalComments: listComments.totalComments,
      arrComments: [...listComments.arrComments, ...response.data.data],
    });
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
            <a href={`/profile/${user_post?.data.id}`} className="font-bold">
              {username}
            </a>
            <br />
            <span className="text-thGray">45 min ago</span>
          </div>
        </div>
        <div onClick={handleShow}>
          <FiMoreHorizontal size={20} />
        </div>
      </aside>
      <aside>
        <Image
          src={`${process.env.NEXT_PUBLIC_HOSTNAME}${image.data[0].attributes.formats.thumbnail.url}`}
          alt="posts"
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
          {isReact.status ? (
            <div onClick={() => handleReact(id_post)}>
              <AiFillHeart size={30} />
            </div>
          ) : (
            <div className="text-thDark" onClick={() => handleReact(id_post)}>
              <AiOutlineHeart size={30} />
            </div>
          )}
          <span className="text-xs text-thGray">{isReact.totalLikes}</span>
        </div>
        <div className="flex gap-x-1 items-center text-thGray">
          <div
            onClick={() => {
              comment ? setComment(false) : setComment(true);
            }}
          >
            <AiOutlineComment size={25} />
          </div>
          <span className="text-xs ">{listComments.totalComments}</span>
        </div>
      </aside>
      <aside
        className={`comment area py-3 ${comment ? "block" : "hidden"} ${
          currentPage === 2 && "h-80 overflow-y-auto"
        }`}
      >
        <div>
          {listComments.arrComments.map((comment: any) => (
            <div key={comment.id}>
              <Comment
                username={
                  comment.attributes.user_comment?.data?.attributes?.username
                }
                id={comment.id}
                {...comment.attributes}
              />
            </div>
          ))}
          {listComments.arrComments.length > 10 && (
            <div className="px-4" onClick={handleSeeMore}>
              <button>Xem thêm</button>
            </div>
          )}

          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-row pr-4"
          >
            <input
              type="text"
              className="outline-none border-none px-3 bg-thWhite w-full mt-3"
              placeholder="Add comment"
              ref={inputRef}
            />
            <button className="text-thBlue" type="submit">
              Send
            </button>
          </form>
        </div>
      </aside>
    </section>
  );
};

export default Feed;
