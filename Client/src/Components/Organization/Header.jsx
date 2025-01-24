import React from "react";

const Header = () => {
  return (
    <header className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Organization Dashboard</h1>
      <div className="text-lg font-medium">
        <span>Organization Name: </span>
        <span className="font-bold text-yellow-300">Prerna</span>
      </div>
    </header>
  );
};

export default Header;
