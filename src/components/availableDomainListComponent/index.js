import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import '../availableDomainListComponent/availableDomainListComponent.css'
import TagsInput from '../common/tagInput';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import images from "../images/images";
import { brown } from '@mui/material/colors';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

  const AvailableDomainListComponent = (props)=> {
  const [brandList, setBrandList] = useState(props.generatedBrand);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [customAddedBrand, setcustomeAddedBrand] = useState([]);
  const domainDataDummy = {
    tlds: [".io",".com",".cp",".ai", ".in", ".co.uk"],
    socialSite: ["FACEBOOK", "INSTAGRAM", "X", "LINKEDIN"],
    response: [
      {
        brand: "ecartss",
        domains: [
          {
            available: true,
            currency: "USD",
            definitive: true,
            domain: "ecartss.io",
            period: 1,
            price: 39990000,
          },
          {
            available: true,
            currency: "USD",
            definitive: true,
            domain: "ecartss.com",
            period: 1,
            price: 39990000,
          },
          {
            available: true,
            currency: "USD",
            definitive: true,
            domain: "ecartss.cp",
            period: 1,
            price: 39990000,
          },
          {
            available: true,
            currency: "USD",
            definitive: true,
            domain: "ecartss.ai",
            period: 1,
            price: 39990000,
          },
          {
            available: true,
            currency: "USD",
            definitive: true,
            domain: "ecartss.in",
            period: 1,
            price: 8990000,
          },
        ],
        socialAvailibilty: {
          INSTAGRAM: true,
          LINKEDIN: true,
        },
      },
      {
        brand: "adoraBloom",
        domains: [
          {
            available: true,
            currency: "USD",
            definitive: true,
            domain: "adoraBloom.io",
            period: 1,
            price: 39990000,
          },
          {
            available: true,
            currency: "USD",
            definitive: true,
            domain: "ecartss.com",
            period: 1,
            price: 39990000,
          },
          {
            available: true,
            currency: "USD",
            definitive: true,
            domain: "ecartss.ai",
            period: 1,
            price: 39990000,
          },
          {
            available: false,
            currency: "USD",
            definitive: true,
            domain: "ecartss.cp",
            period: 1,
            price: 39990000,
          },
          {
            available: true,
            currency: "USD",
            definitive: true,
            domain: "ecartss.io",
            period: 1,
            price: 39990000,
          },
          {
            available: true,
            currency: "USD",
            definitive: true,
            domain: "ecartss.io",
            period: 1,
            price: 39990000,
          },
          {
            available: true,
            currency: "USD",
            definitive: true,
            domain: "adoraBloom.in",
            period: 1,
            price: 8990000,
          },
        ],
        socialAvailibilty: {
          INSTAGRAM: false,
          LINKEDIN: false,
        },
      },
      {
        brand: "adoraBloom",
        domains: [
          {
            available: true,
            currency: "USD",
            definitive: true,
            domain: "adoraBloom.io",
            period: 1,
            price: 39990000,
          },
          {
            available: true,
            currency: "USD",
            definitive: true,
            domain: "ecartss.com",
            period: 1,
            price: 39990000,
          },
          {
            available: true,
            currency: "USD",
            definitive: true,
            domain: "ecartss.cp",
            period: 1,
            price: 39990000,
          },
          {
            available: true,
            currency: "USD",
            definitive: true,
            domain: "ecartss.ai",
            period: 1,
            price: 39990000,
          },
          {
            available: true,
            currency: "USD",
            definitive: true,
            domain: "adoraBloom.in",
            period: 1,
            price: 8990000,
          },
        ],
        socialAvailibilty: {
          INSTAGRAM: false,
          LINKEDIN: false,
        },
      },
      {
        brand: "adoraBloom",
        domains: [
          {
            available: false,
            currency: "USD",
            definitive: true,
            domain: "adoraBloom.io",
            period: 1,
            price: 39990000,
          },
          {
            available: true,
            currency: "USD",
            definitive: true,
            domain: "adoraBloom.in",
            period: 1,
            price: 8990000,
          },
        ],
        socialAvailibilty: {
          INSTAGRAM: false,
          X: true,
        },
      },
    ],
  };
  const [domainData ,setDomainData] = useState(domainDataDummy);
  const handleClose = () => {
     props.handleCloseBrandModel();
  };

  const handleDeleteRow = (index) => {
    // Copy the current data
    const newData = [...domainData.response];
    // Remove the row at the specified index
    newData.splice(index, 1);
    // Update the state with the new data
    setDomainData({ ...domainData, response: newData });
  };
  
 const tablehead ={fontWeight: 'bold', backgroundColor: '#f2f2f2', borderRight:"1px solid #CACACA", textAlign : "center"}
 const tableCellStyle = {borderRight:"1px solid #CACACA", textAlign : "center", textTransform: "capitalize"}
 const borderDivStyle = {border : "1px solid #E7E7E7"}
 const domainDivStyle = {border : "1px solid #E7E7E7" , color:"#000000", fontWeight:700}
 const notAvailableStyle = {backgroundColor :"#FFF2ED", color: "#FF5B5B" , fontSize:"12px"}
 const socalDivStyle = {textAlign:"center", borderRight:"1px solid #CACACA"}
 const socalheadStyle = {textAlign:"center", borderRight:"1px solid #CACACA",fontSize:"11px"}
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
        Please find the brand names along with the available domains and social handles
        </Typography>
        <Typography variant="caption" display="block" color="#5A687A" mb={1} gutterBottom>
        You can remove the brand names you do not want for trademark search by clicking on x.
      </Typography>
        </div>
      <div className="domain-table">
      <TableContainer >
      <Table style={{border:"1px solid #CACACA" ,overflow:"screenX"}}>
        <TableHead >
          <TableRow>
            <TableCell style={tablehead} rowSpan={2} >Brand Names</TableCell>
            <TableCell style={tablehead} colSpan={domainData.tlds.length}>Domains</TableCell>
            <TableCell style={tablehead} colSpan={4}>Social Sites</TableCell>
            <TableCell style={tablehead} rowSpan={2}></TableCell>
          </TableRow>
          <TableRow>
            {domainData.tlds.map((tld, index) => (
              <TableCell style={tableCellStyle} key={index}>{tld}</TableCell>
            ))}
            {domainData.socialSite.map((social, index) => (
              <TableCell style={socalheadStyle} key={index}> 
              <div className='table-social-heading'> <img
              src={images[social+'.svg']}
              loading="lazy"
              alt="social"
              style={{width:"18px",marginRight:"5px"}}
               />
               {social}
               </div>
               </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {domainData.response.map((item, index) => (
            <TableRow key={index}>
              <TableCell style={tableCellStyle} >{item.brand}</TableCell>
              {domainData.tlds.map((tld, tldIndex,tldArray) => {
                const domain = item.domains.find((domain) => domain.domain.endsWith(tld));
                return (
                  <TableCell key={tldIndex} style={{ ...domainDivStyle,
                    ...(tldIndex === tldArray.length - 1 ? tableCellStyle : borderDivStyle),
                    ...(domain && domain.available ? null : notAvailableStyle)
                  }}>
                    {domain ? (domain.available ? `$${domain.price}` : 'Not Available') : 'Not Available'}
                  </TableCell>
                );
              })}
              {domainData.socialSite.map((social, socialIndex) => (
                <TableCell style={socalDivStyle} key={socialIndex}>
                  <img
                       src={images[item.socialAvailibilty[social] ?  'green-tick-icon.svg' : 'red-cross-icon.svg']}
                       loading="lazy"
                       alt="close-icon"
                        />
                </TableCell>
              ))}
              <TableCell>
                 <img
                       src={images['delete.svg']}
                       loading="lazy"
                       alt="delete-icon"
                       onClick={() => handleDeleteRow(index)}
                        />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
      <div className='brand-modal-footer'>
      <Button className="brand-submit-button" size="large" variant="contained" onClick={''}>Proceed to Trademark Search</Button>
      </div>
      </div>
      </Dialog>
    </React.Fragment>
  );
}
export default AvailableDomainListComponent;