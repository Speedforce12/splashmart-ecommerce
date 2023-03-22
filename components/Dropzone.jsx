import { storage } from "@/firebase/firebase";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

const Dropzone = ({ className, imageUpload }) => {
  const [files, setFiles] = useState([]);

  

  // get the images from the firebase storage to update preview after deleting
  const loadImages = async () => {
    const imagesRef = ref(storage, "products");
    const imageList = await listAll(imagesRef);
  
    const urls = await Promise.all(
      imageList.items.map(async (imageRef) => {
        return getDownloadURL(imageRef);
      })
    );

    setFiles(urls);
  };

  // delete images from firebase
  const deleteImages = (file) => {
    const deleteRef = ref(storage, file);

    // Delete the file
    deleteObject(deleteRef)
      .then(() => {
        // image deleted successfully
        loadImages();
      })
      .catch((error) => {
        // error handling
        console.log(error);
      });
  };

  const onDrop = useCallback(async (acceptedFiles) => {
      await Promise.all(
        acceptedFiles.map((file) => {
          const imageRef = ref(storage, `products/${file.name}`);
          uploadBytes(imageRef, file).then(async () => {
            getDownloadURL(imageRef).then((url) => {
              setFiles((prevFiles) => [...prevFiles, url]);
            });
          });
        })
      );
  
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    onDrop,
  });

  return (
    <>
      <div {...getRootProps({ className: className })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

      <div>
        <ul className='mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
          {files.map((file, index) => (
            <li key={index} className='relative h-32 rounded-md'>
              <Image
                src={file}
                alt={file}
                width={100}
                height={100}
                loading={"eager"}
                className=' h-full w-full rounded-md object-contain'
              />
              <button
                type='button'
                className='absolute inset-0 flex h-7 w-7 items-center justify-center rounded-full border border-slate-400 bg-white transition-colors'
                onClick={() => deleteImages(file)}>
                <BsTrash className='h-5 w-5 text-red-500 transition-colors hover:text-rose-800' />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dropzone;
