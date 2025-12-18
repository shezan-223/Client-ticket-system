import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from './firebase.init';
import { GoogleAuthProvider } from 'firebase/auth';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import useAxiosPublic from '../Hooks/UseAxiosPublic';




const AuthProvider = ({children}) => {
   
    const axiosPublic =useAxiosPublic()

const [user,setUser]=useState(null)
const [loading ,setLoading]= useState(true) 


const registerUser =async(email, password,name, photoURL)=>{ // ⬅️ Remove name/photoURL from signature if you use updateUserProfile separately

    setLoading(true);

    const result = await createUserWithEmailAndPassword(auth, email, password);
    const authuser = result.user;
    
    await updateProfile(authuser, {
            displayName: name,
            photoURL: photoURL || null,
        });

        const dbRes = await axiosPublic.post('/users', {
            name: name,
            email: authuser.email,
            photo: photoURL,
            role: "user",
        });

        setLoading(false);
        // Return the MongoDB response data for the Register component to check
        return dbRes.data;

    
  
}


const signInUser = (email, password) => { // ⬅️ NEW FUNCTION
    setLoading(true);
    // Use the correct Firebase function for signing in
    return signInWithEmailAndPassword(auth, email, password); 
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
         logOut,
         signInUser
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