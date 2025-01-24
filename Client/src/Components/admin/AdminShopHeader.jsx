import React from "react";
import { FaBoxOpen, FaWarehouse } from "react-icons/fa"; // Icons for visuals

const AdminShopHeader = ({ totalProducts, totalStock }) => {
  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        {/* Title */}
        <h1 className="text-3xl font-bold tracking-wide">Shop Management</h1>
        {/* Stats */}
        <div className="flex space-x-8">
          {/* Total Products */}
          <div className="flex items-center space-x-4 bg-white bg-opacity-20 p-4 rounded-lg shadow">
            <div className="text-4xl text-yellow-300">
              <FaBoxOpen />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Total Products</h2>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
          </div>
          {/* Total Stock */}
          <div className="flex items-center space-x-4 bg-white bg-opacity-20 p-4 rounded-lg shadow">
            <div className="text-4xl text-purple-300">
              <FaWarehouse />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Total Stock</h2>
              <p className="text-2xl font-bold">{totalStock}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminShopHeader;
