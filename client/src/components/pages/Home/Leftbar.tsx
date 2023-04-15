import React from "react";
//library
import { useRouter } from "next/router";
//components
import Images from "../../../assets/images";
import Suggest from "./Suggest";
import Image from "next/image";
import { useCookies } from "react-cookie";
const Leftbar = ({ currentUser }: any) => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
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
            <p className="font-bold">{currentUser.username}</p>
            <span className="text-thGray">{currentUser.fullname}</span>
          </div>
        </div>
        <p
          onClick={() => {
            removeCookie("user", { path: "/" });
            router.push("/");
          }}
          className="font-semibold text-thBlue text-xs cursor-pointer"
        >
          Đăng Xuất
        </p>
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
