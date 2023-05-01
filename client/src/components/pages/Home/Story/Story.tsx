import React from "react";
import Images from "../../../../assets/images";
const Story = () => {
  return (
    <div>
      <div className="w-[3.8rem] h-[3.8rem] md:w-[4.8rem] md:h-[4.8rem] rounded-full relative border-[3px] border-thGreen grid place-items-center">
        <img
          src={Images.av3.default.src}
          alt=""
          className="object-cover rounded-full w-14 md:w-16 h-14 md:h-16 border-2 border-white"
        />
      </div>
      <div className="flex justify-center mt-1">
        <span className="text-xs text-ellipsis w-[70px] overflow-x-hidden">
          .CloneSki008899
        </span>
      </div>
    </div>
  );
};

export default Story;
