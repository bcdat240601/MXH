import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  example: string;
  exampleRequired: string;
};
const Form = () => {
  const [email, setemail] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
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
          id=""
          defaultValue="youremail@gmail.com"
          {...register("exampleRequired", { required: true })}
          className=" py-3 pl-3 pr-4 w-[17rem] border-[1px] rounded-lg text-xs"
          placeholder="Enter your email"
        />
        <input
          type="password"
          id=""
          className=" py-3 pl-3 pr-4 w-[17rem] border-[1px] rounded-lg text-xs"
          placeholder="password"
          {...register("exampleRequired", { required: true })}
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
  );
};

export default Form;
