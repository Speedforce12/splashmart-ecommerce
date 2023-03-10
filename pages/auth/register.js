import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAlternateEmail, MdSecurity } from "react-icons/md";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";
import { TiUserAddOutline } from "react-icons/ti";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";
import { createUser } from "@/helper/user";
import { useRouter } from "next/router";

const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      PASSWORD_REGEX,
      "Must Contain 6 Characters, One UpperCase Letter, OneLowercase Letter, One Number and One Special Case Character"
    )
    .required("No password provided."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const register = () => {
  const [visible, setVisible] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = async (data) => {
    const user = await createUser(data);

    if (user) {
      router.push("/verify/verify-request");
    }

    console.log(user);
  };

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center px-4'>
      <div className='w-full max-w-lg items-center rounded-md border bg-gradient-to-br from-[#c1f0e2] to-[#fbc7f1] p-4 shadow-md'>
        <form
          className='flex w-full flex-col items-center justify-center p-3'
          onSubmit={handleSubmit(onSubmit)}>
          <h1 className='font-serif text-3xl font-semibold tracking-wide text-opacity-95'>
            Sign Up
          </h1>
          <p className='mt-1.5 text-sm font-thin tracking-tight'>
            Fill out the form below to register
          </p>
          <div className='mt-7 w-full'>
            <label
              htmlFor='username'
              className={` ${
                errors.username?.message ? "text-rose-500" : "text-black"
              }  mb-1.5 block text-sm font-semibold text-opacity-70`}>
              {errors.username?.message ? errors.username.message : "Name"}
            </label>
            <div className='flex items-center rounded-md bg-white p-4'>
              <FaRegUserCircle className='h-5 w-5' />
              <input
                type='text'
                id='username'
                {...register("username")}
                placeholder='@username'
                className='ml-3 h-7 w-full bg-transparent indent-2 focus:outline-none'
              />
            </div>
          </div>

          <div className='my-4 w-full'>
            <label
              htmlFor='email'
              className={` ${
                errors.email?.message ? "text-rose-500" : "text-black"
              }  mb-1.5 block text-sm font-semibold text-opacity-70`}>
              {errors.email?.message ? errors.email.message : "Email"}
            </label>
            <div className='flex items-center rounded-md bg-white p-4'>
              <MdOutlineAlternateEmail className='h-5 w-5' />
              <input
                type='text'
                id='email'
                {...register("email")}
                placeholder='@email'
                className='ml-3 h-7 w-full bg-transparent indent-2 focus:outline-none'
              />
            </div>
          </div>

          <div className='w-full'>
            <label
              htmlFor='password'
              className={` ${
                errors.password?.message ? "text-rose-500" : "text-black"
              }  mb-1.5 block text-sm font-semibold text-opacity-70`}>
              {errors.password?.message ? errors.password.message : "Password"}
            </label>
            <div className='flex items-center rounded-md bg-white p-4'>
              <MdSecurity className='h-5 w-5' />
              <input
                type={visible ? "text" : "password"}
                id='password'
                autoComplete='off'
                {...register("password")}
                placeholder='@password'
                className='ml-3 h-7 w-full bg-transparent indent-2 focus:outline-none'
              />
              {visible ? (
                <VscEyeClosed
                  className='h-5 w-5 cursor-pointer'
                  onClick={() => setVisible(!visible)}
                />
              ) : (
                <VscEye
                  className='h-5 w-5 cursor-pointer'
                  onClick={() => setVisible(!visible)}
                />
              )}
            </div>
          </div>
          <div className='my-4 w-full'>
            <label
              htmlFor='confirmPassword'
              className={` ${
                errors.confirmPassword?.message ? "text-rose-500" : "text-black"
              }  mb-1.5 block text-sm font-semibold text-opacity-70`}>
              {errors.confirmPassword?.message
                ? errors.confirmPassword.message
                : "Confirm Password"}
            </label>
            <div className='flex items-center rounded-md bg-white p-4'>
              <MdSecurity className='h-5 w-5' />
              <input
                type={showConfirm ? "text" : "password"}
                id='confirmPassword'
                autoComplete='off'
                {...register("confirmPassword")}
                placeholder='@confirmPassword'
                className='ml-3 h-7 w-full bg-transparent indent-2 focus:outline-none'
              />
              {showConfirm ? (
                <VscEyeClosed
                  className='h-5 w-5 cursor-pointer'
                  onClick={() => setShowConfirm(!showConfirm)}
                />
              ) : (
                <VscEye
                  className='h-5 w-5 cursor-pointer'
                  onClick={() => setShowConfirm(!showConfirm)}
                />
              )}
            </div>
          </div>
          <button
            className='flex w-full items-center justify-center gap-4 rounded-md bg-teal-300 py-3 px-2  font-medium uppercase transition duration-200 hover:bg-teal-500 hover:font-bold hover:text-white'
            disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <ClipLoader color='#ffffff' size={30} />
                Submitting...
              </>
            ) : (
              <>
                <TiUserAddOutline className='h-5 w-5' />
                Register
              </>
            )}
          </button>
          <span className='mt-4 text-sm'>
            Already have an account?{" "}
            <Link
              href='/auth/login'
              className='animate-pulse tracking-tighter text-teal-600'>
              SignIn
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default register;
