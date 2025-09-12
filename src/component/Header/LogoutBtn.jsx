import React from "react";
import { useDispatch } from "react-redux";


import authservice from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authservice
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.error("Logout error:", error);
        // Even if logout fails, clear the local state
        dispatch(logout());
      });
  };

  return (
    <button
      className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      onClick={logoutHandler}
    >
      <span className="flex items-center justify-center w-full">

      <svg
          className=" mr-0 md:mr-2 flex  w-10 h-10 "
          
        
        stroke="currentColor"
        viewBox="0 0 24 24"
        >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          className="w-6 h-6 flex-shrink-0"
          />
      </svg>
      <span className=" hidden sm:block"> Logout </span>
          </span>
    </button>
  );
}

export default LogoutBtn;
