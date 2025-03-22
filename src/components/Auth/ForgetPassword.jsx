import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const { forgetPassword } = useAuth();
  
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // Lấy dữ liệu từ localStorage
    if (storedUser) {
      navigate("/dashboard"); // ✅ Chuyển hướng nếu user đã đăng nhập
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    forgetPassword(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Send Reset Link</button>
    </form>
  );
};

export default ForgetPassword;