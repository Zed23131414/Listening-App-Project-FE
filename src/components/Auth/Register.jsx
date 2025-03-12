import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Register.css';
import logoTitle from '../../assets/logo-black.png'; // Import hình ảnh logo

const Register = () => {
  const [formData, setFormData] = useState({ full_name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.full_name) newErrors.full_name = 'Please enter your full name';
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
      await register(formData);
      navigate('/verify-email'); // Chuyển hướng người dùng đến trang xác minh email
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response && error.response.data) {
        const serverErrors = error.response.data.errors || {};
        const newErrors = {};
        if (serverErrors.email) newErrors.email = serverErrors.email;
        if (serverErrors.full_name) newErrors.full_name = serverErrors.full_name;
        setErrors(newErrors);
      } else {
        setErrors({ form: 'An unexpected error occurred. Please try again later.' });
      }
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <div className='titleRegister'>
            <img src={logoTitle} alt="logo-VănLang" className='logo-title'></img> 
            <h1>Register for an account</h1>
        </div>
        <p className='fill-Information'>Full Name</p>
        <input
          type="text"
          name="full_name"
          onChange={handleChange}
          className={errors.full_name ? 'input-error' : ''}
        />
        {errors.full_name && <p className="error-message">{errors.full_name}</p>}
        <p className='fill-Information'>Email</p>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
        <p className='fill-Information'>Password</p>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
        <button type="submit">Register for an account</button>
        {errors.form && <p className="error-message">{errors.form}</p>}
        <p>If you’ve have Account, you can access <Link to="/login">Login</Link>.</p>
      </form>
    </div>
  );
};

export default Register;