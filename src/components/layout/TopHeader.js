import React, { useState } from "react";
import classes from './TopHeader.module.css';
import { Link } from 'react-router-dom';

const TopHeader = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className={`${classes['top-header']} hide-on-med-and-down`}>
      <div className="container">
        <ul>
          <li><Link to='/'><i className="material-icons">location_on</i> Delhi, India</Link></li>
          <li><Link to='/'><i className="material-icons">phone</i> +1 234 567 890</Link></li>
          <li><Link to='/'><i className="material-icons">email</i> support@echohealthcare.com</Link></li>
        </ul>
        {/* <div className="right"></div> */}
      </div>
      <button className={`${classes['close-btn']}`} onClick={() => setVisible(false)}>✖</button>
    </div>
  );
};

export default TopHeader;
