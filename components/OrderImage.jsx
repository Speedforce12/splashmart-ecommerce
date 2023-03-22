import Image from "next/image";
import React from "react";

const OrderImage = () => {
  return (
    <div className='w-68 flex whitespace-nowrap items-center pt-2 gap-3'>
      <div className='w-16 rounded-md border-2 p-0.5'>
        <Image
          src='/images/arrivals/arrivals3.png'
          width={100}
          height='100'
          className='h-14 w-16 object-contain '
        />
      </div>

      <div className='grid h-full flex-1'>
              <p className='font-bold text-sm'>Apple Watch Series 2 </p>
              <span className="flex items-center text-black font-semibold text-sm">2x <p className="ml-1">$528.52</p></span>
      </div>
    </div>
  );
};

export default OrderImage;
