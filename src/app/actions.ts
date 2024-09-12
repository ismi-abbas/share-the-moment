"use server";

import { DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import { R2_Client } from "./api/s3-client";

export async function getPhotos() {
  const command = new ListObjectsV2Command({
    Bucket: process.env.R2_BUCKET_NAME,
    Prefix: "share-the-moment/",
  });

  try {
    const response = await R2_Client.send(command);
    const objects = response?.Contents?.map((item) => ({
      key: item.Key,
      size: item.Size,
      lastModified: item.LastModified,
    }));

    revalidatePath("/photos");

    return objects?.sort((a, b) => {
      if (a.lastModified && b.lastModified) {
        return b.lastModified.getTime() - a.lastModified.getTime();
      }
      return 0;
    });
  } catch (error) {
    throw new Error("Internal server error");
  }
}

export const deletePhoto = async (formData: FormData) => {
  const key = formData.get("key") as string;

  const command = new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
  });

  try {
    await R2_Client.send(command);
    revalidatePath("/admin");
  } catch (error) {
    throw new Error("Internal server error");
  }
};
