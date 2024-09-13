"use client";

import type React from "react";
import { deletePhoto } from "../actions";

export default function DeleteButton({
  photo,
}: {
  photo: {
    key: string | undefined;
    size: number | undefined;
    lastModified: Date | undefined;
  };
}) {
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const confirmation = confirm("Are you sure you want to delete this photo?");
    if (!confirmation) {
      event.preventDefault();
      return;
    }

    const formData = new FormData(event.currentTarget.form as HTMLFormElement);
    deletePhoto(formData);
  };
  return (
    <button
      name='key'
      value={photo.key}
      type='submit'
      onClick={(event) => handleDelete(event)}
      className='bg-rose-500 text-seasalt px-2 py-1 rounded-md font-rubik absolute top-0 right-0'
    >
      Delete
    </button>
  );
}
