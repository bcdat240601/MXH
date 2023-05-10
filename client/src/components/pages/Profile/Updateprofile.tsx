import React, { useState } from "react";
import { useRouter } from "next/router";
import ImageUploader from "../../Feature/ImageUploader";
import axios from "axios";
import type { UploadProps } from "antd";
import { FileOutlined } from "@ant-design/icons";
import { FaTrash } from "react-icons/fa";
import { message, Upload } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import Images from "../../../assets/images";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().required(),
    fullname: yup.string().required(),
    password: yup
      .string()
      .required()
      .matches(/^\S*$/, "White Spaces are not allowed")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!+@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  })
  .required();
type FormData = yup.InferType<typeof schema>;
const Updateprofile = ({ currentUser, css, avatar }: any) => {
  const router = useRouter();
  const [files, setfiles] = useState<any>([]);
  const [formData, setFormData] = useState(new FormData());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const handleFile = (file: any): void => {
    formData.append("files", file.file);
    setFormData(formData);
    console.log("on");
    setfiles([...files, { file: file }]);
  };
  const props: UploadProps = {
    name: "file",
    multiple: true,
    customRequest: handleFile,
    showUploadList: false,
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const handleDelete = (index: number) => {
    console.log("deleted");
    console.log(index);
    const newItems = [...files]; // Tạo bản sao của mảng items
    newItems.splice(index, 1); // Xóa phần tử tại vị trí index khỏi bản sao
    setfiles(newItems);
    const newFormData = new FormData();

    // Duyệt qua các phần tử của formData
    for (const [key, value] of formData.entries()) {
      if (key === "files" && value === formData.getAll("files")[index]) {
        console.log(value);
        continue;
      }
      newFormData.append(key, value);
    }
    console.log(formData);
    setFormData(newFormData);
  };
  const onSubmit: SubmitHandler<any> = async (data: FormData) => {
    const response = await axios
      .post("http://localhost:1337/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const imageId = response.data;
        console.log(imageId);
        const user: any = {
          username: data.username,
          email: data.email,
          password: data.password,
          fullname: data.fullname,
          avatar: imageId,
        };
        try {
          axios
            .put(
              `${process.env.NEXT_PUBLIC_CLIENT_URL}users/${currentUser.id}`,
              user
            )
            .then((response) => {
              alert("success");
              router.reload();
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      className={`bg-white ${css} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute z-50 px-4 pb-10 rounded-lg  ease-in duration-300 max-w-[350px]`}
    >
      <div className="flex gap-x-3 md:flex-wrap pt-5">
        <div>
          <div className="flex gap-x-3 items-center mb-3">
            <img
              src={`${process.env.NEXT_PUBLIC_HOSTNAME}${avatar}`}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-[13px] md:text-sm">
              <p className="font-bold">Chuong</p>
            </div>
          </div>
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-3"
          >
            <label htmlFor="fullname" className="text-sm font-medium py-2">
              Full Name
              <input
                id="fullname"
                type="text"
                defaultValue={currentUser.fullname}
                {...register("fullname", { required: "This is required" })}
                className="bg-thGraytwo py-1.5 px-2 text-sm w-[20rem] font-normal mt-1 outline-none"
                placeholder="Enter your username"
                autoComplete="off"
              />
            </label>
            <label htmlFor="username" className="text-sm font-medium py-2">
              Username
              <input
                id="username"
                type="text"
                defaultValue={currentUser.username}
                {...register("username", { required: "This is required" })}
                className="bg-thGraytwo py-1.5 px-2 text-sm w-[20rem] font-normal mt-1 outline-none"
                placeholder="Enter your username"
                autoComplete="off"
              />
            </label>

            <label htmlFor="email" className="text-sm font-medium py-2">
              Email <span className="text-thMagenta">*</span>
              <input
                id="email"
                type="email"
                defaultValue={currentUser.email}
                {...register("email", { required: "This is required" })}
                className="bg-thGraytwo py-1.5 px-2 text-sm w-[20rem] font-normal mt-1 outline-none"
                placeholder="Enter your email"
              />
            </label>
            <label htmlFor="password" className="text-sm font-medium py-2">
              Password <span className="text-thMagenta">*</span>
              <input
                id="password"
                type="password"
                className="bg-thGraytwo py-1.5 px-2 text-sm w-[20rem] font-normal mt-1 outline-none"
                placeholder="Enter your password"
                {...register("password", {
                  required: "This is required",
                })}
              />
              {errors.password && (
                <small className="text-red-600 w-[17rem] py-1">
                  *{errors.password.message?.toString()}
                </small>
              )}
            </label>
            <div>
              <span className="text-thBlue font-medium text-sm py-3">
                Thay Đổi ảnh đại diện
              </span>
              <ImageUploader uploadProps={props} />
              {files.map(({ file }: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-x-1 text-gray-400 text-sm py-1"
                >
                  <FileOutlined />
                  <span>{file.file.name}</span>
                  <div
                    onClick={() => handleDelete(index)}
                    className="cursor-pointer"
                  >
                    <FaTrash />
                  </div>
                </div>
              ))}
            </div>
            <input
              type="submit"
              className="cursor-pointer text-thBlue w-fit"
              value={"Đăng"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Updateprofile;
