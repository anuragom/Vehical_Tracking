


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import { setUser } from './auth';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import 'react-toastify/dist/ReactToastify.css';

// const LoginPage = () => {
//   const [login_id, setLoginId] = useState('');
//   const [userpwd, setUserPwd] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('https://omhrms.omlogistics.co.in/api/login', {
//         login_id,
//         userpwd,
//       });

//       if (!response.data.error) {
//         console.log('Login Successful:', response.data);
//         setUser(response.data.user);
//         navigate('/dashboard');
//       } else {
//         toast.error(response.data.msg || 'Invalid credentials', {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "colored",
//         });
//       }
//     } catch (error) {
//       console.error('Login Failed:', error);
//       toast.error('Invalid credentials. Please try again.', {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       });
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-blue-50 px-4">
//       <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">

//         {/* Left Section */}
//         <div className="hidden md:flex md:w-1/2 bg-blue-100 items-center justify-center">
//           <img
//             src="/login2.png"
//             alt="Login Illustration"
//             className="w-4/5"
//           />
//         </div>

//         {/* Right Section */}
//         <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
//           <div className="flex justify-center mb-6">
//             <img
//               src="/logo.png"
//               alt="OM Logistics Logo"
//               className="h-24 md:h-32"
//             />
//           </div>

//           <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">Login To Continue</h2>

//           <form onSubmit={handleLogin}>
//             <div className="mb-4 md:mb-6">
//               <label className="block text-sm font-medium text-gray-700" htmlFor="empCode">
//                 Emp Code
//               </label>
//               <input
//                 id="empCode"
//                 type="text"
//                 placeholder="Enter your Employee Code"
//                 value={login_id}
//                 onChange={(e) => setLoginId(e.target.value)}
//                 className="w-full px-4 py-2 md:py-3 mt-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
//                 required
//               />
//             </div>

//             <div className="mb-4 md:mb-6">
//               <label className="block text-sm font-medium text-gray-700" htmlFor="password">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   value={userpwd}
//                   onChange={(e) => setUserPwd(e.target.value)}
//                   className="w-full px-4 py-2 md:py-3 mt-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full px-4 py-2 md:py-3 text-white bg-[#2E5870] rounded-md hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-200"
//             >
//               LOGIN
//             </button>
//           </form>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default LoginPage;






import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { setUser } from './auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [login_id, setLoginId] = useState('');
  const [userpwd, setUserPwd] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!login_id || !userpwd) {
      toast.error('Please fill out all fields.', { /* Toast Config */ });
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post('https://omhrms.omlogistics.co.in/api/login', { login_id, userpwd });
      
      if (!response.data.error) {
        setUser(response.data.user, response.data.token);
        navigate('/dashboard');
      } else {
        toast.error(response.data.msg || 'Invalid credentials', { /* Toast Config */ });
      }
    } catch (error) {
      console.error('Login Failed:', error);
      toast.error('An error occurred. Please try again.', { /* Toast Config */ });
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">

        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 bg-blue-100 items-center justify-center">
          <img
            src="/login2.png"
            alt="Login Illustration"
            className="w-4/5"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            <img
              src="/logo.png"
              alt="OM Logistics Logo"
              className="h-24 md:h-32"
            />
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">Login To Continue</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-4 md:mb-6">
              <label className="block text-sm font-medium text-gray-700" htmlFor="empCode">
                Emp Code
              </label>
              <input
                id="empCode"
                type="text"
                placeholder="Enter your Employee Code"
                value={login_id}
                onChange={(e) => setLoginId(e.target.value)}
                className="w-full px-4 py-2 md:py-3 mt-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                required
              />
            </div>

            <div className="mb-4 md:mb-6">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={userpwd}
                  onChange={(e) => setUserPwd(e.target.value)}
                  className="w-full px-4 py-2 md:py-3 mt-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 md:py-3 text-white bg-[#2E5870] rounded-md hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-200"
              disabled={loading}
            >
             {loading ? "Loading..." : "LOGIN"}
              
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;

