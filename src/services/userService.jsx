import axios from 'axios';

const API_USER = 'http://localhost:5000/api/user';

const getTestStatus = (userId) => {
  return axios.get(`${API_USER}/${userId}/test-status`);
};

// Xuất mặc định object chứa tất cả API
export default {
  getTestStatus
};
