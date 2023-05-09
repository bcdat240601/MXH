import React, { useState, useRef } from "react";
import useSound from "use-sound";
import Images from "../../../assets/images";
import Link from "next/link";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
//import swiper css
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Post = ({
  currentUser,
  comments,
  postList,
  likes,
  socket,
  id_post,
  img,
}: any) => {
  const [like] = useSound("../assets/sounds/savingSound.mp3");
  const [unlike] = useSound("../assets/sounds/unsavingSound.mp3");
  const [comment, setComment] = useState<boolean>(false);
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
  //   console.log(isReact.status);
  const [listComments, setListComments] = useState<any>({
    arrComments: comments?.data,
    totalComments: comments?.data.length,
  });
  const handleReact = async (idPost: any) => {
    let likeData = {};
    let newData = likes.data.map((like: any) => like.id);
    if (isReact.status === true) {
      //   unlike();
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
      //   like();
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
  console.log(img && img[0].id);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div className="absolute z-50 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 h-[70%] ">
      <div className="relative  flex post w-full h-full rounded-md overflow-hidden">
        <div className="flex-grow">
          <Swiper
            className="mySwiper"
            modules={[Pagination, Navigation]}
            breakpoints={{
              768: {
                // width: 768,
                slidesPerView: 1,
              },
            }}
            spaceBetween={5}
            navigation={true}
            pagination={{
              clickable: true,
              enabled: false,
              dynamicBullets: true,
            }}
          >
            {img &&
              img.map((image: any, index: number) => (
                <SwiperSlide key={index}>
                  <div className="h-full w-fit bg-black flex items-center">
                    <img
                      src={`${process.env.NEXT_PUBLIC_HOSTNAME}${image.attributes.url}`}
                      alt=""
                      className="h-full z-50 object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="info bg-white h-full w-[45%] flex-shrink-0">
          <div className="px-3 py-5 flex flex-col h-full">
            <div className="flex items-center gap-x-3">
              <Image
                src={Images.av4.default.src}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
                width={1000}
                height={1000}
              />
              <p className="font-medium text-sm">ChuongBoi</p>
            </div>
            <div className="comment-place mt-3 border-t-[1px]  flex-1 overflow-y-auto">
              {!comments ? (
                <p
                  className="h-full grid place-items-center
               font-bold"
                >
                  No Comment yet
                </p>
              ) : (
                ""
              )}
            </div>
            <aside className="px-3 py-1 flex items-center gap-x-3">
              <div className="flex gap-x-1 items-center text-thMagenta">
                {isReact.status ? (
                  <div onClick={() => handleReact(1)}>
                    <AiFillHeart size={30} />
                  </div>
                ) : (
                  <div className="text-thDark" onClick={() => handleReact(1)}>
                    <AiOutlineHeart size={30} />
                  </div>
                )}
                <span className="text-xs text-thGray">
                  {isReact.totalLikes}
                </span>
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
            <div className="pt-2">
              <input
                type="text"
                className="comment-form outline-none w-full"
                placeholder="Enter your comment "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
