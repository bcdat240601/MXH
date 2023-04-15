import React from "react";
import { BiBell } from "react-icons/bi";
import { icons } from "react-icons/lib";
const Desktopitem = ({
  icon,
  title,
  number,
  checkInout,
  inout_transform,
}: any) => {
  return (
    <div
      className="relative flex items-center gap-x-4 text-base  px-2 cursor-pointer"
      onClick={inout_transform}
    >
      <div className="relative cursor-pointer">
        {number && (
          <div className="w-4 h-4 flex justify-center items-center bg-thRed rounded-full absolute -top-1 right-0 text-[10px] text-white">
            {number}
          </div>
        )}
        {icon}
      </div>
      {checkInout && <p>{title}</p>}
    </div>
  );
};

export default Desktopitem;
