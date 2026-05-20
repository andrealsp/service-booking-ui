import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaCalendarPlus,
  FaChartLine,
  FaExclamationTriangle,
  FaHourglassHalf,
  FaListUl,
} from "react-icons/fa";

import Spinner from "../../feedback/Spinner/Spinner";
import EmptyState from "../../feedback/EmptyState/EmptyState";
import StatusBadge from "../../feedback/StatusBadge/StatusBadge";

import {
  listClientAppointments,
  listProviderAppointments,
} from "@/services/appointmentService";
import { getUserFromToken } from "@/services/tokenService";
import { formatRange } from "@/utils/datetime";

import styles from "./Home.module.css";

function rawRole(role) {
  return (role || "").replace(/^ROLE_/, "").toUpperCase();
}

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className={`${styles.stat} ${accent ? styles[accent] : ""}`}>
      <span className={styles.statIcon}>
        <Icon aria-hidden />
      </span>
      <div>
        <span className={styles.statValue}>{value}</span>
        <span className={styles.statLabel}>{label}</span>
      </div>
    </div>
  );
}

function Home() {
  const user = getUserFromToken();
  const role = rawRole(user?.role);
  const isClient = role === "CLIENT";
  const isProvider = role === "PROVIDER";
  const canApprove = role === "PROVIDER" || role === "ASSISTANT" || role === "ADMIN";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetcher = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      setError("Could not identify the current user");
      return;
    }
    try {
      const data = isClient
        ? await listClientAppointments(user.id)
        : await listProviderAppointments(user.id);
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  }, [user?.id, isClient]);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  const stats = useMemo(() => {
    const now = Date.now();
    const upcoming = items.filter(
      (a) =>
        a.status !== "CANCELLED" &&
        a.status !== "NO_SHOW" &&
        new Date(a.endAt).getTime() >= now
    );
    const confirmed = items.filter((a) => a.status === "CONFIRMED");
    const pending = items.filter((a) => a.status === "PENDING_APPROVAL");
    const highRisk = items.filter(
      (a) =>
        (a.noShowProbability ?? 0) >= 0.5 &&
        a.status !== "CANCELLED" &&
        a.status !== "COMPLETED"
    );
    return {
      total: items.length,
      upcoming: upcoming.length,
      confirmed: confirmed.length,
      pending: pending.length,
      highRisk: highRisk.length,
    };
  }, [items]);

  const next = useMemo(() => {
    const now = Date.now();
    return items
      .filter(
        (a) =>
          a.status !== "CANCELLED" &&
          a.status !== "NO_SHOW" &&
          new Date(a.endAt).getTime() >= now
      )
      .sort(
        (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
      )
      .slice(0, 3);
  }, [items]);

  const headerCopy = isClient
    ? "Here's a quick view of your bookings on NEXUS."
    : isProvider
    ? "Here's a quick view of the sessions booked with you."
    : "Here's the operational view of the booking platform.";

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Welcome back</p>
          <h1 className={styles.title}>
            Hi, <span className={styles.highlight}>{user?.givenName || "there"}</span> 👋
          </h1>
          <p className={styles.subtitle}>{headerCopy}</p>
        </div>

        <div className={styles.heroActions}>
          <Link to="/appointments" className={styles.heroSecondary}>
            <FaListUl /> See all
          </Link>
          {(isClient || role === "ADMIN" || role === "ASSISTANT") && (
            <Link to="/appointments" className={styles.heroPrimary}>
              <FaCalendarPlus /> Book a session
            </Link>
          )}
        </div>
      </header>

      {loading && (
        <div className={styles.loading}>
          <Spinner size="lg" />
          <span>Loading your dashboard…</span>
        </div>
      )}

      {!loading && error && (
        <div className={styles.errorBox}>
          <strong>Couldn't load your data.</strong>
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className={styles.statsGrid}>
            <StatCard icon={FaListUl} label="Total bookings" value={stats.total} />
            <StatCard
              icon={FaCalendarCheck}
              label="Upcoming"
              value={stats.upcoming}
              accent="primary"
            />
            <StatCard
              icon={FaChartLine}
              label="Confirmed"
              value={stats.confirmed}
              accent="success"
            />
            {canApprove && (
              <StatCard
                icon={FaHourglassHalf}
                label="Awaiting approval"
                value={stats.pending}
                accent="warning"
              />
            )}
            <StatCard
              icon={FaExclamationTriangle}
              label="High no-show risk"
              value={stats.highRisk}
              accent="warning"
            />
          </div>

          <section className={styles.section}>
            <header className={styles.sectionHead}>
              <h2>Next sessions</h2>
              <Link to="/appointments" className={styles.sectionLink}>
                See all →
              </Link>
            </header>

            {next.length === 0 ? (
              <EmptyState
                icon="🗓️"
                title="No upcoming sessions"
                description={
                  isProvider
                    ? "When clients book with you, sessions will show up here."
                    : "You don't have any session scheduled. Book one to get started."
                }
              />
            ) : (
              <ul className={styles.nextList}>
                {next.map((a) => (
                  <li key={a.id} className={styles.nextItem}>
                    <div className={styles.nextInfo}>
                      <span className={styles.nextWhen}>
                        {formatRange(a.startAt, a.endAt)}
                      </span>
                      {a.notes && (
                        <span className={styles.nextNote}>{a.notes}</span>
                      )}
                    </div>
                    <div className={styles.nextMeta}>
                      <StatusBadge status={a.status} />
                      {a.noShowProbability != null && (
                        <span className={styles.risk}>
                          risk {Math.round(a.noShowProbability * 100)}%
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </section>
  );
}

export default Home;
