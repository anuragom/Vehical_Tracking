


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import DataTable from "react-data-table-component";
// import { CSVLink } from "react-csv";
// import Header from "./Header";

// function NotWorkingVehicleTable() {
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const fetchAllData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("https://omhrms.omlogistics.co.in/api/lorry_data");
//       const result = await response.json();
//       setData(result);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter data based on search term and date
//   const filteredData = data.filter((item) => {
//     const isPreviousDate = (cdate) => {
//       if (!cdate) return false; // Exclude records without a date
//       const recordDate = new Date(cdate); // Parse the date from CDATE
//       const today = new Date();
//       today.setHours(0, 0, 0, 0); // Normalize today's date to midnight
//       return recordDate < today; // Include only records before today
//     };

//     return (
//       isPreviousDate(item.CDATE) &&
//       ((item.VEND_NAME || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (item.DEVICE || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (item.OWNER_NO || "").toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//   });

//   // Preprocess data for CSV export
//   const preprocessDataForCSV = (data) => {
//     return data.map((item, index) => ({
//       "Sl No": index + 1,
//       "VEND NAME": item.VEND_NAME || "N/A",
//       "VEHICLE NO": item.DEVICE || "N/A",
//       "ATTACH TYPE": item.ATTCH_TYPE || "N/A",
//       "LAST UPDATE": item.CDATE
//         ? `${item.CDATE.split("T")[0]} ${item.CTIME || ""}`
//         : "N/A",
//       "VEHICLE TYPE": item.LORRY_TYPE || "Unknown",
//       "OWNER NO": item.OWNER_NO || "N/A",
//       "ADDRESS": item.ADDRESS || "N/A",
//       "MAP": item.API_LINK || "N/A",
//     }));
//   };

//   const csvData = preprocessDataForCSV(filteredData);

//   // Define columns for DataTable
//   const columns = [
//     {
//       name: "Sl No",
//       selector: (_, index) => index + 1,
//       sortable: false,
//       width: "70px",
//     },
//     {
//       name: "VEND NAME",
//       selector: (row) => row.VEND_NAME || "N/A",
//       sortable: true,
//     },
//     {
//       name: "VEHICLE NO",
//       selector: (row) => row.DEVICE || "N/A",
//       sortable: true,
//     },
//     {
//       name: "ATTACH TYPE",
//       selector: (row) => row.ATTCH_TYPE || "N/A",
//       sortable: true,
//     },
//     {
//       name: "LAST UPDATE",
//       selector: (row) =>
//         `${row.CDATE ? row.CDATE.split("T")[0] : "N/A"} ${row.CTIME || ""}`,
//       sortable: true,
//     },
//     {
//       name: "VEHICLE TYPE",
//       selector: (row) => row.LORRY_TYPE || "Unknown",
//       sortable: true,
//     },
//     {
//       name: "OWNER NO",
//       selector: (row) => row.OWNER_NO || "N/A",
//       sortable: true,
//     },
//     {
//       name: "ADDRESS",
//       selector: (row) => row.ADDRESS || "N/A",
//       sortable: true,
//     },
//     {
//       name: "MAP",
//       cell: (row) => (
//         <a
//           href={row.API_LINK}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-500 hover:underline"
//         >
//           View Map
//         </a>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//     },
//   ];

//   return (
//     <div className="overflow-hidden">
//       {/* Header fixed at the top */}
//       <div className="fixed top-0 left-0 w-full bg-white shadow z-10">
//         <Header />
//       </div>

//       {/* Search Bar and Export Button */}
//       <div className="fixed top-20 left-0 w-full bg-gray-100 shadow-md z-10">
//         <div className="flex items-center justify-between px-8 py-3">
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="flex items-center text-blue-800 hover:text-blue-600"
//           >
//             <FaArrowLeft className="text-2xl mr-2" />
//             <span className="text-lg font-bold">Back</span>
//           </button>
//           <div className="flex items-center text-blue-800 hover:text-blue-600">
//             <span className="text-3xl font-bold">Not Working Vehicle</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <input
//               type="text"
//               placeholder="Search by Vendor, Vehicle No, or Owner No"
//               className="border p-2 w-full max-w-lg rounded focus:outline-none"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <CSVLink
//               data={csvData}
//               headers={[
//                 { label: "Sl No", key: "Sl No" },
//                 { label: "VEND NAME", key: "VEND NAME" },
//                 { label: "VEHICLE NO", key: "VEHICLE NO" },
//                 { label: "ATTACH TYPE", key: "ATTACH TYPE" },
//                 { label: "LAST UPDATE", key: "LAST UPDATE" },
//                 { label: "VEHICLE TYPE", key: "VEHICLE TYPE" },
//                 { label: "OWNER NO", key: "OWNER NO" },
//                 { label: "ADDRESS", key: "ADDRESS" },
//                 { label: "MAP", key: "MAP" },
//               ]}
//               filename="vehicle_data.csv"
//               className="px-6 py-2 bg-blue-800 text-white rounded hover:bg-blue-700 text-center whitespace-nowrap"
//             >
//               Export to CSV
//             </CSVLink>
//           </div>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="pt-32 mt-4 p-8">
//         {loading ? (
//           <div className="text-center text-blue-800 font-bold">Loading...</div>
//         ) : (
//           <DataTable
//             columns={columns}
//             data={filteredData}
//             highlightOnHover
//             pointerOnHover
//             striped
//             fixedHeader
//             fixedHeaderScrollHeight="68vh"
//             theme="solarized"
//           />
//         )}
//         {!loading && filteredData.length === 0 && (
//           <div className="text-center text-gray-500 mt-4">
//             No results found. Try a different search term.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default NotWorkingVehicleTable;




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

  const filteredData = data.filter((item) => {
    const isPreviousDate = (cdate) => {
      if (!cdate) return false;
      const recordDate = new Date(cdate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return recordDate < today;
    };

    return (
      isPreviousDate(item.CDATE) &&
      ((item.VEND_NAME || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.DEVICE || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.OWNER_NO || "").toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

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

  const customStyles = {
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        backgroundColor: "#f4f4f4",
        color: "#333",
        textAlign: "center",
      },
    },
    rows: {
      style: {
        fontSize: "13px",
      },
    },
  };

  return (
    <div className="overflow-hidden">
      <div className="fixed top-0 left-0 w-full bg-white shadow z-10">
        <Header />
      </div>

      <div className="fixed top-20 left-0 w-full bg-gray-100 shadow-md z-10">
        <div className="flex flex-wrap items-center justify-between px-4 py-3 space-y-4 md:space-y-0 md:flex-nowrap">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-blue-800 hover:text-blue-600"
          >
            <FaArrowLeft className="text-2xl mr-2" />
            <span className="text-lg font-bold">Back</span>
          </button>
          <div className="flex items-center text-blue-800 hover:text-blue-600">
            <span className="text-lg font-bold sm:text-2xl">Not Working Vehicle</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0 w-full sm:w-auto">
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
              className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700 text-center whitespace-nowrap"
            >
              Export to CSV
            </CSVLink>
          </div>
        </div>
      </div>

      <div className="pt-64 md:pt-32  mt-4 p-4 overflow-x-auto">
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
            customStyles={customStyles}
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
