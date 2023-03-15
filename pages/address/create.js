import ProfileLayout from "@/components/ProfileLayout";
import { createAddress } from "@/helper/address";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function create() {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    const id = session?.user?._id;
    const address = await createAddress(id,data);
      reset()
    if (address) {
      toast.success("Shipping address created successfully");
    }
  };
  return (
    <ProfileLayout>
      <div className='w-full max-w-lg rounded-md border-[1px] p-3 shadow-md'>
        <h1
          className='text-xl font-bold tracking-tight text-black
      '>
          Add new Address
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2'>
          <div className='col-span-2'>
            <label
              htmlFor='address'
              className='mb-1.5 block font-semibold text-black'>
              Address*
            </label>
            <div>
              <input
                type='text'
                id='address'
                placeholder='Type your address'
                className='w-full rounded-md bg-slate-200 py-2 indent-2 text-black outline-none'
                {...register("street")}
                required
              />
            </div>
          </div>

          <div className=''>
            <label
              htmlFor='city'
              className='mb-1.5 block font-semibold text-black'>
              City
            </label>
            <div>
              <input
                type='text'
                id='city'
                placeholder='Type your city'
                className='w-full rounded-md bg-slate-200 py-2 indent-2 text-black outline-none'
                {...register("city")}
                required
              />
            </div>
          </div>
          <div className=''>
            <label
              htmlFor='state'
              className='mb-1.5 block font-semibold text-black'>
              State
            </label>
            <div>
              <input
                type='text'
                id='state'
                placeholder='Type your state'
                className='w-full rounded-md bg-slate-200 py-2 indent-2 text-black outline-none'
                required
                {...register("state")}
              />
            </div>
          </div>
          <div className=''>
            <label
              htmlFor='zip'
              className='mb-1.5 block font-semibold text-black'>
              Zip code
            </label>
            <div>
              <input
                type='text'
                id='zip'
                required
                placeholder='Type your zip code'
                className='w-full rounded-md bg-slate-200 py-2 indent-2 text-black outline-none'
                {...register("zip")}
              />
            </div>
          </div>
          <div className=''>
            <label
              htmlFor='phone'
              className='mb-1.5 block font-semibold text-black'>
              Phone No
            </label>
            <div>
              <input
                type='text'
                id='phone'
                placeholder='Type your phone number'
                className='w-full rounded-md bg-slate-200 py-2 indent-2 text-black outline-none'
                {...register("phone")}
                required
              />
            </div>
          </div>

          <div className='col-span-2 mb-2'>
            <label
              htmlFor='country'
              className='mb-1.5 block font-semibold text-black'>
              Country
            </label>
            <div>
              <input
                type='text'
                id='country'
                placeholder='Type your country'
                className='w-full rounded-md bg-slate-200 py-2 indent-2 text-black outline-none'
                {...register("country")}
                required
              />
            </div>
          </div>

          <div className='col-span-2'>
            <button
              className='w-full rounded-md bg-blue-800 py-2.5 px-3 font-semibold text-white'
              disabled={isSubmitting}>
              Add
            </button>
          </div>
        </form>
      </div>
    </ProfileLayout>
  );
}

export default create;
