import React from 'react';
import './TestCard.css';

const TestCard = ({ test, onSelect }) => {
  return (
    <div className="test-card" onClick={() => onSelect(test._id)}>
      {test.image_url && (
        <div className="test-image-container">
          <img 
            src={`http://localhost:5000${test.image_url}`} 
            alt={test.title}
            className="test-thumbnail"
            onError={(e) => {
              console.error("❌ Lỗi load ảnh:", e);
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
        </div>
      )}
      <div className="test-info">
        <h3>{test.title}</h3>
        <p className="test-description">{test.description}</p>
        <div className="test-details">
          <span className="test-tag">Số câu hỏi: {test.totalQuestions}</span>
          <span className="test-tag">Thời gian: {test.duration} phút</span>
          <span className="test-tag">Cấp độ: {test.level}</span>
        </div>
        <button className="select-test-btn">Bắt đầu làm bài</button>
      </div>
    </div>
  );
};

export default TestCard; 