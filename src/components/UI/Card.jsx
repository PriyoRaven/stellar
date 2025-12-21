import React from "react";

const Card = ({ text, icon: Icon, className }) => {
  return (
    <div className="group card h-32 sm:h-40 lg:h-44 p-4 sm:p-5 bg-primary-100 text-text rounded-2xl relative cursor-pointer border border-primary-200 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5">
      {/* Icon container with gradient */}
      {Icon && (
        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <Icon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      )}

      <p className="text-sm sm:text-base line-clamp-2 sm:line-clamp-3 text-text/90">{text}</p>
    </div>
  );
};

export default Card;
