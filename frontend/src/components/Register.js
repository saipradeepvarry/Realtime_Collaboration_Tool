import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import { toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            localStorage.setItem('token', data.token);
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-heading">Register</h2>
            <form className="auth-form" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
                {error && <p className="error-msg">{error}</p>}
            </form>
            <p className="switch-auth">Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Register;
