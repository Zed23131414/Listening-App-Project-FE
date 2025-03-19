import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTests } from '../../hooks/useTests';
import './AdminTestManagement.css';

const AdminTestManagement = () => {
  const { getTests, createTest } = useTests();
  const [tests, setTests] = useState([]);
  const [newTest, setNewTest] = useState({
    title: '',
    description: '',
    level: 'Beginner',
    audio_url: ''
  });
  const [createdTestId, setCreatedTestId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const data = await getTests();
      setTests(data);
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTest({ ...newTest, [name]: value });
  };

  const handleCreateTest = async () => {
    try {
      const createdTest = await createTest(newTest);
      setTests([...tests, createdTest]);
      setNewTest({
        title: '',
        description: '',
        level: 'Beginner',
        audio_url: ''
      });
      setCreatedTestId(createdTest._id);
    } catch (error) {
      console.error('Error creating test:', error);
    }
  };

  const handleCreateQuestions = () => {
    if (createdTestId) {
      navigate(`/admin/tests/${createdTestId}/questions`);
    }
  };

  return (
    <div className="admin-test-management">
      <h1>Test Management</h1>
      <div>
        <h2>Create New Test</h2>
        <input
          type="text"
          name="title"
          value={newTest.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          value={newTest.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <select name="level" value={newTest.level} onChange={handleInputChange}>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <input
          type="text"
          name="audio_url"
          value={newTest.audio_url}
          onChange={handleInputChange}
          placeholder="Audio URL"
        />
        <button className="createTest" onClick={handleCreateTest}>Create Test</button>
        {createdTestId && (
          <button className='createQuestion' onClick={handleCreateQuestions}>Create Questions</button>
        )}
      </div>
      <div>
        <h2>Existing Tests</h2>
        <table className="tests-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Level</th>
              <th>Audio URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tests) && tests.map((test) => (
              <tr key={test._id}>
                <td>{test.title}</td>
                <td>{test.description}</td>
                <td>{test.level}</td>
                <td>{test.audio_url}</td>
                <td>
                  {/* Add any action buttons here, e.g., Edit, Delete */}
                  <button className="action-button">Edit</button>
                  <button className="action-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTestManagement;