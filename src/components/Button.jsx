import React from "react";

const Button = ({ icon: Icon, text, className }) => {
  return (
    <div
      className={`flex items-center gap-2.5 p-2.5 pr-10 rounded-3xl text-gray-900 cursor-pointer hover:bg-primary-200 transition-all duration-300 ${className}`}
      //   onClick={onClick}
    >
      {Icon && <Icon size={20} />}
      <p>{text}</p>
    </div>
  );
};

export default Button;
