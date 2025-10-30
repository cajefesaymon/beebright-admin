import React from "react";

const Card = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm ${className}`}>
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
