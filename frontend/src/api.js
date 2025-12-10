import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export const getProviders = async () => {
  const response = await api.get('/providers');
  return response.data;
};

export const verifyProvider = async (provider) => {
  const response = await api.post('/verify/provider', provider);
  return response.data;
};

export default api;
