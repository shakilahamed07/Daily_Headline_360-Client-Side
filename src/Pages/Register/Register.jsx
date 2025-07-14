import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";
import SocialLogin from "./SocialLogin";
import { FaFileImage } from "react-icons/fa";
import { uploadImg } from "../../Utils/ImgUpload";
import axios from "axios";

const Register = () => {
  const { crateUser, updateUser } = useContext(AuthContext);
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();
  const [nameE, setNameE] = useState("");
  const [passE, setPassE] = useState("");
  const location = useLocation();

  const hendleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    if (name.length < 5) {
      return setNameE("Name must be 5 character.");
    } else {
      setNameE("");
    }
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (password.length < 6) {
      return setPassE("Password Length must be at least 6 character.");
    } else if (!/^(?=.*[a-z])/.test(password)) {
      return setPassE("At least 1 lowercase [a-z] letter");
    } else if (!/^(?=.*[A-Z])/.test(password)) {
      return setPassE("At least 1 Uppercase [A-Z] letter");
    } else {
      setNameE("");
    }

    //* Create user
    crateUser(email, password)
      .then(async () => {

        //update database
        await axios.post("http://localhost:5000/users", {
          email: email,
          img: imgUrl,
          name
        });

        //* Update profile
        updateUser({ displayName: name, photoURL: imgUrl })
          .then(() => {
            toast.success("Register Successfully");
            navigate(location.state || "/");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleImage = async (e) => {
    const img = e.target.files[0];
    const res = await uploadImg(img);

    setImgUrl(res);
  };

  return (
    <div className="mx-3">
      <div className="card w-full max-w-md py-5 rounded-3xl shrink-0 shadow-2xl mx-auto my-15  px-10 ">
        <div className="card-body">
          <h1 className="font-bold text-2xl text-center -z-10">Register Now</h1>
          <SocialLogin />
          <form onSubmit={hendleRegister} className="fieldset">
            {/* //*Name*/}
            <label className="">Name</label>
            <input
              type="text"
              name="name"
              className="input focus:outline-none rounded-3xl focus:border-primary"
              placeholder="Your Name"
            />
            <div>{nameE && <p className="text-red-500">!{nameE}</p>}</div>
            {/* //* upload Photo */}
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

            {/* //*Email */}
            <label className="">Email</label>
            <input
              type="email"
              name="email"
              className="input focus:outline-none rounded-3xl focus:border-primary"
              placeholder="Email"
              required
            />
            {/* //*Password */}
            <label className="">Password</label>
            <input
              type="password"
              name="password"
              className="input focus:outline-none rounded-3xl focus:border-primary"
              placeholder="Password"
            />
            <div>{passE && <p className="text-red-500">! {passE}</p>}</div>
            <button className="btn border-none rounded-4xl text-xl bg-primary text-white font-medium mt-4">
              Register
            </button>
          </form>
          <p className="font-medium mt-3">
            Already have an account?
            <Link to="/login" className="font-bold ml-1 text-primary underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
