import axios from 'axios';

const API_URL = "http://localhost:5000/api/user"; // Thay bằng URL Backend của bạn

// Gọi API để lấy trạng thái bài test của user
export const checkTestStatus = async (userId) => {
    try {
      const response = await axios.get(`${userId}/test-status`);
      return response.data.isTestCompleted; // Trả về trạng thái
    } catch (error) {
      console.error("Lỗi khi lấy trạng thái bài test:", error);
      return false; // Mặc định là chưa hoàn thành nếu lỗi
    }
  };
// Gửi trạng thái hoàn thành bài test lên Backend
// export const updateUserTestStatus = async () => {
//     try {
//         await axios.post(`${API_URL}/update-test-status`, { testCompleted: true });
//     } catch (error) {
//         console.error("Lỗi khi cập nhật trạng thái bài test:", error);
//     }
// };
// // Lấy trạng thái làm bài test
// export const getTestStatus = async (userId) => {
//     const response = await axios.get(`${userId}/test-status`);
//     return response.data;
//   };
// // Cập nhật trạng thái sau khi làm bài test
//   export const updateTestStatus = async (userId) => {
//     const response = await axios.put(`${userId}/complete-test`);
//     return response.data;
//   };
