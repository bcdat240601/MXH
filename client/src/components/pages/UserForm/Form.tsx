import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useCookies } from "react-cookie";
const schema = yup
  .object({
    email: yup.string().required(),
    password: yup
      .string()
      .required()
      .matches(/^\S*$/, "White Spaces are not allowed")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!+@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    checkbox: yup.boolean(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const Form = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  // const onSubmit = (data: FormData) => console.log(data);

  const router = useRouter();
  //sleep function
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const [cookie, setCookie] = useCookies(["user"]);

  //Check cookies
  useEffect(() => {
    const token = cookie.user || "";
    console.log(token);
    if (token !== "") window.location.replace("/home");
  }, []);

  //onSubmit function
  const onSubmit: SubmitHandler<any> = async (data: FormData) => {
    setLoading(true);
    await sleep(1000);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}auth/local`,
      {
        identifier: data.email,
        password: data.password,
      }
    );
    if (response.data.error) {
      alert("Wrong account");
    } else {
      setCookie("user", JSON.stringify(response.data.jwt), {
        path: "/",
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      });
      window.location.replace("/home");
    }
    setLoading(false);
  };
  return (
    <>
      <form
        action="
        "
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 items-center"
      >
        <h1 className="text-2xl font-bold text-thCyan">Welcome Back</h1>
        <div className="flex flex-col">
          <input
            type="email"
            defaultValue=""
            {...register("email", { required: "This is required" })}
            className=" py-3 pl-3 pr-4 w-[17rem] border-[1px] rounded-lg text-xs"
            placeholder="Enter your email"
          />
          {errors.email && (
            <small className="text-red-600 w-[17rem] py-1">
              *{errors.email.message?.toString()}
            </small>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="password"
            className=" py-3 pl-3 pr-4 w-[17rem] border-[1px] rounded-lg text-xs"
            placeholder="password"
            {...register("password", { required: "This is required" })}
          />
          {errors.password && (
            <small className="text-red-600 w-[17rem] py-1">
              *{errors.password.message?.toString()}
            </small>
          )}
        </div>
        <div className="flex justify-start items-center gap-x-2 text-xs w-full">
          <input
            {...register("checkbox")}
            type="checkbox"
            className="form-checkbox text-thRed"
          />
          <span>Remember me</span>
        </div>
        <input
          type="submit"
          className="bg-thCyan hover:bg-cyan-300 w-full py-3 text-white font-medium rounded-full"
          value={loading ? "Loading..." : "Login"}
        />
      </form>
    </>
  );
};

export default Form;
