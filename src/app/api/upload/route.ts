import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { type NextRequest, NextResponse } from "next/server";
import { R2_Client } from "../s3-client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { filename, contentType } = body;

    if (!filename || !contentType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const signedUrl = await getSignedUrl(
      R2_Client,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: `share-the-moment/${filename}`,
        ContentType: contentType,
      }),
      { expiresIn: 3600 },
    );

    return NextResponse.json(
      {
        url: signedUrl,
        method: "PUT",
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
