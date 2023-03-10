import ShippingAddressRadio from "@/components/ShippingAddressRadio";
import React, { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";

const shipping = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "United States",
    },
    {
      id: 2,
      street: "456 Elm St",
      city: "Othertown",
      state: "NY",
      zip: "67890",
      country: "United States",
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
  };

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
              {addresses.map((address) => (
                <ShippingAddressRadio
                  key={address.id}
                  address={address}
                  isSelected={address.id === selectedAddress.id}
                  onChange={handleAddressChange}
                />
              ))}
            </div>

            <div>
              <button className='flex items-center rounded-md  border-2 bg-white  py-3 px-3  font-semibold text-blue-500'>
                <MdOutlineAdd className='h-6 w-6' />
                Add new address
              </button>
            </div>

            <div className='ml-auto space-x-5'>
              <button className='border-[1px] py-2 px-3 rounded-md font-medium text-black'>
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
