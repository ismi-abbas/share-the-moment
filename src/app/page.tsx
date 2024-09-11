"use client";

import QRCodeStyling from "qr-code-styler";
import { useEffect, useRef } from "react";

export default function Home() {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: 400,
      height: 400,
      type: "svg",
      data: "https://share-the-moment.walimah.site",
      image:
        "https://www.walimah.site/_next/image?url=%2Fletter-h-a.png&w=1080&q=75",
      dotsOptions: {
        color: "#343e3d",
        type: "dots",
      },
      backgroundOptions: {
        color: "#f8f7f4",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 0,
      },
      cornersDotOptions: {
        type: "extra-rounded",
        color: "#343e3d",
      },
      cornersSquareOptions: {
        type: "extra-rounded",
        color: "#343e3d",
      },
    });

    if (qrRef.current) {
      qrCode.append(qrRef.current);
    }

    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1>Share the moment</h1>
      <div ref={qrRef} className="p-5 rounded-xl shadow-lg" />
    </div>
  );
}
