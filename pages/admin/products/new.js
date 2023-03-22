import ProfileLayout from "@/components/ProfileLayout";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createProduct } from "@/helper/product";
import { toast } from "react-toastify";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/firebase/firebase";
import { BsTrash } from "react-icons/bs";

const CreateProduct = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
  });

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadTasks = files.map((file) => {
      const storageRef = ref(storage, `products/${file.name}`);
      return uploadBytes(storageRef, file);
    });
    await Promise.all(uploadTasks);
    const downloadUrls = await Promise.all(
      files.map((file) => {
        const storageRef = ref(storage, `products/${file.name}`);
        return getDownloadURL(storageRef);
      })
    );
    setImageUrls((prevUrls) => [...prevUrls, ...downloadUrls]);
  };

  const loadImages = async () => {
    const imagesRef = ref(storage, "products");
    const imageList = await listAll(imagesRef);

    const urls = await Promise.all(
      imageList.items.map(async (imageRef) => {
        return getDownloadURL(imageRef);
      })
    );
    setValue("images", urls);
    setImageUrls(urls);
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

  const onSubmit = async (data) => {
    const product = {
      name: data.name,
      price: data.price,
      stock: data.stock,
      images: imageUrls,
      seller: data.seller,
      category: data.category,
      description: data.description,
    };

    await createProduct(product);
    reset();

    console.log(data);
  };

  return (
    <ProfileLayout>
      <div className='w-full max-w-2xl rounded-md border-[1px] p-5  shadow-sm'>
        <h1 className='mb-5 text-xl font-bold text-black'>Create Product</h1>
        <form
          className='grid  w-full grid-cols-1 md:grid-cols-2'
          onSubmit={handleSubmit(onSubmit)}>
          <div className='col-span-2 mb-2'>
            <label
              htmlFor=''
              className='block text-sm font-semibold text-black'>
              Name
            </label>
            <input
              {...register("name")}
              type='text'
              placeholder='product name'
              className='w-full rounded-md border-none bg-gray-100 p-2 text-black focus-within:outline-indigo-300'
            />
          </div>

          <div className='col-span-2 mb-2 '>
            <label
              htmlFor=''
              className='block text-sm font-semibold text-black'>
              Description
            </label>
            <textarea
              {...register("description")}
              type='text'
              placeholder='Product description'
              className='w-full rounded-md border-none bg-gray-100 p-2 text-black focus-within:outline-indigo-300'
            />
          </div>

          <div className='mb-2 pr-5'>
            <label
              htmlFor=''
              className='block text-sm font-semibold text-black'>
              Price
            </label>
            <input
              {...register("price")}
              type='number'
              placeholder='0.00'
              step='0.01'
              className='col-span-1 w-full rounded-md border-none bg-gray-100 p-2 text-black focus-within:outline-indigo-300'
            />
          </div>

          <div className='mb-2'>
            <label
              htmlFor=''
              className='block text-sm font-semibold text-black'>
              Category
            </label>

            <select
              {...register("category")}
              type='text'
              className='col-span-2 w-full cursor-pointer rounded-md bg-gray-100 p-2 text-black'>
              <option value='default' hidden='hidden'>
                Select a category
              </option>
              <option value='Electronics'>Electronics</option>
              <option value='Cameras'>Cameras</option>
              <option value='Laptops'>Laptops</option>
              <option value='Accessories'>Accessories</option>
              <option value='Headphones'>Headphones</option>
            </select>
          </div>

          <div className='mb-2 pr-5'>
            <label
              htmlFor=''
              className='block text-sm font-semibold text-black'>
              Seller/Brand
            </label>
            <input
              {...register("seller")}
              type='text'
              placeholder='Seller / Brand'
              className='col-span-1 w-full rounded-md border-none bg-gray-100 p-2 text-black focus-within:outline-indigo-300'
            />
          </div>

          <div className='mb-2'>
            <label
              htmlFor=''
              className='block text-sm font-semibold text-black'>
              Stock
            </label>
            <input
              {...register("stock")}
              type='number'
              placeholder='0'
              className='col-span-1 w-full rounded-md border-none bg-gray-100 p-2 text-black focus-within:outline-indigo-300'
            />
          </div>

          <div className='col-span-2 my-16 space-y-5 text-center'>
            <label
              className='col-span-1 rounded-md border border-dashed border-neutral-500 p-10  text-base font-semibold text-black lg:col-span-2'
              htmlFor='imageUploader'>
              click to select some product Images files
            </label>

            <input
              type='file'
              multiple
              onChange={handleImageUpload}
              id='imageUploader'
              hidden
             />
          </div>

          {!isSubmitting && (
            <div className='col-span-2 flex gap-8'>
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  className='w-1/4 rounded-md border-2 p-1 shadow-md'>
                  <img
                    src={url}
                    alt=''
                    className='w-full rounded-md'
                    accept='image/*'
                  />
                  <button
                    type='button'
                    className='mt-2 flex items-center gap-0.5 rounded-md bg-gray-200 text-sm text-red-400 hover:text-red-600'
                    onClick={() => deleteImages(url)}>
                    <BsTrash className='h-5 w-5 text-red-500 transition-colors hover:text-rose-800' />
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
          <button className='col-span-2 mt-3 rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed' disabled={isSubmitting}>
            Create Product
          </button>
        </form>
      </div>
    </ProfileLayout>
  );
};

export default CreateProduct;
