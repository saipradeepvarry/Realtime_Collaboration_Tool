import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LandingPage.css';

const LandingPage = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }, [location]);

  return (
    <div className="landing-container">
      <ToastContainer />
      <div className="jumbotron-animated">
        <h1 className="title">✨ CollabTool</h1>
        <p className="subtitle">Real-time teamwork, made beautifully simple.</p>
        <p className="details">
          Collaborate with your peers, brainstorm in sync, and build projects with ease.  
          CollabTool gives you the tools to communicate, create, and grow — all in one place.
        </p>
        <div className="btn-group">
          <Link to="/register" className="btn register-btn">
            Get Started
          </Link>
          <Link to="/login" className="btn login-btn">
            Already a Member
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
