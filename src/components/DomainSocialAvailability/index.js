import React,{useState} from "react"
import Typography from '@mui/material/Typography';
import CustomCollapseCard from '../common/collapse/collapse';
import TextField from '@mui/material/TextField';
import '../DomainSocialAvailability/domainSocialAvailability.css'
import TagsInput from '../common/tagInput';
import Chip from '@mui/material/Chip';
import images from "../images/images";
import { Button } from "@mui/material";
import AvailableDomainListComponent from "../availableDomainListComponent";
const DomainSocialHandleAvailability = () => {
  const [selectedChips, setSelectedChips] = useState([]);
  const [showDomain, setShowDomains] = useState(false)
  const handleSelecetedTags = (items) => {
    console.log(items);
  }
  const [chipData, setChipData] = useState(
    ['.com', '.net','.io','.ai','.us','.co','.co.uk','.info','.org','.me']
  );
  const socialHandle = [{label:"Facebook",img:"facebook-icon.svg"},{label:"Twitter",img:"twitter-icon.svg"},{label:"LinkedIn",img:"linkedin-icon.svg"},{label:"Instagram",img:"instagram-icon.svg"}]
  // handle show chip selected on click
  const handleChipClick = (chipValue) => {
    // Check if the chip is already selected
    if (selectedChips.includes(chipValue)) {
      // If selected, remove it
      setSelectedChips((prevChips) => prevChips.filter((chip) => chip !== chipValue));
    } else {
      console.log(selectedChips.length,'electedChips.length');
      if(selectedChips.length < 3){
        setSelectedChips((prevChips) => [...prevChips, chipValue]);
      }
    }
  };
  const handleSubmitDomainDetails = () => {

  }
  const handleCloseBrandModel = () =>{

  }
  const selectedbrandList = ['Tshirtoo','Dewear','Tshirtoo','Dewear','Tshirtoo','Dewear','Tshirtoo','Dewear','Tshirtoo','Dewear']
    return(
   <div className="domain-vailability">   
   <div className="domian-availability-wrapper">
    <Typography variant="h6" component="h2" style={{fontWeight:600}}>
    Domain & Social Handles Availability
        </Typography>
    <div className="domain-seleted-brands">
        <div className="domain-brand-label">Selected Brand Names:</div>
        <div className="domain-brand-box">
          {selectedbrandList.map((brand,index)=>
          <div key={index} className="domain-brand-chips">{brand}</div>
          )}
        </div>
    </div>
    <div className="domain-seleted-brands-info"><b className="domain-seleted-brands-info-note">Note:</b> Please note that the brand names shown above will be considered for both domain & social handle check as well as trademark search. if you want to add more brand
names, please <a className="domain-seleted-brands-info-link" href ={'/'}>Go Back</a> to generate brand names section and add.</div>
  </div>

  <div className="domian-availability-feild-wrapper">
    <Typography variant="h6" component="h2" style={{fontWeight:600, margin:"10px"}}>
    Check for Domain Availability 
        </Typography>
        <CustomCollapseCard
        title="Please mention your budget in USD"
        expand = {true}
      >
       <TextField id="outlined-basic" fullWidth variant="outlined" />
      </CustomCollapseCard>

      <CustomCollapseCard
        title="Please select TLDs you want to search for. You can add additonal TLDs as well."
        expand = {true}
      >
        <div className="already-domain-wrapper">
        {chipData.map(chip => 
        <Chip
        style={{margin:'5px' , fontSize:"14px" ,fontWeight:"500" ,
        backgroundColor:selectedChips.includes(chip) ? '#FFF7ED' : '#fff',
        border: selectedChips.includes(chip) ? "1px solid #FFDCAB" :"1px solid #E6E6E6",
        }}
        label={chip}
        onClick={() => handleChipClick(chip)}
        />
          )}
      </div>
       <TagsInput
        selectedTags={handleSelecetedTags}
        fullWidth
        variant="outlined"
        id="tags"
        name="tags"
        placeholder ="Enter your own domain"
        style={{
            width:"100%" 
        }}
      />
      </CustomCollapseCard>
  </div>
  <div className="domian-availability-feild-wrapper">
    <Typography variant="h6" component="h2" style={{fontWeight:600, margin:"10px"}}>
    Check for Social Handles Availability
        </Typography>
        <CustomCollapseCard
        title="Select social handles"
        expand = {true}
      >
       <div className="social-handle-wrapper">
        {socialHandle.map((social ,index)=>
       <div className="social-handle-box">
         <img
       // className="header-logo"
       src={images[social.img]}
       loading="lazy"
       alt={social.label}
       // onClick= {handleClose}
     />
      <div className="social-name">{social.label}</div>
      </div>
        )}
       
       </div>
      </CustomCollapseCard>
      </div>
   <AvailableDomainListComponent showDomain={showDomain} handleCloseBrandModel={handleCloseBrandModel}/>   
  <div className="button-group">
  <Button
   className="brand-back-button"
    size="large"
    variant="outlined"
    onClick={()=>handleSubmitDomainDetails()}>
   Back
    </Button>
    <Button
   className="brand-submit-button"
    size="large"
    variant="contained"
    onClick={()=>handleSubmitDomainDetails(setShowDomains(true))}>
    Search Results
    </Button>
  </div>
  </div>
   )
}
export default DomainSocialHandleAvailability