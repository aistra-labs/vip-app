import React, { memo, useEffect, useState } from "react";
import "./resetPassword.css";
import usePostApi from "../../components/usePostApi/usePostApi";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const resetToken = searchParams.get("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isReEnterPasswordValid, setReEnterPasswordValid] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleReEnterPasswordChange = (e) => {
    const value = e.target.value;
    setReEnterPassword(value);

    // Password match validation
    const isValid = value === password;
    setReEnterPasswordValid(isValid);
  };

  const apiUrl = "https://dev.api.vip.aistra.com/auth/reset-password";
  const {
    execute: executeSubmit,
    response,
    error,
    isLoading,
  } = usePostApi(apiUrl);

  useEffect(() => {
    console.log("useEffect password reset response", response);
    if (response) {
      setMessage("Your password is successfully reset");
    }
  }, [response]);

  const handleSubmitClick = async () => {
    console.log("resetToken", resetToken);
    if (isEmailValid && isPasswordValid) {
      await executeSubmit({
        email,
        password,
        resetToken,
      });
      if (isLoading) {
        // Handle loading state
        console.log("Email Loading...");
      } else if (error) {
        // Handle error state
        console.error("Email Error:", error);
      } else if (response) {
        // Handle successful response
        console.log("Email Response:", response);
      }
    }
  };
  const loginHandler = () => {
    navigate("/");
  }

  if (isLoading) {
    return <div className="loading-message">Please wait...</div>;
  }

  return (
    <div className="reset-password-container">
      <div className="login-container">
        {message && message.length ? (
          <div className="message-body">
            <div>{message}</div>
            <div>Please go to login page: <span onClick={loginHandler} className="login-text">Login</span></div>
          </div>
        ) : (
          <div className="reset-password-body">
            <div className="field-container">
              <input
                type="email"
                id="email"
                className="field-input"
                placeholder="Username"
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
              <input
                type="password"
                id="password"
                className="field-input"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              {!password.length && (
                <div className="error-message">*Password is required</div>
              )}
              {!isPasswordValid && password.length > 0 && (
                <div className="error-message">*Password is too short</div>
              )}
            </div>
            <div className="field-container">
              <input
                type="password"
                id="reEnterPassword"
                className="field-input"
                placeholder="Re-enter Password"
                value={reEnterPassword}
                onChange={handleReEnterPasswordChange}
              />
              {!reEnterPassword.length && (
                <div className="error-message">
                  *Re-enter Password is required
                </div>
              )}
              {!isReEnterPasswordValid &&
                reEnterPassword.length > 0 &&
                password !== reEnterPassword && (
                  <div className="error-message">*Passwords do not match</div>
                )}
            </div>
            <Button
              variant="contained"
              color="primary"
              className="email-submit-btn"
              onClick={handleSubmitClick}
              disabled={!isEmailValid}
            >
              Submit
            </Button>
            {error && error.length && (
              <div className="error-message">{`*${error}`}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ResetPassword);
