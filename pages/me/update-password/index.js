import ProfileLayout from "@/components/ProfileLayout";
import { baseURL } from "@/helper/axios";
import { getUser} from "@/helper/user";
import { getSession, signOut } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const PasswordUpdate = ({ user }) => {
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      password: password,
      cPassword: cPassword,
    };

    try {
      const response = await baseURL.post(`/auth/user/${user._id}/passchecker`, data);
    } catch (error) {
      toast.error(error.message || error.toString());
    }
  };

  return (
    <ProfileLayout>
      <div className='mx-auto w-full max-w-xl border-[1px] p-3 shadow-md'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-xl font-bold text-black'>Update Password</h1>
          <form
            className='mt-8 mb-3 flex w-full flex-col items-center justify-center space-y-5'
            onSubmit={handleSubmit}>
            <div className='mb-2 w-4/5'>
              <label
                htmlFor='cpassword'
                className='mb-2 block text-sm font-semibold text-black'>
                Current Password
              </label>
              <input
                type='password'
                required
                id='cpassword'
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
                placeholder='type your password'
                className='w-full rounded-md bg-slate-200 py-2.5 px-4 text-gray-800 outline-none focus:outline-blue-300'
              />
            </div>

            <div className='mb-3 w-4/5'>
              <label
                htmlFor='password'
                className='mb-2 block text-sm font-semibold text-black'>
                New Password
              </label>
              <input
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id='password'
                placeholder='type your new password'
                className='w-full rounded-md bg-slate-200 py-2.5 px-4 text-gray-800 outline-none focus:outline-blue-300'
              />
            </div>

            <div className='w-4/5'>
              <button className='w-full rounded-md bg-blue-700 py-2.5 px-3 font-medium text-white'>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default PasswordUpdate;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  const id = session?.user?._id;
  const user = await getUser(id);

  return {
    props: {
      user,
    },
  };
}
