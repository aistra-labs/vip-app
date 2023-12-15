import React, { useEffect, useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Chip,
  Collapse,
  Typography,
  InputLabel,
} from "@mui/material";
import "../multiSelectCheckBox/multiSelectCheckBox.css";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const chipStyle = {
  zIndex: 1301,
  marginLeft: "5px",
};
const MAX_DESCRIPTION_LENGTH = 60;

const truncateDescription = (description) => {
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...`;
  }
  return description;
};
// const listborder = { borderB };
const MultiSelectCheckBox = ({
  classes,
  handletrademarkClasses,
  styleHandle,
  selectedItemsCheckbox,
}) => {
  console.log(selectedItemsCheckbox, "selectedItemsCheckbox");
  const [selectedItems, setSelectedItems] = useState(selectedItemsCheckbox);
  const [selectAll, setSelectAll] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [hidechip, setHidechip] = useState("");
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    setSelectedItems(selectedItemsCheckbox);
  }, [selectedItemsCheckbox]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
      handletrademarkClasses([]);
    } else {
      console.log(
        classes.map((item) => item.id),
        "sclasses.map((item) => item.id)electAllselectAll"
      );
      setSelectedItems(classes.map((item) => item.id));
      handletrademarkClasses(classes.map((item) => item.id));
    }

    setSelectAll(!selectAll);
    // handletrademarkClasses([]);
    console.log(selectAll, "selectAllselectAll");
  };

  const handleSelectItem = (itemId) => {
    const selectedIndex = selectedItems.indexOf(itemId);
    const newSelectedItems = [...selectedItems];

    if (selectedIndex === -1) {
      newSelectedItems.push(itemId);
    } else {
      newSelectedItems.splice(selectedIndex, 1);
    }

    setSelectedItems(newSelectedItems);
    setSelectAll(newSelectedItems.length === classes.length);
    handletrademarkClasses(newSelectedItems);
    console.log(newSelectedItems, "newSelectedItemsnewSelectedItems");
  };

  const handleDeleteChip = (itemId, e) => {
    const newSelectedItems = selectedItems.filter(
      (selectedId) => selectedId !== itemId
    );
    setSelectedItems(newSelectedItems);
    setSelectAll(false);
  };

  const handleToggleDescription = (itemId, e) => {
    e.stopPropagation(); // Prevents the click event from reaching the parent MenuItem
    setExpandedItem((prev) => (prev === itemId ? null : itemId));
  };

  const handleOpen = () => {
    setTimeout(() => {
      setHidechip("hidechip");
      styleHandle("hide");
    }, 200);
  };

  const handleClose = () => {
    setHidechip("");
    styleHandle("open");
  };

  const handleChipClick = (event, itemId) => {
    event.preventDefault();
    handleDeleteChip(itemId, event);
  };

  return (
    <FormControl fullWidth>
      <Select
        id="demo-simple-select-label"
        multiple
        // style={{ overflow: "scroll" }}
        autoFocus={false}
        onOpen={handleOpen}
        onClose={handleClose}
        value={selectedItems}
        renderValue={(selected) => (
          <div style={{ overflow: "scroll" }}>
            {selected.map((itemId) => (
              <Chip
                label={
                  <>
                    <b>
                      {classes.find((item) => item.id === itemId).id + ". "}
                    </b>
                    {classes
                      .find((item) => item.id === itemId)
                      .description.split(" ")
                      .slice(0, 2)
                      .join(" ") + "..."}
                  </>
                }
                onDelete={(e) => handleDeleteChip(itemId, e)}
                onClick={(e) => handleChipClick(e, itemId)}
                onMouseDown={(e) => e.preventDefault()}
                style={chipStyle}
                className={hidechip}
              />
            ))}
          </div>
        )}
        fullWidth
      >
        <MenuItem
          key="select-all"
          onClick={handleSelectAll}
          style={{ borderBottom: "1px solid #E7E7E7" }}
        >
          <Checkbox checked={selectAll} style={{ color: "#CACACA" }} />
          <ListItemText primary="Select All" />
        </MenuItem>
        {classes &&
          classes.map((item) => (
            <div key={item.id}>
              <MenuItem
                onClick={() => handleSelectItem(item.id)}
                style={{ borderBottom: "1px solid #E7E7E7" }}
              >
                <Checkbox
                  style={{ color: "#CACACA" }}
                  checked={selectedItems.indexOf(item.id) !== -1}
                />
                <ListItemText
                  style={{ display: "flex", alignItems: "center" }}
                  primary={
                    <Typography
                      variant="subtitle1"
                      style={{
                        backgroundColor: "#E7E7E7",
                        padding: "6px",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {"Class " + item.id}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="div"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div
                        id={`description-${item.id}`}
                        style={{
                          flex: "1",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "wrap",
                          flexWrap: "wrap",
                          width: "415px",
                          marginLeft: "10px",
                        }}
                      >
                        {expandedItem === item.id
                          ? item.description
                          : truncateDescription(item.description)}
                      </div>
                      {item.description.length > MAX_DESCRIPTION_LENGTH && (
                        <IconButton
                          onClick={(e) => handleToggleDescription(item.id, e)}
                        >
                          <ChevronRightIcon
                            style={{
                              transform:
                                expandedItem === item.id
                                  ? "rotate(90deg)"
                                  : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </IconButton>
                      )}
                    </Typography>
                  }
                />
              </MenuItem>
            </div>
          ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectCheckBox;
