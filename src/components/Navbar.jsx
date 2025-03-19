import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo-white.png'; // Import hình ảnh logo

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lấy thông tin user từ localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
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
