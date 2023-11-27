import React, { memo, useEffect, useState } from "react";
import "./emailVerification.css";
import usePostApi from "../../components/usePostApi/usePostApi";
import { Button } from "@mui/material";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setEmailValid] = useState(false);
  const [message, setMessage] = useState("");

  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Email validation
    const isValid = EMAIL_REGEX.test(value);
    setEmailValid(isValid);
  };

  const apiUrl =
    "http://51.112.12.168:8095/auth/forget-password?emailId=" + email;
  const {
    execute: executeSubmit,
    response,
    error,
    isLoading,
  } = usePostApi(apiUrl);

  useEffect(() => {
    console.log("useEffect email response", response);
    if (response) {
      setMessage("Reset link has been sent to your mail id");
    }
  }, [response]);

  const handleSubmitClick = async () => {
    if (isEmailValid) {
      await executeSubmit();
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
  if(isLoading){
    return(
        <div className="loading-message">Please wait...</div>
    )
  }

  return (
    <div className="email-verification-container">
      <div className="login-container">
        {message && message.length ? (
          <div className="message-body">
            <div>Thank you!</div>
            <div>{message}</div>
          </div>
        ) : (
          <div className="email-verfication-body">
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

export default memo(EmailVerification);
