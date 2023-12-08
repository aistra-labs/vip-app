import React, { useState } from "react";
import "../../common/headerStepper/headerStepper.css";
import { useNavigate } from "react-router-dom";

const HeaderStepper = (props) => {
  const navigate = useNavigate();
  return (
    <div className="stepper-wrapper">
      <div
        className="stepper-step stepper-active"
        onClick={() => navigate("/generate-brand")}
      >
        <span className="stepper-count stepper-default">1</span>Generate Brand
        Name
      </div>
      <div className="stepper-line"></div>
      <div
        className={`stepper-step ${
          props.step >= 2 ? "stepper-active" : "stepper-default"
        }`}
        onClick={() => navigate("/domian-availability")}
      >
        <span
          className={`stepper-count ${
            props.step >= 2 ? "stepper-default" : "stepper-count-default"
          }`}
        >
          2
        </span>
        Domain & Social Media Search
      </div>
      <div className="stepper-line"></div>
      <div
        className={`stepper-step ${
          props.step >= 3 ? "stepper-active" : "stepper-default"
        }`}
      >
        <span
          className={`stepper-count ${
            props.step >= 3 ? "stepper-default" : "stepper-count-default"
          }`}
        >
          3
        </span>
        Trademark Search
      </div>
      <div className="stepper-line"></div>
      <div
        className={`stepper-step ${
          props.step === 4 ? "stepper-active" : "stepper-default"
        }`}
      >
        <span
          className={`stepper-count ${
            props.step === 4 ? "stepper-default" : "stepper-count-default"
          }`}
        >
          4
        </span>
        Application Filling
      </div>
    </div>
  );
};
export default HeaderStepper;
