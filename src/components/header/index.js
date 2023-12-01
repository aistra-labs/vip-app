import React, { memo, useEffect, useState } from "react";
import "./header.css";
import images from "../images/images";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Check if token exists in local storage
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setIsAuthenticated(!!storedToken);
  }, [token]);

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    // Add any additional logic for search handling here
  };

  const isLoginPage = location.pathname === "/";
  const isSignupPage = location.pathname === "/signup";
  const isVerifyPage = location.pathname === "/verify-email";
  const isResetPage = location.pathname === "/reset-password";

  const logoClickHandler = () => {
    if (isAuthenticated) {
      navigate("/generate-brand");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="header-container">
      <div className="header-left">
        {isAuthenticated &&
          !isLoginPage &&
          !isSignupPage &&
          !isVerifyPage &&
          !isResetPage && (
            <div className="hamburger-icon-container">
              <img
                className="hamburger-icon"
                src={images["hamburger-icon.svg"]}
                loading="lazy"
                alt="Hamburger icon"
              />
            </div>
          )}
        <div className="header-logo-container" onClick={logoClickHandler}>
          <img
            className="header-logo"
            src={images["vip-logo.svg"]}
            loading="lazy"
            alt="vip logo"
          />
        </div>
      </div>
      <div className="header-right">
        {isLoginPage && (
          <div className="create-account-link">
            <div>New to V.IP?</div>
            <div className="create-btn" onClick={handleSignupClick}>
              Create an account
            </div>
          </div>
        )}
        {isAuthenticated &&
          !isLoginPage &&
          !isSignupPage &&
          !isVerifyPage &&
          !isResetPage && (
            <>
              <div className="header-search-container">
                <input
                  type="text"
                  id="searchText"
                  className="search-input"
                  placeholder="Search Trademarks, Clients, Tasks"
                  value={searchText}
                  onChange={handleSearchChange}
                />
                <div className="search-icon-container">
                  <img
                    className="search-icon"
                    src={images["vip-search-icon.svg"]}
                    loading="lazy"
                    alt="search icon"
                  />
                </div>
              </div>
              <div className="upload-btn-container">
                <img
                  className="upload-btn"
                  src={images["upload-btn.svg"]}
                  loading="lazy"
                  alt="Upload button"
                />
              </div>
              <div className="bell-icon-container">
                <img
                  className="bell-icon"
                  src={images["bell-icon.svg"]}
                  loading="lazy"
                  alt="Notification button"
                />
              </div>
              <div className="user-icon-container">
                <img
                  className="user-icon"
                  src={images["user-icon.svg"]}
                  loading="lazy"
                  alt="User icon"
                />
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default memo(Header);
