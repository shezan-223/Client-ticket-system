import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from './firebase.init';
import { GoogleAuthProvider } from 'firebase/auth';

const AuthProvider = ({children}) => {

const [user,setUser]=useState(null)
const [loading ,setLoading]= useState(true) 


const registerUser =(email,password)=>{
    setLoading(true)

    return createUserWithEmailAndPassword(auth,email,password)
}


const googleProvider =new GoogleAuthProvider()
const signInWithGoogle =()=>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
}


const logOut =()=>{
    setLoading()
    return signOut(auth)
}




useEffect(()=>{

    const unsubscribe =onAuthStateChanged(auth ,(currentUser)=>{
        setUser(currentUser);
        setLoading(false);

    })
    return ()=>unsubscribe();
 },[])


    const authInfo ={
        user,
        loading,
         registerUser,
         signInWithGoogle,
         logOut
    }

    return (
        <>
        <AuthContext value={authInfo}>
        {children}
        </AuthContext>
        
        </>
    );
};

export default AuthProvider;