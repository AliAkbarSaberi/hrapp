import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          &copy; {currentYear} hrApp. All rights reserved. | WP25K
        </p>
      </div>
    </footer>
  );
}

export default Footer;
