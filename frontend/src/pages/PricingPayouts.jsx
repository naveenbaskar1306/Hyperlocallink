// src/pages/PricingPayouts.jsx
import React from "react";

export default function PricingPayouts() {
  return (
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <p style={styles.eyebrow}>For professionals</p>
        <h1 style={styles.title}>Pricing & payouts</h1>
        <p style={styles.subtitle}>
          Understand how service pricing, commissions and payouts work on the
          Hyperlocal platform. All numbers below are sample values — replace
          them with your actual business model.
        </p>
      </section>

      {/* PRICING MODEL */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Sample pricing model</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Platform commission</h3>
            <p style={styles.cardText}>
              For this demo, we assume a simple structure where Hyperlocal
              charges <strong>15–20% commission</strong> on the service amount.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Material charges</h3>
            <p style={styles.cardText}>
              You can charge separately for parts and consumables used during
              the job. These are usually settled fully with the partner.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Promotions</h3>
            <p style={styles.cardText}>
              From time to time, discount campaigns may be funded by the
              platform, the partner, or both. Details are shared in advance.
            </p>
          </div>
        </div>
      </section>

      {/* EXAMPLE EARNINGS */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Example earnings (placeholder)</h2>
        <div style={styles.table}>
          <div style={styles.tableRowHeader}>
            <div>Service</div>
            <div>Customer pays</div>
            <div>Commission (20%)</div>
            <div>Your payout</div>
          </div>
          <div style={styles.tableRow}>
            <div>AC service</div>
            <div>₹799</div>
            <div>₹160</div>
            <div>₹639</div>
          </div>
          <div style={styles.tableRow}>
            <div>Home deep cleaning</div>
            <div>₹3,499</div>
            <div>₹700</div>
            <div>₹2,799</div>
          </div>
          <div style={styles.tableRow}>
            <div>Women&apos;s salon session</div>
            <div>₹1,299</div>
            <div>₹260</div>
            <div>₹1,039</div>
          </div>
        </div>
        <p style={styles.note}>
          These numbers are only for illustration. Real pricing, taxes, and
          commissions depend on your city, category and agreement with
          Hyperlocal.
        </p>
      </section>

      {/* PAYOUTS */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Payout schedule</h2>
        <div style={styles.payoutBox}>
          <ul style={styles.list}>
            <li>Payouts are processed to your registered bank account.</li>
            <li>Sample schedule: every Monday for the previous week.</li>
            <li>
              You&apos;ll receive a detailed statement with job-wise earnings,
              commissions and adjustments.
            </li>
          </ul>
          <p style={styles.note}>
            Connect this to your actual payout logic and statements when you
            integrate payments.
          </p>
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
  hero: { marginBottom: 30 },
  eyebrow: {
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: "0.12em",
    color: "#6366f1",
    fontWeight: 700,
    marginBottom: 6,
  },
  title: { fontSize: 34, fontWeight: 800, margin: 0 },
  subtitle: {
    marginTop: 10,
    maxWidth: 680,
    color: "#6b7280",
    lineHeight: 1.6,
  },
  section: { marginBottom: 32 },
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
  table: {
    borderRadius: 16,
    border: "1px solid #e5e7eb",
    overflow: "hidden",
    background: "#ffffff",
    boxShadow: "0 4px 12px rgba(15,23,42,0.05)",
  },
  tableRowHeader: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1.2fr 1.2fr",
    padding: "10px 14px",
    background: "#f9fafb",
    fontSize: 13,
    fontWeight: 700,
    color: "#111827",
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1.2fr 1.2fr",
    padding: "9px 14px",
    fontSize: 13,
    color: "#4b5563",
    borderTop: "1px solid #e5e7eb",
  },
  note: { marginTop: 8, fontSize: 13, color: "#6b7280" },
  payoutBox: {
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
};
