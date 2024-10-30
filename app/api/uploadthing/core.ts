import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  console.log("USER ID : ", userId);
  return { userId: userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(handleAuth)
    .onUploadComplete(({ metadata, file }) => {
      console.log("complete : ", metadata.userId);
      console.log("file : ", file.url);
    }),
  messageFile: f(["image", "pdf", "video", "audio"])
    .middleware(handleAuth)
    .onUploadComplete(({ metadata, file }) => {
      console.log("complete : ", metadata.userId);
      console.log("file : ", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
