

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const LiveEvents = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   // Login handler
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const data = JSON.stringify({
//       username,
//       password,
//     });

//     const config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: 'https://cameraanalytics.omlogistics.co.in/api/auth/login',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       data,
//     };

//     try {
//       const response = await axios.request(config);
//       localStorage.setItem('token', response.data.token);
//       setIsLoggedIn(true);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Fetch events handler
//   const fetchEvents = async () => {
//     const token = localStorage.getItem('token');
//     const apiUrl =
//       'https://cameraanalytics.omlogistics.co.in/api/user/get_todays_personalized_events?pageNo=0&eventType=ALL&warehouseId=ALL&isExport=false';

//     const response = await fetch(apiUrl, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch events');
//     }

//     const data = await response.json();
//     return data.data;
//   };

//   // Get latest events
//   const getLatestEvents = async () => {
//     setLoading(true);
//     try {
//       const allEvents = await fetchEvents();
//       if (allEvents.length > 0) {
//         // Sort by date to get latest events first
//         const sortedEvents = allEvents.sort(
//           (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//         );

//         // Get the latest 4 events with images
//         const latestEvents = sortedEvents
//           .filter((event) => event.file_name)
//           .slice(0, 4);

//         setEvents(latestEvents);
//       }
//     } catch (error) {
//       console.error('Failed to fetch latest events:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch events on component mount and set intervals
//   useEffect(() => {
//     if (isLoggedIn) {
//       getLatestEvents();

//       // Rotate images every 30 seconds
//       const imageInterval = setInterval(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
//       }, 30000);

//       // Refresh data every 2 minutes
//       const dataInterval = setInterval(() => {
//         getLatestEvents();
//       }, 120000);

//       return () => {
//         clearInterval(imageInterval);
//         clearInterval(dataInterval);
//       };
//     }
//   }, [isLoggedIn, events.length]);

//   // Render login form if not logged in
//   if (!isLoggedIn) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <ToastContainer />
//         <form
//           onSubmit={handleLogin}
//           className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-10 mb-6 max-w-md mx-auto border border-gray-300"
//         >
//           <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
//             Om Logistics Camera Analytics
//           </h2>
//           <div className="mb-5">
//             <label
//               className="block text-gray-800 text-sm font-semibold mb-2"
//               htmlFor="username"
//             >
//               Username
//             </label>
//             <input
//               className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               id="username"
//               type="text"
//               placeholder="Enter your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div className="mb-6">
//             <label
//               className="block text-gray-800 text-sm font-semibold mb-2"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <input
//               className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               type="submit"
//             >
//               Sign In
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   }

//   // Render LiveEventList after successful login
//   return (
//     <div className="flex flex-col justify-center items-center h-auto">
//     {loading ? (
//       <div className="text-center text-lg font-semibold">Loading....</div>
//     ) : events.length > 0 ? (
//       <div className="flex flex-col items-center">
//         <div className="bg-gray-800 text-white font-bold text-lg  ml-64 mb-0 w-[62rem] max-w-[100rem] text-center">
       
//           {events[currentIndex].msg}
//         </div>

//         <div className="relative">
//           <img
//             src={events[currentIndex].file_name}
//             alt={`Event ${currentIndex + 1}`}
//             className=" max-w-[100rem] h-[100vh] ml-64 cursor-pointer"
//             onClick={toggleFullScreen}
//           />
//           <button
//             onClick={toggleFullScreen}
//             className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg"
//           >
//             <Maximize size={20} />
//           </button>
//         </div>
//       </div>
//     ) : (
//       <div className="text-gray-500 text-lg font-medium">No images available</div>
//     )}

//     {/* Full-screen overlay */}
//     {isFullScreen && (
//       <div className="fixed inset-0 bg-black bg-opacity-90  justify-center items-center z-50">
//           {events[currentIndex].msg}
//         <div className="relative">
//           <img
//             src={events[currentIndex].file_name}
//             alt={`Event ${currentIndex + 1}`}
//             className="w-[120rem] h-[70rem]"
//           />
//           <button
//             onClick={toggleFullScreen}
//             className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg"
//           >
//            <Minimize size={20} />
//           </button>
//         </div>
//       </div>
//     )}
//   </div>
//   );
// };

// export default LiveEvents;

import { useState, useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";
import axios from "axios";

const LiveEvents = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://cameraanalytics.omlogistics.co.in/api/auth/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          "https://cameraanalytics.omlogistics.co.in/api/user/get_todays_personalized_events?pageNo=0&eventType=ALL&warehouseId=ALL&isExport=false",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const allEvents = response.data.data;
        if (allEvents.length > 0) {
          const sortedEvents = allEvents.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          const latestEvents = sortedEvents.filter((event) => event.file_name).slice(0, 4);
          setEvents(latestEvents);
        }
      } catch (error) {
        console.error("Failed to fetch latest events:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) fetchEvents();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Om Logistics Camera Analytics
          </h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-auto">
      <div className="fixed top-0 w-full bg-gray-800 text-white text-lg font-bold text-center p-3 shadow-md z-50">
        {events.length > 0 ? events[currentIndex].msg : "No messages available"}
      </div>
      {loading ? (
        <div className="text-center text-lg font-semibold mt-20">Loading....</div>
      ) : events.length > 0 ? (
        <div className="flex flex-col items-center mt-20">
          <div className="relative">
            <img
              src={events[currentIndex].file_name}
              alt={`Event ${currentIndex + 1}`}
              className="w-full max-w-screen-lg h-auto cursor-pointer rounded-lg shadow-lg"
              onClick={toggleFullScreen}
            />
            <button
              onClick={toggleFullScreen}
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg"
            >
              <Maximize size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-lg font-medium mt-20">No images available</div>
      )}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center ">
          <div className="relative">
            <img
              src={events[currentIndex].file_name}
              alt={`Event ${currentIndex + 1}`}
              className="w-full max-w-screen h-[90vh] object-contain"
            />
            <button
              onClick={toggleFullScreen}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg"
            >
              <Minimize size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveEvents;