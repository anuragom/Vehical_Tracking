


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import axios from "axios";
// import Header from "./Header";
// import DataTable from "react-data-table-component";

// function NearByVehicle() {
//   const [searchAddress, setSearchAddress] = useState("");
//   const [searchLocation, setSearchLocation] = useState("");
//   const [apiResponse, setApiResponse] = useState([]);
//   const [hasSearched, setHasSearched] = useState(false);
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     setHasSearched(true);
//     const requestData = {
//       KM_BRANCH_FROM: searchAddress,
//       KM_BRANCH_TO: searchLocation,
//     };

//     axios
//       .post("https://omhrms.omlogistics.co.in/api/nearby", requestData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         console.log("API Response:", response.data);
//         // If response is an object, convert to array for uniform handling
//         const responseData = Array.isArray(response.data)
//           ? response.data
//           : [response.data];
//         setApiResponse(responseData);
//       })
//       .catch((error) => {
//         console.error("API Error:", error);
//         setApiResponse([]); // Clear data on error
//       });
//   };

//   const columns = [
//     {
//       name: "KM",
//       selector: (row) => row.KM || "N/A",
//       sortable: true,
//     },
//     {
//       name: "TAT SXL",
//       selector: (row) => row.TAT_SXL || "N/A",
//       sortable: true,
//     },
//     {
//       name: "TAT DXL",
//       selector: (row) => row.TAT_DXL || "N/A",
//       sortable: true,
//     },
//     {
//       name: "Remarks",
//       selector: (row) => row.REMARKS || "N/A",
//     },
//     {
//       name: "Route Via",
//       selector: (row) => row.ROUTE_VIA || "N/A",
//     },
//     {
//       name: "Verify By",
//       selector: (row) => row.VERIFY_BY || "N/A",
//     },
//     {
//       name: "Verify Date",
//       selector: (row) => row.VERIFY_DATE || "N/A",
//     },
//   ];

//   return (
//     <div>
//       {/* Header fixed at the top */}
//       <div className="fixed top-0 left-0 w-full bg-white shadow z-10">
//         <Header />
//       </div>

//       {/* Search Bar fixed below the header */}
//       <div className="fixed top-20 left-0 w-full bg-gray-100 shadow-md z-10">
//         <div className="flex items-center justify-between px-8 py-4">
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="flex items-center text-blue-800 hover:text-blue-600"
//           >
//             <FaArrowLeft className="text-2xl mr-2" />
//             <span className="text-lg font-bold">Back</span>
//           </button>

//           <div>
//             <span className="text-3xl font-bold text-blue-800">
//               Distance Between Vehicle
//             </span>
//           </div>
//         </div>

//         {/* Search Input Section */}
//         <div className="flex justify-between px-8 pb-4">
//           <div className="w-1/3">
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               From Branch (KM):
//             </label>
//             <input
//               type="text"
//               placeholder="Enter branch from"
//               className="border p-2 w-full rounded focus:outline-none"
//               value={searchAddress}
//               onChange={(e) => setSearchAddress(e.target.value)}
//             />
//           </div>

//           <div className="w-1/3">
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               To Branch (KM):
//             </label>
//             <input
//               type="text"
//               placeholder="Enter branch to"
//               className="border p-2 w-full rounded focus:outline-none"
//               value={searchLocation}
//               onChange={(e) => setSearchLocation(e.target.value)}
//             />
//           </div>

//           <div className="flex items-end">
//             <button
//               onClick={handleSearch}
//               className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-700"
//             >
//               Get Location
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* API Response Section */}
//       <div className="pt-56 px-8">
//         {hasSearched ? (
//           apiResponse.length > 0 ? (
//             <DataTable
//               title="API Response Data"
//               columns={columns}
//               data={apiResponse}
//               pagination
//               highlightOnHover
//               striped
//             />
//           ) : (
//             <p className="text-center text-lg font-semibold text-red-500 mt-10">
//               No data found. Please try again.
//             </p>
//           )
//         ) : (
//           <p className="text-center text-lg font-semibold text-gray-500 mt-10">
//             Please use the search fields above to get data.
//           </p>
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
  const [searchAddress, setSearchAddress] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [apiResponse, setApiResponse] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    setHasSearched(true);
    const requestData = {
      KM_BRANCH_FROM: searchAddress,
      KM_BRANCH_TO: searchLocation,
    };

    axios
      .post("https://omhrms.omlogistics.co.in/api/nearby", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("API Responses:", response.data);
        const responseData = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setApiResponse(responseData);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setApiResponse([]);
      });
  };

  const columns = [
    {
      name: "KM",
      selector: (row) => row.KM || "N/A",
      sortable: true,
    },
    {
      name: "TAT SXL",
      selector: (row) => row.TAT_SXL || "N/A",
      sortable: true,
    },
    {
      name: "TAT DXL",
      selector: (row) => row.TAT_DXL || "N/A",
      sortable: true,
    },
    {
      name: "Remarks",
      selector: (row) => row.REMARKS || "N/A",
    },
    {
      name: "Route Via",
      selector: (row) => row.ROUTE_VIA || "N/A",
    },
    {
      name: "Verify By",
      selector: (row) => row.VERIFY_BY || "N/A",
    },
    {
      name: "Verify Date",
      selector: (row) => row.VERIFY_DATE || "N/A",
    },
  ];

  return (
    <div>
      {/* Header fixed at the top */}
      <div className="fixed top-0 left-0 w-full bg-white shadow z-10">
        <Header />
      </div>

      {/* Search Bar fixed below the header */}
      <div className="fixed top-20 left-0 w-full bg-gray-100 shadow-md z-10">
        <div className="flex flex-wrap items-center justify-between px-4 py-4 space-y-4 sm:space-y-0 sm:flex-nowrap">
          {/* Back Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-blue-800 hover:text-blue-600"
          >
            <FaArrowLeft className="text-2xl mr-2" />
            <span className="text-lg sm:text-xl font-bold">Back</span>
          </button>

          {/* Title */}
          <div className="text-center text-blue-800">
            <span className="text-lg sm:text-2xl font-bold">
              Distance Between Vehicle
            </span>
          </div>
        </div>

        {/* Search Input Section */}
        <div className="flex flex-wrap sm:flex-nowrap justify-between px-4 space-y-4 sm:space-y-0 sm:space-x-4">
          {/* From Branch Input */}
          <div className="w-full sm:w-1/3">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              From Branch (KM):
            </label>
            <input
              type="text"
              placeholder="Enter branch from"
              className="border p-2 w-full rounded focus:outline-none"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
            />
          </div>

          {/* To Branch Input */}
          <div className="w-full sm:w-1/3">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              To Branch (KM):
            </label>
            <input
              type="text"
              placeholder="Enter branch to"
              className="border p-2 w-full rounded focus:outline-none"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>

          {/* Get Location Button */}
          <div className="w-full sm:w-auto flex items-center">
            <button
              onClick={handleSearch}
              className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
            >
              Get Location
            </button>
          </div>
        </div>
      </div>

      {/* API Response Section */}
      <div className="pt-80 md:pt-52 px-4">
        {hasSearched ? (
          apiResponse.length > 0 ? (
            <DataTable
              title=" Response Data"
              columns={columns}
              data={apiResponse}
              pagination
              highlightOnHover
              striped
            />
          ) : (
            <p className="text-center text-lg font-semibold text-red-500 mt-10">
              No data found. Please try again.
            </p>
          )
        ) : (
          <p className="text-center text-lg font-semibold text-gray-500 mt-10">
            Please use the search fields above to get data.
          </p>
        )}
      </div>
    </div>
  );
}

export default NearByVehicle;
