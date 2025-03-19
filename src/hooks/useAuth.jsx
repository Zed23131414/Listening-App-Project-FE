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

  const login = async (formData) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', formData);
    return response.data;
  };

  const getUsers = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  };

  const deleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  const updateUserStatus = async (userId, status) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/admin/users/${userId}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  return { register, verifyEmail, login, getUsers, deleteUser, updateUserStatus };
};