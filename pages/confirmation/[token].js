import { verify } from "@/helper/verification";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

const token = () => {
  const router = useRouter();
  const { token } = router.query;
  const [user, setUser] = useState("")
console.log(token)
  useEffect(() => {
    const getUser = async (token) => {
      const res = await verify(token);
      console.log(res);
      setUser(res)
    };

    getUser();
    // if (user?.isVerified) {
    //   setTimeout(() => {
    //     return router.push("/auth/login")
    //   },3000)
    // }
  }, [token]);

  return (
    <div className='flex h-screen items-center justify-between'>
      <div className='mx-auto flex w-full  max-w-md justify-center p-3'>
        {user?.verified ? (
          <div className='rounded-md bg-green-300 p-5'>
            <h2 className='text-bold font-bold tracking-wide'>
              Your account has been verified
            </h2>
            <span className='font-normal'>
              redirecting to login In Page <PulseLoader size={10} />
            </span>
          </div>
        ) : (
          <div className='rounded-md bg-red-300 p-5'>
            <h2 className='text-bold font-bold tracking-wide'>
              Error While Verifying Your Account
            </h2>
            <span className='font-normal'>Please try Again</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default token;
