import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "../Styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about d-flex flex-column align-items-center">
          <h3 className="w-100">About Us</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum soluta
            ipsa, magnam libero magni temporibus beatae corrupti at tempora
            itaque illum culpa quod ducimus debitis adipisci distinctio nam
            impedit facere.
          </p>

          <div className="social-media ">
            <div>
              <a href="#" aria-label="Facebook" className="social-icon">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
            <div>
              <a href="#" aria-label="Twitter" className="social-icon">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
            <div>
              {" "}
              <a href="#" aria-label="Instagram" className="social-icon">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
            <div>
              <a href="#" aria-label="LinkedIn" className="social-icon">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-section newsletter">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Get the latest updates and offers directly in your inbox.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
