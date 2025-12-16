// frontend/src/pages/Booking.jsx
import React, { useEffect, useState } from "react";
import {
  useParams,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "../api/api"; // axios instance (baseURL -> backend /api)

const CART_KEY = "hl_cart";

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray(parsed.items)) return parsed.items;
    return [];
  } catch {
    return [];
  }
}

export default function Booking() {
  const { id: slugId } = useParams(); // e.g. "el1"
  const navigate = useNavigate();
  const location = useLocation();

  // If we navigated from Cart, we might have a partial service object
  const serviceFromState = location.state?.service || null;

  const [service, setService] = useState(serviceFromState);
  const [loadError, setLoadError] = useState(false);

  const [scheduledAt, setScheduledAt] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // load user and token from localStorage
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();
  const token = localStorage.getItem("token");

  // ---- ALWAYS load service details from backend using slugId ----
  useEffect(() => {
    async function fetchService() {
      try {
        // backend supports both ObjectId and slug (like "el1")
        const res = await axios.get(`/services/${slugId}`);
        setService(res.data);
        setLoadError(false);
      } catch (err) {
        console.error("fetchService error:", err);

        // fallback: try to find this service in cart
        const fromCart = readCart().find(
          (it) =>
            (it._id && it._id === slugId) ||
            (it.id && it.id === slugId) ||
            (it.slug && it.slug === slugId)
        );

        if (fromCart) {
          setService(fromCart);
          setLoadError(false);
          return;
        }

        setLoadError(true);
        alert("Unable to load service details.");
      }
    }

    if (slugId) {
      fetchService();
    } else {
      setLoadError(true);
    }
  }, [slugId]);

  // ID to send to backend: prefer Mongo _id, then slug, then id, then slugId from URL
  function getServiceIdForBooking() {
    if (service && service._id) return service._id;
    if (service && service.slug) return service.slug;
    if (service && service.id) return service.id;
    return slugId;
  }

  // ---- VALIDATION ----
  function validate() {
    if (!scheduledAt) {
      alert("Please pick a date & time.");
      return false;
    }
    if (!address.trim()) {
      alert("Please enter address.");
      return false;
    }
    if (!user && (!guestName.trim() || !guestEmail.trim())) {
      alert("Enter guest name and email or log in.");
      return false;
    }
    if (!user && guestEmail && !/^\S+@\S+\.\S+$/.test(guestEmail.trim())) {
      alert("Enter a valid email address.");
      return false;
    }
    if (!service) {
      alert(
        "Service details are missing. Please go back to the service page or cart and try again."
      );
      return false;
    }
    return true;
  }

  // ---- SUBMIT BOOKING ----
  const handleBooking = async () => {
    if (!validate()) return;

    const isoDate = new Date(scheduledAt).toISOString();
    const serviceForBackend = getServiceIdForBooking(); // _id preferred

    const payload = {
      service: serviceForBackend,
      scheduledAt: isoDate,
      address,
      notes,
    };

    if (user && (user._id || user.id)) {
      payload.customer = user._id || user.id;
    } else {
      payload.guest = {
        name: guestName.trim(),
        email: guestEmail.trim(),
      };
    }

    setLoading(true);
    try {
      const res = await axios.post("/bookings", payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      console.log("Booking response:", res.data);
      alert("Booking confirmed!");
      navigate("/bookings");
    } catch (err) {
      console.error("Booking failed:", err?.response ?? err);
      const status = err?.response?.status;
      const data = err?.response?.data;
      if (status === 400) {
        alert(`Booking failed: ${data?.message || "Bad request"}`);
      } else if (status === 401) {
        alert("Unauthorized. Please login and try again.");
      } else if (status === 404) {
        alert("Booking failed: Service not found");
      } else {
        alert(`Booking failed: ${data?.message || "Server error"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------- UI STATES ----------

  if (!service && !loadError) {
    return (
      <main style={styles.page}>
        <div style={{ padding: 32 }}>Loading service…</div>
      </main>
    );
  }

  if (!service && loadError) {
    return (
      <main style={styles.page}>
        <div
          style={{
            padding: 32,
            borderRadius: 24,
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            boxShadow: "0 16px 40px rgba(15,23,42,0.1)",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 12 }}>
            Unable to load service details
          </h2>
          <p style={{ marginBottom: 18, color: "#6b7280" }}>
            We couldn&apos;t find this service. It may have been removed or the
            link is invalid.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "none",
              background: "#0d6efd",
              color: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Back to home
          </button>
        </div>
      </main>
    );
  }

  const price = service?.basePrice ?? service?.price ?? 0;
  const duration = service?.duration ?? service?.durationMins ?? 60;

  return (
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <p style={styles.eyebrow}>Booking</p>
        <h1 style={styles.title}>Book: {service.title}</h1>
        {service.shortDescription || service.description ? (
          <p style={styles.subtitle}>
            {service.shortDescription || service.description}
          </p>
        ) : (
          <p style={styles.subtitle}>
            Choose a date, time and address. A verified professional will visit
            your home at the scheduled slot.
          </p>
        )}
      </section>

      {/* MAIN LAYOUT */}
      <section style={styles.layout}>
        {/* LEFT – FORM */}
        <section style={styles.formColumn}>
          {/* Date & time */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Date &amp; Time</label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Address */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Your address for the appointment"
              style={{ ...styles.input, ...styles.textarea }}
            />
          </div>

          {/* Guest fields if not logged in */}
          {!user && (
            <div style={styles.guestBox}>
              <p style={styles.helperText}>
                You are not logged in. Provide guest name &amp; email to
                continue.
              </p>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Guest name</label>
                <input
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  style={styles.input}
                  placeholder="Full name"
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Guest email</label>
                <input
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  style={styles.input}
                  placeholder="you@example.com"
                  type="email"
                />
              </div>
            </div>
          )}

          {/* Notes */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Extra notes (gates, apt, parking instructions, etc.)"
              style={{ ...styles.input, ...styles.textarea }}
            />
          </div>

          {/* Actions */}
          <div style={styles.actionsRow}>
            <button
              onClick={handleBooking}
              disabled={loading}
              style={{
                ...styles.primaryButton,
                opacity: loading ? 0.8 : 1,
                cursor: loading ? "default" : "pointer",
              }}
            >
              {loading ? "Booking..." : `Confirm booking • ₹${price}`}
            </button>

            <Link to={`/services/${slugId}`} style={styles.backLink}>
              ← Back to service
            </Link>
          </div>
        </section>

        {/* RIGHT – SERVICE SUMMARY CARD */}
        <aside style={styles.summaryCard}>
          <div style={styles.imageWrapper}>
            <img
              alt={service.title}
              src={
                service.imageUrl ||
                (Array.isArray(service.images) ? service.images[0] : null) ||
                "/no-image.png"
              }
              style={styles.image}
              onError={(e) => {
                e.currentTarget.src = "/no-image.png";
              }}
            />
          </div>

          <div style={styles.summaryBody}>
            <h2 style={styles.summaryTitle}>{service.title}</h2>
            {service.shortDescription || service.description ? (
              <p style={styles.summaryText}>
                {service.shortDescription || service.description}
              </p>
            ) : null}

            <p style={styles.summaryMeta}>
              <strong>Price:</strong> ₹{price}
            </p>
            <p style={styles.summaryMeta}>
              <strong>Duration:</strong> {duration} mins
            </p>

            <p style={styles.smallNote}>
              Exact charges may vary based on on-site assessment and add-on
              services. You&apos;ll see the final amount before payment.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    padding: "32px 20px 48px",
    maxWidth: 1100,
    margin: "0 auto",
  },
  hero: {
    marginBottom: 28,
  },
  eyebrow: {
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: "0.12em",
    color: "#6366f1",
    fontWeight: 700,
    marginBottom: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: 800,
    margin: 0,
    color: "#111827",
  },
  subtitle: {
    marginTop: 10,
    maxWidth: 680,
    color: "#6b7280",
    lineHeight: 1.6,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)",
    gap: 24,
    alignItems: "flex-start",
  },
  formColumn: {
    background: "#ffffff",
    borderRadius: 24,
    padding: 20,
    border: "1px solid #e5e7eb",
    boxShadow: "0 16px 40px rgba(15,23,42,0.1)",
  },
  fieldGroup: {
    marginBottom: 14,
  },
  label: {
    display: "block",
    marginBottom: 6,
    fontSize: 13,
    fontWeight: 600,
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "9px 11px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    fontSize: 14,
    outline: "none",
    backgroundColor: "#f9fafb",
  },
  textarea: {
    minHeight: 90,
    resize: "vertical",
  },
  guestBox: {
    padding: 12,
    borderRadius: 14,
    border: "1px dashed #e5e7eb",
    background: "#f9fafb",
    marginBottom: 10,
  },
  helperText: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 8,
  },
  actionsRow: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  primaryButton: {
    background: "#0d6efd",
    color: "#ffffff",
    padding: "10px 18px",
    borderRadius: 999,
    border: "none",
    fontWeight: 600,
    fontSize: 14,
  },
  backLink: {
    fontSize: 14,
    color: "#4f46e5",
    textDecoration: "none",
  },
  summaryCard: {
    background: "#ffffff",
    borderRadius: 24,
    padding: 18,
    border: "1px solid #e5e7eb",
    boxShadow: "0 16px 40px rgba(15,23,42,0.1)",
    width: "100%",
    maxWidth: 340,
  },
  imageWrapper: {
    borderRadius: 16,
    overflow: "hidden",
    background: "#f3f4f6",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 190,
    objectFit: "cover",
    display: "block",
  },
  summaryBody: {},
  summaryTitle: {
    fontSize: 18,
    fontWeight: 700,
    margin: "4px 0 6px",
  },
  summaryText: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 1.6,
    marginBottom: 10,
  },
  summaryMeta: {
    fontSize: 14,
    color: "#111827",
    marginBottom: 4,
  },
  smallNote: {
    marginTop: 8,
    fontSize: 12,
    color: "#9ca3af",
    lineHeight: 1.6,
  },
};
