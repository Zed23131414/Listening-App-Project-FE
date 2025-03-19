import axios from "axios";

const API_URL = "http://localhost:5000/api/tests";

// Lấy danh sách bài test
export const getTests = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Lấy chi tiết bài test
export const getTestById = async (testId) => {
  const response = await axios.get(`${API_URL}/${testId}`);
  return response.data;
};

// Lấy danh sách câu hỏi trong bài test
export const getTestQuestions = async (testId) => {
  const response = await axios.get(`${API_URL}/${testId}/questions`);
  return response.data;
};

// Gửi kết quả bài test
export const submitTest = async (answers) => {
  const response = await axios.post(`${API_URL}/submit`, answers);
  return response.data;
};
