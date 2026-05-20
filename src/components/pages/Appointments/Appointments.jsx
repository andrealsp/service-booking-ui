import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus, FaSync } from "react-icons/fa";

import Spinner from "../../feedback/Spinner/Spinner";
import EmptyState from "../../feedback/EmptyState/EmptyState";
import Toast from "../../feedback/Toast/Toast";
import AppointmentCard from "./AppointmentCard";
import AppointmentForm from "./AppointmentForm";
import CancelAppointmentModal from "./CancelAppointmentModal";
import CompleteAppointmentModal from "./CompleteAppointmentModal";
import ClientHistoryModal from "./ClientHistoryModal";

import {
  cancelAppointment,
  completeAppointment,
  confirmAppointment,
  createAppointment,
  listAllAppointmentsInWindow,
  listClientAppointments,
  listProviderAppointments,
} from "@/services/appointmentService";
import { getUserFromToken } from "@/services/tokenService";

import styles from "./Appointments.module.css";

function rawRole(role) {
  return (role || "").replace(/^ROLE_/, "").toUpperCase();
}

function isFinalStatus(status) {
  return status === "CANCELLED" || status === "COMPLETED" || status === "NO_SHOW";
}

function filterListFor(role) {
  const list = [
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past" },
    { id: "all", label: "All" },
  ];
  if (role === "PROVIDER" || role === "ADMIN" || role === "ASSISTANT") {
    list.splice(1, 0, { id: "pending", label: "Awaiting approval" });
  }
  return list;
}

/**
 * Period selector — used by Admin / Assistant on the full clinic agenda
 * view. The server expects [from, to) ISO-8601 timestamps; this helper
 * snaps the boundaries to the start/end of the chosen unit in the
 * browser's local timezone so the user sees "this week" intuitively.
 */
const PERIODS = [
  { id: "day", label: "Day" },
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
];

function periodBounds(periodId, refDate) {
  const ref = new Date(refDate);
  if (periodId === "day") {
    const from = new Date(ref);
    from.setHours(0, 0, 0, 0);
    const to = new Date(from);
    to.setDate(to.getDate() + 1);
    return { from: from.toISOString(), to: to.toISOString() };
  }
  if (periodId === "week") {
    // Monday-anchored week — local convention, easier to read than Sunday.
    const day = ref.getDay(); // 0 = Sun .. 6 = Sat
    const offsetToMonday = (day === 0 ? -6 : 1 - day);
    const from = new Date(ref);
    from.setDate(ref.getDate() + offsetToMonday);
    from.setHours(0, 0, 0, 0);
    const to = new Date(from);
    to.setDate(to.getDate() + 7);
    return { from: from.toISOString(), to: to.toISOString() };
  }
  // month
  const from = new Date(ref.getFullYear(), ref.getMonth(), 1, 0, 0, 0, 0);
  const to = new Date(ref.getFullYear(), ref.getMonth() + 1, 1, 0, 0, 0, 0);
  return { from: from.toISOString(), to: to.toISOString() };
}

function toDateInput(date) {
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function Appointments() {
  const user = getUserFromToken();
  const role = rawRole(user?.role);
  const isClient = role === "CLIENT";
  const isProvider = role === "PROVIDER";
  const isPrivileged = role === "ADMIN" || role === "ASSISTANT";

  const location = useLocation();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const FILTERS = filterListFor(role);
  const defaultFilter = isProvider ? "pending" : "upcoming";
  const [filter, setFilter] = useState(defaultFilter);

  // Period filter (Admin / Assistant only). Defaults to "week" centered on
  // today — that's the most useful first view for clinic operations.
  const [period, setPeriod] = useState("week");
  const [refDate, setRefDate] = useState(() => toDateInput(new Date()));

  const [formOpen, setFormOpen] = useState(false);
  const [formError, setFormError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelError, setCancelError] = useState(null);

  const [completeTarget, setCompleteTarget] = useState(null);
  const [completeError, setCompleteError] = useState(null);

  const [historyTarget, setHistoryTarget] = useState(null);

  const [busyId, setBusyId] = useState(null);
  const [busyAction, setBusyAction] = useState(null);

  // Deep link from /services with pre-selected service.
  useEffect(() => {
    const incoming = location.state?.selectedService;
    if (incoming && !formOpen) {
      setSelectedService(incoming);
      setFormError(null);
      setFormOpen(true);
      navigate(location.pathname, { replace: true, state: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const fetcher = useCallback(async () => {
    if (!user?.id) {
      setError("Could not identify the current user");
      setLoading(false);
      return;
    }
    setError(null);
    try {
      let data;
      if (isPrivileged) {
        // Full clinic agenda — covers appointments where Admin/Assistant is
        // the client, provider, OR has no role in the booking (which fixes
        // the bug where an Admin's own bookings disappeared because the
        // listing was scoped to provider-id).
        const { from, to } = periodBounds(period, refDate);
        data = await listAllAppointmentsInWindow(from, to);
      } else if (isClient) {
        data = await listClientAppointments(user.id);
      } else {
        data = await listProviderAppointments(user.id);
      }
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load appointments");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.id, isClient, isPrivileged, period, refDate]);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  const filtered = useMemo(() => {
    const now = Date.now();
    return items
      .filter((a) => {
        if (filter === "pending") return a.status === "PENDING_APPROVAL";
        if (filter === "upcoming") {
          return !isFinalStatus(a.status) && new Date(a.endAt).getTime() >= now;
        }
        if (filter === "past") {
          return isFinalStatus(a.status) || new Date(a.endAt).getTime() < now;
        }
        return true;
      })
      .sort(
        (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
      );
  }, [items, filter]);

  const pendingCount = useMemo(
    () => items.filter((a) => a.status === "PENDING_APPROVAL").length,
    [items]
  );

  async function handleCreate(payload) {
    setFormError(null);
    try {
      const created = await createAppointment(payload);
      setItems((prev) => [...prev, created]);
      setFormOpen(false);
      const msg =
        created.status === "PENDING_APPROVAL"
          ? "Request sent — awaiting provider approval"
          : "Appointment scheduled";
      setToast({ variant: "success", message: msg });
    } catch (err) {
      setFormError(err.message || "Failed to create appointment");
    }
  }

  async function handleConfirm(appointment) {
    setBusyId(appointment.id);
    setBusyAction("confirm");
    try {
      const updated = await confirmAppointment(appointment.id);
      setItems((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      setToast({ variant: "success", message: "Appointment approved" });
    } catch (err) {
      setToast({ variant: "error", message: err.message || "Approve failed" });
    } finally {
      setBusyId(null);
      setBusyAction(null);
    }
  }

  function openCancelModal(appointment) {
    setCancelError(null);
    setCancelTarget(appointment);
  }

  async function handleCancel(reason) {
    if (!cancelTarget) return;
    const appt = cancelTarget;
    setBusyId(appt.id);
    setBusyAction("cancel");
    setCancelError(null);
    try {
      const updated = await cancelAppointment(appt.id, reason);
      setItems((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      setCancelTarget(null);
      setToast({ variant: "success", message: "Appointment cancelled" });
    } catch (err) {
      setCancelError(err.message || "Cancel failed");
    } finally {
      setBusyId(null);
      setBusyAction(null);
    }
  }

  function openCompleteModal(appointment) {
    setCompleteError(null);
    setCompleteTarget(appointment);
  }

  async function handleComplete(observations) {
    if (!completeTarget) return;
    const appt = completeTarget;
    setBusyId(appt.id);
    setBusyAction("complete");
    setCompleteError(null);
    try {
      const updated = await completeAppointment(appt.id, observations);
      setItems((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      setCompleteTarget(null);
      setToast({ variant: "success", message: "Appointment completed" });
    } catch (err) {
      setCompleteError(err.message || "Complete failed");
    } finally {
      setBusyId(null);
      setBusyAction(null);
    }
  }

  function openHistoryModal(appointment) {
    setHistoryTarget({
      clientId: appointment.clientId,
      clientName: appointment.clientName,
    });
  }

  async function handleRefresh() {
    setRefreshing(true);
    await fetcher();
  }

  const headerSubtitle = isClient
    ? "Your scheduled sessions"
    : isProvider
    ? "Sessions booked with you"
    : "All appointments on the platform";

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Appointments</h1>
          <p className={styles.subtitle}>{headerSubtitle}</p>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={handleRefresh}
            disabled={refreshing}
            aria-label="Refresh"
          >
            <FaSync className={refreshing ? styles.spinning : ""} />
          </button>
          {(isClient || isPrivileged) && (
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => {
                setFormError(null);
                setSelectedService(null);
                setFormOpen(true);
              }}
            >
              <FaPlus /> New appointment
            </button>
          )}
        </div>
      </header>

      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`${styles.filter} ${
              filter === f.id ? styles.filterActive : ""
            }`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
            {f.id === "pending" && pendingCount > 0 && (
              <span className={styles.filterCount}>{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      {/*
        Admin / Assistant get an extra row for the day/week/month period
        plus a reference-date picker. Clients and Providers don't see this
        because their fetch is unscoped by date (they always get their full
        list, then client-side filter by upcoming/past/all).
      */}
      {isPrivileged && (
        <div className={styles.periodRow}>
          <div className={styles.periodTabs}>
            {PERIODS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`${styles.periodTab} ${
                  period === p.id ? styles.periodTabActive : ""
                }`}
                onClick={() => setPeriod(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
          <label className={styles.periodDate}>
            <span>Reference date</span>
            <input
              type="date"
              value={refDate}
              onChange={(e) => setRefDate(e.target.value)}
            />
          </label>
        </div>
      )}

      {loading && (
        <div className={styles.loadingBox}>
          <Spinner size="lg" />
          <span>Loading your appointments…</span>
        </div>
      )}

      {!loading && error && (
        <div className={styles.errorBox}>
          <strong>Something went wrong.</strong>
          <span>{error}</span>
          <button type="button" onClick={handleRefresh}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          icon="📅"
          title="No appointments here"
          description={
            filter === "pending"
              ? "No requests waiting for approval."
              : filter === "upcoming"
              ? "You have no upcoming sessions. Create one to get started."
              : "Nothing to show for this filter."
          }
        />
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className={styles.grid}>
          {filtered.map((a) => (
            <AppointmentCard
              key={a.id}
              appointment={a}
              viewerRole={role}
              onConfirm={handleConfirm}
              onCancel={openCancelModal}
              onComplete={openCompleteModal}
              onShowHistory={openHistoryModal}
              busyAction={busyId === a.id ? busyAction : null}
            />
          ))}
        </div>
      )}

      {formOpen && (
        <AppointmentForm
          clientId={user?.id}
          service={selectedService}
          onSubmit={handleCreate}
          onClose={() => {
            setFormOpen(false);
            setSelectedService(null);
          }}
          error={formError}
        />
      )}

      {cancelTarget && (
        <CancelAppointmentModal
          appointment={cancelTarget}
          reasonRequired={isProvider}
          onSubmit={handleCancel}
          onClose={() => {
            setCancelTarget(null);
            setCancelError(null);
          }}
          error={cancelError}
        />
      )}

      {completeTarget && (
        <CompleteAppointmentModal
          appointment={completeTarget}
          onSubmit={handleComplete}
          onClose={() => {
            setCompleteTarget(null);
            setCompleteError(null);
          }}
          error={completeError}
        />
      )}

      {historyTarget && (
        <ClientHistoryModal
          clientId={historyTarget.clientId}
          clientName={historyTarget.clientName}
          onClose={() => setHistoryTarget(null)}
        />
      )}

      <Toast
        message={toast?.message}
        variant={toast?.variant}
        onDismiss={() => setToast(null)}
      />
    </section>
  );
}

export default Appointments;
