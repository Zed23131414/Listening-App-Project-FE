import React, { useState } from "react";
import "../Navbar/Navbar.css";
import logo_light from '../../assets/logo-black.png';
import logo_dark from '../../assets/logo-white.png';
import search_icon_light from '../../assets/search-w.png';
import search_icon_dark from '../../assets/search-b.png';
import toogle_light from '../../assets/night.png';
import toogle_dark from '../../assets/day.png';
import GuestModal from "./GuestModal";


export default function Navbar({theme, setTheme}) {
  const [showGuestModal, setShowGuestModal] = useState(false);

  const toggle_mode = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light');
  }
  return (
    <div className="navbar">
      <img src={theme == 'light' ? logo_light : logo_dark} alt="logo" className="logo"/>
      <ul>
        <li>All Exercises</li>
        <li>Beginer</li>
        <li>Imadiately</li>
        <li>Advance</li>
      </ul>

      <div className="search-box">
        <input type="text" placeholder="Search"/>
        <img src={theme == 'light' ? search_icon_light : search_icon_dark} alt=""/>
      </div>

      <img onClick={() => {toggle_mode()}} src={theme == 'light' ? toogle_light : toogle_dark} alt="avatar" className="toggle-icon"/>
      {/* Nút Guest */}
      <button className="guest-button" onClick={() => setShowGuestModal(true)}>
        Sign in
      </button>

      {/* Hiển thị Modal khi bấm vào Guest */}
      {showGuestModal && <GuestModal onClose={() => setShowGuestModal(false)} />}
    </div>)
}
