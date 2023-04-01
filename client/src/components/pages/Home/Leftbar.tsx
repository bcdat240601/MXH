import React from "react";
import Images from "../../../assets/images";
import Suggest from "./Suggest";
import Image from "next/image";
const Leftbar = () => {
  return (
    <div className="left_bar w-[30rem] pl-5 pr-14 pt-12 hidden lg:block">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-3 items-center">
          <Image
            src={Images.av2.default.src}
            alt=""
            className="w-14 h-14 rounded-full object-cover"
            width={100}
            height={100}
          />
          <div className="text-[13px] md:text-sm">
            <p className="font-bold">.WazowSki_11</p>
            <span className="text-thGray">Mike WazowSki</span>
          </div>
        </div>
        <p className="font-semibold text-thBlue text-xs">Đăng Xuất</p>
      </div>
      <div>
        <div className="flex justify-between items-center py-5">
          <p className="font-semibold text-sm text-thGray">Gợi Ý Cho Bạn</p>
          <p className="text-xs font-semibold">Xem Tất Cả</p>
        </div>
        <div>
          <Suggest />
          <Suggest />
          <Suggest />
          <Suggest />
        </div>
        <div className="text-gray-400 text-sm mt-12">
          <span>
            Giới thiệuTrợ-giúpBáo-chí-API-Việc làm-Quyền riêng tư-Điều khoản-Vị
            trí-Ngôn ngữ Tiếng Việt Meta đã xác minh
          </span>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
