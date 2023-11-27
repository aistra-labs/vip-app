import React, { memo, useEffect, useState } from "react";
import "./loginPage.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import usePostApi from "../../components/usePostApi/usePostApi";
import images from "../../components/images/images";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Email validation
    const isValid = EMAIL_REGEX.test(value);
    setEmailValid(isValid);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const isValid = value.length >= 8; // Minimum 8 characters
    setPasswordValid(isValid);
  };

  const apiUrl = "http://51.112.12.168:8095/auth/login";
  const {
    execute: executeLogin,
    response,
    error,
    isLoading,
  } = usePostApi(apiUrl);

  useEffect(() => {
    // Watch for changes in the response and navigate accordingly
    console.log("useEffect response", response);
    if (response) {
      navigate("/home");
    }
  }, [response, navigate]);

  const handleSubmitClick = async () => {
    if (isEmailValid && isPasswordValid) {
      await executeLogin({ email, password });
      if (isLoading) {
        // Handle loading state
        console.log("Login Loading...");
      } else if (error) {
        // Handle error state
        console.error("Login Error:", error);
      } else if (response) {
        // Handle successful response
        console.log("Login Response:", response);
        navigate("/home");
      }
    }
  };

  const forgotHandler = () => {
    navigate("/verify-email");
  }

  const handleGoogleClick = () => {
    // Your logic for Google sign-in
  };

  return (
    <div className="loginPage-container">
      <div className="login-container">
        <div className="login-title">
          Welcome to <span className="vip-heading">VIP</span>
        </div>
        <div className="login-desc">
          Signin to start your trademark registration process
        </div>
        <div className="input-fields-body">
          <div className="field-container">
            <label className="field-label" htmlFor="email">
              Username
            </label>
            <input
              type="email"
              id="email"
              className="field-input"
              placeholder=""
              value={email}
              onChange={handleEmailChange}
            />
            {!email.length && (
              <div className="error-message">*Email is required</div>
            )}
            {!isEmailValid && email.length > 0 && (
              <div className="error-message">*Email is invalid</div>
            )}
          </div>
          <div className="field-container">
            <label className="field-label" htmlFor="password">
              Passwrord
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              className="field-input password-field"
              placeholder=""
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="show-hide-container" onClick={togglePasswordVisibility}>
              <img
                className="show-hide-btn"
                src={images["show-hide-logo.svg"]}
                loading="lazy"
                alt="show button"
              />
            </div>
            {!password.length && (
              <div className="error-message">*Password is required</div>
            )}
            {!isPasswordValid && password.length > 0 && (
              <div className="error-message">*Password is too short</div>
            )}
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          className="signin-btn"
          onClick={handleSubmitClick}
          disabled={!isEmailValid || !isPasswordValid}
        >
          Sign in
        </Button>
        {error && error.length > 0 && (
          <div className="error-message">{`*${error}`}</div>
        )}
        <div className="forgot-pwd-container" onClick={forgotHandler}>
          <div>Forgot your password ?</div>
        </div>
        <div className="login-seperator-container">
          <div className="line"></div>
          <div className="center-text">Or sign in with an email</div>
          <div className="line"></div>
        </div>
        <div className="google-btn-container">
          <img
            className="google-btn"
            src={images["google-button.png"]}
            loading="lazy"
            alt="google button"
          />
        </div>
        <div className="copyright-text">© 2023, V.IP. All Rights Reserved.</div>
      </div>
    </div>
  );
};

export default memo(LoginPage);
