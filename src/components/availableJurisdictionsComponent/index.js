import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import "../availableJurisdictionsComponent/availableJurisdictionsComponent.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import images from "../images/images";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let trademarkSearch = {
  trademarkhead: ["US", "UK", "EU", "CH"],
  response: [
    {
      brand: "Adorexotic",
      trademark: [
        {
          trademarkhead: "US",
          available: [4],
          unavailable: [49],
        },
        {
          trademarkhead: "UK",
          available: [],
          unavailable: [34, 49],
        },
        {
          trademarkhead: "EU",
          available: [4, 5],
          unavailable: [],
        },
        {
          trademarkhead: "CH",
          available: [4],
          unavailable: [49],
        },
      ],
    },
    {
      brand: "zara",
      trademark: [
        {
          trademarkhead: "US",
          available: [4],
          unavailable: [34],
        },
        {
          trademarkhead: "UK",
          available: [],
          unavailable: [34, 49],
        },
        {
          trademarkhead: "EU",
          available: [],
          unavailable: [34, 49],
        },
        {
          trademarkhead: "CH",
          available: [4, 5],
          unavailable: [],
        },
      ],
    },
    {
      brand: "love",
      trademark: [
        {
          trademarkhead: "US",
          available: [4, 5],
          unavailable: [],
        },
        {
          trademarkhead: "UK",
          available: [4],
          unavailable: [33],
        },
        {
          trademarkhead: "EU",
          available: [4],
          unavailable: [9],
        },
        {
          trademarkhead: "CH",
          available: [4],
          unavailable: [23],
        },
      ],
    },
  ],
};
let domainData1 = {
  brandNames: ["Adorexotic", "zara", "love"],
  domainTLDs: [".net", ".io", ".us", ".ai"],
  socialSites: ["LINKEDIN", "INSTAGRAM", "X", "FACEBOOK"],
  budget: null,
  response: [
    {
      brand: "Adorexotic",
      domains: [
        {
          available: true,
          currency: "USD",
          definitive: true,
          domain: "Adorexotic.net",
          period: 1,
          price: 14.99,
        },
        {
          available: true,
          currency: "USD",
          definitive: true,
          domain: "Adorexotic.io",
          period: 1,
          price: 39.99,
        },
        {
          available: true,
          currency: "USD",
          definitive: true,
          domain: "Adorexotic.us",
          period: 1,
          price: 4.99,
        },
        {
          available: true,
          currency: "USD",
          definitive: true,
          domain: "Adorexotic.ai",
          period: 2,
          price: 399.96,
        },
      ],
      socialLoginAvailability: {
        INSTAGRAM: false,
        LINKEDIN: true,
      },
    },
    {
      brand: "zara",
      domains: [
        {
          available: false,
          currency: null,
          definitive: true,
          domain: "zara.net",
          period: null,
          price: null,
        },
        {
          available: false,
          currency: null,
          definitive: true,
          domain: "zara.io",
          period: null,
          price: null,
        },
        {
          available: false,
          currency: null,
          definitive: true,
          domain: "zara.us",
          period: null,
          price: null,
        },
        {
          available: false,
          currency: null,
          definitive: true,
          domain: "zara.ai",
          period: null,
          price: null,
        },
      ],
      socialLoginAvailability: {
        INSTAGRAM: false,
        LINKEDIN: true,
      },
    },
    {
      brand: "love",
      domains: [
        {
          available: false,
          currency: null,
          definitive: true,
          domain: "love.net",
          period: null,
          price: null,
        },
        {
          available: false,
          currency: null,
          definitive: true,
          domain: "love.io",
          period: null,
          price: null,
        },
        {
          available: false,
          currency: null,
          definitive: true,
          domain: "love.us",
          period: null,
          price: null,
        },
        {
          available: false,
          currency: null,
          definitive: true,
          domain: "love.ai",
          period: null,
          price: null,
        },
      ],
      socialLoginAvailability: {
        INSTAGRAM: false,
        LINKEDIN: true,
      },
    },
  ],
};

const AvailableJurisdictionsComponent = (props) => {
  const [domainData, setDomainData] = useState(domainData1 || {});
  const [selectedRows, setSelectedRows] = React.useState([]);
  // useEffect(() => {
  //   setDomainData(props.domainData);
  // }, [props.domainData]);
  const mergedData = domainData.response.map((domainItem) => {
    const trademarkInfo = trademarkSearch.response.find(
      (trademark) => trademark.brand === domainItem.brand
    );

    return {
      brand: domainItem.brand,
      domains: domainItem.domains,
      socialLoginAvailability: domainItem.socialLoginAvailability,
      trademarks: trademarkInfo ? trademarkInfo.trademark : [],
    };
  });

  const handleCheckboxChange = (brand) => {
    // Check if the brand is already selected
    if (selectedRows.includes(brand)) {
      // Remove brand from selectedRows
      setSelectedRows((prevSelected) =>
        prevSelected.filter((selectedBrand) => selectedBrand !== brand)
      );
    } else {
      // Add brand to selectedRows
      setSelectedRows((prevSelected) => [...prevSelected, brand]);
    }
  };
  const handleClose = () => {
    props.handleCloseModel();
  };

  const handleDeleteRow = (index) => {
    // Copy the current data
    const newData = [...domainData.response];
    // Remove the row at the specified index
    newData.splice(index, 1);
    // domainData = { ...domainData, response: newData };
    // Update the state with the new data
    setDomainData({ ...domainData, response: newData });
  };

  const tablehead = {
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
    borderRight: "1px solid #CACACA",
    textAlign: "center",
    width: "100px",
  };

  const brandcheckboxCell = {
    borderRight: "1px solid #CACACA",
    textAlign: "center",
    textTransform: "capitalize",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  };
  const tableCellStyle = {
    borderRight: "1px solid #CACACA",
    textAlign: "center",
    textTransform: "capitalize",
  };
  const borderDivStyle = { border: "1px solid #E7E7E7" };
  const domainDivStyle = {
    border: "1px solid #E7E7E7",
    color: "#000000",
    fontWeight: 700,
  };
  const notAvailableStyle = {
    backgroundColor: "#FFF2ED",
    color: "#FF5B5B",
    fontSize: "12px",
  };
  const socalDivStyle = {
    textAlign: "center",
    borderRight: "1px solid #CACACA",
  };
  const socalheadStyle = {
    textAlign: "center",
    borderRight: "1px solid #CACACA",
    fontSize: "11px",
  };
  return (
    <React.Fragment>
      <Dialog
        open={props.showModal}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: {
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
            overflow: "hidden",
            margin: "0px",
          },
        }}
        className="paperStyle"
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
              Please find the brand names availability across jurisdictions &
              classes selected by you
            </Typography>
            <Typography
              variant="caption"
              display="block"
              color="#5A687A"
              mb={1}
              gutterBottom
            >
              You can remove the brand names you do not want for trademark
              search by clicking on icon.
            </Typography>
          </div>
          {mergedData &&
            mergedData.length &&
            domainData &&
            domainData.domainTLDs &&
            domainData.domainTLDs.length && (
              <div className="domain-table">
                <TableContainer>
                  <Table
                    // style={{ border: "1px solid #CACACA", overflow: "screenX" }}
                    className="outer-table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell style={tablehead} rowSpan={2}>
                          Brand Names
                        </TableCell>

                        <TableCell
                          style={tablehead}
                          colSpan={domainData.domainTLDs.length}
                        >
                          Domains
                        </TableCell>
                        <TableCell
                          style={tablehead}
                          colSpan={domainData.socialSites.length}
                        >
                          Social Sites
                        </TableCell>
                        <TableCell
                          style={tablehead}
                          colSpan={trademarkSearch.trademarkhead.length}
                        >
                          Trademarks
                        </TableCell>
                        <TableCell style={tablehead} rowSpan={2}></TableCell>
                      </TableRow>
                      <TableRow>
                        {domainData.domainTLDs.map((tld, index) => (
                          <TableCell style={tableCellStyle} key={index}>
                            {tld}
                          </TableCell>
                        ))}
                        {domainData.socialSites.map((social, index) => (
                          <TableCell style={socalheadStyle} key={index}>
                            <div className="table-social-heading">
                              {" "}
                              <img
                                src={images[social + ".svg"]}
                                loading="lazy"
                                alt="social"
                                // style={{ width: "18px", marginRight: "5px" }}
                              />
                              {/* {social} */}
                            </div>
                          </TableCell>
                        ))}
                        {trademarkSearch.trademarkhead.map(
                          (trademark, index) => (
                            <React.Fragment key={index}>
                              <TableCell style={tableCellStyle}>
                                {trademark}
                              </TableCell>
                            </React.Fragment>
                          )
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {domainData.response.map((item, index) => {
                        const trademarkInfo = trademarkSearch.response.find(
                          (trademark) => trademark.brand === item.brand
                        );

                        return (
                          <TableRow key={index}>
                            <TableCell style={brandcheckboxCell}>
                              <Checkbox
                                checked={selectedRows.includes(item.brand)}
                                onChange={() =>
                                  handleCheckboxChange(item.brand)
                                }
                                color="primary"
                              />
                              {item.brand}
                            </TableCell>

                            {domainData.domainTLDs.map(
                              (tld, tldIndex, tldArray) => {
                                const domain = item.domains.find((domain) =>
                                  domain.domain.endsWith(tld)
                                );
                                return (
                                  <TableCell
                                    key={tldIndex}
                                    style={{
                                      ...domainDivStyle,
                                      ...(tldIndex === tldArray.length - 1
                                        ? tableCellStyle
                                        : borderDivStyle),
                                      ...(domain && domain.available
                                        ? null
                                        : notAvailableStyle),
                                    }}
                                  >
                                    {domain
                                      ? domain.available
                                        ? `$${domain.price}`
                                        : "Not Available"
                                      : "Not Available"}
                                  </TableCell>
                                );
                              }
                            )}
                            {domainData.socialSites.map(
                              (social, socialIndex) => (
                                <TableCell
                                  style={socalDivStyle}
                                  key={socialIndex}
                                >
                                  <img
                                    src={
                                      images[
                                        item.socialLoginAvailability[social]
                                          ? "green-tick-icon.svg"
                                          : "red-cross-icon.svg"
                                      ]
                                    }
                                    loading="lazy"
                                    alt="close-icon"
                                  />
                                </TableCell>
                              )
                            )}
                            {trademarkInfo &&
                              trademarkInfo.trademark.map(
                                (trademark, tIndex) => (
                                  <React.Fragment key={tIndex}>
                                    <TableCell style={tableCellStyle}>
                                      <div className="trademark-cell-wrapper">
                                        {trademark.available.map(
                                          (avl, avlIndex) => (
                                            <div className="trademark-cell-available">
                                              {avl}
                                            </div>
                                          )
                                        )}
                                        {trademark.unavailable.map(
                                          (unAvl, unAvlIndex) => (
                                            <div className="trademark-cell-unavailable">
                                              {unAvl}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </TableCell>
                                  </React.Fragment>
                                )
                              )}
                            <TableCell>
                              <img
                                src={images["delete.svg"]}
                                loading="lazy"
                                alt="delete-icon"
                                onClick={() => handleDeleteRow(index)}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}

          <div className="brand-modal-footer">
            <Button
              className="brand-submit-button"
              size="large"
              variant="contained"
              // onClick={""}
            >
              Proceed to Trademark Search
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
export default AvailableJurisdictionsComponent;
