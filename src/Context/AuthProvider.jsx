import React, { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase-init";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const QueryClient = useQueryClient();

  //* Create User
  const crateUser = (email, Password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, Password);
  };

  //* Login user
  const logInUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //* User Update
  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  //* password reset
  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  //* Log out
  const logOutUser = () => {
    setLoader(true);
    return signOut(auth);
  };

  //* on State user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (current) => {
      setUser(current);
      
      if (current?.email) {
        const res = await axios.get(
          `http://localhost:5000/users/role/${current?.email}`
        );
        const dbUser = res?.data;

        // ✅ Check premium expiry
        const now = Date.now();
        const expireTime = new Date(dbUser?.premiumToken).getTime();

        if (dbUser.premiumToken && now > expireTime) {
          await axios.patch(
            `http://localhost:5000/users/premium-null/${dbUser._id}`
          );

          QueryClient.invalidateQueries(["users2"]);

          Swal.fire({
            title: "⏳ Subscription Expired!",
            text: "Your premium access has ended. Please renew to continue enjoying exclusive content.",
            icon: "warning",
            confirmButtonText: "Okay",
            confirmButtonColor: "#d33",
            timer: 5000,
          });
        }
      }
      setLoader(false);
    });

    

    return () => unSubscribe();
  }, []);

  const authData = {
    user,
    setUser,
    crateUser,
    logOutUser,
    logInUser,
    loader,
    updateUser,
    passwordReset,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
