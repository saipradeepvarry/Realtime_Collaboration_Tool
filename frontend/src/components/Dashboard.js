import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;

        const { data } = await axios.get('http://localhost:5000/api/documents', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDocuments(data);
      } catch (error) {
        console.error('Failed to fetch documents:', error);
        navigate('/');
      }
    };

    fetchDocuments();
  }, [navigate]);

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location.state]);

  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="dashboard-header">
        <div>
          <h2>📁 Welcome to Your Dashboard</h2>
          <p>Manage, create, and search your documents in style 🚀</p>
        </div>
        <div className="doc-count-animated">
          <span className="count-number">{documents.length}</span>
          <span className="count-label">Documents</span>
        </div>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="🔍 Search documents by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar-glow"
        />
        <div className="search-count">
          Showing <strong>{filteredDocs.length}</strong> result(s)
        </div>
      </div>

      {filteredDocs.length === 0 ? (
        <div className="empty-message">😕 No matching documents. Try a different keyword!</div>
      ) : (
        <div className="card-grid">
          {filteredDocs.map((doc, index) => (
            <div key={doc._id} className="doc-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3>📄 {doc.title}</h3>
              <p>📅 {new Date(doc.createdAt).toLocaleDateString()}</p>
              <Link to={`/document/${doc._id}`} className="open-btn">
                🚀 Open ➜
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="create-btn-wrapper">
        <button className="create-btn" onClick={() => navigate('/document/new')}>
          ➕ Create New Document
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
