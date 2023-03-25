import React from "react";
import Images from "../../assets/images";
const Suggest = () => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex gap-x-3 items-center">
        <img
          src={Images.av3.default.src}
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="text-[13px] md:text-sm">
          <p className="font-bold">.CloneSki</p>
          <span className="text-thGray">Bill CloneSk</span>
        </div>
      </div>
      <p className="font-semibold text-thBlue text-xs">Theo dõi</p>
    </div>
  );
};

export default Suggest;
