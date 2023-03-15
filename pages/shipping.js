import ShippingAddressRadio from "@/components/ShippingAddressRadio";
import { getUser } from "@/helper/user";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";

const shipping = ({ user }) => {
  const router = useRouter();

  const [selectedAddress, setSelectedAddress] = useState(
    user?.shippingAddress[0]
  );

  console.log(selectedAddress);

  return (
    <div className='mx-auto mt-10 w-full max-w-7xl p-3'>
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        {/* shipping information */}
        <div className='w-full max-w-2xl rounded-md border-[1px] bg-white p-3'>
          <div className='flex flex-col'>
            <h2 className='mb-3 text-xl font-bold text-black'>
              Shipping Information
            </h2>
            <div className='mb-5 space-y-5'>
              {user?.shippingAddress?.map((address) => (
                <ShippingAddressRadio
                  key={address._id}
                  address={address}
                  isSelected={address._id === selectedAddress._id}
                  onChange={() => setSelectedAddress(address)}
                />
              ))}
            </div>

            <div>
              <button
                onClick={() => router.push("/address/create")}
                href='/address/create'
                className='flex items-center rounded-md  border-2 bg-white  py-3 px-3  font-semibold text-blue-500'>
                <MdOutlineAdd className='h-6 w-6' />
                Add new address
              </button>
            </div>

            <div className='ml-auto space-x-5'>
              <button className='rounded-md border-[1px] py-2 px-3 font-medium text-black'>
                Back
              </button>
              <button className='rounded-md bg-green-500 py-2 px-3 font-medium text-white'>
                Checkout
              </button>
            </div>
          </div>
        </div>

        {/* right side */}
        <div></div>
      </div>
    </div>
  );
};

export default shipping;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  const id = session?.user?._id;
  const user = await getUser(id);

  return {
    props: {
      user,
    },
  };
}
