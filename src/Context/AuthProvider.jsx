import React, { createContext, useEffect, useState, useRef } from "react";
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
  const [dbUser, setDbUser] = useState(null); 
  const intervalRef = useRef(null);
  const queryClient = useQueryClient();

  // ✅ Create User
  const crateUser = (email, Password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, Password);
  };

  // ✅ Login user
  const logInUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ User Update
  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  // ✅ password reset
  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // ✅ Log out
  const logOutUser = () => {
    setLoader(true);
    clearInterval(intervalRef.current); // 🔴 Clear interval on logout
    return signOut(auth);
  };

  // ✅ Premium Check Interval
  const startPremiumCheck = (dbUser) => {
    const expireTime = new Date(dbUser?.premiumToken).getTime();

    if (intervalRef.current) clearInterval(intervalRef.current); // clear existing

    intervalRef.current = setInterval(async () => {
      const now = Date.now();
      console.log('dkfkjshjkhfkj')

      if (dbUser?.premiumToken && now > expireTime) {
        try {
          await axios.patch(`http://localhost:5000/users/premium-null/${dbUser._id}`);
          queryClient.invalidateQueries(["users2"]);

          Swal.fire({
            title: "⏳ Subscription Expired!",
            text: "Your premium access has ended. Please renew to continue enjoying exclusive content.",
            icon: "warning",
            confirmButtonText: "Okay",
            confirmButtonColor: "#d33",
            timer: 5000,
          });

          clearInterval(intervalRef.current);
        } catch (error) {
          console.error("Failed to expire subscription:", error);
        }
      }
    }, 5000);
  };

  // ✅ Firebase auth state listener
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (current) => {
      setUser(current);

      if (current?.email) {
        try {
          const res = await axios.get(
            `http://localhost:5000/users/role/${current.email}`
          );
          setDbUser(res.data);

          // 🔁 Start interval if premiumToken exists
          if (res.data?.premiumToken) {
            startPremiumCheck(res.data);
          }
        } catch (error) {
          console.error("Fetch user failed", error);
        }
      }

      setLoader(false);
    });

    return () => {
      unSubscribe();
      clearInterval(intervalRef.current); 
    };
  }, []);

  const authData = {
    user,
    setUser,
    dbUser,
    setDbUser,
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
