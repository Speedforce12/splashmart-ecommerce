import React from "react";
import OrderImage from "./OrderImage";

const Orders = () => {
  return (
    <div className='mt-2 w-full rounded-md border-2 border-blue-300 p-3'>
      <h2 className='flex items-center text-base  font-bold text-black '>
        Order ID: <p className='ml-3 uppercase text-red-400'>Processing</p>
      </h2>
      <p className='text-sm font-medium text-gray-400'>2023-01-31</p>
      <div className='mt-3 flex items-center justify-between border-b-2 border-gray-300  pb-3'>
        {/* person info */}
        <div className='grid space-y-1'>
          <h3 className='text-sm font-medium text-gray-400'>Person</h3>
          <p className='text-sm font-normal text-gray-800'>O'vonee Delpesche</p>
          <span className='flex items-center text-sm font-medium text-gray-800'>
            Phone: <p className='ml-2'>2047566</p>
          </span>
          <span className='flex items-center text-sm font-medium text-gray-800'>
            Email: <p>texting123@gmail.com</p>
          </span>
        </div>

        {/* delivery info */}
        <div className='grid space-y-1'>
          <h3 className='text-sm font-medium text-gray-400'>
            Delivery Address
          </h3>
          <p className='text-sm font-normal text-gray-800'>
            386 Science Center Drive 10
          </p>
          <div className="flex space-x-1">
            <span className='flex items-center text-sm font-medium text-gray-800'>
              Castleford
            </span>
            ,
            <span className='flex items-center text-sm font-medium text-gray-800'>
              Idaho
            </span>
            ,
            <span className='flex items-center text-sm font-medium text-gray-800'>
              83321
            </span>
          </div>
          <span className='flex items-center text-sm font-medium text-gray-800'>
            United State
          </span>
        </div>

        {/* payment info */}
        <div className='grid space-y-1'>
          <h3 className='text-sm font-medium text-gray-400'>Payment</h3>
          <p className='text-sm font-normal text-green-500'>Paid</p>
          <span className='flex items-center text-sm font-medium text-gray-800'>
            Tax paid: <p>$108.86</p>
          </span>
          <span className='flex items-center text-sm font-medium text-gray-800'>
            Total paid: <p className='ml-2'>$832.58</p>
          </span>
        </div>
      </div>
      {/* images of product */}
      <div className='scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex h-24 cursor-pointer items-center gap-5 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-blue-300'>
        <div>
          <OrderImage />
        </div>
        <div>
          <OrderImage />
        </div>
        <div>
          <OrderImage />
        </div>
        <div>
          <OrderImage />
        </div>
        <div>
          <OrderImage />
        </div>
      </div>
    </div>
  );
};

export default Orders;
