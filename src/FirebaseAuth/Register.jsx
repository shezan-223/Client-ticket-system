import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "./UseAuth";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {registerUser}=UseAuth()
  
  


const handleRegister =(data)=>{
  console.log('this is',data);
  registerUser(data.email,data.password)
  .then(result =>{
    console.log(result.user);
    
  })
  .catch(error =>{
    console.log(error);
    
  })
  


}


  return<div className="flex" >

    
  <div className='card-body card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-30 mx-40 container'>
    <h1 className="text-center text-3xl font-bold">Register Here</h1>
  
            <form onSubmit={handleSubmit(handleRegister)} >

        <fieldset className="fieldset">




    {/* Name field */}
          <label className="label">Name</label>
          <input type="text" {...register("name",{required :true,})} className="input" placeholder="Enter Your Name" />

     {/* Email field */}
          <label className="label">Email</label>
          <input type="email" {...register("email",{required :true,})} className="input" placeholder="Email" />
          {
            errors.email?.type==="required"&&<p className='text-red-500 text-sm'>
                {errors.email.message}
            </p>

          }  

          {/* Photo Field */}
            <label className="label">Photo URL</label>
          <input type="text" {...register("photo",{required :true,})} className="input" placeholder="Enter photo URL" />
        
         



          <label className="label">Password</label>
          <input type="password" {...register("password",{required :true,minLength:6 , })} className="input" placeholder="Password" />
          {
            errors.password?.type==="required"&& <p className='text-red-500'>Password is required</p>
          }

           {
            errors.password?.type === "minLength" &&<p  className='text-red-500'>password should have minimun 6 Charecter </p>
          }
          {
            errors.password?.type === "pattern" && <p className='text-red-500'>password should have one uppercase one lower case one number and one special charecter </p>
          }



          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>

          <p>Already have an Accout ?
            <Link className = "text-blue-500 ml-2" to ="/login" >Login</Link> </p> 
          
            </form>
             <br />
            <SocialLogin></SocialLogin>
          
        </div>
  
  </div> 
  
};

export default Register;
