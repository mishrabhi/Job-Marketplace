import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  registerCompany: (data) => api.post('/auth/company/register', data),
  loginCompany: (data) => api.post('/auth/company/login', data),
  registerStudent: (data) => api.post('/auth/student/register', data),
  loginStudent: (data) => api.post('/auth/student/login', data),
};

// Job APIs
export const jobAPI = {
  getAllJobs: (params) => api.get('/jobs', { params }),
  getJobById: (id) => api.get(`/jobs/${id}`),
  createJob: (data) => api.post('/jobs', data),
  updateJob: (id, data) => api.put(`/jobs/${id}`, data),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
};

// Application APIs
export const applicationAPI = {
  applyForJob: (data) => api.post('/applications', data),
  getMyApplications: () => api.get('/applications'),
  updateApplicationStatus: (id, data) => api.put(`/applications/${id}`, data),
};

export default api;
