import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDocumentById, updateDocument, deleteDocument } from '../services/documentService';
import { io } from 'socket.io-client';
import DocumentStats from './DocumentStats';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DocumentDetails.css';

const DocumentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const socketRef = useRef(null);
  const timeoutRef = useRef(null);

  const [document, setDocument] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleRef = useRef('');
  const contentRef = useRef('');
  const [hasShownToast, setHasShownToast] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const doc = await getDocumentById(id);
        setDocument(doc);
        setTitle(doc.title);
        setContent(doc.content);
        titleRef.current = doc.title;
        contentRef.current = doc.content;
      } catch {
        toast.error('❌ Failed to fetch document');
      }
    };
    fetchDocument();
  }, [id]);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socketRef.current = socket;

    socket.emit('joinDocument', id);

    socket.on('receiveUpdate', (updatedData) => {
      if (updatedData.title !== undefined) {
        setTitle(updatedData.title);
        titleRef.current = updatedData.title;
      }
      if (updatedData.content !== undefined) {
        setContent(updatedData.content);
        contentRef.current = updatedData.content;
      }
    });

    return () => socket.disconnect();
  }, [id]);

  useEffect(() => {
    const message = location.state?.message;
    if (message && !hasShownToast) {
      toast.success(message);
      setHasShownToast(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [hasShownToast, location, navigate]);

  const handleUpdate = async () => {
    try {
      await updateDocument(id, {
        title: titleRef.current,
        content: contentRef.current,
      });

      socketRef.current?.emit('documentUpdate', {
        documentId: id,
        title: titleRef.current,
        content: contentRef.current,
      });

      setUpdateMessage('✅ Document updated successfully!');
      toast.success('✅ Document updated successfully!');

      timeoutRef.current = setTimeout(() => setUpdateMessage(''), 3000);
    } catch {
      toast.error('❌ Failed to update document');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDocument(id);
      navigate('/dashboard', {
        state: { message: '🗑 Document deleted successfully!' },
      });
    } catch {
      toast.error('❌ Failed to delete document');
    }
  };

  if (!document) return <div className="loading-text">Loading...</div>;

  return (
    <div className="document-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="light"
      />

      <h2 className="document-heading">📝 Document Editor</h2>
      <DocumentStats title={title} content={content} lastUpdated={document.updatedAt} />

      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          className="input-field"
          value={title}
          onChange={(e) => {
            const newTitle = e.target.value;
            setTitle(newTitle);
            titleRef.current = newTitle;
            socketRef.current?.emit('documentUpdate', {
              documentId: id,
              title: newTitle,
              content: contentRef.current,
            });
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          className="textarea-field"
          rows="8"
          value={content}
          onChange={(e) => {
            const newContent = e.target.value;
            setContent(newContent);
            contentRef.current = newContent;
            socketRef.current?.emit('documentUpdate', {
              documentId: id,
              title: titleRef.current,
              content: newContent,
            });
          }}
        />
      </div>

      {updateMessage && (
        <div className="inline-update-message">{updateMessage}</div>
      )}

      <div className="button-group">
        <button className="btn update-btn" onClick={handleUpdate}>
          💾 Update
        </button>
        <button className="btn delete-btn" onClick={handleDelete}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default DocumentDetails;
