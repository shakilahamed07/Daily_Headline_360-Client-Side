import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { uploadImg } from "../../Utils/ImgUpload";
import { FaFileImage } from "react-icons/fa";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user, updateUser } = useAuth();
  const [declineId, setDeclineId] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const handleImage = async (e) => {
    const img = e.target.files[0];
    const res = await uploadImg(img);

    setImgUrl(res);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    updateUser({ displayName: name, photoURL: imgUrl })
      .then(() => {
        setDeclineId(false);
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="mx-3 ">
      <div className="flex flex-col justify-center max-w-sm p-6 shadow-md rounded-xl sm:px-12 bg-base-200  mx-auto my-10">
        <div className="relative">
          <img
            src={user?.photoURL}
            alt=""
            className="w-32 h-32 mx-auto rounded-full bg-base-300 aspect-square"
          />
          <Link
            onClick={() => setDeclineId(true)}
            className="absolute bottom-5 md:left-45 left-52 py-2 px-2 rounded-full bg-amber-300"
          >
            <MdOutlineEdit />
          </Link>
        </div>
        <div className="space-y-4 text-center divide-y dark:divide-gray-300">
          <div className="my-2 space-y-1">
            <h2 className="text-2xl font-bold mt-3 sm:text-3xl">
              {user?.displayName}
            </h2>
            <p className=" text-xl mt-3 mb-5">Email: {user?.email}</p>
            <p className="text-gray-500 px-5">
              Thank you for joining our platform. Our service 24/7 hour.
            </p>
          </div>
        </div>
      </div>

      {declineId && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="w-md mx-auto bg-base-200 p-6 rounded-xl shadow-md mt-10 ml-5 mr-5">
            <div className="flex justify-end items-center">
              <span
                onClick={() => setDeclineId(false)}
                className="text-xl bg-red-500 px-2 text-white rounded-3xl"
              >
                X
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-3">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder="Enter Name"
                  required
                />
              </div>

              <div className="mb-10">
                <label className="">Upload Photo</label>
                <div className="flex gap-3 items-center mt-3">
                  {imgUrl ? (
                    <img className="w-10" src={imgUrl} />
                  ) : (
                    <FaFileImage size={30} />
                  )}
                  <input
                    type="file"
                    onChange={handleImage}
                    className="input w-full border border-gray-500 focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md font-semibold"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
