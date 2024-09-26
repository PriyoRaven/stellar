import React from "react";

const Card = ({ text, icon: Icon, className }) => {
  return (
    <div className="card h-48 p-4 bg-primary-100 rounded-xl relative cursor-pointer hover:bg-slate-200 transition-all duration-200">
      <p className="text-slate-600 text-lg">{text}</p>

      {Icon && (
        <Icon size={30} className={`absolute bottom-3 right-3  ${className}`} />
      )}
    </div>
  );
};

export default Card;
