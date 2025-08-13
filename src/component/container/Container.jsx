import React from "react";

function Container({ children }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 my-15  bg-red-800 rounded-2xl shadow-md">
      {children}
    </div>
  );
}

export default Container;
