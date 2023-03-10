import Image from "next/image";
import emailLogo from "../../public/images/email.png";

const verify = () => {
  return (
    <div className='mx-auto flex h-screen items-center justify-center'>
      <div className='grid w-full max-w-md flex-col items-center p-3'>
        <h2 className='text-center text-2xl font-bold tracking-wider'>
          Yay! Confirm Your Email 🎊
        </h2>
        <span className='my-3 text-sm font-normal '>
          Please check your email for confirmation mail. click the link in the email to
          verify your account.
        </span>
        <div className="flex items-center justify-center w-full flex-col my-3">
          <Image
            src={emailLogo}
            alt='mail logo'
            className='w-56 object-cover animate-pulse'
          />

          <button className="px-2.5 py-3 capitalize font-bold hover:text-white duration-200 transition active:scale-95 hover:bg-green-600 bg-green-400 rounded-md mt-5">Resend Verification Link</button>
        </div>

      </div>
    </div>
  );
};

export default verify;
