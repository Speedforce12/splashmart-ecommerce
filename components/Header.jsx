import Link from "next/link";
import { CgShoppingBag } from "react-icons/cg";
import { FcShop } from "react-icons/fc";
import Image from "next/image";
import Avatar from "../public/images/avatar.png";
import {BiSearch} from "react-icons/bi"
import { useSelector } from "react-redux";

const Header = () => {

  const {cartmart} = useSelector((state)=> state.cartmart)

     const getTotalQuantity = () => {
       return cartmart.reduce(
         (accumulator, item) => accumulator + item.quantity,
         0
       );
  };
  
  return (
    <div className='sticky top-0 left-0 z-20 w-full'>
      <div className='flex items-center justify-between bg-white px-5 py-4 shadow-md'>
        {/* logo */}
        <Link href='/' className='flex items-center'>
          <FcShop className='h-10 w-10 md:h-8 md:w-8' />

          <h2 className='text-xlfont-bold hidden items-center px-2 text-indigo-500 sm:text-2xl md:flex'>
            Splash<p className='text-teal-500'>Mart</p>
          </h2>
        </Link>

        {/* middle */}
        <div className='flex w-44 items-center overflow-hidden rounded-full border-2 text-gray-500 lg:w-2/5'>
          <BiSearch className='mx-4 h-5 w-5' />
          <input
            type='text'
            className='h-10 w-full text-black outline-none placeholder:text-xs placeholder:md:text-base'
            placeholder='Search for an Item'
          />
        </div>

        {/* right */}
        <div className='flex items-center gap-3'>
          <Link
            href='/cart'
            className='relative cursor-pointer  transition duration-200 ease-in-out  hover:scale-110'>
            <CgShoppingBag className='h-8 w-8 hover:text-gray-500' />
            <div className='absolute -bottom-1 right-5 h-5 rounded-full bg-green-600 px-1.5 text-sm  font-bold text-white'>
              {getTotalQuantity() || 0}
            </div>
          </Link>

          <div className='rounded-full transition-all duration-200 ease-in-out hover:scale-110 hover:ring-2 hover:ring-teal-300'>
            <Image
              alt=''
              className='h-9 w-9 cursor-pointer rounded-full object-cover'
              src={Avatar}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
