import React from "react";

const ShippingAddressRadio = ({ address, isSelected, onChange }) => {
  return (
    <label className='flex w-64  cursor-pointer items-center rounded-md border-[1px] border-blue-300 bg-gray-50 p-3 shadow-md hover:bg-blue-100'>
      <input
        type='radio'
        className='form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'
        checked={isSelected}
        onChange={() => onChange(address)}
      />
      <div className='ml-3 flex flex-col' onClick={() => onChange(address)}>
        <div className='space-y-1'>
          <h3 className='text-xs font-semibold text-gray-700'>
            {address.street}
          </h3>
          <p className='text-xs font-semibold text-gray-400'>
            {address.city}, {address.state}, {address.zip}
          </p>
          <p className='text-xs font-semibold text-gray-400'>
            {address.country}
          </p>
          <p className='text-xs font-semibold text-gray-400'>
            {" "}
            {address.phone}
          </p>
        </div>
      </div>
    </label>
  );
};

export default ShippingAddressRadio;
