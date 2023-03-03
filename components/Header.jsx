import Link from "next/link";
import { CgShoppingBag } from "react-icons/cg";
import { FcShop } from "react-icons/fc";
import Image from "next/image";
import Avatar from "../public/images/avatar.png";
import {BiSearch} from "react-icons/bi"

const Header = () => {
  return (
    <div className='sticky top-0 left-0 z-20 w-full'>
      <div className='flex items-center justify-between bg-white px-5 py-4 shadow-md'>
        {/* logo */}
        <Link href='/' className='flex items-center'>
          <FcShop className='h-10 w-10 md:h-8 md:w-8' />

          <h2
            className='hidden items-center px-2 text-xlfont-bold text-indigo-500 sm:text-2xl md:flex'>
            Splash<p className='text-teal-500'>Mart</p>
          </h2>
        </Link>

        
        {/* middle */}
        <div className='flex rounded-full border-2 w-44 lg:w-2/5 overflow-hidden items-center text-gray-500'>
          <BiSearch className="h-5 w-5 mx-4"/>
          <input type="text"  className="h-10 w-full outline-none text-black placeholder:md:text-lg placeholder:text-xs" placeholder="Search for an Item"/>
        </div>

        {/* right */}
        <div className='flex items-center gap-3'>
          <div className='relative cursor-pointer  transition duration-200 ease-in-out  hover:scale-110'>
            <CgShoppingBag className='h-8 w-8 hover:text-gray-500' />
            <div className='absolute -bottom-1 right-5 h-5 rounded-full bg-green-600 px-1.5 text-sm  font-bold text-white'>
              1
            </div>
          </div>

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
