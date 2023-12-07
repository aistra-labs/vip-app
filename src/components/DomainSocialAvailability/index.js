import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CustomCollapseCard from "../common/collapse/collapse";
import TextField from "@mui/material/TextField";
import "../DomainSocialAvailability/domainSocialAvailability.css";
import TagsInput from "../common/tagInput";
import Chip from "@mui/material/Chip";
import images from "../images/images";
import { Button } from "@mui/material";
import apiRequest from "../api/api";
import { useNavigate } from "react-router-dom";

import AvailableDomainListComponent from "../availableDomainListComponent";

const DomainSocialHandleAvailability = () => {
  const [selectedChips, setSelectedChips] = useState([]);
  const [customDomain, setCustomDomain] = useState([]);
  const [budget, setBudget] = useState("");
  const [selectedbrandList, setSelectedbrandList] = useState([]);
  const [showDomain, setShowDomains] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState([]);
  const [domainList, setDomainList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const chipData = [
    ".com",
    ".net",
    ".io",
    ".ai",
    ".us",
    ".co",
    ".co.uk",
    ".info",
    ".org",
    ".me",
  ];
  const socialHandle = ["FACEBOOK", "X", "LINKEDIN", "INSTAGRAM"];
  useEffect(() => {
    getDomainData();
  }, []);

  const handleSelecetedTags = (items) => {
    setCustomDomain(items);
  };

  const getDomainData = async () => {
    try {
      const url = "plus/transaction";
      const data = ["BRANDS_SELECTED", "DOMAIN_SOCIAL_CHECK"];
      const result = await apiRequest(url, "POST", data);

      const selectedNamesResponse = result.responses.find(
        (response) => response.type === "BRANDS_SELECTED"
      );
      const selectedNames = selectedNamesResponse
        ? selectedNamesResponse.obj.names
        : [];
      const selectedBrands = selectedNames
        .filter((brand) => brand.isSelected)
        .map((brand) => brand.name);
      setSelectedbrandList(selectedBrands);

      const selectedDomainResponse = result.responses.find(
        (response) => response.type === "DOMAIN_SOCIAL_CHECK"
      );
      if (selectedDomainResponse) {
        setBudget(selectedDomainResponse.obj.budget);
        const allTLDs = selectedDomainResponse.obj.domainTLDs;

        // Filter TLDs into selectedChips and customDomain
        const selectedChips = allTLDs.filter((tld) => chipData.includes(tld));
        const customDomain = allTLDs.filter((tld) => !chipData.includes(tld));
        setSelectedChips(selectedChips);
        setCustomDomain(customDomain);
        setSelectedSocial(selectedDomainResponse.obj.socialSites);
      }

      // Extract the names array from the "BRANDS_SELECTED" response
    } catch (error) {
      // Handle error
      console.error("Error in POST request:", error);
    }
  };
  const saveDataForDomainCheck = async (data) => {
    try {
      setIsLoading(true);
      const url = "plus/domain-social/check";
      const result = await apiRequest(url, "POST", data);
      if (result) {
        setIsLoading(false);
        setDomainList(result);
        setShowDomains(true);
      }
    } catch (error) {
      // Handle error
      console.error("Error in POST request:", error);
    }
  };
  // handle show chip selected on click
  const handleChipClick = (chipValue) => {
    // Check if the chip is already selected
    if (selectedChips.includes(chipValue)) {
      // If selected, remove it
      setSelectedChips((prevChips) =>
        prevChips.filter((chip) => chip !== chipValue)
      );
    } else {
      if (selectedChips.length < 3) {
        setSelectedChips((prevChips) => [...prevChips, chipValue]);
      }
    }
  };

  const handleAmount = (e) => {
    const number = e.target.value.match(/\d+/g);
    // If you want to save only the first occurrence of numbers
    const budget = number ? number[0] : "";
    // Set the state
    setBudget(budget);
  };

  const handleSubmitDomainDetails = () => {
    const data = {
      brandNames: selectedbrandList,
      domainTLDs: [...new Set([...selectedChips, ...customDomain])],
      socialSites: selectedSocial,
      budget: budget,
    };
    saveDataForDomainCheck(data);
  };
  const handleCloseBrandModel = () => {
    setShowDomains(false);
  };
  const handleSocial = (chipValue) => {
    // Check if the chip is already selected
    if (selectedSocial.includes(chipValue)) {
      setSelectedSocial((prevChips) =>
        prevChips.filter((chip) => chip !== chipValue)
      );
    } else {
      setSelectedSocial((prevChips) => [...prevChips, chipValue]);
    }
  };

  return (
    <div className="domain-vailability">
      <div className="domian-availability-wrapper">
        <Typography variant="h6" component="h2" style={{ fontWeight: 600 }}>
          Domain & Social Handles Availability
        </Typography>
        <div className="domain-seleted-brands">
          <div className="domain-brand-label">Selected Brand Names:</div>
          <div className="domain-brand-box">
            {selectedbrandList &&
              selectedbrandList.map((brand, index) => (
                <div key={index} className="domain-brand-chips">
                  {brand}
                </div>
              ))}
          </div>
        </div>
        <div className="domain-seleted-brands-info">
          <b className="domain-seleted-brands-info-note">Note:</b> Please note
          that the brand names shown above will be considered for both domain &
          social handle check as well as trademark search. if you want to add
          more brand names, please{" "}
          <a className="domain-seleted-brands-info-link" href={"/"}>
            Go Back
          </a>{" "}
          to generate brand names section and add.
        </div>
      </div>

      <div className="domian-availability-feild-wrapper">
        <Typography
          variant="h6"
          component="h2"
          style={{ fontWeight: 600, margin: "10px" }}
        >
          Check for Domain Availability
        </Typography>
        <CustomCollapseCard
          title="Please mention your budget in USD"
          expand={true}
        >
          <TextField
            id="outlined-basic"
            fullWidth
            variant="outlined"
            value={budget}
            onChange={(e) => handleAmount(e)}
          />
        </CustomCollapseCard>

        <CustomCollapseCard
          title="Please select TLDs you want to search for. You can add additonal TLDs as well."
          expand={true}
        >
          <div className="already-domain-wrapper">
            {chipData.map((chip) => (
              <Chip
                style={{
                  margin: "5px",
                  fontSize: "14px",
                  fontWeight: "500",
                  backgroundColor: selectedChips.includes(chip)
                    ? "#FFF7ED"
                    : "#fff",
                  border: selectedChips.includes(chip)
                    ? "1px solid #FFDCAB"
                    : "1px solid #E6E6E6",
                }}
                label={chip}
                onClick={() => handleChipClick(chip)}
              />
            ))}
          </div>
          <TagsInput
            selectedTags={handleSelecetedTags}
            fullWidth
            // tags={customDomain}
            variant="outlined"
            id="tags"
            name="tags"
            placeholder="Enter your own domain"
            style={{
              width: "100%",
            }}
          />
        </CustomCollapseCard>
      </div>
      <div className="domian-availability-feild-wrapper">
        <Typography
          variant="h6"
          component="h2"
          style={{ fontWeight: 600, margin: "10px" }}
        >
          Check for Social Handles Availability
        </Typography>
        <CustomCollapseCard title="Select social handles" expand={true}>
          <div className="social-handle-wrapper">
            {socialHandle.map((social, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: selectedSocial.includes(social)
                    ? "#FFF7ED"
                    : "#fff",
                  border: selectedSocial.includes(social)
                    ? "1px solid #FFDCAB"
                    : "1px solid #E6E6E6",
                }}
                className="social-handle-box"
                onClick={() => handleSocial(social)}
              >
                <img
                  src={images[social + ".svg"]}
                  loading="lazy"
                  alt={social}
                />
                <div className="social-name">{social}</div>
              </div>
            ))}
          </div>
        </CustomCollapseCard>
      </div>
      <AvailableDomainListComponent
        showDomain={showDomain}
        domainData={domainList}
        handleCloseBrandModel={handleCloseBrandModel}
      />
      <div className="button-group">
        <Button
          className="brand-back-button"
          size="large"
          variant="outlined"
          onClick={() => navigate("/generate-brand")}
        >
          Back
        </Button>

        <Button
          className="brand-submit-button"
          size="large"
          variant="contained"
          disabled={isLoading}
          onClick={() => handleSubmitDomainDetails()}
        >
          {isLoading ? "Loading..." : "Search Results"}
        </Button>
      </div>
    </div>
  );
};
export default DomainSocialHandleAvailability;
