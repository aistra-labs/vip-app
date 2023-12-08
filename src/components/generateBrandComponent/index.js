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
import AlertDialogSlide from "../common/AlertDialog";
import { useDispatch, useSelector } from "react-redux";
import { setConstants } from "../../redux/reducers";

const GenerateBrandComponent = () => {
  const dispatch = useDispatch();
  const [brandName, setBrandName] = useState("");
  const [radioValue, setRadioValue] = useState("MEANINGFUL");
  const [selectedChips, setSelectedChips] = useState([]);
  const [minLength, setMinLength] = useState(1);
  const [maxLength, setMaxLength] = useState(10);
  const [maxSyllableCount, setMaxSyllableCount] = useState(10);
  const [minSyllableCount, setMinSyllableCount] = useState(1);
  const [showBrand, setShowBrand] = useState(false);
  const [optionals, setOptionals] = useState([]);
  const [errors, setErrors] = useState({});
  const [generatedBrand, setGeneratedBrand] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showNameField, setShowNameField] = useState(true);
  const [showradioField, setShowRadioField] = useState(false);
  const [showChipField, setShowChipField] = useState(false);
  const [showChecBoxField, setShowCheckboxField] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const constants = useSelector((state) => state.constantData);
  const [chipData, setChipData] = React.useState(constants?.Attributes || []);
  const initialCheckboxes = [
    {
      id: 1,
      label: "Alternate Spellings",
      value: "ALT_SPELL",
      checked: optionals.includes("ALT_SPELL"),
    },
    {
      id: 2,
      label: "Words from other language",
      value: "ALT_LANG",
      checked: optionals.includes("ALT_LANG"),
    },
  ];
  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);

  useEffect(() => {
    getContants();
    getDomainData();
  }, []);

  const getContants = async () => {
    try {
      const url = "plus/constants";
      const result = await apiRequest(url, "GET");
      dispatch(setConstants(result));
      setChipData(result.Attributes);
    } catch (error) {
      // Handle error
      console.error("Error in POST request:", error);
    }
  };

  const getDomainData = async () => {
    try {
      const url = "plus/transaction";
      const data = ["BRAND_GENERATION"];
      const result = await apiRequest(url, "POST", data);
      const selectedNamesResponse = result.responses.find(
        (response) => response.type === "BRAND_GENERATION"
      );
      setBrandName(selectedNamesResponse.obj.description);
      setRadioValue(selectedNamesResponse.obj.nameType);
      setSelectedChips(selectedNamesResponse.obj.attributes);
      setMaxLength(
        selectedNamesResponse.obj.generationCriteria.manLength || 10
      );
      setMinLength(selectedNamesResponse.obj.generationCriteria.mixLength || 1);
      setMaxSyllableCount(
        selectedNamesResponse.obj.generationCriteria.maxSyllableCount || 10
      );
      setMinSyllableCount(
        selectedNamesResponse.obj.generationCriteria.minSyllableCount
      );
    } catch (error) {
      // Handle error
      console.error("Error in POST request:", error);
    }
  };
  // handle Brnad name
  const handleBrandName = (e) => {
    setBrandName(e.target.value);
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

  // Get values of checked checkboxes
  const checkedValues = checkboxes
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  // handle Submit brand generate
  const handleSubmitBrandDetails = () => {
    setOptionals(checkedValues);
    let data = {
      description: brandName,
      nameType: radioValue,
      attributes: selectedChips,
      optionals: checkedValues,
      generationCriteria: {
        minLength: minLength || 1,
        maxLength: maxLength || 10,
        minSyllableCount: minSyllableCount || 1,
        maxSyllableCount: maxSyllableCount || 10,
      },
    };
    const validationErrors = {};

    // Check for a non-empty description and minimum length of 4 characters
    if (!data.description || data.description.length < 4) {
      validationErrors.brandName =
        "Brand name is required and must be at least 4 characters.";
      setShowNameField(true);
      setShowRadioField(false);
      setShowChipField(false);
      setShowCheckboxField(false);
    }

    // Check if attributes are selected
    if (data.attributes.length === 0) {
      validationErrors.selectedChips = "Attributes are required.";
      setShowNameField(false);
      setShowRadioField(false);
      setShowChipField(true);
      setShowCheckboxField(false);
    }

    // If there are validation errors, update the state to show errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      saveGenerateBrandDeatils(data);
    }
  };

  // close created brand model
  const handleCloseBrandModel = () => {
    setShowBrand(false);
  };

  //handle 4 counter on click
  const getMinCount = (count) => {
    setMinLength(count);
  };
  const getMaxCount = (count) => {
    setMaxLength(count);
  };
  const getMaxSyllableCount = (count) => {
    setMaxSyllableCount(count);
  };
  const getMinSyllableCount = (count) => {
    setMinSyllableCount(count);
  };

  // save brand details and generate brand
  const saveGenerateBrandDeatils = async (data) => {
    try {
      setIsLoading(true);
      const url = "plus/brands/generate";
      const result = await apiRequest(url, "POST", data);
      if (result && result.statusCode && result.statusCode !== 200) {
        setErrorMessage(result.message);
        setOpenAlert(true);
        setIsLoading(false);
      } else {
        setShowBrand(true);
        setGeneratedBrand(result.names);
        setIsLoading(false);
      }
    } catch (error) {
      // Handle error
      setIsLoading(false);
      console.error("Error in POST request:", error.status, error);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <div className="generate-brand-wrapper">
      <CustomCollapseCard
        title="Describe your product or business"
        spanTitle="(Be as specific as possible)"
        expand={showNameField}
      >
        <TextField
          onChange={(e) => handleBrandName(e)}
          id="outlined-basic"
          fullWidth
          variant="outlined"
          value={brandName}
        />
        {errors.brandName && errors.brandName && (
          <div style={{ color: "red", fontSize: "12px" }}>
            {"*" + errors.brandName}
          </div>
        )}
      </CustomCollapseCard>
      <CustomCollapseCard
        title="Choose what kind of name you're looking for"
        expand={showradioField}
      >
        <div>
          <Radio
            {...controlProps("MEANINGFUL")}
            sx={{
              color: radioValue === "MEANINGFUL" ? "#FFB248" : "",
              "&.Mui-checked": {
                color: "#FFB248",
              },
            }}
          />
          {"Meaningful"}
          <Radio
            {...controlProps("CATCHY")}
            sx={{
              color: radioValue === "CATCHY" ? "#FFB248" : "",
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
        expand={showChipField}
      >
        <div>
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
        {selectedChips && selectedChips.length > 0 && (
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
        )}
        {errors.selectedChips && errors.selectedChips && (
          <div style={{ color: "red", fontSize: "12px" }}>
            {"*" + errors.selectedChips}
          </div>
        )}
      </CustomCollapseCard>
      <CustomCollapseCard
        title="Would you like to include these in the search?"
        expand={showChecBoxField}
      >
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
            label={"Minimum length"}
            counts={minLength}
            getCount={getMinCount}
          />
          <IncrementDecrementCounter
            label={"Maximum length"}
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
        generatedBrand={generatedBrand}
      />
      <Button
        className="brand-submit-button"
        size="large"
        variant="contained"
        disabled={isLoading}
        onClick={() => handleSubmitBrandDetails()}
      >
        {isLoading ? "Loading..." : "Generate Brand Names"}
      </Button>
      <AlertDialogSlide
        openAlert={openAlert}
        message={errorMessage}
        handleCloseAlert={handleCloseAlert}
      />
    </div>
  );
};

export default GenerateBrandComponent;
