import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

const Navbar = () => {
  const [activePage, setActivePage] = useState(""); // State to track the active page
  const [isOpen, setIsOpen] = useState(false); // State to track mobile menu visibility
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current path

  // Update the active page based on the current location
  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

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
            {[
              { path: "/user/shop", label: "Shop" },
              { path: "/user/bills", label: "Bills" },
              { path: "/user/recycle", label: "Recycle" },
              { path: "/user/rewards", label: "Rewards" },
              { path: "/user/volunteer", label: "Volunteer" },
              { path: "/user/educational", label: "Educational" },
            ].map(({ path, label }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`font-medium px-4 py-2 rounded-md ${
                  activePage === path
                    ? "bg-green-100 text-green-600" // Active page background
                    : "text-gray-700"
                } hover:text-green-600`} // Hover only changes text color
              >
                {label}
              </button>
            ))}
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
        <div className="md:hidden border-t border-gray-200">
          <div className="space-y-1 px-2 pb-3">
            {[
              { path: "/user/shop", label: "Shop" },
              { path: "/user/bills", label: "Bills" },
              { path: "/user/recycle", label: "Recycle" },
              { path: "/user/rewards", label: "Rewards" },
              { path: "/user/volunteer", label: "Volunteer" },
              { path: "/user/educational", label: "Educational" },
            ].map(({ path, label }) => (
              <button
                key={path}
                onClick={() => {
                  navigate(path);
                  setIsOpen(false); // Close menu after navigation
                }}
                className={`block font-medium px-4 py-2 rounded-md ${
                  activePage === path
                    ? "bg-green-100 text-green-700" // Active page background
                    : "text-gray-700"
                } hover:text-green-600`} // Hover only changes text color
              >
                {label}
              </button>
            ))}
            {/* Logout Button */}
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
