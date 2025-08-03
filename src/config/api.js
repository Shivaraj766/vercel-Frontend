// API Configuration for different environments
const API_CONFIG = {
  development: {
    baseURL: import.meta.env.VITE_API_URL || 'https://render-backend-palb.onrender.com',
  },
  production: {
    baseURL: import.meta.env.VITE_API_URL || 'https://render-backend-palb.onrender.com',
  }
};

const environment = import.meta.env.MODE || 'development';

// Debug logging
console.log('🔧 API Configuration Debug:');
console.log('Environment Mode:', environment);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('Selected baseURL:', API_CONFIG[environment].baseURL);

export const API_BASE_URL = API_CONFIG[environment].baseURL;

// API endpoints
export const API_ENDPOINTS = {
  syllabus: `${API_BASE_URL}/`,
  // Add more endpoints as needed
};

console.log('🌐 API Endpoints:', API_ENDPOINTS);

export default API_CONFIG;
