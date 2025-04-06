import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      localStorage.setItem('user', JSON.stringify({ username: data.username, token: data.token }));

      toast.success('Login successful! Redirecting...', {
        position: 'top-right',
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'An unexpected error occurred. Please try again later.',
        { position: 'top-right', autoClose: 3000 }
      );
    }
  };

  return (
    <div className="login-wrapper">
      <ToastContainer />
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Login to CollabTool</h2>

        <div className="input-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">Login</button>

        <p className="signup-link">
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
