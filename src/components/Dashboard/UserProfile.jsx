import React from 'react';
import './UserProfile.css';

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="avatar-container">
          {user.avatar ? (
            <img src={user.avatar} alt="Avatar" className="user-avatar" />
          ) : (
            <div className="avatar-placeholder">
              {user.name?.charAt(0) || user.email?.charAt(0)}
            </div>
          )}
        </div>
        <div className="user-info">
          <h2>{user.name || 'Học viên'}</h2>
          <p className="user-email">{user.email}</p>
          <div className="user-stats">
            <div className="stat-item">
              <span className="stat-value">{user.testsCompleted || 0}</span>
              <span className="stat-label">Bài test đã hoàn thành</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{user.averageScore || 0}</span>
              <span className="stat-label">Điểm trung bình</span>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-actions">
        <button className="edit-profile-btn">
          <i className="fas fa-edit"></i>
          Chỉnh sửa thông tin
        </button>
      </div>
    </div>
  );
};

export default UserProfile; 