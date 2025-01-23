

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import Header from "./Header";
import DataTable from "react-data-table-component";

function NearByVehicle() {
  const [searchAddress, setSearchAddress] = useState("");
  const [searchDistance, setSearchDistance] = useState("");
  const [apiResponse, setApiResponse] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchAddress || !searchDistance) {
      alert("Please enter both address and distance.");
      return;
    }

    setHasSearched(true);
    setIsLoading(true); // Set loading to true

    const requestData = {
      address: searchAddress,
      distance: parseFloat(searchDistance),
    };

    axios
      .post("https://omhrms.omlogistics.co.in/geocode/nearby", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const responseData = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setApiResponse(responseData);
      })
      .catch(() => {
        setApiResponse([]);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false after API call
      });
  };

  const columns = [
    { name: "Vendor Name", selector: (row) => row.VEND_NAME || "N/A", sortable: true },
    { name: "Device", selector: (row) => row.DEVICE || "N/A", sortable: true },
    { name: "Latitude", selector: (row) => row.LATITUDE || "N/A", sortable: true },
    { name: "Longitude", selector: (row) => row.LONGITUDE || "N/A", sortable: true },
    { name: "Address", selector: (row) => row.ADDRESS || "N/A" },
    { name: "Capacity", selector: (row) => row.CAPACITY || "N/A", sortable: true },
    { name: "Distance (KM)", selector: (row) => row.DISTANCE || "N/A", sortable: true },
    { name: "Loaded Weight", selector: (row) => row.LOADED_WT || "N/A" },
    { name: "Utilization (%)", selector: (row) => row.UTILIZE || "N/A" },
    { name: "API Link", cell: (row) => <a href={row.API_LINK} target="_blank" rel="noopener noreferrer">View</a> },
  ];

  return (
    <div>
      {/* Header fixed at the top */}
      <div className="fixed top-0 left-0 w-full bg-white shadow z-10">
        <Header />
      </div>

      {/* Search Bar */}
      <div className="fixed top-20 left-0 w-full bg-gray-100 shadow-md z-10 ">
        <div className="flex flex-wrap items-center justify-between px-4 py-4 space-y-4 sm:space-y-0 sm:flex-nowrap">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-blue-800 hover:text-blue-600"
          >
            <FaArrowLeft className="text-2xl mr-2" />
            <span className="text-lg sm:text-xl font-bold">Back</span>
          </button>

          <div className="text-center text-blue-800">
            <span className="text-lg sm:text-2xl font-bold">
              Find Nearby Vehicles
            </span>
          </div>
        </div>

        {/* Search Input Section */}
        <div className="flex flex-wrap sm:flex-nowrap  justify-between px-4 space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-1/2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Address:
            </label>
            <input
              type="text"
              placeholder="Enter proper address"
              className="border p-2 w-full rounded focus:outline-none"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
            />
          </div>

          <div className="w-full sm:w-1/3">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Distance (KM):
            </label>
            <input
              type="number"
              placeholder="Enter distance"
              className="border p-2 w-full rounded focus:outline-none"
              value={searchDistance}
              onChange={(e) => setSearchDistance(e.target.value)}
            />
          </div>

          <div className="w-full sm:w-auto flex items-center">
            <button
              onClick={handleSearch}
              className="bg-blue-800 text-white mt-6 px-6 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
            >
              Get Vehicles
            </button>
          </div>
        </div>
      </div>

      {/* API Response Section */}
      <div className="pt-80 md:pt-52 px-4">
        {hasSearched ? (
          isLoading ? (
            <div className="text-center text-lg font-semibold text-blue-800">
              Loading...
            </div>
          ) : apiResponse.length > 0 ? (
            <DataTable
              
              columns={columns}
              data={apiResponse}
              highlightOnHover
              striped
              fixedHeader
              fixedHeaderScrollHeight="400px"
              noDataComponent="No vehicles found in the specified range."
            />
          ) : (
            <p className="text-center text-lg font-semibold text-red-500 mt-10">
              No vehicles found in the specified range.
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
