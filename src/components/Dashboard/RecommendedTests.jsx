import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecommendedTests.css';

const RecommendedTests = ({ tests }) => {
  const navigate = useNavigate();

  const handleTestClick = (testId) => {
    navigate(`/test/${testId}`);
  };

  return (
    <div className="recommended-tests">
      <h3>Bài test được đề xuất</h3>
      <div className="test-cards">
        {tests.map((test) => (
          <div 
            key={test._id} 
            className="test-card"
            onClick={() => handleTestClick(test._id)}
          >
            {test.image_url && (
              <div className="test-image">
                <img 
                  src={`http://localhost:5000${test.image_url}`} 
                  alt={test.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x120?text=No+Image';
                  }}
                />
              </div>
            )}
            <div className="test-content">
              <h4>{test.title}</h4>
              <p className="test-description">{test.description}</p>
              <div className="test-meta">
                <span className="test-level">Cấp độ: {test.level}</span>
                <span className="test-duration">{test.duration} phút</span>
              </div>
              <div className="test-tags">
                {test.tags?.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <button className="start-test-btn">
              Bắt đầu
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedTests; 