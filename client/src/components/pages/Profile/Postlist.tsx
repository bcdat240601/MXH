import React from "react";
import Images from "../../../assets/images";
import Link from "next/link";
const Postlist = ({ postList }: any) => {
  return (
    <div className="mt-10 grid grid-cols-3 gap-0 w-fit border-t-[1px] border-t-gray-400 py-5">
      {postList &&
        postList.map((post: any, index: number) => {
          return (
            <div key={index}>
              <Link href={{ pathname: "/user-post/[id]", query: { id: 1 } }}>
                <img
                  src={post.files[0].url}
                  alt=""
                  className="w-[130px] h-[130px] md:w-[14.584rem]  md:h-[14.584rem] object-cover"
                />
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default Postlist;
