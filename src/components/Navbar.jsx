import React from "react";

const Navbar = () => {
  return (
    <nav className="backdrop-blur-md bg-white/10 border-b border-gray-300 shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <span className="text-2xl font-bold text-black">
          Password Manager
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
