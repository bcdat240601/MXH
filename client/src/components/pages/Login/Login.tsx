import React, { useState } from "react";
import Image from "next/image";
import Images from "../../../assets/images";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
const Login = () => {
  const [email, setemail] = useState("");
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-white h-[600px] w-[500px] grid place-items-center relative">
        <div className="absolute top-0  w-full py-3 px-6 flex justify-between items-center ">
          <div>
            <img
              src={Images.logo2.default.src}
              alt=""
              className="w-[40px] h-[40px] object-cover"
            />
            <span className="text-sm">Photogram</span>
          </div>
          <div className="flex items-center gap-2">
            <BsFillArrowUpRightCircleFill size={15} />
            <span className="text-xs">Sign up</span>
          </div>
        </div>

        <form
          action="
        "
          className="flex flex-col gap-y-6 items-center"
        >
          <h1 className="text-2xl font-bold text-thCyan">Welcome Back</h1>
          <input
            type="text"
            name=""
            id=""
            className=" py-3 pl-3 pr-4 w-[17rem] border-[1px] rounded-lg text-xs"
            placeholder="Enter your email"
            value={email}
          />
          <input
            type="password"
            name=""
            id=""
            className=" py-3 pl-3 pr-4 w-[17rem] border-[1px] rounded-lg text-xs"
            placeholder="password"
          />
          <div className="flex justify-start items-center gap-x-2 text-xs w-full">
            <input type="checkbox" className="form-checkbox text-thRed" />
            <span>Remember me</span>
          </div>
          <input
            type="submit"
            className="bg-thCyan hover:bg-cyan-300 w-full py-3 text-white font-medium rounded-full"
            value={"Login"}
          />
        </form>
      </div>
      <div className="relative">
        <div className="flex justify-end w-full absolute top-0 py-7 px-6 items-center">
          <Image
            src={Images.av4.default.src}
            alt=""
            className="w-10 h-10 rounded-full object-cover -mr-2"
            width={1000}
            height={1000}
          />
          <Image
            src={Images.av2.default.src}
            alt=""
            className="w-10 h-10 rounded-full object-cover -mr-2"
            width={1000}
            height={1000}
          />
          <Image
            src={Images.av3.default.src}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
            width={1000}
            height={1000}
          />
        </div>
        <video
          src="./assets/video/hologram.mp4"
          className="w-[500px] h-[600px] object-cover"
          autoPlay
          muted
          loop
        ></video>
      </div>
    </div>
  );
};

export default Login;
