

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import Header from "./Header";

// const generateDummyData = () => {
//   const data = [];
//   for (let i = 1; i <= 100; i++) {
//     data.push({
//       slNo: i,
//       vendName: `Vendor ${i}`,
//       vehicleNo: `MH12AB${1000 + i}`,
//       attachType: `Type ${i % 3}`,
//       lastUpdate: `2024-12-${(i % 30) + 1}`,
//       vehicleType: i % 2 === 0 ? "Truck" : "Van",
//       ownerNo: `98765432${i}`,
//       address: `City ${i}`,
//       map: "View Map",
//     });
//   }
//   return data;
// };

// function NotWorkingVehical() {
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     setData(generateDummyData());
//   }, []);

//   const handleSearch = () => {
//     setSearchTerm(searchQuery);
//   };

//   const filteredData = data.filter(
//     (item) =>
//       item.vendName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       {/* Header fixed at the top */}
//       <div className="fixed top-0  left-0 w-full bg-white shadow z-10">
//         <Header />
//       </div>

//       {/* Search Bar fixed below the header */}
//       <div className="fixed top-20 left-0 w-full bg-gray-100 shadow-md z-10">
//         <div className="flex items-center justify-between px-8 py-2">
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="flex items-center text-blue-800 hover:text-blue-600"
//           >
//             <FaArrowLeft className="text-2xl mr-2" />
//             <span className="text-lg font-bold">Back</span>
//           </button>
//           <div
           
//             className="flex items-center text-blue-800 hover:text-blue-600"
//           >
            
//             <span className="text-3xl font-bold">Not Working Vehical</span>
//           </div>
//           <div className="flex w-1/2">
//             <input
//               type="text"
//               placeholder="Search by Vendor or Vehicle No"
//               className="border p-2 w-full rounded-l focus:outline-none"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button
//               onClick={handleSearch}
//               className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="pt-32 mt-4 p-8">
//         <table className="table-auto w-full border border-gray-300 rounded-lg shadow-lg">
//           <thead>
//             <tr className="bg-blue-100 text-blue-800">
//               <th className="border px-4 py-2">Sl No</th>
//               <th className="border px-4 py-2">VEND NAME</th>
//               <th className="border px-4 py-2">VEHICLE NO</th>
//               <th className="border px-4 py-2">ATTACH TYPE</th>
//               <th className="border px-4 py-2">LAST UPDATE</th>
//               <th className="border px-4 py-2">VEHICLE TYPE</th>
//               <th className="border px-4 py-2">OWNER NO</th>
//               <th className="border px-4 py-2">ADDRESS</th>
//               <th className="border px-4 py-2">MAP</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item, index) => (
//               <tr key={index} className="text-center hover:bg-blue-50">
//                 <td className="border px-4 py-2">{item.slNo}</td>
//                 <td className="border px-4 py-2">{item.vendName}</td>
//                 <td className="border px-4 py-2">{item.vehicleNo}</td>
//                 <td className="border px-4 py-2">{item.attachType}</td>
//                 <td className="border px-4 py-2">{item.lastUpdate}</td>
//                 <td className="border px-4 py-2">{item.vehicleType}</td>
//                 <td className="border px-4 py-2">{item.ownerNo}</td>
//                 <td className="border px-4 py-2">{item.address}</td>
//                 <td className="border px-4 py-2 text-blue-500 cursor-pointer">
//                   {item.map}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default NotWorkingVehical;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import Header from "./Header";

function NotWorkingVehicleTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://omhrms.omlogistics.co.in/api/lorry_data");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter data based on search term and date
  const filteredData = data.filter((item) => {
    const isPreviousDate = (cdate) => {
      if (!cdate) return false; // Exclude records without a date
      const recordDate = new Date(cdate); // Parse the date from CDATE
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today's date to midnight
      return recordDate < today; // Include only records before today
    };

    return (
      isPreviousDate(item.CDATE) &&
      ((item.VEND_NAME || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.DEVICE || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.OWNER_NO || "").toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Preprocess data for CSV export
  const preprocessDataForCSV = (data) => {
    return data.map((item, index) => ({
      "Sl No": index + 1,
      "VEND NAME": item.VEND_NAME || "N/A",
      "VEHICLE NO": item.DEVICE || "N/A",
      "ATTACH TYPE": item.ATTCH_TYPE || "N/A",
      "LAST UPDATE": item.CDATE
        ? `${item.CDATE.split("T")[0]} ${item.CTIME || ""}`
        : "N/A",
      "VEHICLE TYPE": item.LORRY_TYPE || "Unknown",
      "OWNER NO": item.OWNER_NO || "N/A",
      "ADDRESS": item.ADDRESS || "N/A",
      "MAP": item.API_LINK || "N/A",
    }));
  };

  const csvData = preprocessDataForCSV(filteredData);

  // Define columns for DataTable
  const columns = [
    {
      name: "Sl No",
      selector: (_, index) => index + 1,
      sortable: false,
      width: "70px",
    },
    {
      name: "VEND NAME",
      selector: (row) => row.VEND_NAME || "N/A",
      sortable: true,
    },
    {
      name: "VEHICLE NO",
      selector: (row) => row.DEVICE || "N/A",
      sortable: true,
    },
    {
      name: "ATTACH TYPE",
      selector: (row) => row.ATTCH_TYPE || "N/A",
      sortable: true,
    },
    {
      name: "LAST UPDATE",
      selector: (row) =>
        `${row.CDATE ? row.CDATE.split("T")[0] : "N/A"} ${row.CTIME || ""}`,
      sortable: true,
    },
    {
      name: "VEHICLE TYPE",
      selector: (row) => row.LORRY_TYPE || "Unknown",
      sortable: true,
    },
    {
      name: "OWNER NO",
      selector: (row) => row.OWNER_NO || "N/A",
      sortable: true,
    },
    {
      name: "ADDRESS",
      selector: (row) => row.ADDRESS || "N/A",
      sortable: true,
    },
    {
      name: "MAP",
      cell: (row) => (
        <a
          href={row.API_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View Map
        </a>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Header fixed at the top */}
      <div className="fixed top-0 left-0 w-full bg-white shadow z-10">
        <Header />
      </div>

      {/* Search Bar and Export Button */}
      <div className="fixed top-20 left-0 w-full bg-gray-100 shadow-md z-10">
        <div className="flex items-center justify-between px-8 py-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-blue-800 hover:text-blue-600"
          >
            <FaArrowLeft className="text-2xl mr-2" />
            <span className="text-lg font-bold">Back</span>
          </button>
          <div className="flex items-center text-blue-800 hover:text-blue-600">
            <span className="text-3xl font-bold">Not Working Vehicle</span>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search by Vendor, Vehicle No, or Owner No"
              className="border p-2 w-full max-w-lg rounded focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CSVLink
              data={csvData}
              headers={[
                { label: "Sl No", key: "Sl No" },
                { label: "VEND NAME", key: "VEND NAME" },
                { label: "VEHICLE NO", key: "VEHICLE NO" },
                { label: "ATTACH TYPE", key: "ATTACH TYPE" },
                { label: "LAST UPDATE", key: "LAST UPDATE" },
                { label: "VEHICLE TYPE", key: "VEHICLE TYPE" },
                { label: "OWNER NO", key: "OWNER NO" },
                { label: "ADDRESS", key: "ADDRESS" },
                { label: "MAP", key: "MAP" },
              ]}
              filename="vehicle_data.csv"
              className="px-6 py-2 bg-blue-800 text-white rounded hover:bg-blue-700 text-center whitespace-nowrap"
            >
              Export to CSV
            </CSVLink>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="pt-32 mt-4 p-8">
        {loading ? (
          <div className="text-center text-blue-800 font-bold">Loading...</div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredData}
            highlightOnHover
            pointerOnHover
            striped
            fixedHeader
            fixedHeaderScrollHeight="68vh"
            theme="solarized"
          />
        )}
        {!loading && filteredData.length === 0 && (
          <div className="text-center text-gray-500 mt-4">
            No results found. Try a different search term.
          </div>
        )}
      </div>
    </div>
  );
}

export default NotWorkingVehicleTable;
