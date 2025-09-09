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
            <Logo width="100%" />
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
          <Button
            type="button"
            onClick={() => authService.loginWithGoogle()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-full shadow-md transition"
          >
            Create Account google
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
