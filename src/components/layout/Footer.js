import { FaGithub, FaEnvelope, FaWhatsapp, FaLinkedin } from "react-icons/fa";

import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="Footer">
      <div className="FooterContent">
        <p className="BrandLine">
          <span className="Brand">NEXUS</span> &copy; 2026
        </p>
        <p className="AuthorLine">
          Developed by <span>Andre Luis</span>
        </p>
      </div>
      <ul className="SocialList">
        <li>
          <a
            href="https://github.com/andrealsp-portfolio"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub title="GitHub" />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/andre-pereira/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin title="LinkedIn" />
          </a>
        </li>
        <li>
          <a href="mailto:andre.alsp@outlook.com">
            <FaEnvelope title="E-mail" />
          </a>
        </li>
        <li>
          <a
            href="https://wa.me/5511986760568"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp title="WhatsApp" />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
