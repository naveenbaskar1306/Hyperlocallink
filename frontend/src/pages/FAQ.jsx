// src/pages/FAQ.jsx
import React, { useState } from "react";

const faqs = [
  {
    question: "How do I book a service?",
    answer:
      "Search for the service you need, choose a time slot, add it to your cart and complete the booking. You’ll receive a confirmation with all details.",
  },
  {
    question: "Can I reschedule or cancel a booking?",
    answer:
      "Yes. You can reschedule or cancel from the “My bookings” section before the professional starts traveling. Cancellation and reschedule fees may apply as per policy.",
  },
  {
    question: "How are professionals verified?",
    answer:
      "Every professional goes through ID verification, background checks (where applicable), and quality assessments before being activated on Hyperlocal.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We support UPI, cards, net banking and selected wallets. In some cities, cash on service completion may also be available (placeholder – configure as needed).",
  },
  {
    question: "What if I am not satisfied with the service?",
    answer:
      "If something didn’t go as expected, you can raise an issue from your booking details within 24 hours. Our support team will review and help with resolution or re-service.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  function toggle(index) {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  }

  return (
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <p style={styles.eyebrow}>Support</p>
        <h1 style={styles.title}>Help & FAQ</h1>
        <p style={styles.subtitle}>
          Find quick answers to common questions about bookings, payments and
          services on Hyperlocal.
        </p>
      </section>

      {/* CONTENT LAYOUT */}
      <section style={styles.layout}>
        {/* LEFT – FAQ ACCORDION */}
        <section style={styles.faqColumn}>
          {faqs.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <article
                key={item.question}
                style={{
                  ...styles.faqItem,
                  boxShadow: isOpen
                    ? "0 10px 25px rgba(15,23,42,0.12)"
                    : "0 4px 12px rgba(15,23,42,0.05)",
                  borderColor: isOpen ? "#6366f1" : "#e5e7eb",
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  style={styles.faqButton}
                >
                  <span style={styles.faqQuestion}>{item.question}</span>
                  <span style={styles.faqIcon}>{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div style={styles.faqAnswerWrapper}>
                    <p style={styles.faqAnswer}>{item.answer}</p>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        {/* RIGHT – HELP BOXES */}
        <aside style={styles.sideColumn}>
          <div style={styles.card}>
            <h2 style={styles.sideHeading}>Need more help?</h2>
            <p style={styles.sideText}>
              Can’t find what you’re looking for in the FAQs? Reach out to our
              support team and we’ll be happy to assist.
            </p>
            <ul style={styles.helpList}>
              <li>Email: support@hyperlocal.example</li>
              <li>Support hours: 9:00 AM – 8:00 PM</li>
            </ul>
          </div>

          <div style={styles.secondaryCard}>
            <h3 style={styles.sideHeadingSmall}>Tips for faster support</h3>
            <ul style={styles.helpList}>
              <li>Keep your booking ID handy.</li>
              <li>Mention photos or videos if something went wrong.</li>
              <li>
                Share your preferred time for a callback (placeholder workflow).
              </li>
            </ul>
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
    marginBottom: 30,
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
    fontSize: 34,
    fontWeight: 800,
    margin: 0,
    color: "#111827",
  },
  subtitle: {
    marginTop: 10,
    maxWidth: 640,
    color: "#6b7280",
    lineHeight: 1.6,
  },

  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 0.9fr)",
    gap: 20,
    alignItems: "flex-start",
  },

  /* FAQ column */
  faqColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  faqItem: {
    background: "#ffffff",
    borderRadius: 14,
    border: "1px solid #e5e7eb",
    transition: "box-shadow 0.15s, border-color 0.15s, transform 0.1s",
  },
  faqButton: {
    width: "100%",
    padding: "14px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
  faqQuestion: {
    textAlign: "left",
    fontSize: 15,
    fontWeight: 600,
    color: "#111827",
  },
  faqIcon: {
    fontSize: 24,
    lineHeight: 1,
    color: "#4b5563",
    marginLeft: 12,
  },
  faqAnswerWrapper: {
    padding: "0 16px 12px 16px",
  },
  faqAnswer: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 1.7,
  },

  /* Side column */
  sideColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  card: {
    background: "#ffffff",
    borderRadius: 16,
    padding: 18,
    boxShadow: "0 8px 20px rgba(15,23,42,0.08)",
    border: "1px solid #eef2ff",
  },
  secondaryCard: {
    background: "#f9fafb",
    borderRadius: 14,
    padding: 16,
    border: "1px solid #e5e7eb",
  },
  sideHeading: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
  },
  sideHeadingSmall: {
    margin: 0,
    fontSize: 15,
    fontWeight: 700,
  },
  sideText: {
    marginTop: 8,
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 1.6,
  },
  helpList: {
    marginTop: 10,
    paddingLeft: 18,
    fontSize: 13,
    color: "#4b5563",
    lineHeight: 1.7,
  },
};

