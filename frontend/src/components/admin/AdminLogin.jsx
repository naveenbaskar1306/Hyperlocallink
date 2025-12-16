// frontend/src/admin/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE || "http://localhost:5000"}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/admin");
      } else {
        setError(data.message || "Login failed. Check credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error — try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={pageWrap}>
      <div style={card}>
        <div style={leftPanel}>
          <div>
            <div style={welcomeTitle}>Welcome back</div>
            <div style={welcomeText}>
              Sign in to access the admin dashboard. Manage services, bookings
              and users.
            </div>
          </div>

          <div style={supportText}>
            If you have trouble signing in contact the system administrator.
          </div>
        </div>

        <div style={rightPanel}>
          <div style={headerRow}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>Admin Login</div>
            <div style={{ color: "#6b7280", fontSize: 13 }}>Secure access</div>
          </div>

          <form onSubmit={submit} style={{ marginTop: 12 }}>
            <label style={label}>Email</label>
            <input
              style={input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              type="email"
              autoComplete="username"
            />

            <label style={{ ...label, marginTop: 12 }}>Password</label>
            <input
              style={input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              autoComplete="current-password"
            />

            {error && <div style={errorStyle}>{error}</div>}

            <div style={{ marginTop: 16 }}>
              <button type="submit" style={primaryBtn} disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>

            <div style={divider}>
              <span style={{ color: "#9CA3AF", fontSize: 13 }}>or sign in with</span>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button type="button" style={socialBtn} aria-label="Sign in with Google">G</button>
              <button type="button" style={socialBtn} aria-label="Sign in with Facebook">f</button>
              <button type="button" style={socialBtn} aria-label="Sign in with GitHub">GH</button>
            </div>
          </form>
        </div>
      </div>

      <style>{responsiveStyles}</style>
    </div>
  );
}

/* Inline styles */
const pageWrap = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f6f8fb",
  padding: 20,
  fontFamily:
    'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
};

const card = {
  width: 920,
  maxWidth: "100%",
  borderRadius: 12,
  overflow: "hidden",
  display: "flex",
  boxShadow: "0 20px 60px rgba(2,6,23,0.12)",
  background: "#fff",
};

const leftPanel = {
  flex: "0 0 330px",
  padding: 28,
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  background: "linear-gradient(180deg,#2563eb 0%,#06b6d4 70%)",
};

const welcomeTitle = {
  fontSize: 28,
  fontWeight: 800,
  lineHeight: 1.05,
};

const welcomeText = {
  marginTop: 12,
  color: "rgba(255,255,255,0.95)",
  fontSize: 14,
  lineHeight: 1.5,
};

const supportText = {
  fontSize: 13,
  color: "rgba(255,255,255,0.92)",
  opacity: 0.9,
};

const rightPanel = {
  flex: 1,
  padding: 32,
};

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 6,
};

const label = {
  display: "block",
  marginBottom: 8,
  fontSize: 13,
  color: "#374151",
};

const input = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid rgba(15,23,42,0.06)",
  outline: "none",
  fontSize: 15,
  boxSizing: "border-box",
};

const errorStyle = {
  marginTop: 12,
  color: "#ef4444",
  fontWeight: 600,
};

const primaryBtn = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(90deg,#2563eb,#06b6d4)",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};

const divider = {
  marginTop: 18,
  marginBottom: 12,
  display: "flex",
  justifyContent: "center",
};

const socialBtn = {
  width: 52,
  height: 44,
  borderRadius: 8,
  border: "1px solid rgba(15,23,42,0.06)",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 700,
};

/* small responsive tweak */
const responsiveStyles = `
@media (max-width:880px){
  .admin-login-left { display:none; }
  /* stack vertically: card becomes column */
  div[style*="display: flex"][style*="box-shadow"] {
    flex-direction: column !important;
  }
  div[style*="flex: 0 0 330px"] { display:none !important; }
}
`;
