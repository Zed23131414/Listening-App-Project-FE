import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const { getUsers, deleteUser, updateUserStatus, getUserProgress } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
    };
    fetchUsers();
  }, []);
  const handleViewProgress = async (userId) => {
    const progressData = await getUserProgress(userId);
    console.log(progressData);
    // Hiển thị kết quả bài test của người dùng
    // ...
  };

  const handleDelete = async (userId) => {
    await deleteUser(userId);
    setUsers(users.filter(user => user._id !== userId));
  };

  const handleUpdateStatus = async (userId, status) => {
    await updateUserStatus(userId, status);
    setUsers(users.map(user => user._id === userId ? { ...user, is_verified: status } : user));
  };

  return (
    <div className="userManagement-container">
      <h1>Admin Dashboard</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.is_verified ? 'Verified' : 'Not Verified'}</td>
              <td>
                <button onClick={() => handleViewProgress(user._id)}>View Progress</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
                <button onClick={() => handleUpdateStatus(user._id, !user.is_verified)}>
                  {user.is_verified ? 'Unverify' : 'Verify'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;