// // import React from 'react'

// // const LiveEvents = () => {
// //   return (
// //     <div>LiveEvents</div>
// //   )
// // }

// // export default LiveEvents

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const LiveEvents = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);

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
//       toast.success('Login successful!');
//     } catch (error) {
//       toast.error('Login failed. Please check your credentials.');
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
//         <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//               Username
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="username"
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="password"
//               type="password"
//               placeholder="******************"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
//     <div className="flex flex-col justify-center items-center h-screen p-4">
//       {loading ? (
//         <div className="text-center text-lg font-semibold">Loading....</div>
//       ) : events.length > 0 ? (
//         <div className="flex flex-col items-center">
//           <div className="bg-gray-800  text-white font-bold text-lg p-3 rounded-t-2xl mb-2 w-full text-center">
//             {events[currentIndex].msg}
//           </div>

//           <img
//             src={events[currentIndex].file_name}
//             alt={`Event ${currentIndex + 1}`}
//             className="w-full  max-w-[70rem]   shadow-lg"
//           />
//         </div>
//       ) : (
//         <div className="text-gray-500 text-lg font-medium">No images available</div>
//       )}
//     </div>
//   );
// };

// export default LiveEvents;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LiveEvents = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = JSON.stringify({
      username,
      password,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://cameraanalytics.omlogistics.co.in/api/auth/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    try {
      const response = await axios.request(config);
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      console.error(error);
    }
  };

  // Fetch events handler
  const fetchEvents = async () => {
    const token = localStorage.getItem('token');
    const apiUrl =
      'https://cameraanalytics.omlogistics.co.in/api/user/get_todays_personalized_events?pageNo=0&eventType=ALL&warehouseId=ALL&isExport=false';

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    const data = await response.json();
    return data.data;
  };

  // Get latest events
  const getLatestEvents = async () => {
    setLoading(true);
    try {
      const allEvents = await fetchEvents();
      if (allEvents.length > 0) {
        // Sort by date to get latest events first
        const sortedEvents = allEvents.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        // Get the latest 4 events with images
        const latestEvents = sortedEvents
          .filter((event) => event.file_name)
          .slice(0, 4);

        setEvents(latestEvents);
      }
    } catch (error) {
      console.error('Failed to fetch latest events:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show toast notification for the current event message
  useEffect(() => {
    if (events.length > 0) {
      toast.info(events[currentIndex].msg, {
        position: 'top-right',
        autoClose: 12000, // Close after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [currentIndex, events]);

  // Fetch events on component mount and set intervals
  useEffect(() => {
    if (isLoggedIn) {
      getLatestEvents();

      // Rotate images every 30 seconds
      const imageInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
      }, 30000);

      // Refresh data every 2 minutes
      const dataInterval = setInterval(() => {
        getLatestEvents();
      }, 120000);

      return () => {
        clearInterval(imageInterval);
        clearInterval(dataInterval);
      };
    }
  }, [isLoggedIn, events.length]);

  // Render login form if not logged in
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <ToastContainer />
        <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Render LiveEventList after successful login
  return (
    <div className="flex flex-col justify-center items-center h-screen p-4">
      <ToastContainer />
      {loading ? (
        <div className="text-center text-lg font-semibold">Loading....</div>
      ) : events.length > 0 ? (
        <div className="flex flex-col items-center">
          <img
            src={events[currentIndex].file_name}
            alt={`Event ${currentIndex + 1}`}
            className="w-full max-w-[70rem] shadow-lg"
          />
        </div>
      ) : (
        <div className="text-gray-500 text-lg font-medium">No images available</div>
      )}
    </div>
  );
};

export default LiveEvents;