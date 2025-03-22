import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './VerifyEmail.css';
import logoTitle from '../../assets/logo-black.png'; // Import hình ảnh logo
import successIcon from '../../assets/success-icon.png'; // Import hình ảnh dấu tick xanh

const VerifyEmail = () => {
  const [formData, setFormData] = useState({ email: '', code: '' });
  const [errors, setErrors] = useState({});
  const [isVerified, setIsVerified] = useState(false); // Trạng thái xác minh thành công
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
      const storedUser = localStorage.getItem("user"); // Lấy dữ liệu từ localStorage
      if (storedUser) {
        navigate("/dashboard"); // ✅ Chuyển hướng nếu user đã đăng nhập
      }
    }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Please enter your email address';
    if (!formData.code) newErrors.code = 'Please enter your verification code';
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
      await verifyEmail(formData);
      setIsVerified(true); // Đặt trạng thái xác minh thành công
    } catch (error) {
      console.error('Verification error:', error);
      if (error.response && error.response.data) {
        const serverErrors = error.response.data.errors || {};
        const newErrors = {};
        if (serverErrors.email) newErrors.email = serverErrors.email;
        if (serverErrors.code) newErrors.code = serverErrors.code;
        setErrors(newErrors);
      } else {
        setErrors({ form: 'An unexpected error occurred. Please try again later.' });
      }
    }
  };

  const handleOkClick = () => {
    navigate('/login'); // Chuyển hướng người dùng đến trang Login
  };

  return (
    <div className="verify-container">
      {isVerified ? (
        <div className="success-message">
          <div className="success-icon">
            <img src={successIcon} alt="Success" />
          </div>
          <h2>Xác minh thành công</h2>
          <button onClick={handleOkClick}>Ok</button>
        </div>
      ) : (
        <form className="verify-form" onSubmit={handleSubmit}>
          <div className='titleVerify'>
              <img src={logoTitle} alt="logo-VănLang" className='logo-title'></img> 
              <h1>Verify Your Account</h1>
          </div>
          <p className='fill-Information'>Email</p>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
          <p className='fill-Information'>Verification Code</p>
          <input
            type="text"
            name="code"
            onChange={handleChange}
            className={errors.code ? 'input-error' : ''}
          />
          {errors.code && <p className="error-message">{errors.code}</p>}
          <button type="submit">Verify</button>
          {errors.form && <p className="error-message">{errors.form}</p>}
        </form>
      )}
    </div>
  );
};

export default VerifyEmail;