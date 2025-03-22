import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";
import logo from "../assets/logo-white.png";
import React from "react";
const Navbar = () => {
  const { user } = useContext(AuthContext); // ✅ Lấy user từ Context

  const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa thông tin khi logout
    window.location.reload(); // Reload lại trang
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/dashboard">
          <img src={logo} alt="logo-VănLang" className="logo-image" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/beginer-course">Beginer Practice</Link></li>
        <li><Link to="/imadiately-course">Imadiately Practice</Link></li>
        <li><Link to="/advance-course">Advance Practice</Link></li>
      </ul>
      <div className="navbar-actions">
        {user ? (
          <>
            <span className="navbar-username">Hello, {user.name}</span>
            <button onClick={handleLogout} className="navbar-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-login">Login</Link>
            <Link to="/register" className="navbar-login">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
