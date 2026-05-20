import { useNavigate } from "react-router-dom";
import { FaClock, FaArrowRight } from "react-icons/fa";

import { SERVICE_CATALOG } from "@/data/serviceCatalog";

import styles from "./Services.module.css";

function formatPrice(amount) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function Services() {
  const navigate = useNavigate();

  function bookService(service) {
    navigate("/appointments", { state: { selectedService: service } });
  }

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>What we offer</p>
        <h1 className={styles.title}>
          Choose the <span>service</span> that fits you
        </h1>
        <p className={styles.subtitle}>
          Transparent durations and pricing — pick one and we'll prefill it on
          the booking form.
        </p>
      </header>

      <div className={styles.grid}>
        {SERVICE_CATALOG.map((service) => (
          <article key={service.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.icon} aria-hidden>
                {service.icon}
              </span>
              <div className={styles.tags}>
                {service.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <h2 className={styles.name}>{service.name}</h2>
            <p className={styles.description}>{service.description}</p>

            <div className={styles.meta}>
              <span className={styles.duration}>
                <FaClock /> {service.durationMinutes} min
              </span>
              <span className={styles.price}>{formatPrice(service.price)}</span>
            </div>

            <button
              type="button"
              className={styles.book}
              onClick={() => bookService(service)}
            >
              Book this service <FaArrowRight />
            </button>
          </article>
        ))}
      </div>

      <footer className={styles.disclaimer}>
        <span>📌</span>
        <p>
          Services and pricing shown above are illustrative — the backend
          catalog endpoint is on the roadmap. Bookings already flow through the
          live API.
        </p>
      </footer>
    </section>
  );
}

export default Services;
