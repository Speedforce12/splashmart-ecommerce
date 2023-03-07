import Image from "next/image";
import { MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { decrement, increment, removeItem } from "@/redux/cartReducer";
import { useDispatch } from "react-redux";

const CartItem = ({ item}) => {
    const dispatch = useDispatch()
    return (
      <div className='flex w-full items-center justify-between p-2 border-b-2 pb-3'>
        <div className='flex gap-4'>
          <div className='flex items-center justify-center border-2 p-2'>
            <Image src={item?.images[0] ? item?.images[0].url : "/images/default_product.png"} alt=''width={100} height={100}  className='w-16 object-contain' />
          </div>
          <div className='flex flex-col'>
            <h2 className='llg:text-lg text-sm font-semibold'>{item.name}</h2>
            <p className='lg:text-base text-sm font-medium text-gray-400'>Seller: {item.seller}</p>
          </div>
        </div>

        <div className='ml-auto'>
          <div className='mt-4 flex items-center'>
            <div className='flex items-center justify-center gap-3 lg:flex-row flex-col rounded-md bg-gray-200 px-4 py-2 shadow-md'>
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
