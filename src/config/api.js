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
  health: `${API_BASE_URL}/health`,
};

// 🚀 Enhanced API utility with caching and optimization
class ApiService {
  constructor() {
    this.cache = new Map();
    this.isWarmingUp = false;
  }

  // Warm up the backend server
  async warmUpBackend() {
    if (this.isWarmingUp) return;
    
    this.isWarmingUp = true;
    console.log('🔥 Warming up backend server...');
    
    try {
      const start = Date.now();
      await fetch(API_ENDPOINTS.health, { 
        method: 'GET',
        headers: { 'Cache-Control': 'no-cache' }
      });
      const duration = Date.now() - start;
      console.log(`✅ Backend warmed up in ${duration}ms`);
    } catch (error) {
      console.warn('⚠️ Backend warmup failed:', error);
    } finally {
      this.isWarmingUp = false;
    }
  }

  // Enhanced fetch with caching and retry logic
  async fetchWithCache(url, options = {}) {
    const cacheKey = `${url}_${JSON.stringify(options)}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      console.log('📦 Using cached data for:', url);
      return this.cache.get(cacheKey);
    }

    // Warm up backend if this is the first request
    if (!this.isWarmingUp && this.cache.size === 0) {
      this.warmUpBackend();
    }

    console.log('🌐 Fetching from API:', url);
    const startTime = Date.now();
    
    try {
      const response = await this.fetchWithRetry(url, options);
      const data = await response.json();
      const duration = Date.now() - startTime;
      
      console.log(`✅ API Response received in ${duration}ms`);
      
      // Cache the successful response for 5 minutes
      this.cache.set(cacheKey, data);
      setTimeout(() => this.cache.delete(cacheKey), 5 * 60 * 1000);
      
      return data;
    } catch (error) {
      console.error('❌ API Request failed:', error);
      throw error;
    }
  }

  // Retry logic for failed requests
  async fetchWithRetry(url, options = {}, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
      } catch (error) {
        console.warn(`🔄 Retry ${i + 1}/${maxRetries} for ${url}:`, error.message);
        
        if (i === maxRetries - 1) throw error;
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }

  // Get syllabus data with optimization
  async getSyllabusData() {
    return this.fetchWithCache(API_ENDPOINTS.syllabus);
  }

  // Preload data in background
  preloadData() {
    console.log('🚀 Preloading syllabus data...');
    this.getSyllabusData().catch(err => 
      console.warn('Preload failed:', err)
    );
  }
}

// Export singleton instance
export const apiService = new ApiService();

console.log('🌐 API Endpoints:', API_ENDPOINTS);

export default API_CONFIG;
