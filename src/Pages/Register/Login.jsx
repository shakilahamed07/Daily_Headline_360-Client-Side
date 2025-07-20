import React, {useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthProvider";
import { toast } from "react-toastify";
import SocialLogin from "./SocialLogin";
import axios from "axios";

const Login = () => {
  const { logInUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const location = useLocation();
  const emailRef = useRef();

  

  const hendleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError("");

    logInUser(email, password)
      .then( async () => {

        //update database
        await axios.post("http://localhost:5000/users", {
          email: email,
          
        });

        navigate(location.state || "/");
        toast.success('Login successful');
      })
      .catch((error) => {
        setError("Your password & email not macth");
        toast.error(error.message);
      });
  };
  


//   //* password reset
//   const hendlePassReset = ()=>{
//     const email = emailRef.current.value;
//     passwordReset(email).then(() => {
//       toast.success('Password reset email sent! Check email.')
//     })
//     .catch((error) => {
//       const errorMessage = error.message;
//       toast.error(errorMessage)
//     });
//   }

  return (
    <div className="mx-3">
      <div className="card  w-full max-w-md px-10 py-5 rounded-3xl shrink-0 shadow-xl mx-auto my-15 ">
      <div className="card-body">
        <h1 className="font-bold text-2xl text-center -z-1">Login Now</h1>
        {/* Google */}
        <SocialLogin/>
        <form onSubmit={hendleLogin} className="fieldset">
          {/* //*Email */}
          <label className="">Email</label>
          <input
            type="email"
            name="email"
            ref={emailRef}
            className="input focus:outline-none rounded-3xl focus:border-primary"
            placeholder="Email"
            required
          />
          {/* //*Password */}
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input focus:outline-none rounded-3xl focus:border-primary"
            placeholder="Password"
            required
          />
          <div>
            <a  className="link link-hover">Forgot password?</a>
          </div>
          <div>{error && <p className="text-red-500">{error}</p>}</div>
          <button className="btn border-none rounded-3xl bg-primary text-white font-bold mt-4">Login</button>
        </form>
        <p className="font-medium mt-3">
          You have no account?{" "}
          <Link to="/register" className="font-medium text-primary underline">
            Register
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
