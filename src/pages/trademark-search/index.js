import React, { memo } from "react";
import TradeMarkSearchComponent from "../../components//trademarkSearchComponent";
import HeaderStepper from "../../components/common/headerStepper";
import "../domain-social-availability/domainSocialAvailablityContainer.css";

const TradeMarkSearchContainer = () => {
  return (
    <div className="domain-handle-container">
      <HeaderStepper step={3} />
      <TradeMarkSearchComponent />
    </div>
  );
};

export default memo(TradeMarkSearchContainer);
