import Image from "next/image";
import Uploader from "./uploader";

export default function Home() {
  return (
    <div className='flex flex-col max-w-screen-md items-center min-h-dvh justify-center py-2 gap-6 px-10 text-center'>
      <h1 className='font-brittany text-5xl text-onyx'>Share the moment</h1>
      <Image
        src='/letter-h-a.png'
        width={500}
        height={500}
        alt='daun-bawah'
        className='-bottom-24 -right-10 w-[300px] animate-fadeIn my-10'
      />
      <h2 className='font-garamond text-xl text-seasalt-100'>
        Capture beautiful moments and share them instantly with the bride!
      </h2>
      <div className='flex flex-col items-center justify-center max-w-[300px]'>
        <Uploader />
      </div>
    </div>
  );
}
