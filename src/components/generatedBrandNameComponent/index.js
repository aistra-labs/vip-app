import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import "../generatedBrandNameComponent/generatedBrandNameComponent.css";
import images from "../images/images";
import apiRequest from "../api/api";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GeneratededBrandName = (props) => {
  const [brandList, setBrandList] = useState([]);
  const [customAddedBrand, setcustomeAddedBrand] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setBrandList(props.generatedBrand);
  }, [props.generatedBrand]);

  const handleClose = () => {
    props.handleCloseBrandModel();
  };

  const handleTagsChange = (event, value) => {
    setcustomeAddedBrand(value);
  };

  const toggleBrandSelection = (brand) => {
    setBrandList((prevList) =>
      prevList.map((item) =>
        item.name === brand.name
          ? { ...item, isSelected: !item.isSelected }
          : item
      )
    );
  };

  const handleSubmitGenerateBrand = async () => {
    const customBrand = customAddedBrand.map((brandName) => ({
      name: brandName,
      isSelected: true,
      isAutoGenerated: false,
    }));
    const mergeAICustomeData = [...brandList, ...customBrand];
    saveBrandLists(mergeAICustomeData);
  };

  const saveBrandLists = async (brands) => {
    try {
      const url = "plus/brands";
      const data = { names: brands };
      const result = await apiRequest(url, "POST", data);
      if (result) {
        navigate("/domian-availability");
      }
    } catch (error) {
      // Handle error
      console.error("Error in POST request:", error);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.showBrand}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: {
            width: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
            overflow: "hidden",
            height: "100%",
            margin: "0px",
          },
        }}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="generated-brand-modal">
          <div className="close-brand-model">
            <img
              className="header-logo"
              src={images["close-dailog.svg"]}
              loading="lazy"
              alt="close-icon"
              onClick={handleClose}
            />
          </div>
          <div className="modal-brand-heading">
            <Typography variant="h5" component="h3" style={{ fontWeight: 600 }}>
              Below are the brand names generated for you
            </Typography>
            <Typography
              variant="caption"
              display="block"
              color="#5A687A"
              mb={1}
              gutterBottom
            >
              Select the brand names for which you want to carry out the domain
              availability & trademark search for
            </Typography>

            <Autocomplete
              multiple
              id="tags-filled"
              options={[]}
              defaultValue={customAddedBrand}
              freeSolo
              onChange={handleTagsChange}
              value={customAddedBrand}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="filled"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Enter your own brand names"
                />
              )}
            />
          </div>
          <div className="brand-chips-box">
            {brandList.map((brand, index) => (
              <div
                key={index}
                className={`generated-brand-chip ${
                  brand.isSelected
                    ? "generated-brand-chip-selected"
                    : "generated-brand-chip-default"
                }`}
                onClick={() => toggleBrandSelection(brand)}
              >
                <p>{brand.name}</p>
                <img
                  src={
                    images[
                      brand.isSelected ? "tick-active.svg" : "tick-gray.svg"
                    ]
                  }
                  loading="lazy"
                  alt="tick-icon"
                />
              </div>
            ))}
          </div>
          <div className="brand-modal-footer">
            <Button
              className="brand-submit-button"
              size="large"
              variant="contained"
              onClick={() => handleSubmitGenerateBrand()}
            >
              Proceed to Domain & Social Media Search
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
export default GeneratededBrandName;
