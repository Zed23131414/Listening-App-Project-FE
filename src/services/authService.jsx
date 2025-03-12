import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const register = (formData) => {
    return axios.post(`${API_URL}/register`, formData);
};

const login = (formData) => {
  return axios.post(`${API_URL}/login`, formData);
};

const forgetPassword = (email) => {
  return axios.post(`${API_URL}/forgot-password`, { email });
};

const verifyEmail = (formData) => {
  return axios.post(`${API_URL}/verify-email`, formData);
};

const resetPassword = (formData) => {
  return axios.post(`${API_URL}/reset-password`, formData);
};

export default {
  register,
  login,
  forgetPassword,
  verifyEmail,
  resetPassword,
};