import { ListObjectsV2Command } from "@aws-sdk/client-s3";
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
