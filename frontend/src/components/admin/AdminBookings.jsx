// frontend/src/components/admin/AdminBookings.jsx
import React, { useEffect, useState } from "react";
import { listBookingsAdmin, updateBookingStatusAPI } from "../../api/adminApi";



const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const thStyle = {
  padding: "12px 14px",
  fontSize: 14,
  fontWeight: 700,
  color: "#374151",
  textAlign: "left",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "12px 14px",
  fontSize: 14,
  color: "#1f2937",
  verticalAlign: "middle",
};

const actionBtn = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  color: "white",
  fontWeight: 700,
  minWidth: 96,
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState("");

  async function loadBookings() {
    setLoading(true);
    setError("");
    try {
      const data = await listBookingsAdmin();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("loadBookings error:", err);
      setError("Could not load bookings.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
    const handler = () => loadBookings();
    window.addEventListener("admin:bookings-updated", handler);
    return () => window.removeEventListener("admin:bookings-updated", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function changeStatus(id, newStatus) {
    setError("");
    const prev = bookings.find((b) => b._id === id);
    if (!prev) return;

    // optimistic UI
    setBookings((s) => s.map((b) => (b._id === id ? { ...b, status: newStatus } : b)));
    setSavingId(id);

    try {
      const payload = await updateBookingStatusAPI(id, newStatus);
      if (payload && payload._id) {
        setBookings((s) => s.map((b) => (b._id === id ? payload : b)));
      }
      window.dispatchEvent(new Event("admin:bookings-updated"));
    } catch (err) {
      console.error("changeStatus error:", err);
      setError("Failed to update status. Reverting.");
      // revert
      setBookings((s) => s.map((b) => (b._id === id ? prev : b)));
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div style={{ background: "transparent", padding: 12 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Bookings</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={loadBookings}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.06)",
              background: "#fff",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div style={{ marginBottom: 10, color: "#7f1d1d", background: "#fff1f2", padding: 10, borderRadius: 8 }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
          Loading bookings…
        </div>
      ) : bookings.length === 0 ? (
        <div style={{ padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
          No bookings found.
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: 12, padding: 12, boxShadow: "0 6px 24px rgba(2,6,23,0.04)" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
              <thead>
                <tr style={{ background: "#fbfdff", borderBottom: "1px solid #eef1f4" }}>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Service</th>
                  <th style={thStyle}>User</th>
                  <th style={thStyle}>Scheduled</th>
                  <th style={thStyle}>Price</th>
                  <th style={thStyle}>Status</th>
                  <th style={{ ...thStyle, textAlign: "right", paddingRight: 22 }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => {
                  const idShort = b._id ? `#${String(b._id).slice(-6)}` : "-";
                  const svcTitle = b.service?.title || b.service?.name || "—";
                  const userName = b.customer?.name || b.user?.name || b.user?.email || "-";
                  const scheduled = b.scheduledAt ? new Date(b.scheduledAt).toLocaleString() : "-";
                  const price = typeof b.price === "number" ? `₹${b.price}` : b.price || "₹0";

                  return (
                    <tr key={b._id} style={{ borderBottom: "1px solid #eef1f4" }}>
                      <td style={tdStyle}>{idShort}</td>
                      <td style={tdStyle}>{svcTitle}</td>
                      <td style={tdStyle}>{userName}</td>
                      <td style={tdStyle}>{scheduled}</td>
                      <td style={{ ...tdStyle, fontWeight: 800 }}>{price}</td>

                      <td style={tdStyle}>
                        <select
                          value={String(b.status || "pending")}
                          onChange={(e) => changeStatus(b._id, e.target.value)}
                          disabled={savingId && savingId === b._id}
                          style={{
                            padding: "8px 10px",
                            borderRadius: 8,
                            border: "1px solid #d1d5db",
                            background: "#fff",
                            minWidth: 140,
                          }}
                        >
                          {STATUS_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td style={{ ...tdStyle, textAlign: "right", paddingRight: 18 }}>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, flexWrap: "wrap" }}>
                          <button
                            onClick={() => changeStatus(b._id, "scheduled")}
                            disabled={savingId && savingId === b._id}
                            style={{ ...actionBtn, background: "#0ea5a6" }}
                          >
                            Set Scheduled
                          </button>

                          <button
                            onClick={() => changeStatus(b._id, "completed")}
                            disabled={savingId && savingId === b._id}
                            style={{ ...actionBtn, background: "#2563eb" }}
                          >
                            Complete
                          </button>

                          <button
                            onClick={() => {
                              if (!confirm("Mark this booking as cancelled?")) return;
                              changeStatus(b._id, "cancelled");
                            }}
                            disabled={savingId && savingId === b._id}
                            style={{ ...actionBtn, background: "#ef4444" }}
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
