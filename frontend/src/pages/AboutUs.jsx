// src/pages/AboutUs.jsx
import React from "react";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <main style={styles.page}>
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <p style={styles.eyebrow}>Our Story</p>
        <h1 style={styles.title}>About Hyperlocal</h1>
        <p style={styles.subtitle}>
          We are building India’s most reliable home-services platform by
          connecting customers with trained, verified professionals — right at
          their doorstep.
        </p>
      </section>

      {/* MISSION SECTION */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Our mission</h2>
        <p style={styles.text}>
          Hyperlocal was founded with a simple idea — make home services fast,
          transparent, and trustworthy. Today, thousands of customers depend on
          us for cleaning, repairs, beauty services, appliance maintenance, and
          more.
        </p>

        <div style={styles.highlightBox}>
          <div style={styles.highlightIcon}>✨</div>
          <p style={styles.highlightText}>
            “We believe professional services should be as easy as ordering
            food — quick, safe, and stress-free.”
          </p>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section style={styles.section}>
        <h2 style={styles.heading}>The team</h2>
        <p style={styles.text}>
          Our team is made up of passionate designers, engineers, and service
          experts working together to build a platform that empowers both
          customers and service professionals.
        </p>

        <div style={styles.teamGrid}>
          <div style={styles.teamCard}>
            <div style={styles.teamAvatar}>👩‍💻</div>
            <h3 style={styles.teamName}>Product & Engineering</h3>
            <p style={styles.teamRole}>
              Building fast, reliable technology that powers Hyperlocal.
            </p>
          </div>

          <div style={styles.teamCard}>
            <div style={styles.teamAvatar}>🧰</div>
            <h3 style={styles.teamName}>Service Experts</h3>
            <p style={styles.teamRole}>
              Verified professionals committed to quality service.
            </p>
          </div>

          <div style={styles.teamCard}>
            <div style={styles.teamAvatar}>🤝</div>
            <h3 style={styles.teamName}>Support Team</h3>
            <p style={styles.teamRole}>
              Helping customers and professionals every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Our values</h2>

        <div style={styles.valuesGrid}>
          <div style={styles.valueCard}>
            <div style={styles.valueIcon}>🔒</div>
            <h3 style={styles.valueTitle}>Trust & Safety</h3>
            <p style={styles.valueText}>
              Every professional undergoes verification and training.
            </p>
          </div>

          <div style={styles.valueCard}>
            <div style={styles.valueIcon}>⚡</div>
            <h3 style={styles.valueTitle}>Speed & Convenience</h3>
            <p style={styles.valueText}>
              Book services instantly with transparent pricing.
            </p>
          </div>

          <div style={styles.valueCard}>
            <div style={styles.valueIcon}>📈</div>
            <h3 style={styles.valueTitle}>Empowering Professionals</h3>
            <p style={styles.valueText}>
              Helping skilled workers grow their business sustainably.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER INFO */}
      
        <Footer/>
   
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
    fontSize: 36,
    fontWeight: 800,
    margin: 0,
    color: "#111827",
  },
  subtitle: {
    marginTop: 10,
    maxWidth: 650,
    color: "#6b7280",
    lineHeight: 1.6,
  },

  section: {
    marginBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 12,
  },
  text: {
    color: "#4b5563",
    lineHeight: 1.7,
    maxWidth: 700,
  },

  highlightBox: {
    marginTop: 18,
    background: "#eef2ff",
    padding: 18,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  highlightIcon: {
    fontSize: 26,
  },
  highlightText: {
    fontSize: 15,
    color: "#4338ca",
    fontWeight: 600,
  },

  teamGrid: {
    display: "grid",
    gap: 20,
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    marginTop: 20,
  },
  teamCard: {
    padding: 20,
    background: "#ffffff",
    borderRadius: 14,
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
  },
  teamAvatar: {
    fontSize: 36,
    marginBottom: 10,
  },
  teamName: {
    margin: "4px 0",
    fontWeight: 700,
  },
  teamRole: {
    fontSize: 14,
    color: "#6b7280",
  },

  valuesGrid: {
    display: "grid",
    gap: 20,
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    marginTop: 20,
  },
  valueCard: {
    padding: 20,
    borderRadius: 14,
    border: "1px solid #e5e7eb",
    background: "#fafafa",
  },
  valueIcon: { fontSize: 30, marginBottom: 8 },
  valueTitle: { margin: 0, fontSize: 17, fontWeight: 700 },
  valueText: { fontSize: 14, color: "#6b7280", marginTop: 6 },

  footerNote: { marginTop: 40, borderTop: "1px solid #e5e7eb", paddingTop: 20 },
};
