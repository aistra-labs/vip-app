import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import '../generatedBrandNameComponent/generatedBrandNameComponent.css'
import TagsInput from '../common/tagInput';
import images from "../images/images";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

  const AvailableDomainListComponent = (props)=> {
  const [brandList, setBrandList] = useState(props.generatedBrand);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [customAddedBrand, setcustomeAddedBrand] = useState([]);
  

  const handleClose = () => {
     props.handleCloseBrandModel();
  };

  const handleSelecetedTags = (items) => {
    console.log(items);
  }
  
  const toggleBrandSelection = (brand) => {
      // Check if the brand is already selected
    if (selectedBrand.includes(brand)) {
      // If selected, remove it from the selected brands
      setSelectedBrand((prevSelected) => prevSelected.filter((item) => item !== brand));
    } else {
      // If not selected, add it to the selected brands
      setSelectedBrand((prevSelected) => [...prevSelected, brand]);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.showDomain}
        fullWidth
        maxWidth="md"  
        PaperProps={{
          style: {
            width:"100%",
            maxWidth: '100%',
            maxHeight: '100%',  
            overflow: 'hidden',
            height:'100%',
            margin:"0px"  
          },
        }}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
         aria-describedby="alert-dialog-slide-description"
      >
        <div className="generated-brand-modal">
        <div className='close-brand-model'>
        <img
              className="header-logo"
              src={images["close-dailog.svg"]}
              loading="lazy"
              alt="close-icon"
              onClick= {handleClose}
            />
        </div>
        <div className="modal-brand-heading">
        <Typography variant="h5" component="h3" style={{fontWeight:600}}>
        Below are the brand names generated for you
        </Typography>
        <Typography variant="caption" display="block" color="#5A687A" mb={1} gutterBottom>
        Select the brand names for which you want to carry out the domain availability & trademark search for
      </Typography>
      </div>
      <div className='brand-modal-footer'>
      <Button className="brand-submit-button" size="large" variant="contained" onClick={''}>Proceed to Domain & Social Media Search</Button>
      </div>
      </div>
      </Dialog>
    </React.Fragment>
  );
}
export default AvailableDomainListComponent;