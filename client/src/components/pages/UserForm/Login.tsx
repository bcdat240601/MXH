import React, { useState } from "react";
import Image from "next/image";
import Images from "../../../assets/images";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
// import { useForm } from "react-hook-form";
import Form from "./Form";
import Formsignup from "./Formsignup";
import { log } from "console";
const Login = () => {
  const [transit, settransit] = useState<boolean>(false);
  const [css, setcss] = useState({
    lopacity: " absolute opacity-1 top-1/2 -translate-y-1/2 ",
    sopacity: "opacity-0 translate-y-40 h-0",
  });
  const trans = (): void => {
    if (transit) {
      settransit(false);
      setcss({
        lopacity: " absolute opacity-1 top-1/2 -translate-y-1/2 ",
        sopacity: "opacity-0 translate-y-40 h-0",
      });
    } else {
      settransit(true);
      setcss({
        lopacity: "opacity-0 translate-y-40 h-0",
        sopacity: "absolute opacity-1 top-1/2 -translate-y-1/2 ",
      });
    }
  };
  console.log(transit);
  console.log(css.lopacity);

  return (
    <div
      className={`flex items-center justify-center h-screen ${
        transit && "flex-row-reverse"
      }`}
    >
      <div
        className={`bg-white h-[600px] w-[500px] grid place-items-center relative formSS`}
      >
        <div className="absolute top-0  w-full py-3 px-6 flex justify-between items-center ">
          <div>
            <Image
              src={Images.logo2.default.src}
              alt=""
              className="w-[40px] h-[40px] object-cover"
              width={1000}
              height={1000}
            />
            <span className="text-sm">Photogram</span>
          </div>
          <div className="flex items-center gap-2" onClick={trans}>
            <BsFillArrowUpRightCircleFill size={15} />
            <span className="text-xs">{transit ? "Login in" : "Sign up"}</span>
          </div>
        </div>
        <article
          className={`login_form ${css.lopacity} will-change-transform transition ease-in-out delay-100 duration-700`}
        >
          <Form />
        </article>
        <article
          className={`login_form ${css.sopacity} will-change-transform transition ease-in-out delay-100 duration-700`}
        >
          <Formsignup />
        </article>
      </div>
      <div className="relative videoSSn">
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
