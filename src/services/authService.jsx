import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const register = (formData) => {
    return axios.post(`${API_URL}/register`, formData);
};

export const login = async (formData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", formData);
    console.log("✅ API Login Response:", response.data); // Kiểm tra dữ liệu trả về
    return response.data; // 🛠 Trả về dữ liệu trực tiếp
  } catch (error) {
    console.error("❌ Lỗi trong login:", error.message);
    throw error;
  }
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