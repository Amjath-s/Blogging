import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const signup = async (data) => {
    setError("");
    try {
      const response = await authService.createUser(data);
      if (response) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6f1] px-4 py-12">
      <div className="mx-auto w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <span className="inline-block w-24 mb-2">
            <Logo width="90%" />
          </span>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Create your account
          </h2>
          <p className="text-center text-base text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline transition-all duration-200"
            >
              Log in
            </Link>
          </p>
        </div>
        {error && <p className="text-red-600 mb-6 text-center">{error}</p>}
        <form onSubmit={handleSubmit(signup)} className="space-y-6">
          <Input
            label="Name"
            placeholder="Enter your name"
            className="w-full"
            {...register("name", { required: true })}
          />
          <Input
            label="Email:"
            placeholder="Enter your email"
            type="email"
            className="w-full"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) => {
                  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  return (
                    pattern.test(value) || "Please enter a valid email address"
                  );
                },
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="w-full"
            {...register("password", { required: true })}
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-full shadow-md transition"
          >
            Create Account
          </Button>
          <button
            onClick={() => authService.loginWithGoogle()}
            type="button"
            className=" w-full justify-center mt-4 inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 font-medium hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-google"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />{" "}
            </svg>
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
