import "./Footer.css";
import { NavLink } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa"; 

export const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        {/* Column 1: Brand / Description */}
        <div className="footer-content">
          <h3>Juilee Talekar</h3>
          <p>
            Passionate developer creating seamless digital experiences. 
            Let's build something amazing together.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-content">
          <h3>Quick Links</h3>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/service">Services</NavLink></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className="footer-content">
          <h3>My Services</h3>
          <ul>
            <li><NavLink to="/service">Web Development</NavLink></li>
            <li><NavLink to="/service">UI/UX Design</NavLink></li>
            <li><NavLink to="/service">Consulting</NavLink></li>
          </ul>
        </div>

        {/* Column 4: Socials */}
        <div className="footer-content">
          <h3>Connect</h3>
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
          
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Juilee Talekar. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};