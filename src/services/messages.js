import api from './api';

export const messageService = {
  getMessages: async (params = {}) => {
    const response = await api.get('/messages/', { params });
    return response.data;
  },
  
  getMessageById: async (id) => {
    const response = await api.get(`/messages/${id}/`);
    return response.data;
  },
  
  createMessage: async (data) => {
    const response = await api.post('/messages/', data);
    return response.data;
  },
  
  deleteMessage: async (id) => {
    const response = await api.delete(`/messages/${id}/`);
    return response.data;
  },
  
  markReplied: async (id) => {
    const response = await api.post(`/messages/${id}/mark_replied/`);
    return response.data;
  },
};