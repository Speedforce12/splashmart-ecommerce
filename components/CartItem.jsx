import Image from "next/image";
import { MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { decrement, increment, removeItem } from "@/redux/cartReducer";
import { useDispatch } from "react-redux";
import Link from "next/link";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className='flex w-full items-center justify-between border-b-2 p-2 pb-3'>
      <div className='flex gap-4'>
        <Link
          href={`/product/${item._id}`}
          className='flex items-center justify-center border-2 p-2'>
          <Image
            src={
              item?.images[0]
                ? item?.images[0].url
                : "/images/default_product.png"
            }
            alt=''
            width={100}
            height={100}
            className='w-16 object-contain'
          />
        </Link>
        <div className='flex flex-col'>
          <Link
            href={`/product/${item._id}`}
            className='llg:text-lg text-sm font-semibold hover:underline hover:underline-offset-1'>
            {item.name}
          </Link>
          <p className='my-1 text-sm font-medium text-gray-400 lg:text-base'>
            Seller: {item.seller}
          </p>
          <span className='text-xs  font-semibold text-gray-400'>
            ${item.price} / per item
          </span>
        </div>
      </div>

      <div className='ml-auto'>
        <div className='mt-4 flex items-center'>
          <div className='flex flex-col items-center justify-center gap-3 rounded-md bg-gray-200 px-4 py-2 shadow-md lg:flex-row'>
            Qty
            {item?.quantity === 1 ? (
              <button
                className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-gray-200 hover:bg-gray-400'
                onClick={() => dispatch(removeItem(item._id))}>
                <HiOutlineTrash />
              </button>
            ) : (
              <button
                className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-gray-200 hover:bg-gray-400'
                onClick={() => dispatch(decrement(item._id))}>
                <FiMinus />
              </button>
            )}
            <p className='text-normal font-semibold text-gray-700'>
              {item?.quantity ? item?.quantity : 0}
            </p>
            <button
              className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-gray-200 hover:bg-gray-400'
              onClick={() => dispatch(increment(item._id))}>
              <MdAdd />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
