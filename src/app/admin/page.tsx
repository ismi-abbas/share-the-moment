import Image from "next/image";
import Link from "next/link";
import { deletePhoto, getPhotos } from "../actions";
import DeleteButton from "./delete-button";

export const revalidate = 0;

export default async function Admin() {
  const photos = await getPhotos();

  return (
    <div className="flex flex-col max-w-screen-md items-center justify-center py-2 gap-6 text-center mt-10">
      <h1 className="font-brittany text-5xl text-onyx">Admin Review</h1>
      <Link
        href="/"
        className="bg-onyx text-seasalt px-2 py-1 rounded-md font-rubik text-sm mt-5"
      >
        Home
      </Link>

      <form className="px-4 flex flex-col gap-2" action={deletePhoto}>
        {photos &&
          photos?.map((photo) => {
            return (
              <div key={photo.key} className="relative">
                <Image
                  src={`https://r2.ismiabbas.xyz/${photo.key}`}
                  alt={photo.key!}
                  width={1080}
                  height={1080}
                  className="rounded-lg sm:rounded-xl object-contain"
                />
                <DeleteButton photo={photo} />
              </div>
            );
          })}
      </form>
    </div>
  );
}
