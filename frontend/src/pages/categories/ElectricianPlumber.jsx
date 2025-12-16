// src/pages/categories/ElectricianPlumber.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  } catch {}
}

export default function ElectricianPlumber() {
  const [services] = useState([
    {
      id: "el1",
      title: "Electrical repair",
      price: 499,
      duration: 60,
      bullets: ["Wiring checks", "Fuse & switch repair"],
      image: "/images/services/electrical.jpg",
    },
    {
      id: "pl1",
      title: "Plumbing repair",
      price: 599,
      duration: 60,
      bullets: ["Leak fixing", "Pipe replacement"],
      image: "/images/services/plumbing.jpg",
    },
    {
      id: "cr1",
      title: "Carpentry (small jobs)",
      price: 999,
      duration: 90,
      bullets: ["Cabinet repair", "Shelf fixing"],
      image: "/images/services/carpentry.jpg",
    },
  ]);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(readCart().length);
  }, []);

  function addToCart(s) {
    const cart = readCart();
    alert("Added to cart!");
    const existing = cart.find((i) => i.id === s.id || i._id === s.id);

    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...s, quantity: 1 });
    }

    writeCart(cart);
    setCartCount(cart.length);
  }

  return (
    <main style={styles.page}>
      <div style={styles.headerRow}>
        <div>
          <h1 style={styles.title}>Electrician, Plumber & Carpenter</h1>
          <p style={styles.lead}>Repairs, installations and small carpentry jobs.</p>
        </div>
        <div>
          <Link to="/categories" style={styles.backLink}>
            ← Back to categories
          </Link>
        </div>
      </div>

      <div style={styles.columns}>
        <aside style={styles.left}>
          <div style={styles.cardBox}>
            <h4 style={styles.sidebarHeading}>Quick types</h4>
            <div style={styles.iconGrid}>
              <div style={styles.iconItem}>
                <div style={styles.iconThumb}>💡</div>
                <div style={styles.iconLabel}>Electrical</div>
              </div>
              <div style={styles.iconItem}>
                <div style={styles.iconThumb}>🚰</div>
                <div style={styles.iconLabel}>Plumbing</div>
              </div>
              <div style={styles.iconItem}>
                <div style={styles.iconThumb}>🪚</div>
                <div style={styles.iconLabel}>Carpentry</div>
              </div>
              <div style={styles.iconItem}>
                <div style={styles.iconThumb}>🔩</div>
                <div style={styles.iconLabel}>Installation</div>
              </div>
            </div>
          </div>
        </aside>

        <section style={styles.main}>
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
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {s.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 12 }}>
                    <Link
                      to={`/services/${s.id}`}
                      style={styles.viewDetails}
                    >
                      View details
                    </Link>
                    <button
                      onClick={() => addToCart(s)}
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
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 style={styles.sectionTitle}>More services</h2>
            <div style={styles.divider} />
            <div style={styles.servicesGrid}>
              {services.slice(1).map((s) => (
                <article key={s.id} style={styles.serviceCard}>
                  <div style={styles.serviceLeft}>
                    <h3 style={{ margin: 0 }}>{s.title}</h3>
                    <div style={{ color: "#6b7280" }}>{s.duration} mins</div>
                    <div style={{ marginTop: 8, fontWeight: 700 }}>₹{s.price}</div>
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
                      onClick={() => addToCart(s)}
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
            <div style={{ fontWeight: 700 }}>Offers</div>
            <div style={{ color: "#6b7280", marginTop: 8 }}>
              Check current offers
            </div>
          </div>

          <div style={{ height: 16 }} />

          <div style={styles.cardBox}>
            <h4 style={{ margin: 0 }}>Promise</h4>
            <ul style={{ marginTop: 8, paddingLeft: 18 }}>
              <li>Verified</li>
              <li>Quality work</li>
              <li>Safe practices</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}

/* same styles object as before */
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
  divider: {
    height: 1,
    background: "#eef2f7",
    margin: "12px 0 20px 0",
  },

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
    border: "1px solid #65547dff",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },
};
