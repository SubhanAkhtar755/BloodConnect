import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaEnvelope } from "react-icons/fa";
 import "./Footer.css"; // Your updated CSS file
const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <p className="footer-text">
        &copy; 2025 <span className="brand">BloodConnect</span>. All rights reserved.
      </p>

      <nav className="footer-nav">
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/support">Support</Link>
      </nav>

      
    </div>

    <p className="footer-credit">
      Designed &amp; Developed by <span className="author">M.SubhanAkhtar</span>
    </p>
  </footer>
);

export default Footer;
