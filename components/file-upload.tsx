"use client";

import { X } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";
import React from "react";
import "@uploadthing/react/styles.css";
import Image from "next/image";

interface FileUploadProps {
  onChange: (value: { url: string; type: string }) => void;
  value: { url: string; type: string };
  endpoint: "messageFile" | "serverImage";
}

const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
  const isImage = value.type?.startsWith("image");
  if (value.url && isImage) {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value.url} alt="Uploaded" className="rounded-full" />
        <button
          onClick={() => onChange({ url: "", type: "" })}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadButton
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res && res[0]) {
          console.log(res);
          onChange({ url: res[0].url, type: res[0].type });
        }
      }}
      onUploadError={(error: Error) => {
        console.error("Error uploading:", error.message);
      }}
    />
  );
};

export default FileUpload;
