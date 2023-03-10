import connectDB from "@/database/connection";
import User from "@/database/models/user";
import { useRouter } from "next/router";
import { PulseLoader } from "react-spinners";

const token = ({ verified, error }) => {
  const router = useRouter();

  if (verified) {
    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  }

  return (
    <div className='flex h-screen items-center justify-between'>
      <div className='mx-auto flex w-full  max-w-md justify-center p-3'>
        {verified ? (
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
            <span className='font-normal'>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default token;

export async function getServerSideProps({ query }) {
  const { token } = query;

  // check if user token is valid
  if (!token) {
    return {
      props: { verified: false, error: "Invalid verification token" },
    };
  }

  // connect to database
  await connectDB();

  // check if there is a user with the current token
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return {
      props: { verified: false, error: "Invalid verification token" },
    };
  }

  // change the state of the isVerified to true
  user.isVerified = true;
  user.verificationToken = null;
  await user.save();

  return { props: { verified: true } };
}
