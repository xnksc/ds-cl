"use client";

import { X } from "lucide-react";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import React from "react";
import "@uploadthing/react/styles.css";
import Image from "next/image";

interface FileUploadProps {
  onChange: (value: { url?: string; type?: string }) => void;
  value: { url?: string; type?: string };
  endpoint: "messageFile" | "serverImage";
}

const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
  const isImage = value.type?.startsWith("image");
  console.log("val: ", value);
  if (value.url && isImage) {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={value.url}
          alt="Uploaded"
          className="rounded-full"
        ></Image>
      </div>
    );
  }

  return (
    <UploadButton
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange({ url: res?.[0].url, type: res?.[0].type });
        console.log("res : ", res);
      }}
      onUploadError={(error: Error) => {
        console.log("error uploading : ", error.message);
      }}
    ></UploadButton>
  );
};

export default FileUpload;
