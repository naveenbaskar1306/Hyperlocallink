// src/pages/Investors.jsx
import React from "react";

export default function Investors() {
  return (
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <p style={styles.eyebrow}>Investor Relations</p>
        <h1 style={styles.title}>Building India’s most trusted home-services platform</h1>
        <p style={styles.subtitle}>
          Explore our financial updates, company performance, leadership highlights,
          and long-term vision. This is a demo investor page — replace data with real
          company information when ready.
        </p>
      </section>

      {/* KEY METRICS */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Key business metrics</h2>

        <div style={styles.metricsGrid}>
          <div style={styles.metricCard}>
            <div style={styles.metricValue}>5M+</div>
            <div style={styles.metricLabel}>Total bookings</div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricValue}>1.2M+</div>
            <div style={styles.metricLabel}>Active customers</div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricValue}>20k+</div>
            <div style={styles.metricLabel}>Verified professionals</div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricValue}>98%</div>
            <div style={styles.metricLabel}>Satisfaction rating</div>
          </div>
        </div>
      </section>

      {/* REPORTS */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Reports & financials</h2>
        <p style={styles.text}>Download our latest reports (placeholder sample files).</p>

        <div style={styles.reportGrid}>
          <div style={styles.reportCard}>
            <div style={styles.reportIcon}>📄</div>
            <div style={styles.reportTitle}>FY 2024 Annual Report</div>
            <button style={styles.downloadButton}>Download PDF</button>
          </div>

          <div style={styles.reportCard}>
            <div style={styles.reportIcon}>📊</div>
            <div style={styles.reportTitle}>Q2 2024 Financial Overview</div>
            <button style={styles.downloadButton}>Download PDF</button>
          </div>

          <div style={styles.reportCard}>
            <div style={styles.reportIcon}>📝</div>
            <div style={styles.reportTitle}>ESG & Responsibility Report</div>
            <button style={styles.downloadButton}>Download PDF</button>
          </div>
        </div>
      </section>

     
    

      {/* FOOTER MESSAGE */}
      <section style={styles.footerNote}>
      
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
    maxWidth: 680,
    color: "#6b7280",
    lineHeight: 1.6,
  },

  section: {
    marginBottom: 42,
  },
  heading: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 16,
  },
  text: {
    color: "#4b5563",
    lineHeight: 1.7,
    marginBottom: 14,
  },

  /* METRICS */
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 18,
  },
  metricCard: {
    background: "#ffffff",
    borderRadius: 16,
    padding: 20,
    border: "1px solid #e5e7eb",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
  },
  metricValue: {
    fontSize: 30,
    fontWeight: 800,
    color: "#111827",
  },
  metricLabel: {
    fontSize: 14,
    marginTop: 6,
    color: "#6b7280",
  },

  /* REPORT CARDS */
  reportGrid: {
    display: "grid",
    gap: 20,
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    marginTop: 14,
  },
  reportCard: {
    background: "#ffffff",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
    border: "1px solid #e5e7eb",
  },
  reportIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  reportTitle: {
    fontWeight: 700,
    marginBottom: 12,
    fontSize: 16,
  },
  downloadButton: {
    padding: "8px 14px",
    background: "#111827",
    color: "#fff",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontSize: 14,
  },

  /* TEAM */
  teamGrid: {
    display: "grid",
    gap: 20,
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  },
  teamCard: {
    padding: 20,
    background: "#ffffff",
    borderRadius: 16,
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
    textAlign: "center",
  },
  avatar: {
    fontSize: 40,
    marginBottom: 10,
  },
  teamName: {
    margin: "6px 0 0 0",
    fontWeight: 700,
  },
  teamRole: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },

  footerNote: { marginTop: 30, borderTop: "1px solid #e5e7eb", paddingTop: 18 },
};
