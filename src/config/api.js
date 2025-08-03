// API Configuration for different environments
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:3000',
  },
  production: {
    baseURL: import.meta.env.VITE_API_URL || 'https://your-backend-app.vercel.app',
  }
};

const environment = import.meta.env.VITE_NODE_ENV || 'development';

export const API_BASE_URL = API_CONFIG[environment].baseURL;

// API endpoints
export const API_ENDPOINTS = {
  syllabus: `${API_BASE_URL}/`,
  // Add more endpoints as needed
};

export default API_CONFIG;
