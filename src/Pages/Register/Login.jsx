import React, {useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthProvider";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../Firebase/Firebase-init";



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
      .then(() => {
        navigate(location.state || "/");
        toast.success('Login successful');
      })
      .catch((error) => {
        setError("Your password & email not macth");
        toast.error(error.message);
      });
  };
  
  //* google login
  const hendleGoogleLogin =()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result)
    toast.success('Login successful');
    navigate(location.state || "/");
  }).catch((error) => {
    toast.error(error.message);
  });
  }

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
        <button onClick={hendleGoogleLogin} className="btn mt-5 hover:bg-primary border-primary hover:text-white bg-white text-black rounded-3xl">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
        <p className="text-center mt-3 font-bold">&</p>
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
