import React, { useState } from "react";
import Images from "../../../assets/images";
import Link from "next/link";
const Postlist = ({ postList }: any) => {
  const [isPopup, setisPopup] = useState();
  console.log(postList);

  return (
    <div className="mt-10 grid grid-cols-3 gap-0 w-fit border-t-[1px] border-t-gray-400 py-5 ">
      {postList.map(({ img, index }: any) => (
        <div key={index}>
          <Link href={{ pathname: "/user-post/[id]", query: { id: 1 } }}>
            <img
              src={img}
              alt=""
              className="w-[130px] h-[130px] md:w-[14.584rem]  md:h-[14.584rem] object-cover block md:hidden lg:hidden"
            />
          </Link>
          <div>
            <img
              src={img}
              alt=""
              className="w-[130px] h-[130px] md:w-[14.584rem]  md:h-[14.584rem] object-cover hidden md:block lg:block"
            />
          </div>
        </div>
      ))}

      <div className="absolute z-50 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 h-[70%] ">
        <div className="relative  flex post w-full h-full rounded-md overflow-hidden">
          <div className="h-fit w-fit">
            <img
              src={Images.photo1.default.src}
              alt=""
              className="z-50 object-cover"
            />
          </div>
          <div className="info bg-white h-full w-[25rem]"></div>
        </div>
      </div>
      <div className="overlay absolute z-10 bg-black w-screen h-screen top-0 left-0 opacity-80"></div>
    </div>
  );
};

export default Postlist;
