import React from "react";
import { ShoppingBag } from "lucide-react";

const Button = ({ children, disabled, className = "", onClick, ...props }) => {
  return (
    <button 
      className={`border border-black bg-black text-white py-3 flex items-center justify-center ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      <ShoppingBag className="w-5 h-5 mr-2" />
      {children}
    </button>
  );
};

export default Button;