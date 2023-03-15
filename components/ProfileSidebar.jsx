import Link from "next/link";
import React from "react";

export const ProfileSidebar = () => {
    return (
      <div className='flex w-64 flex-col'>
        <ul className='dark:text space-y-2 text-base font-semibold text-black'>
          <li className='cursor-pointer  rounded-md p-2 hover:bg-blue-200'>
            <Link href='/me'>Your Profile</Link>
          </li>
          <li className='cursor-pointer  rounded-md p-2 hover:bg-blue-200'>
            <Link href='/me/orders'>Orders</Link>
          </li>
          <li className='cursor-pointer  rounded-md p-2 hover:bg-blue-200'>
            <Link href='/me/update-profile'>Update Profile</Link>
          </li>
          <li className='cursor-pointer  rounded-md p-2 hover:bg-blue-200'>
            <Link href='/me/update-password'>Update Password</Link>
          </li>
        </ul>
      </div>
    );
};
