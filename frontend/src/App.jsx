
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AllValidationRuns from './pages/AllValidationRuns';
import FlaggedRecordsPage from './pages/FlaggedRecordsPage';
import ReportsPage from './pages/ReportsPage';
import './App.css';

// Mock Protected Route
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/runs"
          element={
            <ProtectedRoute>
              <AllValidationRuns />
            </ProtectedRoute>
          }
        />
        <Route
          path="/flagged"
          element={
            <ProtectedRoute>
              <FlaggedRecordsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;

