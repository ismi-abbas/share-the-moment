import Link from "next/link";
import Uploader from "./uploader";

export default function Home() {
  return (
    <div className="flex flex-col max-w-screen-md items-center justify-center min-h-screen py-2 gap-10">
      <h1 className="font-brittany text-5xl text-onyx">Share the moment!</h1>
      <h2 className="font-garamond text-xl text-seasalt-100">
        Capture beautiful moments and share them instantly with the bride!
      </h2>
      <div className="flex flex-col items-center justify-center">
        <Uploader />
      </div>

      <Link
        href="/photos"
        className="font-rubik text-xl border p-2 rounded-md bg-seasalt border-onyx-800 text-onyx"
      >
        View Photos
      </Link>
    </div>
  );
}
