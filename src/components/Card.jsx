import React from "react";

const Card = ({ text, icon: Icon, className }) => {
  return (
    <div className="card h-48 p-4 bg-primary-100 text-text rounded-xl relative cursor-pointer hover:bg-primary-200 transition-all duration-200">
      <p className="text-lg">{text}</p>

      {Icon && (
        <Icon size={30} className={`absolute bottom-3 right-3 ${className}`} />
      )}
    </div>
  );
};

export default Card;
