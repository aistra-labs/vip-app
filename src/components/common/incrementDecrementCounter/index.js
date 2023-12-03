import React, {useEffect, useState} from 'react';
import "../incrementDecrementCounter/incrementDecrementCounter.css"
const IncrementDecrementCounter = (props) => {
    const [count, setCount] = useState(props.counts || 0);

    useEffect(()=>{
      props.getCount(count);
    },[count])

    const handleIncrement = () => {
      setCount((prevCount) => prevCount + 1);
    };
  
    const handleDecrement = () => {
      if (count > 0) {
        setCount((prevCount) => prevCount - 1);
      }
    };
  
    return (
      <div className='counter-box'>
      <div className='counter-label'>{props.label}</div>
      <div className='counter'>
        <button className="counter-inc" onClick={handleDecrement}>-</button>
        <span className="counter-text">{count}</span>
        <button className="counter-dec"onClick={handleIncrement}>+</button>
      </div>
      </div>
    );
  };
export default IncrementDecrementCounter