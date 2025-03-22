import React from 'react';
import './TestHeader.css';

const TestHeader = ({ test, questionsCount }) => {
  return (
    <div className="test-header">
      <h2>{test?.title}</h2>
      <p className="test-description">
        {test?.description}
      </p>
      <div className="test-meta">
        <span>Thời gian: {test?.duration} phút</span>
        <span>Số câu hỏi: {questionsCount}</span>
      </div>
    </div>
  );
};

export default TestHeader; 