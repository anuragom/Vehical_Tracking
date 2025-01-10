


// src/Auth/auth.js

let user = null; // Store user data in memory

// Set user after login
export const setUser = (userData) => {
  user = userData;
};

// Get user for Header or ProtectedRoute
export const getUser = () => {
  return user;
};

// Clear user on logout
export const clearUser = () => {
  user = null;
};
