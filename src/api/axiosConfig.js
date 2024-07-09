// src/api/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://aayud-todos-backend-1.onrender.com'
});

export default api;