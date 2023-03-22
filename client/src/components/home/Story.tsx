import React from "react";
import Images from "../../assets/images";
const Story = () => {
  return (
    <div className="w-[3.8rem] h-[3.8rem] rounded-full relative border-[3px] border-thGreen grid place-items-center">
      <img
        src={Images.av3.default.src}
        alt=""
        className="object-cover rounded-full w-14 h-14 border-2 border-white"
      />
    </div>
  );
};

export default Story;
