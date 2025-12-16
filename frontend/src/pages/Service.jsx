// src/pages/Service.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api"; // your axios instance

export default function Service() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!id) return;
    API.get(`/services/${id}`)
      .then((res) => {
        setService(res.data);
        setImgError(false);
      })
      .catch((err) => {
        console.error("Failed to load service:", err);
        alert("Service load failed");
      });
  }, [id]);

  if (!service) {
    return (
      <main style={styles.page}>
        <div style={{ padding: 40 }}>Loading service…</div>
      </main>
    );
  }

  // Build correct image src:
  const getImageSrc = (svc) => {
    const raw = svc.imageUrl ?? svc.images?.[0] ?? "";

    if (!raw) return "/no-image.png";

    if (/^https?:\/\//i.test(raw)) return raw;

    if (raw.startsWith("/")) {
      return `${window.location.origin}${raw}`;
    }

    return `${window.location.origin}/${raw}`;
  };

  const imageSrc = imgError ? "/no-image.png" : getImageSrc(service);
  const price = service.basePrice ?? service.price ?? 0;
  const duration = service.durationMins ?? service.duration ?? 60;
  const bullets =
    (Array.isArray(service.bullets) && service.bullets.length > 0
      ? service.bullets
      : Array.isArray(service.features) && service.features.length > 0
      ? service.features
      : null);

  return (
    <main style={styles.page}>
      {/* HERO / TITLE */}
      <section style={styles.hero}>
        <p style={styles.eyebrow}>Service details</p>
        <h1 style={styles.title}>{service.title || "Service"}</h1>
        {service.shortDescription || service.tagline || service.description ? (
          <p style={styles.subtitle}>
            {service.shortDescription || service.tagline || service.description}
          </p>
        ) : null}
      </section>

      {/* MAIN LAYOUT */}
      <section style={styles.layout}>
        {/* LEFT: image + description */}
        <section style={styles.leftColumn}>
          <div style={styles.imageCard}>
            <img
              src={imageSrc}
              alt={service.title || "Service image"}
              style={styles.image}
              onError={() => setImgError(true)}
            />
          </div>

          <div style={styles.detailCard}>
            <h2 style={styles.sectionHeading}>What&apos;s included</h2>

            {bullets ? (
              <ul style={styles.list}>
                {bullets.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p style={styles.text}>
                {service.description ||
                  "Detailed description for this service will appear here. Replace this placeholder once you have full content from the backend."}
              </p>
            )}

            {service.description && bullets && (
              <p style={{ ...styles.text, marginTop: 12 }}>
                {service.description}
              </p>
            )}
          </div>
        </section>

        {/* RIGHT: booking card */}
        <aside style={styles.bookingCard}>
          <h2 style={styles.bookingTitle}>Book this service</h2>

          <div style={styles.priceRow}>
            <span style={styles.priceLabel}>Price</span>
            <span style={styles.priceValue}>₹{price}</span>
          </div>

          <div style={styles.priceRow}>
            <span style={styles.priceLabel}>Duration</span>
            <span style={styles.priceValue}>{duration} mins</span>
          </div>

          <div style={styles.meta}>
            <p style={styles.metaText}>
              • All prices are approximate. Final charges may vary based on
              on-site assessment and add-ons.
            </p>
            <p style={styles.metaText}>
              • Taxes and platform fees (if any) are shown at checkout.
            </p>
          </div>

          <Link
            to={`/booking/${service._id}`}
            style={styles.bookButton}
          >
            Book now
          </Link>

          <Link to="/cart" style={styles.secondaryButton}>
            View cart
          </Link>

          <p style={styles.supportText}>
            Have questions before booking? Visit{" "}
            <Link to="/faq" style={styles.inlineLink}>
              Help &amp; FAQ
            </Link>{" "}
            or{" "}
            <Link to="/contact" style={styles.inlineLink}>
              contact us
            </Link>
            .
          </p>
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
    maxWidth: 700,
    color: "#6b7280",
    lineHeight: 1.6,
  },

  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.7fr) minmax(0, 1fr)",
    gap: 24,
    alignItems: "flex-start",
  },

  /* LEFT SIDE */
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  imageCard: {
    borderRadius: 24,
    overflow: "hidden",
    background: "#f3f4f6",
    boxShadow: "0 18px 45px rgba(15,23,42,0.18)",
    maxHeight: 420,
  },
  image: {
    width: "100%",
    height: "100%",
    maxHeight: 420,
    objectFit: "cover",
    display: "block",
  },
  detailCard: {
    background: "#ffffff",
    borderRadius: 20,
    padding: 18,
    border: "1px solid #e5e7eb",
    boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 700,
    margin: "0 0 10px 0",
  },
  text: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 1.7,
  },
  list: {
    margin: 0,
    paddingLeft: 18,
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 1.7,
  },

  /* RIGHT SIDE – booking */
  bookingCard: {
    background: "#ffffff",
    borderRadius: 24,
    padding: 20,
    border: "1px solid #e5e7eb",
    boxShadow: "0 18px 45px rgba(15,23,42,0.15)",
    position: "sticky",
    top: 96,
  },
  bookingTitle: {
    margin: "0 0 12px 0",
    fontSize: 18,
    fontWeight: 700,
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
    fontSize: 14,
  },
  priceLabel: {
    color: "#4b5563",
  },
  priceValue: {
    fontWeight: 700,
    color: "#111827",
  },
  meta: {
    marginTop: 10,
    marginBottom: 16,
  },
  metaText: {
    fontSize: 12,
    color: "#9ca3af",
    lineHeight: 1.6,
  },
  bookButton: {
    display: "block",
    width: "100%",
    textAlign: "center",
    padding: "10px 16px",
    borderRadius: 999,
    background: "#0d6efd",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 8,
  },
  secondaryButton: {
    display: "block",
    width: "100%",
    textAlign: "center",
    padding: "9px 16px",
    borderRadius: 999,
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    color: "#111827",
    textDecoration: "none",
    fontSize: 14,
    marginBottom: 10,
  },
  supportText: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 1.5,
  },
  inlineLink: {
    color: "#4f46e5",
    textDecoration: "none",
    fontWeight: 500,
  },
};
