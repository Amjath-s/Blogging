import React, { forwardRef, useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", placeholder = "", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full mb-2">
      {label && (
        <label
          className="block text-sm font-semibold text-gray-700 mb-1 pl-1 tracking-wide"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white placeholder-gray-400 transition ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});
export default Input;
