import React, { memo, useEffect, useState } from "react";
import "./header.css";
import images from "../images/images";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if token exists in local storage
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setIsAuthenticated(!!storedToken);
  }, [token]);

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const isLoginPage = location.pathname === "/";
  const isSignupPage = location.pathname === "/signup";
  const isVerifyPage = location.pathname === "/verify-email";
  const isResetPage = location.pathname === "/reset-password";

  const logoClickHandler = () => {
    if(isAuthenticated){
        navigate("/home");
    }
    else{
        navigate('/');
    }
  }

  return (
    <div className="header-container">
      <div className="header-logo-container" onClick={logoClickHandler}>
        <img
          className="header-logo"
          src={images["vip-logo.svg"]}
          loading="lazy"
          alt="vip logo"
        />
      </div>
      <div className="header-right">
        {isLoginPage && (
          <>
            <div>New to V.IP?</div>
            <div className="create-btn" onClick={handleSignupClick}>
              Create an account
            </div>
          </>
        )}
        {isAuthenticated && !isLoginPage && !isSignupPage && !isVerifyPage && !isResetPage && <div>Welcome</div>}
      </div>
    </div>
  );
};

export default memo(Header);
