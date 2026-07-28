import api from './api';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const trackingService = {
  getTracking: async (params = {}) => {
    const response = await api.get('/tracking/', { params });
    return response.data;
  },
  
  getTrackingByCargo: async (cargoId) => {
    const response = await api.get('/tracking/', { params: { cargo: cargoId } });
    return response.data;
  },
  
  createTracking: async (data) => {
    const response = await api.post('/tracking/', data);
    return response.data;
  },
  
  updateTracking: async (id, data) => {
    const response = await api.patch(`/tracking/${id}/`, data);
    return response.data;
  },
  
  deleteTracking: async (id) => {
    const response = await api.delete(`/tracking/${id}/`);
    return response.data;
  },
  
  trackCargo: async (trackingNumber) => {
    const response = await api.get('/tracking/track/', {
      params: { tracking_number: trackingNumber }
    });
    return response.data;
  },
  
  // HII NDIO IMEBIDILISHWA - HAITUMII TOKEN
  getStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cargo/stats/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Rudi na data tupu ikiwa kuna error
      return { total: 0, delivered: 0, in_transit: 0, pending: 0 };
    }
  },
};