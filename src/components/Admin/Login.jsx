import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Login.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Please enter your email address';
    if (!formData.password) newErrors.password = 'Please enter your password';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const data = await login(formData);
      localStorage.setItem('token', data.token); // Lưu token vào localStorage
      navigate('/admin/usermanagement'); // Chuyển hướng đến trang quản lý bài test
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ form: 'Invalid email or password' });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
        <button type="submit">Login</button>
        {errors.form && <p className="error-message">{errors.form}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;