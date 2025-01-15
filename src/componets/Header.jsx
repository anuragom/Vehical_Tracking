
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUser, clearUser } from "../Auth/auth";

function Header() {
  const navigate = useNavigate();

  // Get user from auth.js
  const user = getUser();

  const handleLogout = () => {
    clearUser(); // Clear user on logout
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      {/* Left Section: Company Name and Logo */}
      <div className="flex items-center space-x-4">
        {/* Logo visible only on small screens and above */}
        <img
          src="/omlogo.png"
          alt="Company Logo"
          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full hidden sm:block"
        />
        <h1 className="text-base sm:text-lg font-bold whitespace-nowrap">
          Om Logistics Ltd
        </h1>
      </div>

      {/* Right Section: User Info and Logout Button */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <FaUserCircle size={24} />
          {/* Display user name in one line */}
          <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
            {user?.USER_USER_NAME || "User"}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-md"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
