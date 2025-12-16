// src/pages/PartnerResources.jsx
import React from "react";

export default function PartnerResources() {
  return (
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <p style={styles.eyebrow}>For professionals</p>
        <h1 style={styles.title}>Partner resources</h1>
        <p style={styles.subtitle}>
          Training tips, best practices and helpful tools to deliver a 5★
          experience on every job. Replace the placeholder text with your real
          content and links.
        </p>
      </section>

      {/* TOOLKIT */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Service toolkit</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Quality checklist</h3>
            <p style={styles.cardText}>
              Step-by-step checklist to follow before, during and after every
              service visit to ensure consistent quality.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Customer communication</h3>
            <p style={styles.cardText}>
              Templates for greeting the customer, explaining work, sharing
              recommendations and collecting feedback.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Safety guidelines</h3>
            <p style={styles.cardText}>
              Basics of on-site safety, tool handling, and hygiene standards for
              home visits.
            </p>
          </div>
        </div>
      </section>

      {/* TRAINING */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Training & growth</h2>
        <div style={styles.trainingBox}>
          <ul style={styles.list}>
            <li>How to improve your rating and get repeat customers.</li>
            <li>Maintaining professional behaviour inside customer homes.</li>
            <li>Upselling add-on services in a helpful, non-pushy way.</li>
            <li>Managing time across multiple bookings in a day.</li>
          </ul>
          <p style={styles.note}>
            In a real app, link this section to your training videos, PDF
            guides, WhatsApp groups or in-person workshops.
          </p>
        </div>
      </section>

      {/* SUPPORT */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Partner support</h2>
        <div style={styles.supportBox}>
          <p style={styles.text}>
            Need help with a booking, payout or customer issue? Our partner
            support team is here to help.
          </p>
          <ul style={styles.list}>
            <li>Partner helpline (placeholder): +91-00000-00000</li>
            <li>Email: partnersupport@hyperlocal.example</li>
            <li>Support hours: 9:00 AM – 8:00 PM, all days</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    padding: "32px 20px 48px",
    maxWidth: 1100,
    margin: "0 auto",
  },
  hero: { marginBottom: 32 },
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
  },
  subtitle: {
    marginTop: 10,
    maxWidth: 650,
    color: "#6b7280",
    lineHeight: 1.6,
  },
  section: { marginBottom: 30 },
  heading: { fontSize: 20, fontWeight: 700, marginBottom: 10 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 18,
  },
  card: {
    background: "#ffffff",
    borderRadius: 16,
    padding: 18,
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 12px rgba(15,23,42,0.05)",
  },
  cardTitle: { fontSize: 16, fontWeight: 700, marginBottom: 6 },
  cardText: { fontSize: 14, color: "#4b5563", lineHeight: 1.6 },
  trainingBox: {
    background: "#f9fafb",
    borderRadius: 16,
    padding: 18,
    border: "1px solid #e5e7eb",
  },
  list: {
    margin: 0,
    paddingLeft: 18,
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 1.7,
  },
  note: { marginTop: 10, fontSize: 13, color: "#6b7280" },
  supportBox: {
    background: "#ffffff",
    borderRadius: 16,
    padding: 18,
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 12px rgba(15,23,42,0.05)",
  },
  text: { fontSize: 14, color: "#4b5563", marginBottom: 10 },
};
