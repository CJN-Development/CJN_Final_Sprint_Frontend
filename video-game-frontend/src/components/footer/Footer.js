import React from 'react';
import { Typography, Container, AppBar, Toolbar, IconButton } from '@mui/material';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

import './Footer.css'; // Import your custom CSS file

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AppBar position="static" className="footer">
      <Toolbar>
        <Container maxWidth="md">
          <Typography variant="body1">
            &copy; {currentYear} CJND Development. All rights reserved.
          </Typography>
          <Typography variant="body2" component="p">
            Address: 123 Example St, City, Country
          </Typography>
          <Typography variant="body1" component="p">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2694.1818777013955!2d-52.77329292361149!3d47.52532197118255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0ca30dfb0485db%3A0xe93e1392e5d6010!2sKeyin%20College!5e0!3m2!1sen!2sca!4v1692024666711!5m2!1sen!2sca" width="300" height="200" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </Typography>
          <div className="social-icons">
            <IconButton
              className="social-icon"
              color="inherit"
              aria-label="Facebook"
            >
              <FaFacebook />
            </IconButton>
            <IconButton
              className="social-icon"
              color="inherit"
              aria-label="Twitter"
            >
              <FaTwitter />
            </IconButton>
            <IconButton
              className="social-icon"
              color="inherit"
              aria-label="Instagram"
            >
              <FaInstagram />
            </IconButton>
            <IconButton
              className="social-icon"
              color="inherit"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </IconButton>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;