import Image from "next/image";
import React from "react";
import { IoAdd } from "react-icons/io5";

const NewCard = ({ item }) => {
  return (
    <div className='mb-2 h-80 w-64 rounded-md  bg-white p-3 shadow-md hover:scale-105 duration-200 ease-in-out cursor-pointer'>
      <div className='flex w-full flex-col items-center justify-center'>
        <Image
          alt=''
          src={item.cover}
          width={220}
          height={200}
          className='object-cover'
        />

        <div className='flex items-center justify-between w-full'>
          <h2 className="font-semibold text-base mt-5">
            {item.name}
            <p className="text-sm mt-1">${item.price}</p>
          </h2>
          <div className="ml-auto rounded-full bg-red-400 p-2 cursor-pointer">
            <IoAdd className="w-5 h-5 hover:text-white"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
