import React, { memo } from "react";
import DomainSocialHandleAvailability from "../../components/DomainSocialAvailability";
import HeaderStepper from "../../components/common/headerStepper"
import "../domain-social-availability/domainSocialAvailablityContainer.css"
const DomainSocialHandleAvailabilityContainer = () => {
  return (
    <div className="domain-handle-container">
      <HeaderStepper step ={2}/>
      <DomainSocialHandleAvailability/>
    </div>
  );
};

export default memo(DomainSocialHandleAvailabilityContainer);
