// src/pages/Terms.jsx
import React from "react";

export default function Terms() {
  return (
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <p style={styles.eyebrow}>Legal & Policy</p>
        <h1 style={styles.title}>Terms & Conditions</h1>
        <p style={styles.subtitle}>
          Please read these Terms carefully before using our services.  
          This is a placeholder template — replace with your legal-approved content.
        </p>
      </section>

      {/* CARD SECTIONS */}
      <section style={styles.section}>
        <div style={styles.card}>
          <h2 style={styles.heading}>1. Acceptance of Terms</h2>
          <p style={styles.text}>
            By accessing or using our services, you agree to be bound by these Terms &
            Conditions and our Privacy Policy. If you do not agree, please discontinue use.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.heading}>2. Service Usage</h2>
          <ul style={styles.list}>
            <li>Users must provide accurate information during booking.</li>
            <li>Misuse of the platform may result in account suspension.</li>
            <li>Bookings are subject to availability and location.</li>
          </ul>
        </div>

        <div style={styles.card}>
          <h2 style={styles.heading}>3. Payments & Billing</h2>
          <ul style={styles.list}>
            <li>All prices displayed include applicable taxes.</li>
            <li>Additional charges may apply for extra services.</li>
            <li>Refunds follow our cancellation & refund policy.</li>
          </ul>
        </div>

        <div style={styles.card}>
          <h2 style={styles.heading}>4. Cancellation & Refunds</h2>
          <p style={styles.text}>
            You may cancel your booking as per our cancellation policy. Refunds, when
            applicable, will be processed within 5–7 business days.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.heading}>5. Limitation of Liability</h2>
          <p style={styles.text}>
            We are not liable for damages arising from misuse, delays, or service provider
            actions beyond reasonable control.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.heading}>6. Changes to Terms</h2>
          <p style={styles.text}>
            We may update these Terms occasionally. Continued use of the platform indicates
            acceptance of the revised Terms.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.heading}>7. Contact Information</h2>
          <p style={styles.text}>
            For questions about these Terms, contact us at:  
            <strong>support@hyperlocal.example</strong>
          </p>
        </div>
      </section>
    </main>
  );
}

/* -------------------- STYLES -------------------- */
const styles = {
  page: {
    padding: "32px 20px 48px",
    maxWidth: 1100,
    margin: "0 auto",
  },

  hero: { marginBottom: 40 },
  eyebrow: {
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: "0.12em",
    color: "#6366f1",
    fontWeight: 700,
    marginBottom: 6,
  },
  title: {
    fontSize: 34,
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

  section: { display: "grid", gap: 20 },

  card: {
    background: "#ffffff",
    padding: 24,
    borderRadius: 16,
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
  },

  heading: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 700,
    color: "#111827",
  },

  text: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 1.6,
  },

  list: {
    paddingLeft: 20,
    margin: "6px 0",
    color: "#4b5563",
    lineHeight: 1.7,
  },
};
