import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo-white.png'; // Import hình ảnh logo

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
            <img src={logo} alt="logo-VănLang" className='logo-image'></img> 
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/beginer-course">Beginer Practice</Link></li>
        <li><Link to="/imadiately-course">Imadiately Practice</Link></li>
        <li><Link to="/advance-course">Advance Practice</Link></li>
      </ul>
      <div className="navbar-actions">
        <button className="navbar-search"><i className="fas fa-search"></i></button>
        <Link to="/login" className="navbar-login">Login</Link>
        <Link to="/register" className="navbar-login">Register</Link>

      </div>
    </nav>
  );
};

export default Navbar;