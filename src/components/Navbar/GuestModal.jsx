import React from "react";
import { useNavigate } from "react-router-dom";
import "./GuestModal.css";
import guest_avatar from "../../assets/guest-avatar.png";

export default function GuestModal({ onClose }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    onClose(); // Đóng modal trước khi chuyển trang
    navigate(path);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>Thông tin tài khoản</h2>
        <div className="guest-profile">
          <img src={guest_avatar} alt="Guest Avatar" className="guest-avatar" />
          <p>Guest account</p>
        </div>
        <p>Tạo tài khoản để lưu kết quả học của bạn!</p>
        <button className="register-button" onClick={() => handleNavigate("/register")}>
          Tạo tài khoản
        </button>
        <button className="login-button" onClick={() => handleNavigate("/login")}>
          Đăng nhập
        </button>
      </div>
    </div>
  );
}
