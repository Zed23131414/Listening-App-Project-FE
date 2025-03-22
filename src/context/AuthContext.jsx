import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = async (formData) => {
    try {
      const response = await authService.register(formData);
      console.log(response.data.message);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const login = async (formData) => {
    try {
      const response = await authService.login(formData); // Gọi API login
    
      console.log("🔍 Full API Response:", response); // Debug dữ liệu từ API
    
      // Đảm bảo `response` không bị undefined
      if (!response || !response.token) {
        throw new Error("Dữ liệu trả về từ API không hợp lệ");
      }
    
      // Lấy dữ liệu đúng từ API
      const { token, full_name, isTestCompleted } = response; // Không dùng `response.data`
    
      // Lưu user vào context
      setUser({ token, name: full_name || "Người dùng", isTestCompleted });
      localStorage.setItem("user", JSON.stringify({ token, name: full_name, isTestCompleted })); // ✅ Lưu vào localStorage

      return { token, name: full_name, isTestCompleted };
    } catch (error) {
      console.error("❌ Login error:", error.message);
      throw error;
    }
  };
  

  const forgetPassword = async (email) => {
    await authService.forgetPassword(email);
  };

  const verifyEmail = async (formData) => {
    await authService.verifyEmail(formData);
  };

  const resetPassword = async (formData) => {
    await authService.resetPassword(formData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, forgetPassword, verifyEmail, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};