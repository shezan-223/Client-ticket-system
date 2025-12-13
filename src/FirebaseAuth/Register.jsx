import { useForm } from "react-hook-form";
import UseAuth from "./UseAuth";
import { Link, useLocation, useNavigate } from "react-router";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import axios from "axios";
import SocialLogin from "./SocialLogin";

const Register = () => {
  // 1. Hook and Context setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // ⚠️ IMPORTANT: Assuming your UseAuth provides 'registerUser' and 'updateUserProfile'
  const { registerUser, updateUserProfile } = UseAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();

  const imgbbkey = import.meta.env.VITE_IMGBB_KEY;
  const imgBbUrl = `https://api.imgbb.com/1/upload?key=${imgbbkey}`;

  const handleRegister = async (data) => {
    // 1. Destructure all necessary fields
    const { name, email, password, image } = data;
    const profileImageFile = image[0];

    try {
      // --- Phase 1: Upload Image to ImgBB ---
      const formData = new FormData();
      formData.append("image", profileImageFile);

      // Use axios for cleaner ImgBB upload
      const imgRes = await axios.post(imgBbUrl, formData);
      const photoURL = imgRes.data.data.url;

      // --- Phase 2: Create User in Firebase ---
      // ⚠️ NOTE: We do NOT pass name/photoURL here. We update the profile later.
      const dbResData = await registerUser(email, password, name, photoURL);

      
    
      // --- Phase 4: Create User in MongoDB (Using fixed data) ---
      

      if (dbResData.insertedId) {
        console.log("User created in Firebase & MongoDB successfully!");
        // Success message or navigation
        navigate(location.state ? location.state : "/");
      } else if (dbResData.message === "User already exists") {
        console.log("User logged in, but already in DB.");
        navigate(location.state ? location.state : "/");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      // Handle specific errors (e.g., Firebase error messages)
    }
  };

  return (
    <div className="flex">
      <div className="card-body card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-30 mx-40 container">
        <h1 className="text-center text-3xl font-bold">Register Here</h1>

        <form onSubmit={handleSubmit(handleRegister)}>
          <fieldset className="fieldset">
            {/* Name field */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required." })}
              className="input"
              placeholder="Enter Your Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            {/* Image Upload */}
            <label className="label">Upload Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Photo is required." })} // Changed field name to 'image' for consistency
              className="input"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}

            {/* Email field */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required." })}
              className="input"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* Password field */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                  message:
                    "Must have 1 uppercase, 1 lowercase, 1 number, and 1 special character",
                },
              })}
              className="input"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>

          <p>
            Already have an Account ?
            <Link className="text-blue-500 ml-2" to="/login">
              Login
            </Link>
          </p>
        </form>
        <br />
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
