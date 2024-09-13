"use client";

import AwsS3, { type AwsS3UploadParameters, type AwsBody } from "@uppy/aws-s3";
import Uppy, { type Meta, type UppyFile } from "@uppy/core";
import { DashboardModal } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/webcam/dist/style.min.css";
import Link from "next/link";
import { useMemo, useState } from "react";

export async function getUploadParameters(file: UppyFile<Meta, AwsBody>): Promise<AwsS3UploadParameters> {
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
  const uppy = useMemo(() => {
    const uppy = new Uppy({
      autoProceed: true,
      restrictions: {
        maxNumberOfFiles: 3,
      },
    }).use(AwsS3, {
      id: "AwsS3",
      // @ts-expect-error - i have no idea
      getUploadParameters: (file: UppyFile<Meta, AwsBody>) => getUploadParameters(file),
    });

    return uppy;
  }, []);
  uppy.on("complete", (result) => {
    console.log("complete", result);
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className='flex gap-2'>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className='bg-onyx text-seasalt px-2 py-1 rounded-md font-rubik text-sm'
        >
          Upload
        </button>
        <Link href='/photos' className='bg-onyx text-seasalt px-2 py-1 rounded-md font-rubik text-sm'>
          View Photos
        </Link>
      </div>
      <DashboardModal onRequestClose={() => setIsOpen(false)} open={isOpen} uppy={uppy} />
    </div>
  );
}
