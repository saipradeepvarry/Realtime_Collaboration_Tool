import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { toast } from 'react-toastify';
import UserProfile from './UserProfile';

const Navbar = ({ onContactClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="brand" onClick={closeMenu}>
          🚀 CollabTool
        </Link>

        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
        </div>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {user ? (
            <>
              <UserProfile user={user} />
              <button className="logout-btn" onClick={handleLogout}>
                🔒 Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>🔑 Login</Link>
              <Link to="/register" onClick={closeMenu}>📝 Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
