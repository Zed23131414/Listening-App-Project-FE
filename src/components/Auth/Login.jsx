import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";
import logoTitle from "../../assets/logo-black.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Kiểm tra nếu user đã đăng nhập trước đó trong localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      navigate("/dashboard"); // Tự động chuyển hướng đến dashboard
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(formData); // Gọi API đăng nhập
      console.log("🔍 Login response:", user);

      if (!user || typeof user !== "object") {
        throw new Error("Dữ liệu trả về từ API không hợp lệ");
      }

      navigate("/dashboard"); // ✅ Chuyển hướng đến dashboard, nơi modal sẽ xuất hiện nếu cần
    } catch (error) {
      console.error("❌ Login error:", error.message);
      setErrors({ form: "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin." });
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
