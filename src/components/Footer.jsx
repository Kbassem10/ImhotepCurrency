import imhotepCCLogo from "../assets/icc.png"
import '../App.css'

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo-section">
            <img src={imhotepCCLogo} className="footer-logo" alt="Imhotep Currency logo" />
            <p className="footer-copyright">
              &copy; 2025 Imhotep Currency Convertor. All rights reserved.
            </p>
          </div>
          
          <div className="footer-links">
            <a href="https://imhoteptech.vercel.app" target="_blank" className="footer-link">
              Imhotep Tech
            </a>
            <a href="mailto:imhoteptech@outlook.com" className="footer-link">
              Contact
            </a>
          </div>
          
          <div className="footer-social">
            <a href="https://www.instagram.com/imhotep_tech?igsh=YXV0Y24xZnNveDQ5" target="_blank" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://x.com/Imhoteptech1?t=E5JmfSp5WpyZaWkDzILpKw&s=09" target="_blank" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://github.com/Imhotep-Tech" target="_blank" className="social-link">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}