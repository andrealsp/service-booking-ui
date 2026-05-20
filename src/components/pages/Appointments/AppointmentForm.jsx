import { useEffect, useMemo, useState } from "react";
import { FaTimes, FaMagic, FaUserMd, FaClock, FaExclamationCircle } from "react-icons/fa";

import Spinner from "../../feedback/Spinner/Spinner";
import { getProviderBusySlots, suggestSlots } from "@/services/schedulingService";
import { listProviders } from "@/services/identityService";
import {
  addMinutes,
  toIsoForOffsetDateTime,
  toLocalInputValue,
  formatRange,
  formatTime,
} from "@/utils/datetime";

import styles from "./AppointmentForm.module.css";

const DEFAULT_DURATION = 60;

function nextHourLocal() {
  const d = new Date();
  d.setMinutes(0, 0, 0);
  d.setHours(d.getHours() + 1);
  return toLocalInputValue(d);
}

/** Local-day boundaries for `value` ([dayStart, dayStart + 24h)) in ISO. */
function dayBoundsForLocal(localValue) {
  const ref = new Date(localValue);
  const start = new Date(ref);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { from: start.toISOString(), to: end.toISOString() };
}

/** Two intervals overlap when startA < endB AND endA > startB. */
function intervalsOverlap(aStartIso, aEndIso, bStartIso, bEndIso) {
  return (
    new Date(aStartIso).getTime() < new Date(bEndIso).getTime() &&
    new Date(aEndIso).getTime() > new Date(bStartIso).getTime()
  );
}

function AppointmentForm({ clientId, onSubmit, onClose, error, service }) {
  const [providerId, setProviderId] = useState("");
  const [startLocal, setStartLocal] = useState(nextHourLocal());
  const [duration, setDuration] = useState(
    service?.durationMinutes || DEFAULT_DURATION
  );
  const [notes, setNotes] = useState(
    service ? `Service: ${service.name}` : ""
  );
  const [submitting, setSubmitting] = useState(false);

  const [providers, setProviders] = useState([]);
  const [loadingProviders, setLoadingProviders] = useState(true);
  const [providersError, setProvidersError] = useState(null);

  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [suggestError, setSuggestError] = useState(null);

  // Busy slots for the chosen (provider, day). Refreshed whenever either
  // changes — so the UI mirrors the backend's blocking rules in real time.
  const [busy, setBusy] = useState([]);
  const [loadingBusy, setLoadingBusy] = useState(false);
  const [busyError, setBusyError] = useState(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    let cancelled = false;
    async function fetchProviders() {
      try {
        const data = await listProviders();
        if (cancelled) return;
        const list = Array.isArray(data) ? data : [];
        setProviders(list);
        setProviderId((curr) => curr || list[0]?.id || "");
      } catch (err) {
        if (cancelled) return;
        setProvidersError(err.message || "Failed to load providers");
      } finally {
        if (!cancelled) setLoadingProviders(false);
      }
    }
    fetchProviders();
    return () => {
      cancelled = true;
    };
  }, []);

  // Reload busy slots when provider or selected day changes. Server caps at
  // 90 days; we only ask for one day at a time so the response stays small.
  useEffect(() => {
    if (!providerId || !startLocal) {
      setBusy([]);
      return;
    }
    let cancelled = false;
    setLoadingBusy(true);
    setBusyError(null);
    const { from, to } = dayBoundsForLocal(startLocal);
    getProviderBusySlots(providerId, from, to)
      .then((data) => {
        if (cancelled) return;
        setBusy(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (cancelled) return;
        setBusyError(err.message || "Could not load the provider's agenda");
        setBusy([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingBusy(false);
      });
    return () => {
      cancelled = true;
    };
  }, [providerId, startLocal]);

  /**
   * Inline overlap detection — same predicate as the backend uses on submit,
   * so the user gets the same answer instantly.
   */
  const overlap = useMemo(() => {
    if (!startLocal || !duration) return null;
    const start = toIsoForOffsetDateTime(startLocal);
    const end = addMinutes(startLocal, Number(duration)).toISOString();
    for (const b of busy) {
      if (intervalsOverlap(start, end, b.startAt, b.endAt)) return b;
    }
    return null;
  }, [startLocal, duration, busy]);

  async function handleSuggest() {
    setSuggestError(null);
    if (!providerId) {
      setSuggestError("Pick a provider first to fetch suggestions");
      return;
    }
    setLoadingSuggestions(true);
    try {
      const around = toIsoForOffsetDateTime(startLocal);
      const data = await suggestSlots({
        providerId,
        clientId,
        around,
        limit: 5,
      });
      setSuggestions(data?.suggestions || data || []);
    } catch (err) {
      setSuggestError(err.message || "Failed to fetch suggestions");
    } finally {
      setLoadingSuggestions(false);
    }
  }

  function applySuggestion(slot) {
    setStartLocal(toLocalInputValue(slot.startAt));
    const minutes = Math.max(
      5,
      Math.round((new Date(slot.endAt) - new Date(slot.startAt)) / 60000)
    );
    setDuration(minutes);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Defense in depth — overlap is already disabled, but a determined user
    // could clear the disabled attr via DevTools. Bail out anyway.
    if (overlap) return;
    setSubmitting(true);
    const startAt = toIsoForOffsetDateTime(startLocal);
    const endAt = addMinutes(startLocal, Number(duration)).toISOString();
    try {
      await onSubmit({
        providerId,
        clientId,
        startAt,
        endAt,
        notes: notes || undefined,
      });
    } finally {
      setSubmitting(false);
    }
  }

  const noProviders = !loadingProviders && !providersError && providers.length === 0;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className={styles.modal}>
        <header className={styles.head}>
          <div>
            <h3>New appointment</h3>
            {service && (
              <p className={styles.servicePill}>
                <span aria-hidden>{service.icon}</span>
                <span>{service.name}</span>
              </p>
            )}
          </div>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>
              <FaUserMd aria-hidden /> Provider
            </span>

            {loadingProviders ? (
              <div className={styles.loadingInline}>
                <Spinner /> <span>Loading providers…</span>
              </div>
            ) : providersError ? (
              <div className={styles.fieldErrorBox}>
                Couldn't load providers: {providersError}
              </div>
            ) : noProviders ? (
              <div className={styles.fieldEmptyBox}>
                No users with the PROVIDER role yet. Ask one to sign up before
                booking.
              </div>
            ) : (
              <select
                value={providerId}
                onChange={(e) => setProviderId(e.target.value)}
                required
              >
                {providers.map((p) => {
                  const name = p.givenName || p.fullName;
                  const label = p.position ? `${p.position} - ${name}` : name;
                  return (
                    <option key={p.id} value={p.id}>
                      {label}
                      {p.serviceProvided ? ` · ${p.serviceProvided}` : ""}
                    </option>
                  );
                })}
              </select>
            )}
          </label>

          <div className={styles.row}>
            <label className={styles.field}>
              <span>Start</span>
              <input
                type="datetime-local"
                value={startLocal}
                onChange={(e) => setStartLocal(e.target.value)}
                required
              />
            </label>

            <label className={styles.field}>
              <span>Duration (min)</span>
              <input
                type="number"
                min="15"
                step="15"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Busy intervals panel for the selected day. Empty when the
              provider has nothing booked — keeps the form clean. */}
          {providerId && !loadingProviders && (
            <div className={styles.busyPanel}>
              <div className={styles.busyHead}>
                <FaClock aria-hidden />
                <strong>Busy on this day</strong>
                {loadingBusy && <Spinner />}
              </div>
              {busyError ? (
                <div className={styles.fieldErrorBox}>{busyError}</div>
              ) : busy.length === 0 ? (
                <p className={styles.busyEmpty}>No bookings yet for this day.</p>
              ) : (
                <ul className={styles.busyList}>
                  {busy.map((b) => (
                    <li key={b.appointmentId} className={styles.busyItem}>
                      <span>
                        {formatTime(b.startAt)} – {formatTime(b.endAt)}
                      </span>
                      <span
                        className={
                          b.status === "CONFIRMED"
                            ? styles.busyTagConfirmed
                            : styles.busyTagPending
                        }
                      >
                        {b.status === "CONFIRMED" ? "Confirmed" : "Awaiting approval"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {overlap && (
                <div className={styles.busyClash}>
                  <FaExclamationCircle aria-hidden />
                  <span>
                    The chosen time overlaps a {overlap.status === "CONFIRMED"
                      ? "confirmed"
                      : "pending"}{" "}
                    appointment ({formatTime(overlap.startAt)} – {formatTime(overlap.endAt)}).
                    Pick a different start time.
                  </span>
                </div>
              )}
            </div>
          )}

          <label className={styles.field}>
            <span>Notes</span>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any context for the provider…"
            />
          </label>

          <div className={styles.suggestRow}>
            <button
              type="button"
              className={styles.suggestBtn}
              onClick={handleSuggest}
              disabled={loadingSuggestions || !providerId}
            >
              <FaMagic />
              {loadingSuggestions ? "Asking AI…" : "AI suggestions"}
            </button>
            {suggestError && (
              <span className={styles.suggestError}>{suggestError}</span>
            )}
          </div>

          {loadingSuggestions && (
            <div className={styles.suggestLoading}>
              <Spinner /> <span>Fetching smart slots…</span>
            </div>
          )}

          {suggestions.length > 0 && (
            <ul className={styles.suggestList}>
              {suggestions.map((slot, idx) => (
                <li key={`${slot.startAt}-${idx}`}>
                  <button
                    type="button"
                    className={styles.suggestItem}
                    onClick={() => applySuggestion(slot)}
                  >
                    <span className={styles.suggestRange}>
                      {formatRange(slot.startAt, slot.endAt)}
                    </span>
                    <span className={styles.suggestMeta}>
                      score {(slot.score * 100).toFixed(0)}% · {slot.reason}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {error && <div className={styles.formError}>{error}</div>}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondary}
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.primary}
              disabled={
                submitting ||
                noProviders ||
                !providerId ||
                Boolean(overlap) ||
                loadingBusy
              }
              title={overlap ? "Chosen time overlaps an existing booking" : undefined}
            >
              {submitting ? "Saving…" : "Create appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentForm;
