// client/src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically inject JWT token from localStorage if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('vt_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper to format local server image URLs vs external Unsplash URLs
export const getImageUrl = (imagePath, fallback = 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?q=80&w=800&auto=format&fit=crop') => {
  if (!imagePath) return fallback;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  return `${IMAGE_BASE_URL}${imagePath}`;
};

// API Methods
export const fetchServices = async () => {
  const response = await apiClient.get('/services');
  return response.data.data.services;
};

export const fetchFeaturedServices = async () => {
  const response = await apiClient.get('/services/featured');
  return response.data.data.services;
};

export const fetchProjects = async (category = '') => {
  const url = category && category !== 'All' ? `/projects?category=${encodeURIComponent(category)}` : '/projects';
  const response = await apiClient.get(url);
  return response.data.data.projects;
};

export const submitEnquiry = async (formData) => {
  const response = await apiClient.post('/enquiries', formData);
  return response.data;
};

export default apiClient;