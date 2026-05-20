import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  FaPlus,
  FaSync,
  FaUserShield,
  FaUserMd,
  FaUserCog,
  FaUser,
  FaPencilAlt,
  FaTrashAlt,
  FaKey,
} from "react-icons/fa";

import Spinner from "../../feedback/Spinner/Spinner";
import EmptyState from "../../feedback/EmptyState/EmptyState";
import Toast from "../../feedback/Toast/Toast";
import UserForm from "./UserForm";
import ResetPasswordPrompt from "./ResetPasswordPrompt";

import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  resetUserPassword,
  updateUser,
} from "@/services/userManagementService";
import { getUserFromToken } from "@/services/tokenService";

import styles from "./Users.module.css";

const ROLE_META = {
  ADMIN: { label: "Admin", icon: FaUserShield, tone: "danger" },
  ASSISTANT: { label: "Assistant", icon: FaUserCog, tone: "warning" },
  PROVIDER: { label: "Provider", icon: FaUserMd, tone: "info" },
  CLIENT: { label: "Client", icon: FaUser, tone: "muted" },
};

const FILTERS = [
  { id: "ALL", label: "All" },
  { id: "ADMIN", label: "Admins" },
  { id: "ASSISTANT", label: "Assistants" },
  { id: "PROVIDER", label: "Providers" },
  { id: "CLIENT", label: "Clients" },
];

function rolePill(role) {
  const meta = ROLE_META[role] || { label: role, icon: FaUser, tone: "muted" };
  const Icon = meta.icon;
  return (
    <span className={`${styles.pill} ${styles[`pill_${meta.tone}`]}`}>
      <Icon aria-hidden /> {meta.label}
    </span>
  );
}

function Users() {
  const me = getUserFromToken();
  const myRole = me?.role?.replace(/^ROLE_/, "");
  const allowed = myRole === "ADMIN" || myRole === "ASSISTANT";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editingLoading, setEditingLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const [resetTarget, setResetTarget] = useState(null);
  const [resetError, setResetError] = useState(null);

  const [toast, setToast] = useState(null);

  const fetcher = useCallback(async () => {
    setError(null);
    try {
      const data = await listUsers();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (!allowed) {
      setLoading(false);
      return;
    }
    fetcher();
  }, [fetcher, allowed]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return items.filter((u) => {
      if (filter !== "ALL" && (u.role || "").toUpperCase() !== filter) return false;
      if (!term) return true;
      return (
        (u.fullName || "").toLowerCase().includes(term) ||
        (u.givenName || "").toLowerCase().includes(term) ||
        (u.email || "").toLowerCase().includes(term)
      );
    });
  }, [items, filter, search]);

  async function openEdit(user) {
    // Refresh the row from the server before opening the modal so the form
    // always has the latest values (the list could be stale).
    setEditingLoading(true);
    setFormError(null);
    try {
      const fresh = await getUser(user.id);
      setEditing(fresh);
      setFormOpen(true);
    } catch (err) {
      setToast({
        variant: "error",
        message: err.message || "Could not load this user",
      });
    } finally {
      setEditingLoading(false);
    }
  }

  async function handleCreate(payload) {
    setFormError(null);
    try {
      const body = {
        fullName: payload.fullName,
        givenName: payload.givenName,
        identificationDocument: payload.identificationDocument,
        contact: {
          phoneNumber: payload.phoneNumber,
          email: payload.email,
          address: payload.address,
        },
        username: payload.username,
        password: payload.password,
        role: payload.role,
        position: payload.position || undefined,
        serviceProvided: payload.serviceProvided || undefined,
      };
      const created = await createUser(body);
      setItems((p) => [...p, created]);
      setFormOpen(false);
      setEditing(null);
      setToast({ variant: "success", message: "User created" });
    } catch (err) {
      setFormError(err.message || "Failed to create user");
    }
  }

  async function handleUpdate(payload) {
    setFormError(null);
    try {
      // We deliberately omit password — that flow has its own endpoint.
      const patch = {
        fullName: payload.fullName,
        givenName: payload.givenName,
        identificationDocument: payload.identificationDocument,
        phoneNumber: payload.phoneNumber,
        email: payload.email,
        address: payload.address,
        role: payload.role,
        position: payload.position || null,
        serviceProvided: payload.serviceProvided || null,
      };
      const updated = await updateUser(editing.id, patch);
      setItems((p) => p.map((u) => (u.id === updated.id ? updated : u)));
      setFormOpen(false);
      setEditing(null);
      setToast({ variant: "success", message: "User updated" });
    } catch (err) {
      setFormError(err.message || "Failed to update user");
    }
  }

  async function handleDelete(user) {
    if (myRole !== "ADMIN") {
      setToast({ variant: "warning", message: "Only Admin can delete users" });
      return;
    }
    if (!window.confirm(`Delete user ${user.givenName || user.fullName}?`)) return;
    try {
      await deleteUser(user.id);
      setItems((p) => p.filter((u) => u.id !== user.id));
      setToast({ variant: "success", message: "User deleted" });
    } catch (err) {
      setToast({ variant: "error", message: err.message || "Delete failed" });
    }
  }

  async function handleReset(temporaryPassword) {
    setResetError(null);
    try {
      await resetUserPassword(resetTarget.id, temporaryPassword);
      // Refresh the row so the next edit modal shows password_change_required=true.
      try {
        const fresh = await getUser(resetTarget.id);
        setItems((p) => p.map((u) => (u.id === fresh.id ? fresh : u)));
      } catch {
        /* non-blocking */
      }
      setResetTarget(null);
      setToast({
        variant: "success",
        message: "Password reset — user must change it at next login.",
      });
    } catch (err) {
      setResetError(err.message || "Reset failed");
    }
  }

  if (!me) return <Navigate to="/login" replace />;
  if (!allowed) {
    return (
      <section className={styles.page}>
        <EmptyState
          icon="🔒"
          title="Restricted area"
          description="Only Admins and Assistants can manage users."
        />
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>User management</p>
          <h1 className={styles.title}>Users</h1>
          <p className={styles.subtitle}>
            Create, edit and reset passwords. Only Admin can permanently
            remove accounts.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => {
              setRefreshing(true);
              fetcher();
            }}
            disabled={refreshing}
            aria-label="Refresh"
          >
            <FaSync className={refreshing ? styles.spinning : ""} />
          </button>
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={() => {
              setEditing(null);
              setFormError(null);
              setFormOpen(true);
            }}
          >
            <FaPlus /> New user
          </button>
        </div>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`${styles.filter} ${filter === f.id ? styles.filterActive : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <input
          type="search"
          placeholder="Search by name or email…"
          className={styles.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && (
        <div className={styles.loadingBox}>
          <Spinner size="lg" />
          <span>Loading users…</span>
        </div>
      )}

      {!loading && error && (
        <div className={styles.errorBox}>
          <strong>Something went wrong.</strong>
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          icon="👥"
          title="No users to show"
          description="Try a different filter, or create the first user with the button above."
        />
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => {
                const targetRole = (u.role || "").toUpperCase();
                // Assistant can view Admins but can't touch them.
                const lockedForAssistant =
                  myRole === "ASSISTANT" && targetRole === "ADMIN";
                const isMe = me?.id === u.id;
                return (
                  <tr key={u.id}>
                    <td className={styles.nameCellWrap} data-label="Name">
                      <div className={styles.nameCell}>
                        <span className={styles.fullName}>
                          {u.fullName || "—"}
                        </span>
                        {u.givenName && (
                          <span className={styles.givenName}>
                            “{u.givenName}”
                          </span>
                        )}
                      </div>
                    </td>
                    <td data-label="Email">{u.email}</td>
                    <td data-label="Role">{rolePill(targetRole)}</td>
                    <td className={styles.actionsCell} data-label="Actions">
                      {lockedForAssistant ? (
                        <span className={styles.lockedHint}>View only</span>
                      ) : (
                        <>
                          <button
                            type="button"
                            className={styles.actionBtn}
                            onClick={() => openEdit(u)}
                            disabled={editingLoading}
                            aria-label="Edit"
                            title="Edit user"
                          >
                            <FaPencilAlt />
                          </button>
                          <button
                            type="button"
                            className={`${styles.actionBtn} ${styles.warningBtn}`}
                            onClick={() => {
                              setResetError(null);
                              setResetTarget(u);
                            }}
                            aria-label="Reset password"
                            title="Reset password"
                          >
                            <FaKey />
                          </button>
                          {myRole === "ADMIN" && !isMe && (
                            <button
                              type="button"
                              className={`${styles.actionBtn} ${styles.danger}`}
                              onClick={() => handleDelete(u)}
                              aria-label="Delete"
                              title="Delete user"
                            >
                              <FaTrashAlt />
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {formOpen && (
        <UserForm
          initial={editing}
          onSubmit={editing ? handleUpdate : handleCreate}
          onClose={() => {
            setFormOpen(false);
            setEditing(null);
          }}
          error={formError}
          // Assistants editing themselves can't change their own role.
          lockedRole={
            editing &&
            myRole === "ASSISTANT" &&
            (editing.role || "").toUpperCase() === "ASSISTANT"
          }
        />
      )}

      {resetTarget && (
        <ResetPasswordPrompt
          user={resetTarget}
          onConfirm={handleReset}
          onClose={() => {
            setResetTarget(null);
            setResetError(null);
          }}
          error={resetError}
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

export default Users;
