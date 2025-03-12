import axios from 'axios';

export const useAuth = () => {
  const register = async (formData) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', formData);
    return response.data;
  };

  const verifyEmail = async (formData) => {
    const response = await axios.post('http://localhost:5000/api/auth/verify-email', formData);
    return response.data;
  };
  return { register,verifyEmail };
};