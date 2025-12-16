// src/components/Header.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, clearAuth } from "../api/authHelpers";

const CART_KEY = "hl_cart";

const CATEGORIES = [
  { title: "Women's Salon & Spa", slug: "womens-salon" },
  { title: "Men's Salon & Massage", slug: "mens-salon" },
  { title: "Cleaning & Pest Control", slug: "cleaning-pest-control" },
  { title: "Electrician, Plumber & Carpenter", slug: "electrician-plumber" },
  { title: "AC & Appliance Repair", slug: "ac-appliance-repair" },
  { title: "Native Water Purifier", slug: "water-purifier" },
];

export default function Header() {
  const user = getUser?.() || null;
  const navigate = useNavigate();

  const [locationLabel, setLocationLabel] = useState("Detecting location…");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locError, setLocError] = useState(null);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState(CATEGORIES.slice(0, 5));
  const wrapperRef = useRef(null);
  const [cartCount, setCartCount] = useState(0);

  // ----------------- EFFECTS -----------------
  useEffect(() => {
    triggerGetLocation();
    loadCartFromStorage();

    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setFiltered(CATEGORIES.slice(0, 5));
      return;
    }
    setFiltered(
      CATEGORIES.filter((c) => c.title.toLowerCase().includes(q)).slice(0, 6)
    );
  }, [query]);

  // ----------------- HELPERS -----------------
  function loadCartFromStorage() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) {
        setCartCount(0);
        return;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setCartCount(parsed.length);
      else if (parsed && Array.isArray(parsed.items))
        setCartCount(parsed.items.length);
      else setCartCount(0);
    } catch {
      setCartCount(0);
    }
  }

  function logout() {
    clearAuth();
    navigate("/");
  }

  function triggerGetLocation() {
    if (!navigator.geolocation) {
      setLocError("Geolocation not supported");
      setLocationLabel("Choose location");
      return;
    }

    setLoadingLocation(true);
    setLocError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const label = await reverseGeocode(latitude, longitude);
          setLocationLabel(label || "Unknown area");
        } catch (e) {
          console.error(e);
          setLocError("Unable to resolve address");
          setLocationLabel("Unknown area");
        } finally {
          setLoadingLocation(false);
        }
      },
      (err) => {
        setLoadingLocation(false);
        console.error(err);
        if (err.code === 1) setLocError("Location access denied");
        else if (err.code === 2) setLocError("Position unavailable");
        else if (err.code === 3) setLocError("Location timed out");
        else setLocError("Failed to get location");
        setLocationLabel("Choose location");
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 1000 * 60 * 5 }
    );
  }

  async function reverseGeocode(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(
      lat
    )}&lon=${encodeURIComponent(lon)}&addressdetails=1`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("Reverse geocode failed");
    const data = await res.json();
    const addr = data?.address || {};

    const badWord = (value) =>
      typeof value === "string" &&
      /(division|ward|zone|block)/i.test(value);

    const parts = [];

    if (addr.road && !badWord(addr.road)) parts.push(addr.road);

    const areaCandidates = [
      addr.residential,
      addr.neighbourhood,
      addr.locality,
      addr.suburb,
      addr.village,
    ].filter((v) => v && !badWord(v));

    if (areaCandidates[0]) parts.push(areaCandidates[0]);

    const cityCandidates = [addr.city, addr.town, addr.municipality].filter(
      (v) => v && !badWord(v)
    );
    if (cityCandidates[0]) parts.push(cityCandidates[0]);

    if (parts.length) return parts.join(", ");

    if (data.display_name) {
      const cleaned = data.display_name
        .split(",")
        .map((s) => s.trim())
        .filter((s) => !badWord(s));
      if (cleaned.length) return cleaned.slice(0, 3).join(", ");
    }
    return null;
  }

  // ----------------- RENDER -----------------
  return (
    <header
      className="site-header"
      style={{
        borderBottom: "1px solid #e5e7eb",
        background: "#ffffff",
        padding: "10px 24px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="header-row"
        style={{ display: "flex", alignItems: "center", gap: 24 }}
      >
        {/* LEFT: logo + nav */}
        <div
          className="header-left"
          style={{ display: "flex", alignItems: "center", gap: 16 }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
            }}
          >
            <img
              src="/logo.svg"
              alt="logo"
              style={{ width: 42, height: 42 }}
            />
            <div>
              <div
                style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}
              >
                HYPERLOCAL
              </div>
              <div style={{ fontSize: 13, color: "#64748b" }}>
                Home services
              </div>
            </div>
          </Link>

          <nav
            className="header-nav"
            style={{ display: "flex", gap: 20 }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "#0f172a" }}>
              Home
            </Link>
            <Link
              to="/categories"
              style={{ textDecoration: "none", color: "#0f172a" }}
            >
              Categories
            </Link>
          </nav>
        </div>

        {/* CENTER: location + search */}
        <div
          className="header-center"
          style={{ flex: 1, display: "flex", justifyContent: "center" }}
        >
          <div
            className="header-search-wrap"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              background: "#f8fafc",
              padding: "8px 16px",
              borderRadius: 30,
              border: "1px solid #e2e8f0",
            }}
          >
            {/* Location pill */}
            <div
              className="header-location"
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <span style={{ fontSize: 16 }}>📍</span>
              <span style={{ fontSize: 14 }}>
                {loadingLocation ? "Locating..." : locationLabel}
              </span>
              <button
                type="button"
                onClick={triggerGetLocation}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: 12,
                  color: "#0b72b9",
                  cursor: "pointer",
                }}
              >
                Use current location
              </button>
            </div>

            {/* Search */}
            <div
              ref={wrapperRef}
              className="header-search"
              style={{ position: "relative" }}
            >
              <input
                type="text"
                className="header-search-input"
                placeholder="Search services"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                style={{
                  padding: "8px 14px",
                  width: 280,
                  borderRadius: 20,
                  border: "1px solid #e2e8f0",
                  outline: "none",
                }}
              />

              {open && (
                <div
                  style={{
                    position: "absolute",
                    top: "105%",
                    left: 0,
                    width: "100%",
                    background: "#fff",
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                  }}
                >
                  {filtered.map((item) => (
                    <div
                      key={item.slug}
                      onClick={() => navigate(`/categories/${item.slug}`)}
                      style={{
                        padding: "10px 14px",
                        cursor: "pointer",
                        fontSize: 14,
                      }}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: cart + auth */}
        <div
          className="header-actions"
          style={{ display: "flex", alignItems: "center", gap: 16 }}
        >
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => navigate("/cart")}
          >
            🛒
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -10,
                  background: "#ef4444",
                  color: "#fff",
                  fontSize: 11,
                  borderRadius: "50%",
                  padding: "2px 6px",
                }}
              >
                {cartCount}
              </span>
            )}
          </div>

          {user ? (
            <>
              <span style={{ fontSize: 14, color: "#0f172a" }}>
                Hi, {user.name}
              </span>
              <button
                onClick={logout}
                style={{
                  padding: "6px 12px",
                  background: "#0b72b9",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#0f172a" }}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "#0f172a" }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {locError && (
        <div
          style={{
            marginTop: 4,
            fontSize: 11,
            color: "#b91c1c",
            textAlign: "center",
          }}
        >
          {locError}
        </div>
      )}
    </header>
  );
}
