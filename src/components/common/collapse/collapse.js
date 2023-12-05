import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import  "../collapse/collapse.css"

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const  CustomCollapseCard = (props) => {
  const [expanded, setExpanded] = React.useState(props.expand || false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card  style={{padding:'5px', border: "1px solid #EAECEE", boxShadow:"none", margin:"10px" ,borderRadius:'8px'}}>
      <CardActions disableSpacing>
      <div className='brand-label'>{props.title}<span className='span-title'>{props.spanTitle}</span></div>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {props.children}
        </CardContent>
      </Collapse>
    </Card>
  );
}
export default CustomCollapseCard;