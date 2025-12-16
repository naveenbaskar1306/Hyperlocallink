// src/pages/Login.jsx
import React, { useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

/**
 * Modern Login page — updated UI to match the requested design.
 * - Large left gradient panel with CTA
 * - Spacious right form with large heading and pill button
 * - Responsive: stacks on small screens
 */

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("Please enter your email.");
    if (!password) return setError("Please enter your password.");

    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/";
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={page}>
      <div style={container}>
        {/* left gradient panel */}
        <aside style={leftPanel}>
          <div style={leftInner}>
            <h2 style={leftTitle}>Welcome back!</h2>
            <p style={leftSubtitle}>
              Login to manage your bookings, view orders and get personalized offers.
            </p>

            <div style={{ marginTop: "auto" }}>
              <small style={{ color: "rgba(255,255,255,0.85)" }}>New here?</small>
              <div>
                <Link to="/register" style={leftCTA}>Create an account</Link>
              </div>
            </div>
          </div>
        </aside>

        {/* form panel */}
        <section style={rightPanel}>
          <div style={formWrap}>
            <h1 style={mainTitle}>Login</h1>
            <p style={lead}>Enter your email and password to continue.</p>

            <form onSubmit={handleSubmit} style={{ marginTop: 18 }}>
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
                  placeholder="Password"
                  style={input}
                  required
                />
              </label>

              {error && <div style={errorBox}>{error}</div>}

              <div style={formRow}>
                <label style={remember}>
                  <input type="checkbox" style={{ marginRight: 8 }} />
                  Remember me
                </label>

                <Link to="/forgot-password" style={forgot}>Forgot?</Link>
              </div>

              <button type="submit" style={loading ? loginBtnDisabled : loginBtn} disabled={loading}>
                {loading ? "Signing in…" : "Login"}
              </button>

              <div style={{ textAlign: "center", marginTop: 14, color: "#64748b" }}>
                <small>
                  Don't have an account? <Link to="/register" style={{ color: "#0b72b9", textDecoration: "none" }}>Sign up</Link>
                </small>
              </div>

              <div style={{ textAlign: "center", marginTop: 20, color: "#94a3b8", fontSize: 13 }}>
                <div style={{ marginBottom: 10 }}>or sign in with</div>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  <button aria-label="Sign in with Google" style={social}>G</button>
                  <button aria-label="Sign in with Facebook" style={social}>f</button>
                  <button aria-label="Sign in with Apple" style={social}></button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------- styles ---------------- */
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

/* Left gradient panel */
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

/* Right form panel */
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

/* Inputs */
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

const formRow = { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 };
const remember = { display: "flex", alignItems: "center", color: "#475569", fontSize: 14 };
const forgot = { color: "#0b72b9", textDecoration: "none", fontSize: 14 };

/* Buttons */
const loginBtn = {
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

const loginBtnDisabled = { ...loginBtn, opacity: 0.65, cursor: "default" };

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

/* Responsive adjustments */
if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 880px)").matches) {
  container.gridTemplateColumns = "1fr";
  leftPanel.display = "none";
  rightPanel.padding = 24;
  formWrap.maxWidth = "100%";
}
