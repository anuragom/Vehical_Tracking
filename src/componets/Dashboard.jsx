


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaTruck, FaArrowsAltH, FaCar } from "react-icons/fa";
// import axios from "axios";
// import Header from "./Header";
// import { Img } from "react-image";
// import { ClipLoader } from "react-spinners";
// import { getToken } from "../Auth/auth";

// function Dashboard() {
//   const navigate = useNavigate();
//   const [vehicleCount, setVehicleCount] = useState(0);
//   const [notWorkingCount, setNotWorkingCount] = useState(0);
//   const [loadingVehicle, setLoadingVehicle] = useState(true);
//   const [loadingNotWorking, setLoadingNotWorking] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = getToken();
     

//       if (!token) {
//         console.error("Token is not available");
//         return;
//       }

//       try {
//         const config = {
//           method: "get",
//           url: "https://omhrms.omlogistics.co.in/api/lorry_data",
//           headers: {
//             Authorization: ` ${token}`, // Ensure 'Bearer' is used
//             "Content-Type": "application/json",
//           },
//         };

//         const response = await axios.request(config);
//         const allVehicles = response.data;

//         // Set total vehicle count
//         setVehicleCount(allVehicles.length);
//         setLoadingVehicle(false);

//         // Filter and set not working vehicle count
//         const filteredData = allVehicles.filter((item) => {
//           const isPreviousDate = (cdate) => {
//             if (!cdate) return false;
//             const recordDate = new Date(cdate);
//             const today = new Date();
//             today.setHours(0, 0, 0, 0);
//             return recordDate < today;
//           };
//           return isPreviousDate(item.CDATE);
//         });

//         setNotWorkingCount(filteredData.length);
//         setLoadingNotWorking(false);
//       } catch (error) {
//         console.error("Error fetching vehicle data:", error);
//         setLoadingVehicle(false);
//         setLoadingNotWorking(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="overflow-hidden">
//       <div className="fixed top-0 left-0 w-full z-10 bg-white shadow">
//         <Header />
//       </div>
//       <div className="relative fixed h-[100vh] flex items-center justify-center pt-24">
//         <Img
//           src="/landing6.webp"
//           alt="Background"
//           className="absolute top-0 left-0 w-full h-[100vh] object-cover -z-10"
//         />
//         <div className="text-center w-11/12 max-w-7xl bg-white bg-opacity-70 p-6 sm:p-12 rounded-2xl shadow-lg">
//           <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-8">
//             Vehicle Tracking Dashboard
//           </h1>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             <div
//               className="p-6 border border-blue-400 rounded-xl bg-blue-50 hover:bg-blue-100 shadow-md"
//               onClick={() => navigate("/all-india-vehicle")}
//             >
//               <FaTruck className="text-3xl sm:text-4xl text-blue-800 mb-4 mx-auto" />
//               {loadingVehicle ? (
//                 <ClipLoader color="#2E5870" size={30} />
//               ) : (
//                 <span className="block text-2xl font-bold">{vehicleCount}</span>
//               )}
//               <p className="text-blue-800 font-medium">Working Vehicle</p>
//             </div>

//             <div
//               className="p-6 border border-gray-400 rounded-xl bg-gray-50 hover:bg-gray-100 shadow-md"
//               onClick={() => navigate("/not-working-vehicle")}
//             >
//               <FaTruck className="text-3xl sm:text-4xl text-red-700 mb-4 mx-auto" />
//               {loadingNotWorking ? (
//                 <ClipLoader color="#A31F34" size={30} />
//               ) : (
//                 <span className="block text-2xl font-bold">
//                   {notWorkingCount}
//                 </span>
//               )}
//               <p className="text-gray-700 font-medium">Not Working Vehicle</p>
//             </div>
//             <div
//               className="p-6 border border-green-400 rounded-xl bg-green-50 hover:bg-green-100 shadow-md cursor-pointer transform transition-all hover:scale-105"
//               onClick={() => navigate("/near-by")}
//             >
//               <div className="flex justify-center items-center mb-4">
//                 <FaCar className="text-3xl text-green-500 mx-2" />
//                 <FaArrowsAltH className="text-2xl text-green-400 mx-4" />
//                 <FaCar className="text-3xl text-green-500 mx-2" />
//               </div>
//               <p className="text-sm sm:text-lg text-green-600 font-medium">
//                 Near By
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaTruck, FaArrowsAltH, FaCar } from "react-icons/fa";
// import axios from "axios";
// import Header from "./Header";
// import { Img } from "react-image";
// import { ClipLoader } from "react-spinners";
// import { getToken } from "../Auth/auth";

// function Dashboard() {
//   const navigate = useNavigate();
//   const [vehicleCount, setVehicleCount] = useState(0);
//   const [notWorkingCount, setNotWorkingCount] = useState(0);
//   const [loadingVehicle, setLoadingVehicle] = useState(true);
//   const [loadingNotWorking, setLoadingNotWorking] = useState(true);

//   // Prevent duplicate API calls during development in StrictMode
//   const isMounted = useRef(false);

//   useEffect(() => {
//     if (isMounted.current) return; // Skip if already called
//     isMounted.current = true;

//     const fetchData = async () => {
//       const token = getToken();

//       if (!token) {
//         console.error("Token is not available");
//         return;
//       }

//       try {
//         const config = {
//           method: "get",
//           url: "https://omhrms.omlogistics.co.in/api/lorry_data",
//           headers: {
//             Authorization: ` ${token}`, // Ensure 'Bearer' is used
//             "Content-Type": "application/json",
//           },
//         };

//         const response = await axios.request(config);
//         const allVehicles = response.data;

//         // Set total vehicle count
//         setVehicleCount(allVehicles.length);
//         setLoadingVehicle(false);

//         // Filter and set not working vehicle count
//         const filteredData = allVehicles.filter((item) => {
//           const isPreviousDate = (cdate) => {
//             if (!cdate) return false;
//             const recordDate = new Date(cdate);
//             const today = new Date();
//             today.setHours(0, 0, 0, 0);
//             return recordDate < today;
//           };
//           return isPreviousDate(item.CDATE);
//         });

//         setNotWorkingCount(filteredData.length);
//         setLoadingNotWorking(false);
//       } catch (error) {
//         console.error("Error fetching vehicle data:", error);
//         setLoadingVehicle(false);
//         setLoadingNotWorking(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="overflow-hidden">
//       <div className="fixed top-0 left-0 w-full z-10 bg-white shadow">
//         <Header />
//       </div>
//       <div className="relative fixed h-[100vh] flex items-center justify-center pt-24">
//         <Img
//           src="/landing6.webp"
//           alt="Background"
//           className="absolute top-0 left-0 w-full h-[100vh] object-cover -z-10"
//         />
//         <div className="text-center w-11/12 max-w-7xl bg-white bg-opacity-70 p-6 sm:p-12 rounded-2xl shadow-lg">
//           <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-8">
//             Vehicle Tracking Dashboard
//           </h1>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             <div
//               className="p-6 border border-blue-400 rounded-xl bg-blue-50 hover:bg-blue-100 shadow-md"
//               onClick={() => navigate("/all-india-vehicle")}
//             >
//               <FaTruck className="text-3xl sm:text-4xl text-blue-800 mb-4 mx-auto" />
//               {loadingVehicle ? (
//                 <ClipLoader color="#2E5870" size={30} />
//               ) : (
//                 <span className="block text-2xl font-bold">{vehicleCount}</span>
//               )}
//               <p className="text-blue-800 font-medium">Working Vehicle</p>
//             </div>

//             <div
//               className="p-6 border border-gray-400 rounded-xl bg-gray-50 hover:bg-gray-100 shadow-md"
//               onClick={() => navigate("/not-working-vehicle")}
//             >
//               <FaTruck className="text-3xl sm:text-4xl text-red-700 mb-4 mx-auto" />
//               {loadingNotWorking ? (
//                 <ClipLoader color="#A31F34" size={30} />
//               ) : (
//                 <span className="block text-2xl font-bold">
//                   {notWorkingCount}
//                 </span>
//               )}
//               <p className="text-gray-700 font-medium">Not Working Vehicle</p>
//             </div>
//             <div
//               className="p-6 border border-green-400 rounded-xl bg-green-50 hover:bg-green-100 shadow-md cursor-pointer transform transition-all hover:scale-105"
//               onClick={() => navigate("/near-by")}
//             >
//               <div className="flex justify-center items-center mb-4">
//                 <FaCar className="text-3xl text-green-500 mx-2" />
//                 <FaArrowsAltH className="text-2xl text-green-400 mx-4" />
//                 <FaCar className="text-3xl text-green-500 mx-2" />
//               </div>
//               <p className="text-sm sm:text-lg text-green-600 font-medium">
//                 Near By
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaTruck, FaArrowsAltH, FaCar } from "react-icons/fa";
import axios from "axios";
import Header from "./Header";
import { Img } from "react-image";
import { ClipLoader } from "react-spinners";
import { getToken } from "../Auth/auth";

function Dashboard() {
  const navigate = useNavigate();
  const [vehicleCount, setVehicleCount] = useState(0);
  const [notWorkingCount, setNotWorkingCount] = useState(0);
  const [loadingVehicle, setLoadingVehicle] = useState(true);
  const [loadingNotWorking, setLoadingNotWorking] = useState(true);

  // Prevent duplicate API calls during development in StrictMode
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return; // Skip if already called
    isMounted.current = true;

    const fetchData = async () => {
      const token = getToken();

      if (!token) {
        console.error("Token is not available");
        return;
      }

      try {
        const config = {
          method: "get",
          url: "https://omhrms.omlogistics.co.in/api/lorry_data",
          headers: {
            Authorization: ` ${token}`, // Ensure 'Bearer' is used
            "Content-Type": "application/json",
          },
        };

        const response = await axios.request(config);
        const allVehicles = response.data;

        // Set total vehicle count
        setVehicleCount(allVehicles.length);
        setLoadingVehicle(false);

        // Filter and set not working vehicle count
        const filteredData = allVehicles.filter((item) => {
          const isPreviousDate = (cdate) => {
            if (!cdate) return false;
            const recordDate = new Date(cdate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return recordDate < today;
          };
          return isPreviousDate(item.CDATE);
        });

        setNotWorkingCount(filteredData.length);
        setLoadingNotWorking(false);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
        setLoadingVehicle(false);
        setLoadingNotWorking(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-10 bg-white shadow">
        <Header />
      </div>
      <div className="relative fixed h-[100vh] flex items-center justify-center pt-24">
        <Img
          src="/landing6.webp"
          alt="Background"
          className="absolute top-0 left-0 w-full h-[100vh] object-cover -z-10"
        />
        <div className="text-center w-11/12 max-w-7xl bg-white bg-opacity-70 p-6 sm:p-12 rounded-2xl shadow-lg">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-8">
            Vehicle Tracking Dashboard
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div
              className="p-6 border border-blue-400 rounded-xl bg-blue-50 hover:bg-blue-100 shadow-md"
              onClick={() => navigate("/all-india-vehicle")}
            >
              <FaTruck className="text-3xl sm:text-4xl text-blue-800 mb-4 mx-auto" />
              {loadingVehicle ? (
                <ClipLoader color="#2E5870" size={30} />
              ) : (
                <span className="block text-2xl font-bold">{vehicleCount}</span>
              )}
              <p className="text-blue-800 font-medium">Working Vehicle</p>
            </div>

            <div
              className="p-6 border border-gray-400 rounded-xl bg-gray-50 hover:bg-gray-100 shadow-md"
              onClick={() => navigate("/not-working-vehicle")}
            >
              <FaTruck className="text-3xl sm:text-4xl text-red-700 mb-4 mx-auto" />
              {loadingNotWorking ? (
                <ClipLoader color="#A31F34" size={30} />
              ) : (
                <span className="block text-2xl font-bold">
                  {notWorkingCount}
                </span>
              )}
              <p className="text-gray-700 font-medium">Not Working Vehicle</p>
            </div>
            <div
              className="p-6 border border-green-400 rounded-xl bg-green-50 hover:bg-green-100 shadow-md cursor-pointer transform transition-all hover:scale-105"
              onClick={() => navigate("/near-by")}
            >
              <div className="flex justify-center items-center mb-4">
                <FaCar className="text-3xl text-green-500 mx-2" />
                <FaArrowsAltH className="text-2xl text-green-400 mx-4" />
                <FaCar className="text-3xl text-green-500 mx-2" />
              </div>
              <p className="text-sm sm:text-lg text-green-600 font-medium">
                Near By
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
