import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  register: (email: string, password: string, name: string) =>
    api.post('/auth/register', { email, password, name }),
};

export const schoolAPI = {
  getSchools: () => api.get('/schools'),

  createSchool: (schoolData: any) => api.post('/api/schools', schoolData),

  updateSchool: (id: string, schoolData: any) =>
    api.patch(`/api/schools/${id}`, schoolData),

  deleteSchool: (id: string) => api.delete(`/api/schools/${id}`),

  getSchoolById: (id: string) => api.get(`/api/schools/${id}`),
};

export default api;
