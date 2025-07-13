import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";

import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";

const Register = () => {
  const { crateUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [nameE, setNameE] = useState("");
  const [passE, setPassE] = useState("");

  const hendleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    if (name.length < 5) {
      return setNameE("Name must be 5 character.");
    } else {
      setNameE("");
    }
    const photo = e.target.photo.value;
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
      .then(() => {
        //* Update profile
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            toast.success("Register Successfully");
            console.log("User created and profile updated.");
            navigate("/login");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="mx-3">
      <div className="card w-full max-w-md py-5 rounded-3xl shrink-0 shadow-2xl mx-auto my-15  px-10 ">
        <div className="card-body">
          <h1 className="font-bold text-2xl text-center -z-10">
            Register Now
          </h1>
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
            {/* //*Photo url */}
            <label className="">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input focus:outline-none rounded-3xl focus:border-primary"
              placeholder="Photo url"
              required
            />
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
