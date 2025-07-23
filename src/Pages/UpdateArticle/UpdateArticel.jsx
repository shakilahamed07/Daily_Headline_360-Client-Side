import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { uploadImg } from "../../Utils/ImgUpload";
import { FaFileImage } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";

const tagOptions = [
  { value: "Politics", label: "Politics" },
  { value: "Economy", label: "Economy" },
  { value: "Technology", label: "Technology" },
  { value: "Health", label: "Health" },
  { value: "Sports", label: "Sports" },
  { value: "Other", label: "Other" },
];

const UpdateArticel = () => {

  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });

  const handleImage = async (e) => {
    const img = e.target.files[0];
    const res = await uploadImg(img);

    setImgUrl(res);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append(
        "tags",
        JSON.stringify(data.tags.map((tag) => tag.value))
      );

      const tags = JSON.parse(formData.get("tags"));

      const {description, publisher, title} = data;
      

      const UpdateData = {
        description,
        image: imgUrl,
        publisher: publisher.label,
        publisher_logo: publisher.value,
        title,
        tags,
        updated: new Date().toISOString(),
      }

      
      const res = await axiosSecure.patch(`/articles/update/${id}`, UpdateData);

      if(res.data){
        Swal.fire({
            title: "Article updated!",
            text: "Waiting for admin approval.",
            icon: "success",
            confirmButtonColor: "#d33",
            timer:1500
          });
            setImgUrl("")
            reset();
            navigate('/my-articles')
          }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || err.message,
        icon: "error",
        timer: 1500
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-10 p-10 shadow-2xl rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6">Update Your Article</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        encType="multipart/form-data"
      >
        {/* Title */}
        <div>
          <label className="font-medium mb-1 block">Title</label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter title"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">Title is required</span>
          )}
        </div>

        {/* Publisher */}
        <div>
          <label className="font-medium mb-1 block">Publisher</label>
          <Controller
            name="publisher"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={publishers.map((p) => ({
                  value: p.logo,
                  label: p.name,
                }))}
                isLoading={isLoading}
                placeholder="Select publisher"
              />
            )}
          />
          {errors.publisher && (
            <span className="text-red-500 text-sm">Publisher is required</span>
          )}
        </div>

        {/* Image */}
        <div className="">
        <label className="">Upload Photo</label>
            <div className="flex gap-3 items-center">
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

        {/* Tags */}
        <div>
          <label className="font-medium mb-1 block">Tags</label>
          <Controller
            name="tags"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={tagOptions}
                isMulti
                placeholder="Select tags"
              />
            )}
          />
          {errors.tags && (
            <span className="text-red-500 text-sm">
              At least one tag required
            </span>
          )}
        </div>

        {/* Description (full width) */}
        <div className="lg:col-span-2">
          <label className="font-medium mb-1 block">Description</label>
          <textarea
            {...register("description", { required: true })}
            rows={6}
            className="textarea textarea-bordered w-full"
            placeholder="Write article description..."
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-sm">
              Description is required
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="lg:col-span-2">
          <button type="submit" className="btn btn-primary w-full">
            Submit Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateArticel;
