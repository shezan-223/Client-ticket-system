import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from './firebase.init';
import { GoogleAuthProvider } from 'firebase/auth';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import useAxiosPublic from '../Hooks/UseAxiosPublic';



const AuthProvider = ({children}) => {
   
    const axiosPublic =useAxiosPublic()

const [user,setUser]=useState(null)
const [loading ,setLoading]= useState(true) 


const registerUser =async(email,password,name, photoURL)=>{
    setLoading(true)

   const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;
  await updateProfile(user, {
            displayName: name,
            photoURL: photoURL || null,
        });

  // Send user info to MongoDB
  await axiosPublic.post('/users', {
    name: name || "Unknown",
    email: user.email,
    photo: photoURL || null,
    role: 'user'
  });
setLoading(false)
  return result;
}


const signInWithGoogle = async()=>{
    setLoading(true)
    const googleProvider =new GoogleAuthProvider()
 const result =await signInWithPopup(auth,googleProvider)
 const user =result.user ;
   await axiosPublic.post('/users', {
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
    role: "user",
  });
  setLoading(false);
      return result;
}


const logOut =()=>{
    setLoading(true)
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
        <AuthContext.Provider value={authInfo}>
        {children}
        </AuthContext.Provider>
        
        </>
    );
};

export default AuthProvider;