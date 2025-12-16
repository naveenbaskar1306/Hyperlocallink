// src/pages/Review.jsx
import React, { useState } from "react";

export default function Review() {
  const [form, setForm] = useState({
    name: "",
    rating: 5,
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const sampleReviews = [
    {
      name: "Pj",
      rating: 5,
      text: "Great experience! The professional arrived on time and did a fantastic job.",
      tag: "Home deep cleaning",
    },
    {
      name: "N",
      rating: 4,
      text: "AC service was quick and clean. Would happily book again.",
      tag: "AC service",
    },
    {
      name: "a",
      rating: 5,
      text: "Loved the salon-at-home experience. Very professional and hygienic.",
      tag: "Women’s salon",
    },
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Demo only – plug into backend later
    setSubmitted(true);
    setForm({ name: "", rating: 5, comment: "" });
  }

  function renderStars(count) {
    return "★★★★★☆☆☆☆☆".slice(0, 5).split("").map((star, idx) => (
      <span
        key={idx}
        style={{
          color: idx < count ? "#f59e0b" : "#e5e7eb",
          marginRight: 1,
        }}
      >
        ★
      </span>
    ));
  }

  return (
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <p style={styles.eyebrow}>Feedback</p>
        <h1 style={styles.title}>Reviews & ratings</h1>
        <p style={styles.subtitle}>
          See what customers say about Hyperlocal, and share your own
          experience. Your feedback helps us improve every visit.
        </p>
      </section>

      {/* LAYOUT */}
      <section style={styles.layout}>
        {/* LEFT – SAMPLE REVIEWS */}
        <section style={styles.leftCol}>
          <h2 style={styles.sectionHeading}>Recent reviews (demo)</h2>
          <p style={styles.sectionText}>
            These are sample cards for layout only. Connect them to real
            reviews from your backend later.
          </p>

          <div style={styles.reviewList}>
            {sampleReviews.map((r, idx) => (
              <article key={idx} style={styles.reviewCard}>
                <div style={styles.reviewHeader}>
                  <div style={styles.avatarCircle}>
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div style={styles.reviewName}>{r.name}</div>
                    <div style={styles.tag}>{r.tag}</div>
                  </div>
                </div>
                <div style={styles.starsRow}>{renderStars(r.rating)}</div>
                <p style={styles.reviewText}>{r.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* RIGHT – FORM */}
        <section style={styles.rightCol}>
          <div style={styles.formCard}>
            <h2 style={styles.sectionHeading}>Write a review</h2>
            <p style={styles.sectionText}>
              Tell us what went well and what we can improve. This form is a
              placeholder — hook it to your API when ready.
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.field}>
                <label htmlFor="name" style={styles.label}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.field}>
                <label htmlFor="rating" style={styles.label}>
                  Rating
                </label>
                <select
                  id="rating"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value={5}>★★★★★ – Excellent</option>
                  <option value={4}>★★★★☆ – Good</option>
                  <option value={3}>★★★☆☆ – Average</option>
                  <option value={2}>★★☆☆☆ – Poor</option>
                  <option value={1}>★☆☆☆☆ – Very poor</option>
                </select>
              </div>

              <div style={styles.field}>
                <label htmlFor="comment" style={styles.label}>
                  Your review
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={4}
                  value={form.comment}
                  onChange={handleChange}
                  placeholder="Share details about your experience…"
                  style={styles.textarea}
                  required
                />
              </div>

              {submitted && (
                <div style={styles.status}>
                  Thank you for your feedback! (Demo message – replace with
                  real success state.)
                </div>
              )}

              <button type="submit" style={styles.submitButton}>
                Submit review
              </button>
            </form>
          </div>
        </section>
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
    color: "#111827",
  },
  subtitle: {
    marginTop: 10,
    maxWidth: 650,
    color: "#6b7280",
    lineHeight: 1.6,
  },

  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 0.8fr)",
    gap: 20,
    alignItems: "flex-start",
  },

  /* Left column */
  leftCol: {},
  sectionHeading: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
  },
  sectionText: {
    marginTop: 6,
    fontSize: 14,
    color: "#6b7280",
  },
  reviewList: {
    marginTop: 14,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  reviewCard: {
    background: "#ffffff",
    borderRadius: 14,
    padding: 16,
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 12px rgba(15,23,42,0.04)",
  },
  reviewHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eef2ff",
    fontWeight: 700,
    fontSize: 14,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: 600,
  },
  tag: {
    fontSize: 12,
    color: "#6b7280",
  },
  starsRow: {
    marginTop: 4,
    marginBottom: 6,
  },
  reviewText: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 1.6,
  },

  /* Right column / form */
  rightCol: {},
  formCard: {
    background: "#ffffff",
    borderRadius: 16,
    padding: 18,
    boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
    border: "1px solid #eef2ff",
  },
  form: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
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
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    padding: "8px 10px",
    fontSize: 14,
    resize: "vertical",
    minHeight: 100,
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
};
