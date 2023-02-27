import Link from "next/link";
import { CgShoppingBag } from "react-icons/cg";
import { FcShop } from "react-icons/fc";
import Image from "next/image";
import Avatar from "../public/images/avatar.png";

const Header = () => {
  return (
    <div className='fixed top-0 left-0 w-full z-20'>
      <div className='flex items-center px-5 py-4 shadow-md justify-between bg-white'>
        {/* logo */}
        <Link href='/' className='flex items-center'>
          <FcShop className='md:h-8 h-10 w-10 md:w-8' />

          <h2
            className='font-bold sm:text-2xl text-xl hidden
           px-2 md:flex items-center text-indigo-500'>
            Splash<p className='text-teal-500'>Mart</p>
          </h2>
        </Link>
        {/* middle */}
        <div></div>

        {/* right */}
        <div className='flex items-center gap-3'>
          <div className='cursor-pointer relative  transition duration-200 hover:scale-110  ease-in-out'>
            <CgShoppingBag className='h-8 w-8 hover:text-gray-500' />
            <div className='absolute -bottom-1 h-5 px-1.5 right-5 bg-green-600 text-white font-bold  rounded-full text-sm'>
              1
            </div>
          </div>

          <div className='hover:ring-2 hover:ring-teal-300 transition-all duration-200 hover:scale-110 rounded-full ease-in-out'>
            <Image
              alt=''
              className='object-cover w-9 h-9 rounded-full cursor-pointer'
              src={Avatar}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
