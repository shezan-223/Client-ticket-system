import React from "react";
import UseAuth from "./UseAuth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import useAxiosPublic from "../Hooks/UseAxiosPublic";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser, } = UseAuth();
  console.log(signInUser);
  const axiosPublic =useAxiosPublic()
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const handleLogin = (data) => {
    console.log("Attempting login for:", data.email);
    signInUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log("user logged in succesfully", user.email);
        axiosPublic.post("/jwt", { email: user.email })
        .then(jwtResponse =>{
          const token =jwtResponse.data.token
          localStorage.setItem('access-token', token);
          console.log("JWT token saved successfully.");
          

        })

        navigate(from, { replace: true })
        .catch(jwtError => {
                        console.error("JWT Fetch Error (Server):", jwtError);
                        // Optional: Display an error to the user if the server fails to issue a token
                    });
      })
      .catch((error) => {
        console.error("Firebase Login Error", error);
        // ⚠️ IMPROVEMENT: You should add a state variable here
        // to display the error message (e.g., "Invalid Credentials") to the user.
      });
  };
  return (
    <div>
      <div className="flex">
        <div className="card-body card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-30 mx-40 container">
          <h1 className="text-center text-3xl font-bold">Login Here</h1>

          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              {/* Email field */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}

              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  password should have minimun 6 Charecter{" "}
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  password should have one uppercase one lower case one number
                  and one special charecter{" "}
                </p>
              )}

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>

            <p>
              Don't have an Accout ?
              <Link className="text-blue-500 ml-2" to="/register">
                Register
              </Link>{" "}
            </p>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
