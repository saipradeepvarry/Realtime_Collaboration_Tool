import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DocumentForm.css';

const DocumentForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      return setError('⚠️ Title and content cannot be empty!');
    }
    setLoading(true);
    setError(null);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user ? user.token : null;

      const { data } = await axios.post(
        'http://localhost:5000/api/documents',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate(`/document/${data._id}`, {
        state: { message: '🎉 Document created successfully!' },
      });
    } catch (err) {
      setError(err.response?.data?.message || '❌ Failed to create document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">📄 Create a Stunning Document</h2>
      <form onSubmit={handleSubmit} className="form-box">
        {error && <div className="error-msg">{error}</div>}
        <div className="input-group">
          <label htmlFor="title">📌 Title</label>
          <input
            type="text"
            id="title"
            placeholder="Your document’s title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="content">📝 Content</label>
          <textarea
            id="content"
            placeholder="Write something meaningful..."
            rows="8"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? '⏳ Creating...' : '🚀 Create Document'}
        </button>
      </form>
    </div>
  );
};

export default DocumentForm;
