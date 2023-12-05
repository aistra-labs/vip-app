import React, { useEffect, useState } from "react";
import CustomCollapseCard from "../common/collapse/collapse";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IncrementDecrementCounter from "../common/incrementDecrementCounter";
import Button from "@mui/material/Button";
import GeneratededBrandName from "../generatedBrandNameComponent";
import "../generateBrandComponent/generateBrandComponent.css";
import apiRequest from "../api/api";

const GenerateBrandComponent = () => {
  const [radioValue, setRadioValue] = useState("meaningful");
  const [selectedChips, setSelectedChips] = useState([]);
  const [minLength, setMinLength] = useState(0);
  const [maxLength, setMaxLength] = useState(0);
  const [maxSyllableCount, setMaxSyllableCount] = useState(0);
  const [minSyllableCount, setMinSyllableCount] = useState(0);
  const [showBrand, setShowBrand] = useState(false);
  const initialCheckboxes = [
    { id: 1, label: "Alternate Spellings" },
    { id: 2, label: "Words from other language" },
  ];
  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);

  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Adorable" },
    { key: 1, label: "Ambitious" },
    { key: 2, label: "Calm" },
    { key: 3, label: "Classic" },
    { key: 4, label: "Comforting" },
    { key: 0, label: "Happy" },
    { key: 1, label: "Long Lasting" },
    { key: 2, label: "Mature" },
    { key: 3, label: "Modern" },
    { key: 4, label: "Brandable" },
    { key: 1, label: "Testing1" },
    { key: 2, label: "Acronyms" },
    { key: 3, label: "Testing2" },
    { key: 4, label: "Testing3" },
  ]);

  useEffect(() => {
    getContants();
  }, []);

  const getContants = async () => {
    try {
      const url = "plus/constants";
      const result = await apiRequest(url, "GET");
      console.log(result, "resultresult");
    } catch (error) {
      // Handle error
      console.error("Error in POST request:", error);
    }
  };

  //handle radio feild
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: radioValue === item,
    onChange: handleRadioChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  // handle show chip selected on click
  const handleChipClick = (chipValue) => {
    // Check if the chip is already selected
    if (selectedChips.includes(chipValue)) {
      // If selected, remove it
      setSelectedChips((prevChips) =>
        prevChips.filter((chip) => chip !== chipValue)
      );
    } else {
      console.log(selectedChips.length, "electedChips.length");
      if (selectedChips.length < 3) {
        setSelectedChips((prevChips) => [...prevChips, chipValue]);
      }
    }
  };

  // handle delete chip on click delete icon
  const handleChipDelete = (chipValue) => {
    if (selectedChips.includes(chipValue)) {
      setSelectedChips((prevChips) =>
        prevChips.filter((chip) => chip !== chipValue)
      );
    }
  };
  // handle checkbox on select
  const handleCheckboxChange = (checkboxId) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === checkboxId
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };
  //
  const handleSubmitBrandDetails = () => {
    setShowBrand(true);
  };
  const handleCloseBrandModel = () => {
    setShowBrand(false);
  };

  //handle 4 counter on click
  const getMinCount = (count) => {
    console.log(count, "countcount");
  };
  const getMaxCount = (count) => {
    console.log(count, "countcount");
  };
  const getMaxSyllableCount = (count) => {
    console.log(count, "countcount");
  };
  const getMinSyllableCount = (count) => {
    console.log(count, "countcount");
  };

  return (
    <div className="generate-brand-wrapper">
      <CustomCollapseCard
        title="Describe your product or business"
        spanTitle="(Be as specific as possible)"
        expand={true}
      >
        <TextField id="outlined-basic" fullWidth variant="outlined" />
      </CustomCollapseCard>
      <CustomCollapseCard title="Choose what kind of name you're looking for">
        <div>
          <Radio
            {...controlProps("meaningful")}
            sx={{
              color: radioValue === "meaningful" ? "#FFB248" : "",
              "&.Mui-checked": {
                color: "#FFB248",
              },
            }}
          />
          {"Meaningful"} 
          <Radio
            {...controlProps("catchy")}
            sx={{
              color: radioValue === "catchy" ? "#FFB248" : "",
              "&.Mui-checked": {
                color: "#FFB248",
              },
            }}
          />
          {"Catchy"}
        </div>
      </CustomCollapseCard>
      <CustomCollapseCard
        title="Which of these attributes describe your brand. "
        spanTitle="(Select upto 3)"
      >
        <div>
          {chipData.map((chip) => (
            <Chip
              style={{
                margin: "5px",
                fontSize: "14px",
                fontWeight: "500",
                backgroundColor: selectedChips.includes(chip.label)
                  ? "#FFF7ED"
                  : "#fff",
                border: selectedChips.includes(chip.label)
                  ? "1px solid #FFDCAB"
                  : "1px solid #E6E6E6",
              }}
              label={chip.label}
              onClick={() => handleChipClick(chip.label)}
            />
          ))}
        </div>
        <div className="brand-selected-chip-Wrapper">
          <div className="brand-selected-chip-heading">
            Total {selectedChips.length} attributes selected{" "}
          </div>
          {selectedChips.map((chip) => (
            <Chip
              label={chip}
              style={{
                margin: "5px",
                fontSize: "14px",
                fontWeight: "500",
                backgroundColor: "#fff",
                border: "1px solid #E6E6E6",
              }}
              onDelete={() => handleChipDelete(chip)}
            />
          ))}
        </div>
      </CustomCollapseCard>
      <CustomCollapseCard title="Would you like to include these in the search?">
        <div>
          {checkboxes.map((checkbox) => (
            <FormControlLabel
              key={checkbox.id}
              control={
                <Checkbox
                  checked={checkbox.checked || false}
                  onChange={() => handleCheckboxChange(checkbox.id)}
                  style={{ color: checkbox.checked ? "#FFB248" : "" }}
                />
              }
              label={checkbox.label}
            />
          ))}
        </div>
      </CustomCollapseCard>
      <CustomCollapseCard title="Define Criteria for name generation.">
        <div className="brand-counter">
          <IncrementDecrementCounter
            label={"Minimum lenght"}
            counts={minLength}
            getCount={getMinCount}
          />
          <IncrementDecrementCounter
            label={"Maximum lenght"}
            counts={maxLength}
            getCount={getMaxCount}
          />
        </div>
        <div className="brand-counter">
          <IncrementDecrementCounter
            label={"Minimum syllable count"}
            counts={minSyllableCount}
            getCount={getMinSyllableCount}
          />
          <IncrementDecrementCounter
            label={"Maximum syllable count"}
            counts={maxSyllableCount}
            getCount={getMaxSyllableCount}
          />
        </div>
      </CustomCollapseCard>

      <GeneratededBrandName
        showBrand={showBrand}
        handleCloseBrandModel={handleCloseBrandModel}
        generatedBrand={[
          "Wearlogix",
          "FunWalk",
          "TeeTalk",
          "Tshirtello",
          "TeeGram",
        ]}
      />
      <Button
        className="brand-submit-button"
        size="large"
        variant="contained"
        onClick={() => handleSubmitBrandDetails()}
      >
        Generate Brand Names
      </Button>
    </div>
  );
};

export default GenerateBrandComponent;
