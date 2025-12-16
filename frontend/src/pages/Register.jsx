// src/pages/Register.jsx
import React, { useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

/**
 * Modern Register page
 * - Two-column card: left gradient CTA, right form
 * - Inline validation, loading state and error display
 * - Responsive: stacks on small screens
 */

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // basic validation
    if (!name.trim()) return setError("Please enter your name.");
    if (!email.trim()) return setError("Please enter your email.");
    if (!password) return setError("Please enter a password (min 6 chars).");
    if (password.length < 6) return setError("Password should be at least 6 characters.");

    setLoading(true);
    try {
      await API.post("/auth/register", { name, email, password });
      // on success, go to login page
      window.location.href = "/login";
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Registration failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={page}>
      <div style={container}>
        {/* Left gradient panel */}
        <aside style={leftPanel}>
          <div style={leftInner}>
            <h2 style={leftTitle}>Create your account</h2>
            <p style={leftSubtitle}>
              Sign up to book trusted professionals, track orders and get exclusive offers.
            </p>

            <div style={{ marginTop: "auto" }}>
              <small style={{ color: "rgba(255,255,255,0.85)" }}>Already have an account?</small>
              <div>
                <Link to="/login" style={leftCTA}>Sign in</Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Right form panel */}
        <section style={rightPanel}>
          <div style={formWrap}>
            <h1 style={mainTitle}>Register</h1>
            <p style={lead}>Create an account to start booking services at your convenience.</p>

            <form onSubmit={handleSubmit} style={{ marginTop: 18 }}>
              <label style={label}>
                Full name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  style={input}
                  required
                />
              </label>

              <label style={label}>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={input}
                  required
                />
              </label>

              <label style={label}>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  style={input}
                  required
                />
              </label>

              {error && <div style={errorBox}>{error}</div>}

              <button type="submit" style={loading ? registerBtnDisabled : registerBtn} disabled={loading}>
                {loading ? "Creating account…" : "Register"}
              </button>

              <div style={{ textAlign: "center", marginTop: 14, color: "#64748b" }}>
                <small>
                  By signing up you agree to our <Link to="/terms" style={{ color: "#0b72b9" }}>Terms</Link> &amp; <Link to="/privacy" style={{ color: "#0b72b9" }}>Privacy</Link>.
                </small>
              </div>

              <div style={{ textAlign: "center", marginTop: 20, color: "#94a3b8", fontSize: 13 }}>
                <div style={{ marginBottom: 10 }}>or sign up with</div>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  <button aria-label="Sign up with Google" style={social}>G</button>
                  <button aria-label="Sign up with Facebook" style={social}>f</button>
                  <button aria-label="Sign up with Apple" style={social}></button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- Styles (inline for quick drop-in) ---------- */
const page = {
  minHeight: "calc(100vh - 72px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f8fafc",
  padding: "36px 18px",
  boxSizing: "border-box",
};

const container = {
  width: "100%",
  maxWidth: 1200,
  display: "grid",
  gridTemplateColumns: "420px 1fr",
  gap: 24,
  alignItems: "stretch",
  boxShadow: "0 10px 30px rgba(2,6,23,0.06)",
  borderRadius: 14,
  overflow: "hidden",
  background: "#fff",
};

const leftPanel = {
  background: "linear-gradient(180deg,#0b72b9 0%, #7c3aed 100%)",
  color: "#fff",
  padding: 32,
  display: "flex",
  alignItems: "stretch",
};

const leftInner = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

const leftTitle = { fontSize: 32, margin: 0, lineHeight: 1.05, fontWeight: 700 };
const leftSubtitle = { marginTop: 12, color: "rgba(255,255,255,0.95)", lineHeight: 1.45 };
const leftCTA = { marginTop: 12, display: "inline-block", color: "#fff", fontWeight: 700, textDecoration: "underline" };

const rightPanel = {
  padding: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#fff",
};

const formWrap = { width: "100%", maxWidth: 520 };
const mainTitle = { margin: 0, fontSize: 36, color: "#0f172a" };
const lead = { color: "#6b7280", marginTop: 6 };

const label = { display: "block", marginTop: 14, color: "#374151", fontSize: 14 };
const input = {
  width: "100%",
  marginTop: 8,
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid #e6eef8",
  outline: "none",
  boxSizing: "border-box",
  fontSize: 15,
  background: "#fff"
};

const registerBtn = {
  marginTop: 18,
  width: "100%",
  padding: "14px 18px",
  borderRadius: 12,
  border: "none",
  background: "#0b72b9",
  color: "#fff",
  fontWeight: 700,
  fontSize: 16,
  cursor: "pointer",
  boxShadow: "0 6px 18px rgba(11,114,185,0.18)"
};

const registerBtnDisabled = { ...registerBtn, opacity: 0.65, cursor: "default" };

const social = {
  width: 46,
  height: 46,
  borderRadius: 10,
  border: "1px solid #e6eef8",
  background: "#fff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontWeight: 700,
  color: "#374151"
};

const errorBox = {
  marginTop: 12,
  color: "#b91c1c",
  background: "#fff5f5",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid rgba(185,28,28,0.06)",
  fontSize: 14
};

/* Simple responsive fallback */
if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 880px)").matches) {
  container.gridTemplateColumns = "1fr";
  leftPanel.display = "none";
  rightPanel.padding = 24;
  formWrap.maxWidth = "100%";
}
