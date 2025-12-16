// src/pages/RegisterProfessional.jsx
import React, { useState } from "react";

export default function RegisterProfessional() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    serviceType: "",
    experience: "",
  });

  const [status, setStatus] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: connect to backend
    setStatus("Thanks! Our team will contact you with next steps.");
    setForm({
      name: "",
      phone: "",
      email: "",
      city: "",
      serviceType: "",
      experience: "",
    });
  }

  return (
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <p style={styles.eyebrow}>For professionals</p>
        <h1 style={styles.title}>Register as a professional</h1>
        <p style={styles.subtitle}>
          Join Hyperlocal and get access to customers looking for trusted
          electricians, cleaners, salon experts, appliance technicians, and more.
          This is a demo form — connect it to your onboarding flow later.
        </p>
      </section>

      {/* CONTENT */}
      <section style={styles.layout}>
        <section style={styles.leftCol}>
          <h2 style={styles.heading}>Tell us about yourself</h2>
          <p style={styles.text}>
            Share a few basic details so we can understand your skills and match you
            with the right jobs in your area.
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.fieldRow}>
              <div style={styles.field}>
                <label style={styles.label} htmlFor="name">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label} htmlFor="phone">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="10-digit mobile"
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.fieldRow}>
              <div style={styles.field}>
                <label style={styles.label} htmlFor="email">
                  Email (optional)
                </label>
                <input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  style={styles.input}
                  type="email"
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label} htmlFor="city">
                  City / area
                </label>
                <input
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  placeholder="Eg: Chennai, Anna Nagar"
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.fieldRow}>
              <div style={styles.field}>
                <label style={styles.label} htmlFor="serviceType">
                  Primary service category
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={form.serviceType}
                  onChange={handleChange}
                  required
                  style={styles.select}
                >
                  <option value="">Select a category</option>
                  <option value="ac">AC / Appliance repair</option>
                  <option value="cleaning">Cleaning & pest control</option>
                  <option value="electrician">Electrician / Plumber / Carpenter</option>
                  <option value="mens">Men&apos;s salon & grooming</option>
                  <option value="womens">Women&apos;s salon & beauty</option>
                  <option value="other">Other home services</option>
                </select>
              </div>
              <div style={styles.field}>
                <label style={styles.label} htmlFor="experience">
                  Years of experience
                </label>
                <input
                  id="experience"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  required
                  placeholder="Eg: 3 years"
                  style={styles.input}
                />
              </div>
            </div>

            {status && <div style={styles.status}>{status}</div>}

            <button type="submit" style={styles.button}>
              Submit application
            </button>

            <p style={styles.smallPrint}>
              By submitting, you agree that our onboarding team can contact you via
              phone, SMS, or email. This is a sample page — replace text with your
              real terms.
            </p>
          </form>
        </section>

        {/* RIGHT – INFO CARD */}
        <aside style={styles.sideCard}>
          <h2 style={styles.sideTitle}>What you get</h2>
          <ul style={styles.sideList}>
            <li>Regular jobs from customers in your area.</li>
            <li>Support with customer queries & disputes.</li>
            <li>Training resources to improve ratings.</li>
            <li>Transparent payouts directly to your bank.</li>
          </ul>
        </aside>
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
  title: {
    fontSize: 34,
    fontWeight: 800,
    margin: 0,
  },
  subtitle: {
    marginTop: 10,
    maxWidth: 640,
    color: "#6b7280",
    lineHeight: 1.6,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 0.9fr)",
    gap: 20,
    alignItems: "flex-start",
  },
  leftCol: {},
  heading: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 8,
  },
  text: { fontSize: 14, color: "#4b5563", marginBottom: 12 },
  form: { display: "flex", flexDirection: "column", gap: 12, marginTop: 4 },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: "#374151" },
  input: {
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    padding: "8px 10px",
    fontSize: 14,
    outline: "none",
  },
  select: {
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    padding: "8px 10px",
    fontSize: 14,
    outline: "none",
    backgroundColor: "#fff",
  },
  status: {
    fontSize: 13,
    color: "#16a34a",
    background: "#ecfdf3",
    borderRadius: 10,
    padding: "8px 10px",
    border: "1px solid #bbf7d0",
  },
  button: {
    marginTop: 4,
    borderRadius: 999,
    border: "none",
    padding: "9px 18px",
    background: "#0d6efd",
    color: "#ffffff",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
  },
  smallPrint: {
    marginTop: 8,
    fontSize: 11,
    color: "#9ca3af",
  },
  sideCard: {
    background: "#ffffff",
    borderRadius: 18,
    padding: 18,
    border: "1px solid #e5e7eb",
    boxShadow: "0 8px 20px rgba(15,23,42,0.06)",
  },
  sideTitle: { fontSize: 17, fontWeight: 700, marginBottom: 8 },
  sideList: {
    margin: 0,
    paddingLeft: 18,
    fontSize: 13,
    color: "#4b5563",
    lineHeight: 1.7,
  },
};
