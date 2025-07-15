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
          
          <div className="footer-social">
            <a href="https://www.instagram.com/imhotep_tech?igsh=YXV0Y24xZnNveDQ5" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <i className="fab fa-instagram" aria-hidden="true"></i>
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://x.com/Imhoteptech1?t=E5JmfSp5WpyZaWkDzILpKw&s=09" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter/X">
              <i className="fab fa-twitter" aria-hidden="true"></i>
              <span className="sr-only">Twitter</span>
            </a>
            <a href="https://github.com/Imhotep-Tech" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <i className="fab fa-github" aria-hidden="true"></i>
              <span className="sr-only">GitHub</span>
            </a>
          </div>
          
          <div className="footer-links">
            <a href="https://imhoteptech.vercel.app" target="_blank" rel="noopener noreferrer" className="footer-link">
              Imhotep Tech
            </a>
            <a href="mailto:imhoteptech@outlook.com" className="footer-link">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}