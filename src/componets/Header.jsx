
// import React from 'react';
// import { FaUserCircle } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { getUser, clearUser } from '../Auth/auth';

// function Header() {
//   const navigate = useNavigate();

//   // Get user from auth.js
//   const user = getUser();

//   const handleLogout = () => {
//     clearUser();  // Clear user on logout
//     navigate('/login');
//   };

//   return (
//     <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      
//       {/* Left Section: Logo and Company Name */}
//       <div className="flex items-center space-x-4">
//         <img
//           src="/omlogo.png"
//           alt="Company Logo"
//           className="h-14 w-14 rounded-2xl"
//         />
//         <h1 className="text-2xl font-bold">Om Logistics Ltd.</h1>
//       </div>

//       {/* Right Section: User Info and Logout Button */}
//       <div className="flex items-center space-x-4">
//         <div className="flex items-center space-x-2">
//           <FaUserCircle size={32} />
//           {/* Display User Name Dynamically */}
//           <span className="hidden md:inline">
//             {user?.USER_USER_NAME || 'User'}
//           </span>
//         </div>
        
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }

// export default Header;


import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getUser, clearUser } from '../Auth/auth';

function Header() {
  const navigate = useNavigate();

  // Get user from auth.js
  const user = getUser();

  const handleLogout = () => {
    clearUser(); // Clear user on logout
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      {/* Left Section: Company Name (Logo hidden in mobile view) */}
      <div className="flex items-center space-x-4">
        <img
          src="/omlogo.png"
          alt="Company Logo"
          className="h-10 w-14 rounded-full hidden md:block" // Logo hidden in mobile view
        />
        <h1 className="text-lg font-bold whitespace-nowrap">Om Logistics Ltd</h1>
      </div>

      {/* Right Section: User Info and Logout Button */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FaUserCircle size={28} />
          {/* Ensure the name is always visible */}
          <span className="text-sm md:text-base">
            {user?.USER_USER_NAME || 'User'}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-md"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
