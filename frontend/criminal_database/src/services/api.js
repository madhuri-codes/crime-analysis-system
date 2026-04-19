import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: import.meta.env.MODE === 'development' 
    ? 'http://localhost:5000/api' 
    : `${window.location.origin}/api`,
  timeout: 10000,
});

// Add request interceptor to include auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  signup: (userData) => API.post('/auth/register', userData),
  logout: () => API.post('/auth/logout'),
};

// User endpoints
export const userAPI = {
  getProfile: () => API.get('/user/profile'),
  updateProfile: (data) => API.put('/user/profile', data),
  getAllUsers: () => API.get('/user/all'),
};

// Officer endpoints
export const officerAPI = {
  getOfficers: () => API.get('/officers'),
  getOfficerById: (id) => API.get(`/officers/${id}`),
  getOfficerRanks: () => API.get('/officers/ranks'),
  createOfficer: (data) => API.post('/officers/addOfficer', data),
  updateOfficer: (id, data) => API.put(`/officers/${id}`, data),
  deleteOfficer: (id) => API.delete(`/officers/${id}`),
};

// Crime endpoints
export const crimeAPI = {
  getCrimes: () => API.get('/crimes'),
  getCrimeById: (id) => API.get(`/crimes/${id}`),
};

// Arrest endpoints
export const arrestAPI = {
  getArrests: () => API.get('/arrests'),
  getArrestById: (id) => API.get(`/arrests/${id}`),
};

// Criminal endpoints
export const criminalAPI = {
  getCriminals: () => API.get('/criminals'),
  addCriminal: (data) => API.post('/criminals/add', data),
  updateCriminal: (id, data) => API.put(`/criminals/update/${id}`, data),
};

// Report endpoints
export const reportAPI = {
  createReport: (data) => API.post('/reports', data),
  getReports: () => API.get('/reports'),
  getAllReports: () => API.get('/reports/all'),
  getDashboardStats: () => API.get('/reports/dashboard'),
  getRecentCrimes: () => API.get('/reports/recent'),
};

// Evidence endpoints
export const evidenceAPI = {
  getEvidenceItems: () => API.get('/evidence'),
};

// Suspect endpoints
export const suspectAPI = {
  getSuspects: () => API.get('/suspects'),
};

// Victim endpoints
export const victimAPI = {
  getVictims: () => API.get('/victims'),
};

// Location endpoints
export const locationAPI = {
  getLocations: () => API.get('/locations'),
};

export default API;
