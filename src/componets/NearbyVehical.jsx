

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import axios from "axios";
// import Header from "./Header";
// import DataTable from "react-data-table-component";

// function NearByVehicle() {
//   const [bcode, setBcode] = useState("");
//   const [km, setKm] = useState("");
//   const [searchDevice, setSearchDevice] = useState("");
//   const [apiResponse, setApiResponse] = useState([]);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     if (!bcode || !km) {
//       alert("Please enter both branch code (bcode) and distance (km).");
//       return;
//     }

//     setHasSearched(true);
//     setIsLoading(true);

//     const requestData = { bcode, km: parseFloat(km) };

//     axios
//       .post("https://omhrms.omlogistics.co.in/api/nearby", requestData, {
//         headers: { "Content-Type": "application/json" },
//       })
//       .then((response) => {
//         setApiResponse(Array.isArray(response.data) ? response.data : [response.data]);
//       })
//       .catch(() => setApiResponse([]))
//       .finally(() => setIsLoading(false));
//   };

//   // Filter data based on Device Number
//   const filteredData = apiResponse.filter((row) =>
//     row.DEVICE?.toLowerCase().includes(searchDevice.toLowerCase())
//   );

//   const columns = [
//     { name: "Vendor Name", selector: (row) => row.VEND_NAME || "N/A", sortable: true , width: "140px"},
//     { name: "Device", selector: (row) => row.DEVICE || "N/A", sortable: true },
//     { name: "Latitude", selector: (row) => row.LATITUDE || "N/A", sortable: true },
//     { name: "Longitude", selector: (row) => row.LONGITUDE || "N/A", sortable: true },
//     { 
//       name: "Full Address", 
//       selector: (row) => row.ADDRESS || "N/A", 
//       wrap: true, 
//       width: "300px"
//     },
//     { name: "Capacity", selector: (row) => row.CAPACITY || "N/A", sortable: true },
//     { name: "Distance (KM)", selector: (row) => row.DISTANCE || "N/A", sortable: true , width: "130px" },
//     { name: "Loaded Weight", selector: (row) => row.LOADED_WT || "N/A" },
//     { name: "Utilization (%)", selector: (row) => row.UTILIZE || "N/A" },
//     {
//       name: "API Link",
//       cell: (row) =>
//         row.API_LINK ? (
//           <a href={row.API_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//             View
//           </a>
//         ) : (
//           "N/A"
//         ),
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
//         <Header />
//       </div>

//       {/* Search Bar */}
//       <div className="fixed top-16 left-0 w-full bg-gray-100 text-blue-700 shadow-md z-10 py-4 px-6">
//         <div className="flex flex-wrap items-center justify-between">
//           <button onClick={() => navigate("/dashboard")} className="flex items-center text-white hover:text-gray-200">
//             <FaArrowLeft className="text-xl mr-2 text-blue-700 " />
//             <span className="text-lg text-blue-700 font-bold">Back</span>
//           </button>
//           <h2 className="text-lg sm:text-2xl font-bold text-center">Find Nearby Vehicles</h2>
//         </div>
//       </div>

//       {/* Input Fields & Search Bar Alignment */}
//       <div className="mt-28 px-6">
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Branch Code (bcode):</label>
//               <input
//                 type="text"
//                 placeholder="Enter branch code"
//                 className="border p-2 w-full rounded-md focus:ring focus:ring-blue-300"
//                 value={bcode}
//                 onChange={(e) => setBcode(e.target.value)}
//               />
//             </div>

//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Distance (KM):</label>
//               <input
//                 type="number"
//                 placeholder="Enter distance"
//                 className="border p-2 w-full rounded-md focus:ring focus:ring-blue-300"
//                 value={km}
//                 onChange={(e) => setKm(e.target.value)}
//               />
//             </div>

//             {hasSearched && (
//               <div>
//                 <label className="block mb-2 text-sm font-semibold text-gray-700">Search by Device Number:</label>
//                 <input
//                   type="text"
//                   placeholder="Enter device number"
//                   className="border p-2 w-full rounded-md focus:ring focus:ring-blue-300"
//                   value={searchDevice}
//                   onChange={(e) => setSearchDevice(e.target.value)}
//                 />
//               </div>
//             )}

//             <div className="flex justify-between items-center">
//               <button
//                 onClick={handleSearch}
//                 className="bg-blue-800 text-white px-4 py-2  whitespace-nowrap rounded-lg hover:bg-blue-700 transition"
//               >
//                 Get Vehicles
//               </button>
//               {hasSearched && <div className="text-lg font-bold  whitespace-nowrap text-blue-800">Total Vehicles: {filteredData.length}</div>}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* API Response Table */}
//       <div className="mt-6 px-6">
//         {hasSearched ? (
//           isLoading ? (
//             <div className="text-center text-lg font-semibold text-blue-800">Loading...</div>
//           ) : filteredData.length > 0 ? (
//             <div className="bg-white shadow-lg rounded-lg p-6">
//               <DataTable
//                 columns={columns}
//                 data={filteredData}
//                 highlightOnHover
//                 striped
//                 fixedHeader
//                 fixedHeaderScrollHeight="500px"
//                 noDataComponent="No vehicles found in the specified range."
//               />
//             </div>
//           ) : (
//             <p className="text-center text-lg font-semibold text-red-500 mt-10">No vehicles found in the specified range.</p>
//           )
//         ) : (
//           <p className="text-center text-lg font-semibold text-gray-500 mt-10"></p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default NearByVehicle;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import Header from "./Header";
import DataTable from "react-data-table-component";

function NearByVehicle() {
  const [bcode, setBcode] = useState("");
  const [km, setKm] = useState("");
  const [searchDevice, setSearchDevice] = useState("");
  const [apiResponse, setApiResponse] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!bcode || !km) {
      alert("Please enter both branch code (bcode) and distance (km).");
      return;
    }

    setHasSearched(true);
    setIsLoading(true);

    const requestData = { bcode, km: parseFloat(km) };

    axios
      .post("https://omhrms.omlogistics.co.in/api/nearby", requestData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setApiResponse(Array.isArray(response.data) ? response.data : [response.data]);
      })
      .catch(() => setApiResponse([]))
      .finally(() => setIsLoading(false));
  };

  // Filter data based on Device Number
  const filteredData = apiResponse.filter((row) =>
    row.DEVICE?.toLowerCase().includes(searchDevice.toLowerCase())
  );

  const columns = [
    { name: "Vendor Name", selector: (row) => row.VEND_NAME || "N/A", sortable: true, width: "140px" },
    { name: "Device", selector: (row) => row.DEVICE || "N/A", sortable: true },
    { name: "Latitude", selector: (row) => row.LATITUDE || "N/A", sortable: true },
    { name: "Longitude", selector: (row) => row.LONGITUDE || "N/A", sortable: true },
    { 
      name: "Full Address", 
      selector: (row) => row.ADDRESS || "N/A", 
      wrap: true, 
      width: "300px" 
    },
    { name: "Capacity", selector: (row) => row.CAPACITY || "N/A", sortable: true },
    { 
      name: "Distance (KM)", 
      selector: (row) => row.DISTANCE ? parseFloat(row.DISTANCE).toFixed(2) : "N/A", 
      sortable: true, 
      width: "130px" 
    },
    { name: "Loaded Weight", selector: (row) => row.LOADED_WT || "N/A" },
    { name: "Utilization (%)", selector: (row) => row.UTILIZE || "N/A" },
    {
      name: "API Link",
      cell: (row) =>
        row.API_LINK ? (
          <a href={row.API_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            View
          </a>
        ) : (
          "N/A"
        ),
    },
  ];

  // Handle distance input validation
  const handleKmChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setKm(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
        <Header />
      </div>

      {/* Search Bar */}
      <div className="fixed top-16 left-0 w-full bg-gray-100 text-blue-700 shadow-md z-10 py-4 px-6">
        <div className="flex flex-wrap items-center justify-between">
          <button onClick={() => navigate("/dashboard")} className="flex items-center text-white hover:text-gray-200">
            <FaArrowLeft className="text-xl mr-2 text-blue-700 " />
            <span className="text-lg text-blue-700 font-bold">Back</span>
          </button>
          <h2 className="text-lg sm:text-2xl font-bold text-center">Find Nearby Vehicles</h2>
        </div>
      </div>

      {/* Input Fields & Search Bar Alignment */}
      <div className="mt-28 px-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Branch Code (bcode):</label>
              <input
                type="text"
                placeholder="Enter branch code"
                className="border p-2 w-full rounded-md focus:ring focus:ring-blue-300"
                value={bcode}
                onChange={(e) => setBcode(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Distance (KM):</label>
              <input
                type="text"
                placeholder="Enter distance"
                className="border p-2 w-full rounded-md focus:ring focus:ring-blue-300"
                value={km}
                onChange={handleKmChange}
              />
            </div>

            {hasSearched && (
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Search by Device Number:</label>
                <input
                  type="text"
                  placeholder="Enter device number"
                  className="border p-2 w-full rounded-md focus:ring focus:ring-blue-300"
                  value={searchDevice}
                  onChange={(e) => setSearchDevice(e.target.value)}
                />
              </div>
            )}

            <div className="flex justify-between items-center">
              <button
                onClick={handleSearch}
                className="bg-blue-800 text-white px-4 py-2  whitespace-nowrap rounded-lg hover:bg-blue-700 transition"
              >
                Get Vehicles
              </button>
              {hasSearched && <div className="text-lg font-bold  whitespace-nowrap text-blue-800">Total Vehicles: {filteredData.length}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* API Response Table */}
      <div className="mt-6 px-6">
        {hasSearched ? (
          isLoading ? (
            <div className="text-center text-lg font-semibold text-blue-800">Loading...</div>
          ) : filteredData.length > 0 ? (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <DataTable
                columns={columns}
                data={filteredData}
                highlightOnHover
                striped
                fixedHeader
                fixedHeaderScrollHeight="500px"
                noDataComponent="No vehicles found in the specified range."
              />
            </div>
          ) : (
            <p className="text-center text-lg font-semibold text-red-500 mt-10">No vehicles found in the specified range.</p>
          )
        ) : (
          <p className="text-center text-lg font-semibold text-gray-500 mt-10"></p>
        )}
      </div>
    </div>
  );
}

export default NearByVehicle;
