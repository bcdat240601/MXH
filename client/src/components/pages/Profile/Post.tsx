import React, { useState, useRef, useEffect } from "react";
import useSound from "use-sound";
import Images from "../../../assets/images";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
//import swiper css
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Comment from "../Home/Comment";
import { useCookies } from "react-cookie";
const Post = ({ currentUser, likes, socket, img, id_post, user }: any) => {
  const data = likes?.data;
  const foundItem = data && data.find((item: any) => item.id === id_post);
  const [isReact, setIsReact] = useState<any>({
    status:
      foundItem &&
      foundItem?.attributes.beliked.data.find((like: any) => {
        return like.attributes.username === currentUser.username;
      })
        ? true
        : false,
    idPost: 0,
    arrLikes: [likes?.data.map((like: any) => like.id)],
    totalLikes: 0,
  });
  const [listComments, setListComments] = useState<any>({
    arrComments: [],
    totalComments: foundItem?.attributes.beliked.data.length,
  });
  useEffect(() => {
    setIsReact(({ prevState }: any) => ({
      ...prevState,
      status:
        foundItem &&
        foundItem?.attributes.beliked.data.find((like: any) => {
          return like.attributes.username === currentUser.username;
        })
          ? true
          : false,
      totalLikes: foundItem?.attributes.beliked.data.length,
    }));
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}posts/${id_post}?populate[comments][populate][0]=user_comment`
        );
        console.log(response?.data.data.attributes.comments.data.length);
        setListComments({
          arrComments: response?.data.data.attributes.comments.data,
          totalComments: response?.data.data.attributes.comments.data.length,
        });
      } catch (error) {
        // Xử lý lỗi ở đây
        console.log(error);
      }
    }
    fetchData();
  }, [id_post]);

  console.log(listComments.arrComments);

  const [like] = useSound("../assets/sounds/savingSound.mp3");
  const [unlike] = useSound("../assets/sounds/unsavingSound.mp3");
  const [comment, setComment] = useState<boolean>(false);
  const [cookie] = useCookies(["user"]);
  const [idPost, setIdPost] = useState(id_post);
  const inputRef = useRef<HTMLInputElement>(null);
  //   console.log(isReact.status);

  const handleReact = async (idPost: any) => {
    let likeData = {};
    let newData = foundItem?.attributes.beliked.data.map(
      (like: any) => like.id
    );
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
  if (idPost >= 0) {
    socket.on("get-comments", async () => {
      const token = cookie.user;
      console.log(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}posts/${idPost}?populate[comments][populate][0]=user_comment`
      );
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}posts/${idPost}?populate[comments][populate][0]=user_comment`,
        {
          headers: {
            Authorization: `Bearer ${token.replaceAll('"', "")}`,
          },
        }
      );
      console.log(response?.data?.data?.attributes?.comments?.data);
      setListComments({
        totalComments: response?.data?.data?.attributes?.comments?.data.length,
        arrComments: response?.data?.data?.attributes?.comments?.data,
      });
    });
  }

  const handleSubmit = async (e: any) => {
    const token = cookie.user;
    console.log(inputRef.current?.value);
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
    setIdPost(id_post);
    setListComments({
      arrComments: [
        ...listComments.arrComments,
        { attributes: { ...commentData.data, username: currentUser.username } },
      ],
      totalComments: listComments.totalComments + 1,
    });
    if (inputRef.current) inputRef.current.value = "";
  };

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
            spaceBetween={1}
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
              <img
                src={`${process.env.NEXT_PUBLIC_HOSTNAME}${user?.avatar?.url}`}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
                width={1000}
                height={1000}
              />
              <p className="font-medium text-sm">{user?.username}</p>
            </div>
            <div className="comment-place mt-3 border-t-[1px]  flex-1 overflow-y-auto">
              {listComments.arrComments.length === 0 ? (
                <p
                  className="h-full grid place-items-center
               font-bold"
                >
                  No Comment yet
                </p>
              ) : (
                listComments.arrComments
                  .filter(
                    (comment: any) => !comment.attributes.id_comment_response
                  )

                  .map((comment: any) => {
                    return (
                      <div key={comment.id}>
                        <Comment
                          username={
                            comment.attributes.user_comment.data?.attributes
                              ?.username
                          }
                          id_post={id_post}
                          currentUser={currentUser}
                          setListComments={setListComments}
                          listComments={listComments}
                          id_user_comment={
                            comment.attributes.user_comment.data?.id ||
                            comment.attributes.user_comment[0]
                          }
                          socket={socket}
                          {...comment.attributes}
                        />
                        {listComments.arrComments
                          .filter(
                            (comment2: any) =>
                              comment2.attributes.id_comment_response &&
                              comment2.attributes.id_comment_response ===
                                comment.attributes.id_comment
                          )
                          .map((comment: any) => (
                            <>
                              <Comment
                                username={
                                  comment.attributes.user_comment.data
                                    ?.attributes?.username
                                }
                                id_user_comment={
                                  comment.attributes.user_comment.data?.id ||
                                  comment.attributes.user_comment[0]
                                }
                                id_post={id_post}
                                currentUser={currentUser}
                                socket={socket}
                                {...comment.attributes}
                              />
                            </>
                          ))}
                      </div>
                    );
                  })
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
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-row pr-4"
              >
                <input
                  type="text"
                  className="comment-form outline-none w-full text-sm"
                  placeholder="Enter your comment "
                  ref={inputRef}
                />
                <button
                  className="text-thBlue text-sm cursor-pointer"
                  type="submit"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
