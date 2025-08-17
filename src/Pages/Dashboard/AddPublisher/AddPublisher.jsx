import { useState } from "react";
import { FaFileImage } from "react-icons/fa";
import { uploadImg } from "../../../Utils/ImgUpload";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddPublisher = () => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const res = await axiosSecure.post("/publishers", { name, logo });

    if (res.data.insertedId) {
        Swal.fire({
            title: "Publisher added successfully!",
            icon: "success",
            confirmButtonColor: "#d33",
            timer: 1500
          });
          form.reset();
          setLogo(null)
          setName("")
        }
  };

  const handleImage = async (e) => {
    const img = e.target.files[0];
    const res = await uploadImg(img);
    setLogo(res);
  };

  return (
    <div className="max-w-md mx-auto lg:mt-50 my-30 shadow-lg rounded-2xl bg-base-200 p-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Publisher</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1">Publisher Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter publisher name"
            required
          />
        </div>
        {/* //* upload Photo */}
        <label className="font-medium">Upload Publisher Logo</label>
        <div className="flex gap-3 items-center mt-3 mb-8">
          {logo ? (
            <img className="w-10" src={logo} />
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
        <div className="text-center">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary font-bold w-full"
          >
            Add Publisher
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPublisher;
