// src/pages/categories/ACRepair.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ---- cart helpers ----
const CART_KEY = "hl_cart";

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray(parsed.items)) return parsed.items;
    return [];
  } catch {
    return [];
  }
}

function writeCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

function addServiceToCart(service) {
  const items = readCart();
  const id = service._id || service.id;
  const index = items.findIndex((it) => (it._id || it.id) === id);

  if (index >= 0) {
    const existing = items[index];
    items[index] = {
      ...existing,
      quantity: (existing.quantity || 1) + 1,
    };
  } else {
    items.push({ ...service, quantity: 1 });
  }

  writeCart(items);
  return items.reduce((sum, it) => sum + (it.quantity || 1), 0);
}

export default function ACRepair() {
  const [services, setServices] = useState([
    {
      id: "lite1",
      title: "Lite AC service",
      price: 599,
      duration: 45,
      rating: 4.78,
      reviews: "283K",
      bullets: [
        "Applicable for both window & split ACs",
        "Indoor unit cleaning with water jet spray",
      ],
      image: "/images/services/ac-lite.jpg",
    },
    {
      id: "repair1",
      title: "AC less/no cooling repair",
      price: 299,
      duration: 150,
      rating: 4.76,
      reviews: "473K",
      bullets: [
        "Diagnostics & repair",
        "Includes minor part replacement (if available)",
      ],
      image: "/images/services/ac-repair.jpg",
    },
    {
      id: "service-split",
      title: "AC service (split)",
      price: 799,
      duration: 90,
      rating: 4.80,
      reviews: "120K",
      bullets: ["Full indoor + outdoor cleaning", "Filter cleaning and deodorize"],
      image: "/images/services/ac-split.jpg",
    },
    {
      id: "gas1",
      title: "AC gas refill",
      price: 2499,
      duration: 120,
      rating: 4.65,
      reviews: "85K",
      bullets: ["Gas top-up based on diagnosis", "Safe handling and testing"],
      image: "/images/services/ac-gas.jpg",
    },
  ]);

  useEffect(() => {
    // (optional) fetch from backend
  }, []);

  // global cart count (total quantity)
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const items = readCart();
    const total = items.reduce((sum, it) => sum + (it.quantity || 1), 0);
    setCartCount(total);
  }, []);

  function handleAddToCart(svc) {
    const newTotal = addServiceToCart(svc);
    setCartCount(newTotal);
    alert(`Added "${svc.title}" to cart`);
  }

  return (
    <main style={styles.page}>
      <div style={styles.headerRow}>
        <div>
          <h1 style={styles.title}>AC & Appliance Repair</h1>
          <p style={styles.lead}>
            AC, fridge, TV and other appliance repairs & servicing.
          </p>
        </div>
        <div>
          <Link to="/categories" style={styles.backLink}>
            ← Back to categories
          </Link>
        </div>
      </div>

      <div style={styles.columns}>
        {/* LEFT SIDEBAR */}
        <aside style={styles.left}>
          <div style={styles.cardBox}>
            <h4 style={styles.sidebarHeading}>Select a service</h4>

            <div style={styles.iconGrid}>
              <div style={styles.iconItem}>
                <div style={styles.iconThumb}>🏷️</div>
                <div style={styles.iconLabel}>Super saver packages</div>
              </div>

              <div style={styles.iconItem}>
                <div style={styles.iconThumb}>🧼</div>
                <div style={styles.iconLabel}>Service</div>
              </div>

              <div style={styles.iconItem}>
                <div style={styles.iconThumb}>🔧</div>
                <div style={styles.iconLabel}>Repair & gas refill</div>
              </div>

              <div style={styles.iconItem}>
                <div style={styles.iconThumb}>🧊</div>
                <div style={styles.iconLabel}>Installation/uninstallation</div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN COLUMN */}
        <section style={styles.main}>
          {/* Top featured / small card (Lite AC service) */}
          <div style={{ marginBottom: 18 }}>
            {services.slice(0, 1).map((s) => (
              <div key={s.id} style={styles.featureCard}>
                <div style={styles.featureLeft}>
                  <h3 style={{ margin: "0 0 6px 0" }}>{s.title}</h3>
                  <div style={{ color: "#6b7280", marginBottom: 8 }}>
                    {s.duration} mins
                  </div>

                  <div
                    style={{
                      color: "#0b72b9",
                      fontWeight: 700,
                      marginBottom: 10,
                    }}
                  >
                    ₹{s.price}
                  </div>

                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 18,
                      color: "#475569",
                      lineHeight: 1.6,
                    }}
                  >
                    {s.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>

                  <div style={{ marginTop: 12 }}>
                    <Link to={`/services/${s.id}`} style={styles.viewDetails}>
                      View details
                    </Link>
                    <button
                      onClick={() => handleAddToCart(s)}
                      style={styles.addBtn}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div style={styles.featureRight}>
                  <img
                    src={s.image}
                    alt={s.title}
                    style={styles.smallImg}
                    onError={(e) =>
                      (e.currentTarget.style.display = "none")
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Section: Repair & gas refill */}
          <div style={{ marginTop: 6 }}>
            <h2 style={styles.sectionTitle}>Repair & gas refill</h2>

            <div style={styles.divider} />

            <div style={styles.servicesGrid}>
              {services.slice(1).map((s) => (
                <article key={s.id} style={styles.serviceCard}>
                  <div style={styles.serviceLeft}>
                    <h3 style={{ margin: "0 0 6px 0" }}>{s.title}</h3>
                    <div style={{ color: "#6b7280" }}>{s.duration} mins</div>
                    <div style={{ marginTop: 8, fontWeight: 700 }}>
                      ₹{s.price}
                    </div>

                    <div style={{ marginTop: 8, color: "#475569" }}>
                      {s.bullets.slice(0, 2).map((b, i) => (
                        <div key={i}>• {b}</div>
                      ))}
                    </div>

                    <div style={{ marginTop: 12 }}>
                      <Link
                        to={`/services/${s.id}`}
                        style={styles.viewDetails}
                      >
                        View details
                      </Link>
                    </div>
                  </div>

                  <div style={styles.serviceRight}>
                    <img
                      src={s.image}
                      alt={s.title}
                      style={styles.cardImg}
                      onError={(e) =>
                        (e.currentTarget.style.display = "none")
                      }
                    />
                    <button
                      onClick={() => handleAddToCart(s)}
                      style={styles.addBtnOutline}
                    >
                      Add
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT SIDEBAR */}
        <aside style={styles.right}>
          <div style={styles.cardBox}>
            <div
              style={{
                minHeight: 90,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6b7280",
              }}
            >
              {cartCount === 0 ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 20 }}>🛒</div>
                  <div>No items in your cart</div>
                </div>
              ) : (
                <div>Your cart has {cartCount} items</div>
              )}
            </div>
          </div>

          <div style={{ height: 16 }} />

          <div style={styles.cardBox}>
            <div style={{ fontWeight: 700 }}>Amazon cashback upto ₹125</div>
            <div style={{ color: "#6b7280", marginTop: 8 }}>
              Via Amazon Pay balance
            </div>
            <div style={{ marginTop: 10 }}>
              <a
                href="#"
                style={{ color: "#7c3aed", textDecoration: "none" }}
              >
                View More Offers ▾
              </a>
            </div>
          </div>

          <div style={{ height: 16 }} />

          <div style={styles.cardBox}>
            <h4 style={{ margin: 0 }}>UC Promise</h4>
            <ul
              style={{
                marginTop: 8,
                paddingLeft: 18,
                color: "#374151",
              }}
            >
              <li>Verified Professionals</li>
              <li>Hassle Free Booking</li>
              <li>Transparent Pricing</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}

/* ---------- styles ---------- */
const styles = {
  page: { padding: "24px 18px", maxWidth: 1200, margin: "0 auto" },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  title: { margin: 0, fontSize: 36 },
  lead: { color: "#6b7280" },
  backLink: { color: "#0b72b9", textDecoration: "none" },

  columns: {
    display: "grid",
    gridTemplateColumns: "260px 1fr 300px",
    gap: 18,
    alignItems: "start",
  },

  left: {},
  right: {},
  main: {},

  cardBox: {
    background: "#fff",
    borderRadius: 10,
    padding: 16,
    border: "1px solid #eef2f7",
  },

  sidebarHeading: { margin: "0 0 12px 0", fontSize: 16 },
  iconGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  iconItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 8,
    background: "#fbfdff",
  },
  iconThumb: {
    width: 56,
    height: 56,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    boxShadow: "0 2px 6px rgba(2,6,23,0.04)",
  },
  iconLabel: { fontSize: 13, color: "#374151", textAlign: "center" },

  featureCard: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    background: "#fff",
    padding: 16,
    borderRadius: 10,
    border: "1px solid #eef2f7",
  },
  featureLeft: { flex: 1 },
  featureRight: {
    width: 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  smallImg: {
    width: 160,
    height: 100,
    objectFit: "cover",
    borderRadius: 8,
  },

  sectionTitle: { fontSize: 22, margin: "12px 0" },
  divider: { height: 1, background: "#eef2f7", margin: "12px 0 20px 0" },

  servicesGrid: { display: "grid", gap: 16 },
  serviceCard: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    background: "#fff",
    padding: 16,
    borderRadius: 10,
    border: "1px solid #eef2f7",
    alignItems: "center",
  },
  serviceLeft: { flex: 1 },
  serviceRight: {
    width: 160,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },

  cardImg: {
    width: 120,
    height: 80,
    objectFit: "cover",
    borderRadius: 8,
  },

  viewDetails: {
    color: "#7c3aed",
    textDecoration: "none",
    display: "inline-block",
    marginRight: 12,
  },

  addBtn: {
    marginLeft: 12,
    background: "#7c3aed",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },

  addBtnOutline: {
    background: "transparent",
    color: "#7c3aed",
    border: "1px solid #e9d9ff",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },
};
