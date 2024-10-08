import React from "react";

const Button = ({
  icon: Icon,
  text,
  className,
  showText = true,
  fadeIn,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex mr-2 items-center gap-2.5 p-2.5 rounded-3xl text-text cursor-pointer hover:bg-primary-200 transition-all duration-300 ${className}`}
    >
      {Icon && <Icon size={20} />}
      {showText && (
        <p
          className={`transition-opacity duration-300 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default Button;
