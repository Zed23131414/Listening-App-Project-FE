import React from 'react';
import './TestProgress.css';

const TestProgress = ({ progress }) => {
  return (
    <div className="test-progress">
      <h3>Tiến độ học tập</h3>
      <div className="progress-grid">
        <div className="progress-card">
          <div className="progress-icon">🎯</div>
          <div className="progress-info">
            <span className="progress-value">{progress.completedTests}</span>
            <span className="progress-label">Bài test đã hoàn thành</span>
          </div>
        </div>
        <div className="progress-card">
          <div className="progress-icon">📈</div>
          <div className="progress-info">
            <span className="progress-value">{progress.averageScore}%</span>
            <span className="progress-label">Điểm trung bình</span>
          </div>
        </div>
        <div className="progress-card">
          <div className="progress-icon">⭐</div>
          <div className="progress-info">
            <span className="progress-value">{progress.currentLevel}</span>
            <span className="progress-label">Cấp độ hiện tại</span>
          </div>
        </div>
        <div className="progress-card">
          <div className="progress-icon">⏱️</div>
          <div className="progress-info">
            <span className="progress-value">{progress.totalTime}h</span>
            <span className="progress-label">Tổng thời gian học</span>
          </div>
        </div>
      </div>
      <div className="level-progress">
        <div className="level-info">
          <span>Tiến độ cấp độ hiện tại</span>
          <span>{progress.levelProgress}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress.levelProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TestProgress; 