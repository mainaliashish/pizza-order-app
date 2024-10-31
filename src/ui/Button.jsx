import React from "react";

const Button = ({ children, disabled }) => {
  return (
    <button
      disabled={disabled}
      className="inline-block rounded-lg bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-500 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1"
    >
      {children}
    </button>
  );
};

export default Button;
