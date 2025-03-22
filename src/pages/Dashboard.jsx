import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import UserProfile from '../components/Dashboard/UserProfile';
import TestProgress from '../components/Dashboard/TestProgress';
import RecommendedTests from '../components/Dashboard/RecommendedTests';
import axios from 'axios';
import './Dashboard.css';
import { FaClipboardCheck, FaArrowRight, FaTimes } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState(null);
  const [recommendedTests, setRecommendedTests] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch user progress
        const progressResponse = await axios.get(`http://localhost:5000/api/users/${user.id}/progress`);
        setUserProgress(progressResponse.data);

        // Fetch recommended tests
        const testsResponse = await axios.get('http://localhost:5000/api/tests/recommended', {
          params: { userId: user.id }
        });
        setRecommendedTests(testsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  // Nếu người dùng chưa làm bài test đầu vào
  if (!user.isTestCompleted) {
    return (
      <div className="entry-test-prompt">
        <div className="prompt-content">
          <div className="prompt-icon">
            <FaClipboardCheck />
          </div>
          <h2>Kiểm tra trình độ của bạn</h2>
          <p>
            Hãy làm bài test đầu vào để chúng tôi có thể đề xuất 
            các bài học phù hợp với trình độ của bạn.
          </p>
          <div className="prompt-actions">
            <button 
              className="primary-btn"
              onClick={() => navigate('/entry-test')}
            >
              Bắt đầu làm test
              <FaArrowRight />
            </button>
            <button 
              className="secondary-btn"
              onClick={() => navigate('/practice')}
            >
              Để sau
              <FaTimes />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>👋 Chào mừng trở lại, {user.name || 'Học viên'}!</h1>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-main">
          <UserProfile user={user} />
          <TestProgress progress={userProgress} />
        </div>
        
        <div className="dashboard-sidebar">
          <RecommendedTests tests={recommendedTests} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
