// src/pages/Contact.jsx
import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // You can replace this with real API integration later
    setStatus("Thanks for reaching out! We’ll get back to you shortly.");
    setForm({ name: "", email: "", topic: "", message: "" });
  }

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div>
          <p style={styles.eyebrow}>Support</p>
          <h1 style={styles.title}>Contact us</h1>
          <p style={styles.subtitle}>
            Have a question about a booking, payment or service? Send us a
            message and our support team will help you as soon as possible.
          </p>
        </div>
      </section>

      <section style={styles.layout}>
        {/* LEFT: Info cards */}
        <aside style={styles.infoColumn}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Get in touch</h2>
            <p style={styles.cardText}>
              Our support team is available every day between{" "}
              <strong>9:00 AM – 8:00 PM</strong>.
            </p>

            <div style={styles.infoList}>
              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>📧</div>
                <div>
                  <div style={styles.infoLabel}>Email support</div>
                  <div style={styles.infoValue}>
                    support@hyperlocal.example
                  </div>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>📱</div>
                <div>
                  <div style={styles.infoLabel}>Helpline</div>
                  <div style={styles.infoValue}>+91-00000-00000</div>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>📍</div>
                <div>
                  <div style={styles.infoLabel}>Office</div>
                  <div style={styles.infoValue}>
                    Hyperlocal HQ, Chennai, India
                  </div>
                </div>
              </div>
            </div>

            <p style={{ ...styles.cardText, marginTop: 16 }}>
              For urgent issues related to an ongoing service, please mention
              your booking ID in the message.
            </p>
          </div>

          <div style={styles.secondaryCard}>
            <h3 style={styles.secondaryTitle}>Common questions</h3>
            <ul style={styles.faqList}>
              <li>How do I reschedule a booking?</li>
              <li>How are professionals verified?</li>
              <li>Can I pay in cash?</li>
            </ul>
            <p style={styles.secondaryText}>
              These are placeholders – connect this section to your Help Center
              or FAQ page when ready.
            </p>
          </div>
        </aside>

        {/* RIGHT: Form */}
        <section style={styles.formColumn}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Send us a message</h2>
            <p style={styles.cardText}>
              Share a few details so we can route your request to the right
              person.
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
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label} htmlFor="email">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    style={styles.input}
                    required
                  />
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="topic">
                  Topic
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select a topic</option>
                  <option value="booking">Booking & rescheduling</option>
                  <option value="payments">Payments & refunds</option>
                  <option value="service">Service experience</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us a bit about what you need help with…"
                  style={styles.textarea}
                  required
                />
              </div>

              {status && <div style={styles.status}>{status}</div>}

              <button type="submit" style={styles.submitButton}>
                Send message
              </button>

              <p style={styles.smallPrint}>
                By submitting this form, you agree to be contacted by our
                support team. This is a demo page – connect it to your backend
                when ready.
              </p>
            </form>
          </div>
        </section>
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
  hero: {
    marginBottom: 24,
  },
  eyebrow: {
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: "0.12em",
    color: "#6366f1",
    fontWeight: 700,
    marginBottom: 4,
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
    gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
    gap: 20,
    alignItems: "flex-start",
  },
  infoColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  formColumn: {},
  card: {
    background: "#ffffff",
    borderRadius: 18,
    padding: 20,
    boxShadow: "0 18px 45px rgba(15,23,42,0.08)",
    border: "1px solid #eef2ff",
  },
  secondaryCard: {
    background: "#f9fafb",
    borderRadius: 16,
    padding: 18,
    border: "1px solid #e5e7eb",
  },
  cardTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    color: "#4b5563",
  },
  infoList: {
    marginTop: 14,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  infoItem: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eef2ff",
    fontSize: 16,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "#111827",
  },
  infoValue: {
    fontSize: 13,
    color: "#4b5563",
  },
  secondaryTitle: {
    margin: 0,
    fontSize: 15,
    fontWeight: 700,
  },
  faqList: {
    marginTop: 10,
    paddingLeft: 18,
    fontSize: 13,
    color: "#4b5563",
    lineHeight: 1.7,
  },
  secondaryText: {
    marginTop: 8,
    fontSize: 12,
    color: "#6b7280",
  },
  form: {
    marginTop: 14,
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#374151",
  },
  input: {
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    padding: "8px 10px",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
  },
  select: {
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    padding: "8px 10px",
    fontSize: 14,
    outline: "none",
    backgroundColor: "#fff",
  },
  textarea: {
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    padding: "9px 10px",
    fontSize: 14,
    resize: "vertical",
    minHeight: 120,
    outline: "none",
  },
  status: {
    fontSize: 13,
    color: "#16a34a",
    background: "#ecfdf3",
    borderRadius: 10,
    padding: "8px 10px",
    border: "1px solid #bbf7d0",
  },
  submitButton: {
    marginTop: 4,
    borderRadius: 999,
    border: "none",
    padding: "9px 18px",
    background: "#111827",
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
};
