import React, { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      children,
      type = "button",
      bgColor = "bg-blue-600",
      textColor = "text-white",
      className = "",
      variant = "primary",
      size = "md",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
      secondary:
        "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 hover:border-gray-400",
      outline:
        "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
      danger:
        "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    };

    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const variantClasses = variants[variant] || variants.primary;
    const sizeClasses = sizes[size] || sizes.md;

    return (
      <button
        ref={ref}
        type={type}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
