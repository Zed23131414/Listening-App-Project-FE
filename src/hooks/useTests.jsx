import axios from 'axios';

export const useTests = () => {
  const getTests = async () => {
    const response = await axios.get('http://localhost:5000/api/tests');
    return response.data;
  };

  const createTest = async (testData) => {
    const response = await axios.post('http://localhost:5000/api/tests', testData);
    return response.data;
  };

  const getTestById = async (testId) => {
    const response = await axios.get(`http://localhost:5000/api/tests/${testId}`);
    return response.data;
  };

  return { getTests, createTest, getTestById };
};