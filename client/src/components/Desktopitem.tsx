import React from "react";
import { BiBell } from "react-icons/bi";
import { icons } from "react-icons/lib";
const Desktopitem = ({
  id,
  icon,
  title,
  number,
  checkInout,
  inout_transform,
  mode,
  setmode,
}: any) => {
  const handleMode = () => {
    setmode(id);
    if (id === 5 || id === 2) {
      inout_transform(id);
    }
  };
  return (
    <div
      className="relative flex items-center gap-x-4 text-base  px-2 cursor-pointer"
      onClick={handleMode}
    >
      <div className="relative cursor-pointer">
        {number && (
          <div className="w-4 h-4 flex justify-center items-center bg-thRed rounded-full absolute -top-1 right-0 text-[10px] text-white">
            {number}
          </div>
        )}
        <div
          className={`${mode === id && "bg-thGraytwo px-1 py-1 rounded-md"}`}
        >
          {icon}
        </div>
      </div>
      {checkInout && <p>{title}</p>}
    </div>
  );
};

export default Desktopitem;
