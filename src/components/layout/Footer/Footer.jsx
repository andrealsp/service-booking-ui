import { FaGithub, FaEnvelope, FaWhatsapp, FaLinkedin } from "react-icons/fa";

import styles from "./Footer.module.css";

const socialLinks = [
  {
    icon: FaGithub,
    url: "https://github.com/andrealsp",
    label: "GitHub",
  },
  {
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/andre-pereira/",
    label: "LinkedIn",
  },
  {
    icon: FaEnvelope,
    url: "mailto:andre.alsp@outlook.com",
    label: "Email",
  },
  {
    icon: FaWhatsapp,
    url: "https://wa.me/5511986760568",
    label: "WhatsApp",
  },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.brandLine}>
          <span className={styles.brand}>NEXUS</span> &copy; 2026
        </p>

        <p className={styles.authorLine}>
          Developed by <span>Andre Luis</span>
        </p>
      </div>

      <ul className={styles.socialList}>
        {socialLinks.map(({ icon: Icon, url, label }) => (
          <li key={label}>
            <a href={url} target="_blank" rel="noreferrer" aria-label={label}>
              <Icon />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default Footer;
