"use client";

import AwsS3, { AwsS3UploadParameters, type AwsBody } from "@uppy/aws-s3";
import Uppy, { Meta, UppyFile } from "@uppy/core";
import { Dashboard } from "@uppy/react";
import { useEffect, useState } from "react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/webcam/dist/style.min.css";

export async function getUploadParameters(
  file: UppyFile<Meta, AwsBody>
): Promise<AwsS3UploadParameters> {
  const response = await fetch("/api/upload", {
    method: "POST",
    headers: {
      accept: "application/json",
    },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
    }),
  });
  if (!response.ok) throw new Error("Unsuccessful request");

  // Parse the JSON response.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: { url: string; method: "PUT" } = await response.json();

  // Return an object in the correct shape.
  const object: AwsS3UploadParameters = {
    method: data.method,
    url: data.url,
    fields: {}, // For presigned PUT uploads, this should be left empty.
    // Provide content type header required by S3
    headers: {
      "Content-Type": file.type ? file.type : "application/octet-stream",
    },
  };
  return object;
}

export default function Uploader() {
  const [uppy] = useState(() => new Uppy<Meta, AwsBody>());

  useEffect(() => {
    import("@uppy/webcam").then((Webcam) => {
      uppy.use(Webcam.default);
      uppy.use(AwsS3, {
        id: "AwsS3",
        // @ts-expect-error - i have no idea
        getUploadParameters: (file: UppyFile<Meta, AwsBody>) =>
          getUploadParameters(file),
      });
      uppy.on("complete", (result) => {
        console.log("complete", result);
      });
    });
  }, [uppy]);

  return <Dashboard uppy={uppy} className="shadow-md max-w-screen-sm" />;
}
