import React from "react";
import { ProfileSidebar } from "./ProfileSidebar";

const ProfileLayout = ({ children }) => {
  return (
    <div className='mx-auto mt-8 w-full max-w-7xl flex-col'>
      <div className='flex justify-center rounded-md bg-blue-200 p-4 text-2xl font-semibold text-black'>
        <h1>User Dashboard</h1>
      </div>

      <div className='mt-10 flex gap-10  mx-auto px-5'>
        <ProfileSidebar />
        <div className="max-w-3xl w-full">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
