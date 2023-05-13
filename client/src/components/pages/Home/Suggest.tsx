import React from "react";
import Images from "../../../assets/images";

const Suggest = ({ username, fullname, avatar, id }: any) => {
  console.log(Images);
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex gap-x-3 items-center">
        {avatar?.url ? (
          <img
            src={`${process.env.NEXT_PUBLIC_HOSTNAME}${avatar?.url}`}
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <img
            src={Images.default.default.src}
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
        )}

        <div className="text-[13px] md:text-sm">
          <a href={`/profile/${id}`} className="font-bold">
            {username}
          </a>
          <br />
          <span className="text-thGray">{fullname}</span>
        </div>
      </div>
    </div>
  );
};

export default Suggest;
