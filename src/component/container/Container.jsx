import React from "react";

function Container({ children }) {
  return (
    <div className="w-full mx-auto px-4 py-5 my-5 bg-white rounded-2xl shadow-lg">
      {children}
    </div>
  );
}

export default Container;
