import React, { memo } from "react";
import "./header.css";
import images from "../images/images";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/signup");
  };
  return (
    <div className="header-container">
      <div className="header-logo-container">
        <img
          className="header-logo"
          src={images["vip-logo.svg"]}
          loading="lazy"
          alt="vip logo"
        />
      </div>
      <div className="header-right">
        <div>New to V.IP?</div>
        <div className="create-btn" onClick={handleSignupClick}>
          Create an account
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
