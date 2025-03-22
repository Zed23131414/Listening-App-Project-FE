import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForgetPasswordPage from './pages/ForgetPassword';
import VerifyEmailPage from './pages/VertifyEmailPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Navbar from './components/Navbar';
import EntryTest from "./pages/EntryTest";
import Dashboard from './pages/Dashboard';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/entry-test" element={<EntryTest />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;