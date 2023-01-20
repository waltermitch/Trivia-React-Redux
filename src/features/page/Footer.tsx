import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='navigation'>
                <NavLink to="/" className="footer-link" activeClassName="selected">
                    Home
                </NavLink>
                <NavLink to="/privacy-policy" className="footer-link" activeClassName="selected" style={{borderLeft:'1px solid'}}>
                    Privacy Policy
                </NavLink>
                <NavLink to="/terms-of-service" className="footer-link" activeClassName="selected" style={{borderLeft:'1px solid'}}>
                    Terms of Service
                </NavLink>
                <NavLink to="/dmca" className="footer-link" activeClassName="selected" style={{borderLeft:'1px solid'}}>
                    DMCA
                </NavLink>
                <NavLink to="/contactus" className="footer-link" activeClassName="selected" style={{borderLeft:'1px solid'}}>
                    Contact
                </NavLink>
            </div>
            <span className='disclaimer'>This project was completed with assistance from the Digital Entertainment team, a division of the Georgia Department of Economic Development.</span>
            <span className='copyright'>© Grey State Ventures, LLC. 2022</span>
        </footer>
    );
};

export default Footer;
