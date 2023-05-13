import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import axios from "axios";
const { Dragger } = Upload;
interface ImageUploaderProps {
  uploadProps: UploadProps;
}
const allowed = ["image/jpeg", "image/png", "image/gif"];
const ImageUploader: React.FC<ImageUploaderProps> = ({ uploadProps }) => {
  return (
    <Dragger accept={allowed.join(",")} {...uploadProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
};
export default ImageUploader;
