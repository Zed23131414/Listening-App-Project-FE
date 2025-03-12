import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const ResetPassword = () => {
  const [formData, setFormData] = useState({ email: '', code: '', newPassword: '' });
  const { resetPassword } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="text" name="code" placeholder="Reset Code" onChange={handleChange} />
      <input type="password" name="newPassword" placeholder="New Password" onChange={handleChange} />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;