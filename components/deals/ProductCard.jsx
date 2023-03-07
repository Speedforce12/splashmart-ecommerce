import Image from "next/image";
import StarRating from "../StarRating";
import slide1 from "../../public/images/flash/flash-1.png";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {IoMdAddCircleOutline} from "react-icons/io"
import { useState } from "react";

const ProductCard = ({flash}) => {
  const [favorite, setFavorite] = useState(false)
  return (
    <div className='h-68 mb-2 group relative w-64  cursor-pointer rounded-md bg-white  p-3 drop-shadow-md'>
      <div className='absolute right-5 flex flex-col space-y-4 opacity-0 transition duration-500 group-hover:opacity-100 translate-x-5 group-hover:translate-x-0'>
        {favorite ? (
          <FaHeart
            className='h-5 w-5 text-red-600'
            onClick={() => setFavorite(!favorite)}
          />
        ) : (
          <FaRegHeart
            className='h-5 w-5'
            onClick={() => setFavorite(!favorite)}
          />
        )}
        <IoMdAddCircleOutline className='h-6 w-6 hover:text-orange-600' />
      </div>
      <div className='flex flex-col'>
        <div className='flex w-[55px] items-center justify-center rounded-full bg-red-500 py-0.5 px-1 text-xs text-white'>
          {flash.discount}% off
        </div>
        <div className='-mt-7 flex flex-col'>
          <Image
            src={flash.cover}
            alt='shoes'
            width={300}
            height={300}
            className='h-full w-full object-contain'
            priority
          />
          <div className='-mt-3'>
            <p className='text-sm font-semibold'>{flash.name}</p>
            <div className='flex'>
              <p className='mr-auto font-bold text-rose-600'>${flash.price}</p>
              <div className='flex items-center'>
                <StarRating />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
