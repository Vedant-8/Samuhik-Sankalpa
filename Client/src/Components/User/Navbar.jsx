import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear authentication token or data
    navigate("/"); // Redirect to home page
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Website Name */}
          <Box
            className="cursor-pointer text-2xl font-bold text-green-600"
            onClick={() => navigate("/user")}
          >
            Samuhik Sankalpa
          </Box>

          {/* Desktop Navigation Buttons */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate("/user/shop")}
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Shop
            </button>
            <button
              onClick={() => navigate("/user/volunteer")}
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Volunteer
            </button>
            <button
              onClick={() => navigate("/user/rewards")}
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Rewards
            </button>
            <button
              onClick={() => navigate("/user/suggestion")}
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              AI suggestion for Donation
            </button>
            <button
              onClick={() => navigate("/user/games")}
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Games
            </button>
            <button
              onClick={() => navigate("/user/educational")}
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Educational
            </button>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-500 hover:text-green-600 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="space-y-1 px-2 pb-3">
            <button
              onClick={() => navigate("/user/shop")}
              className="block text-gray-700 hover:text-green-600 font-medium"
            >
              Shop
            </button>
            <button
              onClick={() => navigate("/user/volunteer")}
              className="block text-gray-700 hover:text-green-600 font-medium"
            >
              Volunteer
            </button>
            <button
              onClick={() => navigate("/user/rewards")}
              className="block text-gray-700 hover:text-green-600 font-medium"
            >
              Rewards
            </button>
            <button
              onClick={() => navigate("/user/suggestion")}
              className="block text-gray-700 hover:text-green-600 font-medium"
            >
              AI suggestion for Donation
            </button>
            <button
              onClick={() => navigate("/user/educational")}
              className="block text-gray-700 hover:text-green-600 font-medium"
            >
              Educational
            </button>
            {/* Mobile Logout Button */}
            <button
              onClick={handleLogout}
              className="block text-red-500 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
