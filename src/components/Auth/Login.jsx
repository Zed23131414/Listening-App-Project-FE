import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";
import logoTitle from "../../assets/logo-black.png"; // Import hình ảnh logo

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Please enter your email address";
    if (!formData.password) newErrors.password = "Please enter your password";
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
      const response = await login(formData); // Giả sử login() trả về response từ backend
      console.log("Login successful:", response);
  
      if (response.isTestCompleted === false) {
        setErrors({ form: "Bạn cần hoàn thành bài test đầu vào trước khi tiếp tục." });
        return;
      }
  
      navigate("/dashboard"); // Điều hướng nếu người dùng đã hoàn thành bài test
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        form: "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.",
      });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="titleLogin">
          <img src={logoTitle} alt="logo-VănLang" className="logo-title" />
          <h1>Login to your account</h1>
        </div>

        <label className="fill-Information">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <label className="fill-Information">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className={errors.password ? "input-error" : ""}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}

        <button type="submit" className="login-button">Login</button>

        {errors.form && <p className="error-message">{errors.form}</p>}

        <p className="register-text">
          If you don’t have an account, you can <Link to="/register">Register</Link>.
        </p>
      </form>
    </div>
  );
};

export default Login;
