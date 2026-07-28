import api from './api';

export const cargoService = {
  getCargo: async (params = {}) => {
    const response = await api.get('/cargo/', { params });
    return response.data;
  },
  
  getCargoById: async (id) => {
    const response = await api.get(`/cargo/${id}/`);
    return response.data;
  },
  
  createCargo: async (data) => {
    const response = await api.post('/cargo/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  
  updateCargo: async (id, data) => {
    const response = await api.patch(`/cargo/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  
  deleteCargo: async (id) => {
    const response = await api.delete(`/cargo/${id}/`);
    return response.data;
  },
  
  getStats: async () => {
    const response = await api.get('/cargo/stats/');
    return response.data;
  },
  
  exportExcel: async () => {
    const response = await api.get('/cargo/export_excel/', { responseType: 'blob' });
    return response.data;
  },
  
  exportPDF: async (id) => {
    const response = await api.get(`/cargo/${id}/export_pdf/`, { responseType: 'blob' });
    return response.data;
  },
};