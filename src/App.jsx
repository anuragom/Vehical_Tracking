

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import LoginPage from './Auth/Login';
import Dashboard from './componets/Dashboard'
import AllIndiaVehical from './componets/AllIndiaVehical';
import NotWorkingVehical from './componets/NotWorkingVehical';
import NearbyVehical from './componets/NearbyVehical';
import ProtectedRoute from './Routes/ProtectedRoute';


const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<LoginPageWrapper />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/all-india-vehicle" element={<ProtectedRoute element={<AllIndiaVehical />} />} />
        <Route path="/not-working-vehicle" element={<ProtectedRoute element={<NotWorkingVehical />} />} />
        <Route path="/near-by" element={<ProtectedRoute element={<NearbyVehical />} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

// Login Wrapper
const LoginPageWrapper = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return <LoginPage onLogin={handleLogin} />;
};

export default App;
