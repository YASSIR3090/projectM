import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Public URLs - Hazihitaji token
const publicUrls = ['/cargo/stats/', '/tracking/track/', '/messages/', '/settings/'];

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Angalia kama URL ni public (haitaji token)
    const isPublic = publicUrls.some(url => config.url?.includes(url));
    
    if (!isPublic) {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Ikiwa ni error 401 na sio public URL na haijajaribu tena
    if (error.response?.status === 401 && !originalRequest._retry) {
      const isPublic = publicUrls.some(url => originalRequest.url?.includes(url));
      
      if (!isPublic) {
        originalRequest._retry = true;
        
        try {
          const refreshToken = localStorage.getItem('refresh_token');
          if (refreshToken) {
            const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
              refresh: refreshToken,
            });
            
            localStorage.setItem('access_token', response.data.access);
            originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          
          // Ikiwa ni admin page, rudisha kwenye login
          if (window.location.pathname.includes('/admin')) {
            window.location.href = '/admin-login';
          }
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;