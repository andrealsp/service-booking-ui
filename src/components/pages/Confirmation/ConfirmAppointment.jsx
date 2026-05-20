import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";

import Logo from "../../brand/Logo/Logo";
import LoginFooter from "../../layout/LoginFooter/LoginFooter";
import { confirmAppointmentByToken } from "@/services/appointmentService";
import { formatDate, formatTime } from "@/utils/datetime";

import styles from "./ConfirmAppointment.module.css";

/**
 * Public landing page for the SMS / WhatsApp / Email reminder deep-link.
 * The token in the URL is the authorization — no login required.
 *
 * Three states:
 *   - loading: still calling the backend
 *   - success: appointment is confirmed (also covers the idempotent
 *              re-click case, since the backend returns the same payload)
 *   - error:   token unknown, appointment already cancelled, etc.
 */
function ConfirmAppointment() {
  const { token } = useParams();

  const [state, setState] = useState("loading");
  const [appointment, setAppointment] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    let active = true;
    if (!token) {
      setState("error");
      setErrorMessage("Missing confirmation token in the link.");
      return undefined;
    }
    confirmAppointmentByToken(token)
      .then((data) => {
        if (!active) return;
        setAppointment(data);
        setState("success");
      })
      .catch((err) => {
        if (!active) return;
        setErrorMessage(err.message || "We couldn't confirm your appointment.");
        setState("error");
      });
    return () => {
      active = false;
    };
  }, [token]);

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <Logo size={40} variant="wordmark" />
          <h1 className={styles.title}>Confirm appointment</h1>
        </header>

        {state === "loading" && (
          <div className={styles.statusBox}>
            <FaHourglassHalf className={styles.iconLoading} aria-hidden />
            <p>Confirming your appointment…</p>
          </div>
        )}

        {state === "success" && (
          <div className={`${styles.statusBox} ${styles.statusSuccess}`}>
            <FaCheckCircle className={styles.iconSuccess} aria-hidden />
            <h2>You're confirmed!</h2>
            {appointment?.startAt && (
              <p>
                <strong>{formatDate(appointment.startAt)}</strong> at{" "}
                <strong>{formatTime(appointment.startAt)}</strong>
                {appointment?.providerName ? (
                  <>
                    {" "}with <strong>{appointment.providerName}</strong>
                  </>
                ) : null}
                .
              </p>
            )}
            <p className={styles.muted}>
              You can close this page. We'll send a reminder closer to the
              date.
            </p>
          </div>
        )}

        {state === "error" && (
          <div className={`${styles.statusBox} ${styles.statusError}`}>
            <FaTimesCircle className={styles.iconError} aria-hidden />
            <h2>We couldn't confirm</h2>
            <p>{errorMessage}</p>
            <Link to="/login" className={styles.linkBack}>
              Go to sign in
            </Link>
          </div>
        )}

        <LoginFooter />
      </div>
    </section>
  );
}

export default ConfirmAppointment;
