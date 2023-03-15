import ProfileLayout from "@/components/ProfileLayout";
import { getUser } from "@/helper/user";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { toast } from "react-toastify";
import { TbTrash } from "react-icons/tb";
import { baseURL } from "@/helper/axios";
import { storage } from "@/firebase/firebase";

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user?.name);
  const [avatar, setAvatar] = useState(user?.image);

  // upload images to firebase
  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `Images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploaded = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        console.log(error);
        toast.error("Something went wrong while uploading image: Try again");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAvatar(downloadURL);
          toast.success("Image uploaded successfully");
        });
      }
    );
  };

  // delete images from firebase
  const deleteImages = () => {
    const deleteRef = ref(storage, avatar);

    // Delete the file
    deleteObject(deleteRef)
      .then(() => {
        // image deleted successfully
        setAvatar(null);
        toast.success("Image deleted successfully");
      })
      .catch((error) => {
        // error handling
        console.log(error);
        toast.error("Unexpected error while deleting");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      avatar: avatar,
    };

    try {
      const res = await baseURL.post(`/auth/user/${user._id}/profile`, data);
      toast.success(res.data.message );
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <ProfileLayout>
      <div className='mx-auto w-full max-w-xl border-[1px] p-3 shadow-md'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-xl font-bold text-black'>Update Profile</h1>
          <form
            className='mt-8 mb-3 flex w-full flex-col items-center justify-center space-y-5'
            onSubmit={handleSubmit}>
            <div className='mb-2 w-4/5'>
              <label
                htmlFor='name'
                className='mb-2 block text-sm font-semibold text-black'>
                Full Name
              </label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='type your new name'
                className='w-full rounded-md bg-slate-200 py-2.5 px-4 text-gray-800 outline-none focus:outline-blue-300'
              />
            </div>

            <div className='mb-3 w-4/5'>
              <label
                htmlFor='password'
                className='mb-2 block text-sm font-semibold text-black'>
                New Avatar
              </label>
              <div className='flex items-center  gap-5'>
                <div className=''>
                  {avatar && (
                    <>
                      <TbTrash
                        size={15}
                        className='animate-pulse cursor-pointer text-red-400'
                        onClick={() => deleteImages()}
                      />

                      <Image
                        src={user?.avatar ? user?.avatar : avatar}
                        width={100}
                        height={100}
                        className='h-14 w-14 rounded-lg object-contain'
                        alt='profile pic'
                      />
                    </>
                  )}
                </div>
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => uploadImage(e)}
                  id='avatar'
                  className='w-full rounded-md bg-slate-200 py-2.5 px-4 text-gray-800 outline-none focus:outline-blue-300'
                />
              </div>
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

export default UpdateProfile;

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
