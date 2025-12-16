// src/pages/Privacy.jsx
import React from "react";

export default function Privacy() {
  return (
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <p style={styles.eyebrow}>Legal & Policy</p>
        <h1 style={styles.title}>Privacy policy</h1>
        <p style={styles.subtitle}>
          This page explains how Hyperlocal (demo) may collect, use and protect your
          personal data. Replace this template with your final, lawyer-approved policy.
        </p>
      </section>

      {/* SECTIONS */}
      <section style={styles.sectionGrid}>
        {/* 1 – Overview */}
        <article style={styles.card}>
          <h2 style={styles.heading}>1. Overview</h2>
          <p style={styles.text}>
            We are committed to protecting your privacy. This policy describes the
            types of information we may collect when you use our website or app, and
            how that information may be processed.
          </p>
        </article>

        {/* 2 – Data we collect */}
        <article style={styles.card}>
          <h2 style={styles.heading}>2. Information we may collect</h2>
          <ul style={styles.list}>
            <li>
              <strong>Account details</strong> – name, phone number, email address,
              and location.
            </li>
            <li>
              <strong>Booking information</strong> – service type, address, preferred
              time, payment method (tokenised).
            </li>
            <li>
              <strong>Usage data</strong> – pages visited, app interactions, device
              information, and approximate location.
            </li>
            <li>
              <strong>Communication data</strong> – messages you send to support or
              reviews you leave on services.
            </li>
          </ul>
        </article>

        {/* 3 – How we use data */}
        <article style={styles.card}>
          <h2 style={styles.heading}>3. How we use your information</h2>
          <ul style={styles.list}>
            <li>To create and manage your user account and bookings.</li>
            <li>
              To connect you with suitable service professionals in your location.
            </li>
            <li>To process payments and send booking confirmations.</li>
            <li>
              To improve our services, user experience and security based on
              analytics and feedback.
            </li>
            <li>To send important updates about bookings or policy changes.</li>
          </ul>
        </article>

        {/* 4 – Sharing of data */}
        <article style={styles.card}>
          <h2 style={styles.heading}>4. When we may share your data</h2>
          <p style={styles.text}>
            We do <strong>not</strong> sell your personal information. We may share
            data only in the following cases:
          </p>
          <ul style={styles.list}>
            <li>
              With verified service professionals to complete your bookings (limited
              to what they need to perform the service).
            </li>
            <li>
              With payment gateways and infrastructure providers who process
              transactions on our behalf.
            </li>
            <li>
              When required by law, regulation, or to respond to valid legal
              requests.
            </li>
          </ul>
        </article>

        {/* 5 – Cookies */}
        <article style={styles.card}>
          <h2 style={styles.heading}>5. Cookies & tracking</h2>
          <p style={styles.text}>
            We may use cookies and similar technologies to remember your preferences,
            understand how you use the product, and improve performance. Most
            browsers allow you to control cookies through their settings.
          </p>
        </article>

        {/* 6 – Data retention & security */}
        <article style={styles.card}>
          <h2 style={styles.heading}>6. Data retention & security</h2>
          <p style={styles.text}>
            We keep your information only for as long as necessary for the purposes
            described above, or as required by law. We use reasonable administrative,
            technical and physical safeguards to protect your data, but no system is
            100% secure.
          </p>
        </article>

        {/* 7 – Your rights */}
        <article style={styles.card}>
          <h2 style={styles.heading}>7. Your choices & rights</h2>
          <ul style={styles.list}>
            <li>Update or correct your basic account details from your profile.</li>
            <li>
              Request deletion of your account (subject to legal or contractual
              obligations).
            </li>
            <li>Opt out of marketing emails via the unsubscribe link.</li>
          </ul>
        </article>

        {/* 8 – Updates & contact */}
        <article style={styles.card}>
          <h2 style={styles.heading}>8. Changes & contact</h2>
          <p style={styles.text}>
            We may update this policy periodically. Significant changes will be
            highlighted on this page. For questions or requests about your privacy,
            contact us at{" "}
            <strong>privacy@hyperlocal.example</strong> (placeholder).
          </p>
        </article>
      </section>

      <section style={styles.footerNote}>
        <p style={{ color: "#9ca3af", fontSize: 12 }}>
          This Privacy Policy layout is a generic template for product demos. Please
          replace it with your own policy text drafted or approved by legal counsel.
        </p>
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
    maxWidth: 720,
    color: "#6b7280",
    lineHeight: 1.6,
  },

  sectionGrid: {
    display: "grid",
    gap: 20,
  },

  card: {
    background: "#ffffff",
    padding: 22,
    borderRadius: 16,
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
  },

  heading: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 700,
    color: "#111827",
  },

  text: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 1.7,
  },

  list: {
    margin: "6px 0 0 0",
    paddingLeft: 20,
    color: "#4b5563",
    lineHeight: 1.7,
    fontSize: 14,
  },

  footerNote: {
    marginTop: 32,
    borderTop: "1px solid #e5e7eb",
    paddingTop: 16,
  },
};
