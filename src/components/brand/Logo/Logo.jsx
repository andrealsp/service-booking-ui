import styles from "./Logo.module.css";

/**
 * NEXUS brand mark.
 *
 * Two variants:
 *   - `variant="mark"` (default): just the badge (good for navbar, favicons).
 *   - `variant="wordmark"`: badge + "NEXUS" wordmark (good for login/landing).
 *
 * `tone` controls the badge palette:
 *   - "primary" (default): blue gradient on white
 *   - "inverse": white badge on dark backgrounds
 */
function Logo({
  size = 40,
  variant = "mark",
  tone = "primary",
  label = "NEXUS",
}) {
  const id = `logo-grad-${tone}`;
  const isInverse = tone === "inverse";

  const stopFrom = isInverse ? "#ffffff" : "#4f9ed1";
  const stopTo = isInverse ? "#e0f2fe" : "#154e78";
  const strokeColor = isInverse ? "#1e6fa8" : "#ffffff";
  const dotColor = "#f97316";

  const badge = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
      className={styles.svg}
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={stopFrom} />
          <stop offset="100%" stopColor={stopTo} />
        </linearGradient>
      </defs>

      <rect x="2" y="2" width="44" height="44" rx="12" fill={`url(#${id})`} />

      {/* Stylized "N" — three strokes */}
      <g
        stroke={strokeColor}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <line x1="15" y1="34" x2="15" y2="14" />
        <line x1="15" y1="14" x2="33" y2="34" />
        <line x1="33" y1="34" x2="33" y2="14" />
      </g>

      {/* Accent dot — represents a "node" in the network of bookings */}
      <circle cx="36" cy="12" r="3.2" fill={dotColor} />
    </svg>
  );

  if (variant === "mark") return badge;

  return (
    <span className={styles.wordmark}>
      {badge}
      <span
        className={`${styles.text} ${isInverse ? styles.textInverse : ""}`}
        aria-hidden
      >
        NEXUS
      </span>
    </span>
  );
}

export default Logo;
