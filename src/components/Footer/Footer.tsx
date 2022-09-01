import React from "react";
import './Footer.css';

const Footer:React.FC = () => {
  return (
    <footer className="app__footer">
        <p className="app__footer-links">
          <a className="link-1" href="#">Home</a>
          <a className="#">Blog</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
          <a href="#">Faq</a>
          <a href="#">Contact</a>
        </p>
        <p>Game of Thrones Wiki &copy; 2022</p>
    </footer>
  )
}

export default Footer;
