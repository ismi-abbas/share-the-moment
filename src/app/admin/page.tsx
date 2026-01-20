import Image from "next/image";
import Link from "next/link";
import { deletePhoto, getPhotos } from "../actions";
import DeleteButton from "./delete-button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function Admin() {
  const admin = cookies().get("admin")?.value;

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const password = formData.get("password");

    if (password === process.env.ADMIN_PASSWORD) {
      cookies().set("admin", "true");
      redirect("/admin");
    }
  };

  if (!admin) {
    return (
      <div className='flex flex-col max-w-screen-md items-center justify-center py-2 gap-6 text-center mt-10'>
        <h1 className='font-brittany text-5xl text-onyx'>Admin Review</h1>
        <Link href='/' className='bg-onyx text-seasalt px-2 py-1 rounded-md font-rubik text-sm mt-5'>
          Home
        </Link>
        <form className='flex flex-col gap-2' action={handleSubmit}>
          <input
            type='password'
            placeholder='Password'
            name='password'
            className='bg-seasalt border border-onyx rounded-md p-2 placeholder:text-onyx active:border-onyx focus:border-onyx'
          />
        </form>
      </div>
    );
  }

  const photos = await getPhotos();

  return (
    <div className='flex flex-col max-w-screen-md items-center justify-center py-2 gap-6 text-center mt-10'>
      <h1 className='font-brittany text-5xl text-onyx'>Admin Review</h1>
      <Link href='/' className='bg-onyx text-seasalt px-2 py-1 rounded-md font-rubik text-sm mt-5'>
        Home
      </Link>

      <form className='px-4 flex flex-col gap-2' action={deletePhoto}>
        {photos &&
          photos?.map((photo) => {
            return (
              <div key={photo.key} className='relative'>
                <Image
                  src={`https://r2.ismiabbas.xyz/${photo.key}`}
                  alt={photo.key!}
                  width={1080}
                  height={1080}
                  className='rounded-lg sm:rounded-xl object-contain'
                />
                <DeleteButton photo={photo} />
              </div>
            );
          })}
      </form>
    </div>
  );
}
