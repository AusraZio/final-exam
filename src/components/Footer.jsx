import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="/terms-and-conditions" className="footer-link">Terms and Conditions</a>
                <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
            </div>
            <div className="footer-copyright">
                Copyright © {new Date().getFullYear()} My Website
            </div>
        </footer>
    );
}

export default Footer;