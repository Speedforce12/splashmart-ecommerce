import ProfileLayout from "@/components/ProfileLayout";
import { getUser } from "@/helper/user";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdOutlineAdd } from "react-icons/md";
import { VscLocation } from "react-icons/vsc";
import Avatar from "../../public/images/avatar.png";

const index = ({ user }) => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <ProfileLayout>
      <div className='w-full rounded-md border-2 p-3 shadow-sm'>
        <div className='flex flex-col'>
          <div className='flex items-center gap-3'>
            <Image
              src={session?.user?.image ? session?.user?.image : Avatar}
              width={100}
              height={100}
              alt=''
              className='h-12 w-12 rounded-full object-cover'
            />
            <div className='grid'>
              <h3 className='text-base font-semibold text-black'>
                {session?.user?.name}
              </h3>
              <span className='flex items-center gap-2 text-sm font-semibold text-black'>
                Email:
                <p className='text-sm font-medium text-gray-700'>
                  {session?.user?.email}
                </p>
              </span>
            </div>
          </div>
          <hr className='my-5 border-gray-400' />

          <Link
            href={`/address/${user.shippingAddress[0]?._id}`}
            className='flex w-full items-center gap-3 rounded-md bg-blue-50 p-3'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md'>
              <VscLocation className='h-7  w-7 text-orange-400' />
            </div>

            {user.shippingAddress[0] ? (
              <div className='grid space-y-1'>
                <h3 className='text-sm font-semibold text-gray-700'>
                  {user.shippingAddress[0]?.street}
                </h3>
                <p className='text-xs font-semibold text-gray-600'>
                  {user.shippingAddress[0]?.city},{" "}
                  {user.shippingAddress[0]?.state},
                  {user.shippingAddress[0]?.zip}
                </p>
                <p className='text-xs font-semibold text-gray-600'>
                  {user.shippingAddress[0]?.country}
                </p>
                <p className='text-xs font-semibold text-gray-600'>
                  {user.shippingAddress[0]?.phone}
                </p>
              </div>
            ) : (
              <>
                <p className='cursor-not-allowed text-base font-semibold text-black'>
                  No current address
                </p>
              </>
            )}
          </Link>

          <div className='mt-8'>
            <button
              onClick={() => router.push("/address/create")}
              className='flex items-center rounded-md  border-2 bg-white  py-3 px-3  font-semibold text-blue-500'>
              <MdOutlineAdd className='h-6 w-6' />
              Add new address
            </button>
          </div>

          <hr className='my-5 border-gray-400' />
        </div>
      </div>
    </ProfileLayout>
  );
};

export default index;

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
