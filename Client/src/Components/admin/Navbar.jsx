import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/admin" className="text-2xl font-bold text-green-600">
              Samuhik Sankalpa
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/admin/analytics"
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Analytics
            </a>

            <a
              href="/admin/shop"
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Manage Shop
            </a>

            {/* 
            <a
              href="/organisation/leaderboard"
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Leaderboard
            </a>
            <a
              href="/organisation/contact"
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Contact Us
            </a> */}
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
              className="block text-gray-700 hover:text-green-600 font-medium"
            >
              Projects
            </a>
            <a
              href="/organisation/organizations"
              className="block text-gray-700 hover:text-green-600 font-medium"
            >
              Organizations
            </a>
            <a
              href="/organisation/about"
              className="block text-gray-700 hover:text-green-600 font-medium"
            >
              About Us
            </a>
            <a
              href="/organisation/contact"
              className="block text-gray-700 hover:text-green-600 font-medium"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;