import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminTestResults.css';

const AdminTestResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/progress');
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  return (
    <div className="admin-test-results">
      <h1>Test Results Management</h1>
      <table className="results-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Test ID</th>
            <th>Score</th>
            <th>Current Level</th>
            <th>Next Level Unlocked</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(results) && results.map((result) => (
            <tr key={result._id}>
              <td>{result.user_id}</td>
              <td>{result.test_id}</td>
              <td>{result.test_score}</td>
              <td>{result.current_level}</td>
              <td>{result.next_level_unlocked ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTestResults;