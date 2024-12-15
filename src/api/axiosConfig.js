// src/api/axiosConfig.js
import axios from "axios";

const API_BASE_URL = "https://aayud-todos-backend-1.onrender.com";
const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
