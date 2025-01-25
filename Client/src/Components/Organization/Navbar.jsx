import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/organisation"
              className="text-2xl font-bold text-green-600"
            >
              Samuhik Sankalpa
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/organisation/projects"
              className={`font-medium px-4 py-2 rounded-md hover:text-green-600 ${
                window.location.pathname === "/organisation/projects"
                  ? "bg-green-100 text-green-600"
                  : "text-gray-700"
              }`}
            >
              Projects
            </a>

            {/* Tools Dropdown */}
            <div className="relative z-50">
              <button
                className={`flex items-center font-medium px-4 py-2 rounded-md hover:text-green-600 ${
                  ["/organisation/costEstimation", "/organisation/contentgenerator", "/organisation/socialmedia"].includes(
                    window.location.pathname
                  )
                    ? "bg-green-100 text-green-600"
                    : "text-gray-700"
                }`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Tools
                <svg
                  className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
                  <a
                    href="/organisation/costEstimation"
                    className={`block px-4 py-2 font-medium rounded-md hover:bg-green-100 hover:text-green-600 ${
                      window.location.pathname === "/organisation/costEstimation"
                        ? "bg-green-100 text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    Cost Estimation
                  </a>
                  <a
                    href="/organisation/contentgenerator"
                    className={`block px-4 py-2 font-medium rounded-md hover:bg-green-100 hover:text-green-600 ${
                      window.location.pathname === "/organisation/contentgenerator"
                        ? "bg-green-100 text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    AI Content Generator
                  </a>
                  <a
                    href="/organisation/socialmedia"
                    className={`block px-4 py-2 font-medium rounded-md hover:bg-green-100 hover:text-green-600 ${
                      window.location.pathname === "/organisation/socialmedia"
                        ? "bg-green-100 text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    MultiPost
                  </a>
                </div>
              )}
            </div>

            <a
              href="/organisation/volunteers"
              className={`font-medium px-4 py-2 rounded-md hover:text-green-600 ${
                window.location.pathname === "/organisation/volunteers"
                  ? "bg-green-100 text-green-600"
                  : "text-gray-700"
              }`}
            >
              Volunteers
            </a>
            <a
              href="/organisation/leaderboard"
              className={`font-medium px-4 py-2 rounded-md hover:text-green-600 ${
                window.location.pathname === "/organisation/leaderboard"
                  ? "bg-green-100 text-green-600"
                  : "text-gray-700"
              }`}
            >
              Leaderboard
            </a>
            <a
              href="/organisation/contact"
              className={`font-medium px-4 py-2 rounded-md hover:text-green-600 ${
                window.location.pathname === "/organisation/contact"
                  ? "bg-green-100 text-green-600"
                  : "text-gray-700"
              }`}
            >
              Contact Us
            </a>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
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
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3">
            <a
              href="/organisation/projects"
              className={`block font-medium px-4 py-2 rounded-md hover:text-green-600 ${
                window.location.pathname === "/organisation/projects"
                  ? "bg-green-100 text-green-600"
                  : "text-gray-700"
              }`}
            >
              Projects
            </a>
            <a
              href="/organisation/volunteers"
              className={`block font-medium px-4 py-2 rounded-md hover:text-green-600 ${
                window.location.pathname === "/organisation/volunteers"
                  ? "bg-green-100 text-green-600"
                  : "text-gray-700"
              }`}
            >
              Volunteers
            </a>
            <a
              href="/organisation/leaderboard"
              className={`block font-medium px-4 py-2 rounded-md hover:text-green-600 ${
                window.location.pathname === "/organisation/leaderboard"
                  ? "bg-green-100 text-green-600"
                  : "text-gray-700"
              }`}
            >
              Leaderboard
            </a>
            <a
              href="/organisation/contact"
              className={`block font-medium px-4 py-2 rounded-md hover:text-green-600 ${
                window.location.pathname === "/organisation/contact"
                  ? "bg-green-100 text-green-600"
                  : "text-gray-700"
              }`}
            >
              Contact
            </a>
            {/* Mobile Logout */}
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
