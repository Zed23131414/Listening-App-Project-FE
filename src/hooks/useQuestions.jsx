import axios from 'axios';

export const useQuestions = () => {
  const getQuestions = async (testId) => {
    const response = await axios.get(`http://localhost:5000/api/tests/${testId}/questions`);
    return response.data;
  };

  const createQuestion = async (testId, questionData) => {
    const response = await axios.post(`http://localhost:5000/api/tests/${testId}/questions`, questionData);
    return response.data;
  };

  return { getQuestions, createQuestion };
};