import React, { createContext, useState } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (formData) => {
    try {
      const response = await authService.register(formData);
      console.log(response.data.message);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const login = async (formData) => {
    const response = await authService.login(formData);
    setUser(response.data.user);
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

  return (
    <AuthContext.Provider value={{ user, register, login, forgetPassword, verifyEmail, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};