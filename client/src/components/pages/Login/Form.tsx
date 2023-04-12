import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().required(),
    pass: yup
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
  const [email, setemail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => console.log(data);
  return (
    <div>
      {" "}
      <form
        action="
        "
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 items-center"
      >
        <h1 className="text-2xl font-bold text-thCyan">Welcome Back</h1>
        <input
          type="email"
          id="emailfield"
          defaultValue=""
          {...register("email", { required: true })}
          className=" py-3 pl-3 pr-4 w-[17rem] border-[1px] rounded-lg text-xs"
          placeholder="Enter your email"
        />
        <p>{errors.pass?.message}</p>
        <input
          type="password"
          id=""
          className=" py-3 pl-3 pr-4 w-[17rem] border-[1px] rounded-lg text-xs"
          placeholder="password"
          {...register("pass", { required: true })}
        />
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
          value={"Login"}
        />
      </form>
    </div>
  );
};

export default Form;
