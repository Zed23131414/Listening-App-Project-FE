import axios from 'axios';

export const useOptions = () => {
  const createOption = async (questionId, optionData) => {
    const response = await axios.post(`http://localhost:5000/api/questions/${questionId}/options`, optionData);
    return response.data;
  };

  return { createOption };
};