




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaTable } from "react-icons/fa";
// import axios from "axios";
// import Header from "./Header";
// import { Img } from "react-image";
// import { FaCar, FaArrowsAltH ,FaTruck ,  FaTools ,FaBan } from "react-icons/fa";

// function Dashboard() {
//   const navigate = useNavigate();
//   const [vehicleCount, setVehicleCount] = useState(0); // State for total vehicle count
//   const [notWorkingCount, setNotWorkingCount] = useState(0); // State for not working vehicle count

//   useEffect(() => {
//     // Fetch data from the API
//     const fetchData = async () => {
//       try {
//         const config = {
//           method: "get",
//           maxBodyLength: Infinity,
//           url: "https://omhrms.omlogistics.co.in/api/lorry_data",
//           headers: {},
//         };
//         const response = await axios.request(config);
//         const allVehicles = response.data;

//         // Calculate total vehicle count
//         setVehicleCount(allVehicles.length);

//         // Filter not working vehicles based on your logic
//         const filteredData = allVehicles.filter((item) => {
//           const isPreviousDate = (cdate) => {
//             if (!cdate) return false; // Exclude records without a date
//             const recordDate = new Date(cdate); // Parse the date from CDATE
//             const today = new Date();
//             today.setHours(0, 0, 0, 0); // Normalize today's date to midnight
//             return recordDate < today; // Include only records before today
//           };

//           return isPreviousDate(item.CDATE); // Filter vehicles by date
//         });

//         // Update not working vehicle count
//         setNotWorkingCount(filteredData.length);
//       } catch (error) {
//         console.error("Error fetching vehicle data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
    
//     <div>
//       {/* Fixed Header */}
//       <div className="fixed top-0 left-0 w-full z-10 bg-white shadow">
//         <Header />
//       </div>

//       {/* Background with img */}
//       <div className="relative h-screen flex items-center justify-center pt-24">
//         {/* Background Image */}
//         <Img
//           src="/landing6.webp"
//           alt="Background"
//           className="absolute top-0 left-0 w-full h-full object-cover -z-10"
//         />

//         {/* Content Section */}
//         <div className="text-center w-10/12 max-w-7xl bg-white bg-opacity-60 p-12 rounded-2xl shadow-lg">
//           <h1 className="text-5xl font-extrabold text-gray-900 mb-12">Vehicle Tracking Dashboard</h1>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Working Vehicle Card */}
//             <div
//               className="p-6 border border-blue-400 rounded-xl bg-blue-50 hover:bg-blue-100 shadow-md cursor-pointer transform transition-all hover:scale-105"
//               onClick={() => navigate("/all-india-vehicle")}
//             >
//               <FaTruck className="text-4xl text-blue-800 mb-4 mx-auto" />
//               <span className="block text-3xl font-bold text-blue-800">{vehicleCount}</span>
//               <p className="text-lg text-blue-800 font-medium">Working Vehicle</p>
//             </div>

//             {/* Not Working Vehicle Card */}
//             <div
//               className="p-6 border border-gray-400 rounded-xl bg-gray-50 hover:bg-gray-100 shadow-md cursor-pointer transform transition-all hover:scale-105"
//               onClick={() => navigate("/not-working-vehicle")}
//             >
//               < FaTruck className="text-4xl text-red-700 mb-4 mx-auto" />
//               <span className="block text-3xl font-bold text-gray-800">{notWorkingCount}</span>
//               <p className="text-lg text-gray-700 font-medium">Not Working Vehicle</p>
//             </div>

           
//            {/* Near By Card */}
// <div
//   className="p-10 border border-green-400 rounded-xl bg-gradient-to-br from-green-50 via-green-100 to-green-50 hover:from-green-100 hover:via-green-200 hover:to-green-100 shadow-lg cursor-pointer transform transition-all hover:scale-105"
//   onClick={() => navigate("/near-by")}
// >
//   <div className="flex justify-center items-center mb-4">
//     <FaCar className="text-3xl text-green-500 mx-2" />
//     <FaArrowsAltH className="text-2xl text-green-400 mx-4" />
//     <FaCar className="text-3xl text-green-500 mx-2" />
//   </div>
//   <p className="text-lg text-green-600 font-medium text-center">Near By</p>
// </div>

//           </div>
//         </div>
//       </div>
//     </div>
  
  

//   );
// }

// export default Dashboard;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTable, FaCar, FaArrowsAltH, FaTruck } from "react-icons/fa";
import axios from "axios";
import Header from "./Header";
import { Img } from "react-image";
import { ClipLoader } from "react-spinners";

function Dashboard() {
  const navigate = useNavigate();
  const [vehicleCount, setVehicleCount] = useState(0);
  const [notWorkingCount, setNotWorkingCount] = useState(0);
  const [loadingVehicle, setLoadingVehicle] = useState(true); // Loader for vehicle count
  const [loadingNotWorking, setLoadingNotWorking] = useState(true); // Loader for not working count

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: "https://omhrms.omlogistics.co.in/api/lorry_data",
        };
        const response = await axios.request(config);
        const allVehicles = response.data;

        // Set total vehicle count
        setVehicleCount(allVehicles.length);
        setLoadingVehicle(false); // Stop loader for vehicle count

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
        setLoadingNotWorking(false); // Stop loader for not working count
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
        setLoadingVehicle(false);
        setLoadingNotWorking(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-10 bg-white shadow">
        <Header />
      </div>

      {/* Background with img */}
      <div className="relative h-screen flex items-center justify-center pt-24">
        {/* Background Image */}
        <Img
          src="/landing6.webp"
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />

        {/* Content Section */}
        <div className="text-center w-11/12 max-w-7xl bg-white bg-opacity-70 p-6 sm:p-12 rounded-2xl shadow-lg">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-8">
            Vehicle Tracking Dashboard
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Working Vehicle Card */}
            <div
              className="p-6 border border-blue-400 rounded-xl bg-blue-50 hover:bg-blue-100 shadow-md cursor-pointer transform transition-all hover:scale-105"
              onClick={() => navigate("/all-india-vehicle")}
            >
              <FaTruck className="text-3xl sm:text-4xl text-blue-800 mb-4 mx-auto" />
              {loadingVehicle ? (
                <div className="flex justify-center items-center h-12">
                  <ClipLoader color="#2E5870" size={30} />
                </div>
              ) : (
                <span className="block text-2xl sm:text-3xl font-bold text-blue-800">
                  {vehicleCount}
                </span>
              )}
              <p className="text-sm sm:text-lg text-blue-800 font-medium">
                Working Vehicle
              </p>
            </div>

            {/* Not Working Vehicle Card */}
            <div
              className="p-6 border border-gray-400 rounded-xl bg-gray-50 hover:bg-gray-100 shadow-md cursor-pointer transform transition-all hover:scale-105"
              onClick={() => navigate("/not-working-vehicle")}
            >
              <FaTruck className="text-3xl sm:text-4xl text-red-700 mb-4 mx-auto" />
              {loadingNotWorking ? (
                <div className="flex justify-center items-center h-12">
                  <ClipLoader color="#A31F34" size={30} />
                </div>
              ) : (
                <span className="block text-2xl sm:text-3xl font-bold text-gray-800">
                  {notWorkingCount}
                </span>
              )}
              <p className="text-sm sm:text-lg text-gray-700 font-medium">
                Not Working Vehicle
              </p>
            </div>

            {/* Near By Card */}
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

