import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={`${classes.footer}`}>
      <div className={`container ${'footer-top'}`}>
        <div className="row">
          <div className="col s3">
            <h4>Contact Details</h4>
            <ul>
              <li>
              Board: +91-811111111
              </li>
              <li>
              Business: +91-8822222
              </li>
              <li>
              Phone: +91-911111111
              </li>
              <li>
                <Link to='/'></Link>
              </li>
            </ul>
          </div>
          <div className="col s3">
            <h4>Enquiry Details</h4>
            <ul>
              <li>
              Business: support@echohealthcare.in
              </li>
              <li>
              Business: investors@echohealthcare.in
              </li>
              <li>
              <Link to='https://api.whatsapp.com/send?phone=+919999726505&text=Hello'>whatsapp</Link>
              </li>
              <li>
                <Link to='/'></Link>
              </li>
            </ul>
          </div>
          <div className="col s3">
            <h4>Other Links</h4>
            <ul>
              <li>
              <Link to='/'>About Us</Link>
              </li>
              <li>
                <Link to='/'>Support & Client Services</Link>
              </li>
              <li>
                <Link to='/'>Privacy Policy</Link>
              </li>
              <li>
                <Link to='/'>Site Map</Link>
              </li>
            </ul>
          </div>
          <div className="col s3">
            <h4>Connect with us</h4>
            <ul className={`${classes['social-list']}`}>
              <li>
                <Link to='/'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" /></svg>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" /></svg>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" /></svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={`${classes['footer-bottom']}`}>
          <p className='right-align'>
            {new Date().getFullYear()} &copy; All rights reserved by{' '}
            <Link to="https://echohealthcare.in"
              target="_blank"
              rel="noopener noreferrer">
              www.echohealthcare.in
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
