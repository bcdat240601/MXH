import React, { useState } from "react";
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
const Profile = () => {
  const [isOwn, setisOwn] = useState(0);
  const posts = [
    { img: Images.photo1.default.src },
    { img: Images.photo2.default.src },
    { img: Images.photo1.default.src },
  ];
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="md:flex lg:grid layout relative">
      <div className="hidden md:block">
        <Menudesktop />
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
              <p className="font-semibold text-lg ">ChuongBoiDev</p>
              <span className="text-gray-400">nguywn Ngoc Buong</span>
            </div>
            <div className="flex items-center justify-around px-10 mt-5">
              <div className="flex flex-col items-center">
                <p className="font-bold">10K</p>
                <span className="text-gray-400">following</span>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold">6K</p>
                <span className="text-gray-400">follower</span>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold">55</p>
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
                <button className="py-1 px-2 w-[192px] bg-thGreen text-white rounded-md font-medium cursor-pointer">
                  follow
                </button>
                <button className="bg-gray-300 h-[32px] px-2 rounded-md grid place-items-center">
                  <RiMessage2Fill size={20} />
                </button>
              </div>
            </article>
          )}
        </section>
        <section>
          <Postlist postList={posts} />
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
              <p className="font-semibold text-lg ">ChuongBoiDev</p>
              <div>
                <MdSettings size={25} />
              </div>
            </div>
            <div className="flex items-center gap-x-10 my-3">
              <div className="flex flex-col items-center">
                <p className="font-bold">10K</p>
                <span className="text-gray-400">following</span>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold">6K</p>
                <span className="text-gray-400">follower</span>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold">55</p>
                <span className="text-gray-400">Post</span>
              </div>
            </div>
            <span className="text-gray-400 mt-5">nguywn Ngoc Buong</span>
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
                  <button className="py-1 px-2 w-[192px] bg-thGreen text-white rounded-md font-medium cursor-pointer">
                    follow
                  </button>
                  <button className="bg-gray-300 h-[32px] px-2 rounded-md grid place-items-center">
                    <RiMessage2Fill size={20} />
                  </button>
                </div>
              </article>
            )}
          </article>
        </section>
        <section className=" mt-5">
          <Postlist postList={posts} />
        </section>
      </main>
    </div>
  );
};

export default Profile;
