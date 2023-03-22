import React from "react";
import Images from "../../assets/images";
const Mainstory = () => {
  return (
    <div className="w-[3.8rem] h-[3.8rem] rounded-full relative border-[3px] border-thMagenta grid place-items-center">
      <img
        src={Images.av2.default.src}
        alt=""
        className="object-cover rounded-full w-14 h-14 border-2 border-white "
      />
      <div className="add_story w-5 h-5 bg-thBlue rounded-full absolute bottom-0 right-0 text-white font-bold flex justify-center items-center">
        {" "}
        +
      </div>
    </div>
  );
};

export default Mainstory;
