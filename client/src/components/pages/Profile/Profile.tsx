import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { MdSettings } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import { RiMessage2Fill } from "react-icons/ri";
import Images from "../../../assets/images";
import Menumbl from "../../Menumbl";
import Postlist from "./Postlist";
import { useRouter } from "next/router";
import Link from "next/link";
import Menutablet from "../../Menutablet";
import Menudesktop from "../../Menudesktop";
import axios from "axios";
import { useCookies } from "react-cookie";
const Profile = ({
  user,
  currentUser,
  followers,
  followings,
  socket,
  likes,
}: any) => {
  // console.log("follower", followers);
  // console.log("followings", followings);
  const [cookie] = useCookies(["user"]);

  const [isOwn, setisOwn] = useState(0);

  const [followerState, setFollowerState] = useState(followers);

  const [isfollow, setIsFollow] = useState({
    status: followers.find((follower: any) => {
      return follower.user_following.id === currentUser.id;
    })
      ? true
      : false,
    followers: followers.length,
    followings: followings.length,
  });

  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  const handleFollow = async () => {
    const token = cookie.user;
    let followData = {};

    if (isfollow.status === true) {
      console.log(followerState);

      const idfollow = followerState.find((follower: any) => {
        if (follower.user_following.id === currentUser.id) {
          return follower.id;
        }
      });
      console.log(idfollow);
      const deletefollow = await axios.delete(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}follows/${idfollow.id}`,
        {
          headers: {
            Authorization: `Bearer ${token.replaceAll('"', "")}`,
          },
        }
      );
      //setisFollow
      setIsFollow({
        status: false,
        followers: isfollow.followers - 1,
        followings: isfollow.followings,
      });
    } else {
      followData = {
        data: {
          user_follower: user.id,
          user_following: currentUser.id,
        },
      };

      // await socket.emit("follow", followData);

      await axios.post(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}follows`,
        followData,
        {
          headers: {
            Authorization: `Bearer ${token.replaceAll('"', "")}`,
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );

      const follower = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}users/${user.id}?populate[followers][populate][0]=user_following&populate[followings][populate][0]=user_follower`,
        {
          headers: {
            Authorization: `Bearer ${token.replaceAll('"', "")}`,
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      console.log(follower.data.followers);

      setFollowerState(follower.data.followers);

      // setisFollow
      setIsFollow({
        status: true,
        followers: isfollow.followers + 1,
        followings: isfollow.followings,
      });
    }
  };

  return (
    <div className="md:flex lg:grid layout relative">
      <div className="hidden md:block">
        <Menudesktop currentUser={currentUser} />

        <Menutablet />
      </div>
      <main className="mbl-profile md:hidden w-full     ">
        <section className="mbl-header">
          <div className="py-3 mt-5 px-5 flex justify-between md:w-full">
            <div onClick={handleGoBack}>
              <BiArrowBack size={25} />
            </div>
            <p className="font-bold">Profile</p>
            <MdSettings size={25} />
          </div>
        </section>
        <section>
          <article>
            <div className="px-2 py-2 mx-auto w-fit mt-14  border-ava rounded-full ">
              <img
                src={Images.av2.default.src}
                alt=""
                className="w-[100px] h-[100px] object-cover rounded-full "
              />
            </div>
            <div className="flex flex-col items-center mt-5">
              <p className="font-semibold text-lg ">{user.fullname}</p>
              <span className="text-gray-400">{user.username}</span>
            </div>
            <div className="flex items-center justify-around px-10 mt-5">
              <div className="flex flex-col items-center">
                <p className="font-bold">{isfollow.followings}</p>
                <span className="text-gray-400">following</span>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold">{isfollow.followers}</p>
                <span className="text-gray-400">follower</span>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold">{user.posts.length}</p>
                <span className="text-gray-400">Post</span>
              </div>
            </div>
          </article>
          {isOwn === 1 ? (
            <article>
              <div className="mt-5 flex items-center justify-center gap-x-2">
                <button className="py-1 px-2 bg-thBlue text-white rounded-md font-medium cursor-pointer">
                  Chỉnh sửa trang cá nhân
                </button>
                <button className="text-gray-400 ">
                  <HiPencil size={25} />
                </button>
              </div>
            </article>
          ) : (
            <article>
              <div className="mt-5 flex items-center justify-center gap-x-2">
                {isfollow.status ? (
                  <button className="py-1 px-2 w-[192px] bg-thGreen text-white rounded-md font-medium cursor-pointer">
                    unfollow
                  </button>
                ) : (
                  <button className="py-1 px-2 w-[192px] bg-thGreen text-white rounded-md font-medium cursor-pointer">
                    follow
                  </button>
                )}
                <button className="bg-gray-300 h-[32px] px-2 rounded-md grid place-items-center">
                  <RiMessage2Fill size={20} />
                </button>
              </div>
            </article>
          )}
        </section>
        <section>
          <Postlist postList={user.post} />
        </section>
        <Menumbl />
      </main>
      <main className="hidden md:block mx-10 mt-14 flex-1">
        <section className="flex items-center gap-x-10">
          <div className="px-0.5 py-0.5 mx-auto w-fit border-2 border-black rounded-full ">
            <img
              src={Images.av2.default.src}
              alt=""
              className="w-[150px] h-[150px] object-cover rounded-full "
            />
          </div>
          <article className="flex-1 h-fit">
            <div className="flex gap-x-20">
              <p className="font-semibold text-lg ">{user.fullname}</p>
              <div>
                <MdSettings size={25} />
              </div>
            </div>
            <div className="flex items-center gap-x-10 my-3">
              <div className="flex flex-col items-center">
                <p className="font-bold">{isfollow.followings}</p>
                <span className="text-gray-400">following</span>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold">{isfollow.followers}</p>
                <span className="text-gray-400">follower</span>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold">{user.posts.length}</p>
                <span className="text-gray-400">Post</span>
              </div>
            </div>
            <span className="text-gray-400 mt-5">{user.username}</span>
            {isOwn === 1 ? (
              <article>
                <div className="mt-5 flex items-center  gap-x-2">
                  <button className="py-1 px-2 bg-thBlue text-white rounded-md font-medium cursor-pointer">
                    Chỉnh sửa trang cá nhân
                  </button>
                  <button className="text-gray-400 ">
                    <HiPencil size={25} />
                  </button>
                </div>
              </article>
            ) : (
              <article>
                <div className="mt-5 flex items-center  gap-x-2">
                  {isfollow.status ? (
                    <button
                      className="py-1 px-2 w-[192px] bg-thGreen text-white rounded-md font-medium cursor-pointer"
                      onClick={handleFollow}
                    >
                      unfollow
                    </button>
                  ) : (
                    <button
                      className="py-1 px-2 w-[192px] bg-thGreen text-white rounded-md font-medium cursor-pointer"
                      onClick={handleFollow}
                    >
                      follow
                    </button>
                  )}
                  <button className="bg-gray-300 h-[32px] px-2 rounded-md grid place-items-center">
                    <RiMessage2Fill size={20} />
                  </button>
                </div>
              </article>
            )}
          </article>
        </section>
        <section className=" mt-5">
          <Postlist
            postList={user.posts}
            likes={likes}
            currentUser={currentUser}
            socket={socket}
          />
        </section>
      </main>
    </div>
  );
};

export default Profile;
