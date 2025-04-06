import axios from 'axios';

const API_URL = 'http://localhost:5000/api/documents';

// Utility to get token dynamically
const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;
    return {
        Authorization: `Bearer ${token}`,
    };
};

export const getDocuments = async () => {
    const { data } = await axios.get(API_URL, {
        headers: getAuthHeaders(),
    });
    return data;
};

export const getDocumentById = async (id) => {
    const { data } = await axios.get(`${API_URL}/${id}`, {
        headers: getAuthHeaders(),
    });
    return data;
};

export const updateDocument = async (id, documentData) => {
    const { data } = await axios.put(`${API_URL}/${id}`, documentData, {
        headers: getAuthHeaders(),
    });
    return data;
};

export const deleteDocument = async (id) => {
    const { data } = await axios.delete(`${API_URL}/${id}`, {
        headers: getAuthHeaders(),
    });
    return data;
};
