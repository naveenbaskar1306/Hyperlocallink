// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

function getItemPrice(item) {
  const values = [item.price, item.basePrice, item.amount];
  for (const v of values) {
    if (v !== undefined && v !== null && v !== "") {
      const n = Number(v);
      if (!isNaN(n)) return n;
    }
  }
  return 0;
}

export default function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(
      readCart().map((it) => ({
        ...it,
        quantity: it.quantity && it.quantity > 0 ? it.quantity : 1,
      }))
    );
  }, []);

  const totalItems = items.reduce((sum, it) => sum + (it.quantity || 1), 0);
  const subtotal = items.reduce(
    (sum, it) => sum + getItemPrice(it) * (it.quantity || 1),
    0
  );

  function updateQuantity(id, delta) {
    setItems((prev) => {
      const updated = prev
        .map((it) => {
          if ((it._id || it.id) !== id) return it;
          const nextQty = (it.quantity || 1) + delta;
          return { ...it, quantity: nextQty < 1 ? 1 : nextQty };
        })
        .filter((it) => it.quantity > 0);

      writeCart(updated);
      return updated;
    });
  }

  function removeItem(id) {
    setItems((prev) => {
      const updated = prev.filter((it) => (it._id || it.id) !== id);
      writeCart(updated);
      return updated;
    });
  }

  function clearCart() {
    setItems([]);
    writeCart([]);
  }

  // go to booking page with the first item in cart
  function handleCheckout() {
    if (!items.length) return;

    const first = items[0];
    const serviceId = first._id || first.id;

    if (!serviceId) {
      alert("Cannot start checkout: service id missing.");
      return;
    }

    // ✅ pass the whole service item in navigation state
    navigate(`/booking/${serviceId}`, { state: { service: first } });
  }

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: "40px 0 60px" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 16 }}>
          Your cart
        </h2>
        <div
          style={{
            padding: 24,
            borderRadius: 24,
            background: "#ffffff",
            boxShadow: "0 16px 40px rgba(15,23,42,0.10)",
          }}
        >
          <p style={{ marginBottom: 16 }}>Your cart is currently empty.</p>
          <Link
            to="/"
            style={{
              padding: "10px 22px",
              borderRadius: 999,
              background: "#0d6efd",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Browse services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "40px 0 60px" }}>
      <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 16 }}>
        Your cart
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2.2fr) minmax(0, 1fr)",
          gap: 24,
        }}
      >
        {/* LEFT: items */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 24,
            boxShadow: "0 16px 40px rgba(15,23,42,0.10)",
            padding: 20,
          }}
        >
          {items.map((item) => {
            const id = item._id || item.id;
            const price = getItemPrice(item);
            const qty = item.quantity || 1;
            const lineTotal = price * qty;

            return (
              <div
                key={id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "96px minmax(0, 1.6fr) 120px",
                  gap: 16,
                  padding: "14px 0",
                  borderBottom: "1px solid #e2e8f0",
                  alignItems: "center",
                }}
              >
                {/* image */}
                <div
                  style={{
                    width: 96,
                    height: 80,
                    borderRadius: 16,
                    overflow: "hidden",
                    background: "#f1f5f9",
                  }}
                >
                  <img
                    src={
                      item.image ||
                      item.imageUrl ||
                      (Array.isArray(item.images) ? item.images[0] : null) ||
                      "/no-image.png"
                    }
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => {
                      e.currentTarget.src = "/no-image.png";
                    }}
                  />
                </div>

                {/* details */}
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {item.title || "Service"}
                  </div>
                  {item.duration && (
                    <div
                      style={{
                        fontSize: 13,
                        color: "#6b7280",
                        marginBottom: 4,
                      }}
                    >
                      {item.duration} mins
                    </div>
                  )}
                  {item.bullets && (
                    <div
                      style={{
                        fontSize: 13,
                        color: "#64748b",
                        marginBottom: 8,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {Array.isArray(item.bullets)
                        ? item.bullets.join(" • ")
                        : item.bullets}
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <button
                      onClick={() => updateQuantity(id, -1)}
                      aria-label="Decrease quantity"
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 999,
                        border: "1px solid #cbd5f1",
                        background: "white",
                        cursor: "pointer",
                      }}
                    >
                      −
                    </button>
                    <span style={{ minWidth: 24, textAlign: "center" }}>
                      {qty}
                    </span>
                    <button
                      onClick={() => updateQuantity(id, 1)}
                      aria-label="Increase quantity"
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 999,
                        border: "1px solid #cbd5f1",
                        background: "white",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(id)}
                      style={{
                        marginLeft: 12,
                        border: "none",
                        background: "transparent",
                        color: "#ef4444",
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* price / line total */}
                <div
                  style={{
                    textAlign: "right",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  <div>₹{price}</div>
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 13,
                      color: "#64748b",
                    }}
                  >
                    Total: ₹{lineTotal}
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{ marginTop: 12, textAlign: "right" }}>
            <button
              onClick={clearCart}
              style={{
                border: "none",
                background: "transparent",
                color: "#ef4444",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Clear cart
            </button>
          </div>
        </div>

        {/* RIGHT: summary */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 24,
            boxShadow: "0 16px 40px rgba(15,23,42,0.10)",
            padding: 22,
            alignSelf: "flex-start",
          }}
        >
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            Summary
          </h3>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              fontSize: 14,
            }}
          >
            <span>Items</span>
            <span>{totalItems}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              fontSize: 14,
            }}
          >
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 16,
              fontSize: 13,
              color: "#64748b",
            }}
          >
            <span>Taxes & fees (approx.)</span>
            <span>Included</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 18,
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          <button
            onClick={handleCheckout}
            style={{
              width: "100%",
              padding: "10px 18px",
              borderRadius: 999,
              border: "none",
              background: "#0d6efd",
              color: "#ffffff",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              marginBottom: 10,
            }}
          >
            Proceed to checkout
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              width: "100%",
              padding: "9px 18px",
              borderRadius: 999,
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              color: "#111827",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Continue browsing
          </button>
        </div>
      </div>
    </div>
  );
}
