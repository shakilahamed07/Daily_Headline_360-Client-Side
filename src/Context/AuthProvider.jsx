
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/Firebase-init';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';


export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    //* Create User
    const crateUser = (email, Password) =>{
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, Password)
    };

    //* Login user
    const logInUser = (email, password) =>{
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //* User Update
    const updateUser = (updateData) =>{
        return updateProfile(auth.currentUser, updateData)
    }

    //* password reset
    const passwordReset = (email) =>{
        return sendPasswordResetEmail(auth, email)
    }

    //* Log out
    const logOutUser = () =>{
        setLoader(true)
        return signOut(auth)
    }

    //* on State user
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (current) =>{
            setUser(current);
            setLoader(false);
          })

        return ()=> (
            unSubscribe()
        )
    },[])


    const authData = {
        user,
        setUser,
        crateUser,
        logOutUser,
        logInUser,
        loader,
        updateUser,
        passwordReset,
    }

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;