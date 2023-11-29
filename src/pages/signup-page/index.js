import React, { memo, useEffect, useState } from "react";
import "./signupPage.css";
import { Button } from "@mui/material";
import usePostApi from "../../components/usePostApi/usePostApi";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [isFirstNameValid, setFirstNameValid] = useState(false);
  const [isLastNameValid, setLastNameValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isReEnterPasswordValid, setReEnterPasswordValid] = useState(false);

  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    setFirstNameValid(value.trim().length > 0); // Check if not empty
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    setLastNameValid(value.trim().length > 0); // Check if not empty
  };

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

  const apiUrl = "https://dev.api.vip.aistra.com/auth/signup";
  const {
    execute: executeSignup, ̰
    response,
    error,
    isLoading,
  } = usePostApi(apiUrl);

  useEffect(() => {
    // Watch for changes in the response and navigate accordingly
    console.log('useEffect response', response);
    if (response) {
      navigate("/");
    }
  }, [response, navigate]);

  const handleSubmitClick = async () => {
    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isReEnterPasswordValid
    ) {
      // Call executeSignup with the data
      await executeSignup({
        email,
        password,
        firstName,
        lastName,
      });

      // Now you can handle loading, response, and error here
      if (isLoading) {
        // Handle loading state
        console.log("Signup Loading...");
      } else if (error) {
        // Handle error state
        console.error("Signup Error:", error);
      } else if (response) {
        // Handle successful response
        console.log("Signup Response:", response);
        navigate("/");
        // Redirect or perform other actions as needed
      }
    }
  };

  return (
    <div className="SignupPage-container">
      <div className="login-container">
        <div className="login-title">Welcome to VIP</div>
        <div className="login-desc">
          Signup to start your trademark registration process
        </div>
        <div className="field-container">
          <input
            type="text"
            id="firstName"
            className="field-input"
            placeholder="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          {!firstName.length && (
            <div className="error-message">*First Name is required</div>
          )}
        </div>
        <div className="field-container">
          <input
            type="text"
            id="lastName"
            className="field-input"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
          />
          {!lastName.length && (
            <div className="error-message">*Last Name is required</div>
          )}
        </div>
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
            <div className="error-message">*Re-enter Password is required</div>
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
          disabled={
            !isFirstNameValid ||
            !isLastNameValid ||
            !isEmailValid ||
            !isPasswordValid ||
            !isReEnterPasswordValid
          }
        >
          Sign up
        </Button>
        {error && error.length && (
            <div className="error-message">{`*${error}`}</div>
          )}
      </div>
    </div>
  );
};

export default memo(SignupPage);
