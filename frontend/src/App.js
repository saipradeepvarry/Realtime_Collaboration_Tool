import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import DocumentForm from './components/DocumentForm';
import DocumentDetails from './components/DocumentDetails';
import LandingPage from './components/LandingPage';
import ContactPopup from './components/ContactPopup';
import './App.css';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  const [showContactPopup, setShowContactPopup] = useState(false);

  const handleOpenContactPopup = () => setShowContactPopup(true);
  const handleCloseContactPopup = () => setShowContactPopup(false);

  return (
    <>
      {!hideNavbar && <Navbar onContactClick={handleOpenContactPopup} />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/document/:id"
          element={
            <PrivateRoute>
              <DocumentDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/document/new"
          element={
            <PrivateRoute>
              <DocumentForm />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h2 className="not-found">404 - Page Not Found</h2>} />
      </Routes>

      {/* Contact Popup */}
      {showContactPopup && (
        <>
          <div className="popup-overlay" onClick={handleCloseContactPopup}></div>
          <ContactPopup closePopup={handleCloseContactPopup} />
        </>
      )}

      {/* Floating Contact Button with Full Bounce Animation */}
      {!hideNavbar && (
        <div className="floating-contact bounce-icon" onClick={handleOpenContactPopup}>
          <span>🤝</span>
        </div>
      )}
    </>
  );
}

export default App;
