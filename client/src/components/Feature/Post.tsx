import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import axios from "axios";
import type { UploadProps } from "antd";
import { FileOutlined } from "@ant-design/icons";
import { FaTrash } from "react-icons/fa";
import { message, Upload } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import Images from "../../assets/images";
type Inputs = {
  caption: string;
};
const Post = ({ css, currentUser }: any) => {
  const [files, setfiles] = useState<any>([]);
  const [formData, setFormData] = useState(new FormData());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
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
  const handlePost: SubmitHandler<any> = async (data: Inputs) => {
    const response = await axios
      .post("http://localhost:1337/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const imageId = response.data;
        console.log(imageId);
        const newPost = {
          data: {
            caption: data.caption,
            user_post: [currentUser.id],
            files: imageId,
          },
        };
        axios
          .post("http://localhost:1337/api/posts", newPost)
          .then((response) => {
            alert("Đăng bài thành công");
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleFile = (file: any): void => {
    formData.append("files", file.file);
    setFormData(formData);
    console.log("on");

    setfiles([...files, { file: file }]);
  };
  if (formData.getAll("files").length > 0) {
    console.log("FormData is not empty");
  } else {
    console.log("FormData is empty");
  }

  const props: UploadProps = {
    name: "file",
    multiple: true,
    customRequest: handleFile,
    showUploadList: false,
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <div
      className={`bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute z-50 px-5 pb-10 rounded-lg ${css} ease-in duration-300`}
    >
      <h1 className="font-bold text-lg pt-3 pb-2 px-6 border-b-[1px] mb-5">
        Tạo Bài Viết Mới
      </h1>
      <div className="flex gap-x-3 md:flex-wrap">
        <div>
          <div className="flex gap-x-3 items-center mb-3">
            <img
              src={`${process.env.NEXT_PUBLIC_HOSTNAME}${
                currentUser?.avatar?.url || "/"
              }`}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-[13px] md:text-sm">
              <p className="font-bold">{currentUser?.username}</p>
            </div>
          </div>
          <form
            action="
        "
            onSubmit={handleSubmit(handlePost)}
            className="flex flex-col gap-y-3"
          >
            <input
              type="text"
              defaultValue=""
              {...register("caption")}
              placeholder="Caption"
              className="bg-thGraytwo py-1.5 px-2 text-sm w-[20rem]"
            />
            <input
              type="submit"
              className="cursor-pointer text-thBlue w-fit"
              value={"Đăng"}
            />
          </form>
        </div>
        <div>
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
      </div>
    </div>
  );
};

export default Post;
