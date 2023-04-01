import React from "react";
import Images from "../../../assets/images";
const Mainstory = () => {
  return (
    <div>
      <div className="w-[3.8rem] h-[3.8rem]  md:w-[4.8rem] md:h-[4.8rem] rounded-full relative border-[3px] border-thRed grid place-items-center">
        <img
          src={Images.av2.default.src}
          alt=""
          className="object-cover rounded-full w-14 md:w-16 h-14 md:h-16 border-2 border-white "
        />
        <div className="add_story w-5 h-5 md:h-6 md:w-6 bg-thBlue rounded-full absolute bottom-0 right-0 text-white font-bold flex justify-center items-center">
          {" "}
          +
        </div>
      </div>
      <div className="flex justify-center mt-1">
        <span className="text-xs text-ellipsis w-[70px] overflow-x-hidden">
          WazowSki_11
        </span>
      </div>
    </div>
  );
};

export default Mainstory;
