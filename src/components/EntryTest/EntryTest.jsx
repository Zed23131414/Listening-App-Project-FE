import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EntryTest.css';
import headphoneIcon from '../../assets/headphone-icon.png';

const EntryTest = () => {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntryTest = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tests/entry');
        setTest(response.data);
      } catch (error) {
        console.error('Error fetching entry test:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntryTest();
  }, []);

  const handleStartTest = () => {
    if (test) {
      navigate(`/test/${test._id}`);
    }
  };

  if (loading) {
    return (
      <div className="entry-test-loading">
        <div className="spinner"></div>
        <p>Loading your test...</p>
      </div>
    );
  }

  return (
    <div className="entry-test-container">
      <div className="entry-test-card">
        <div className="entry-test-header">
          <img src={headphoneIcon} alt="Headphone icon" className="headphone-icon" />
          <div className="level-badge">A1</div>
        </div>
        
        <div className="entry-test-content">
          <h1>Elementary Listening Test</h1>
          <p className="test-description">
            Welcome to your entry test! This assessment will help us understand your current listening skills.
          </p>
          
          <div className="test-info">
            <div className="info-item">
              <span className="info-label">Duration:</span>
              <span className="info-value">30 minutes</span>
            </div>
            <div className="info-item">
              <span className="info-label">Questions:</span>
              <span className="info-value">{test?.questions?.length || 0} questions</span>
            </div>
            <div className="info-item">
              <span className="info-label">Level:</span>
              <span className="info-value">Elementary (A1)</span>
            </div>
          </div>

          <div className="test-instructions">
            <h2>Instructions:</h2>
            <ul>
              <li>Make sure you have a working headphone or speaker</li>
              <li>Find a quiet place to take the test</li>
              <li>You can only listen to each audio twice</li>
              <li>Answer all questions to complete the test</li>
            </ul>
          </div>

          <button className="start-test-btn" onClick={handleStartTest}>
            Start Test
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="btn-icon">
              <path d="M5.5 5.5l13 6.5-13 6.5z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryTest; 