// src/pages/categories/CategoriesPage.jsx
import React from "react";
import Categories from "../../components/Categories";
import { Link } from "react-router-dom";


export default function CategoriesPage() {
  return (
    <main style={{ padding: "20px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 18px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "18px 0",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: 28 }}>Categories</h1>
            <p style={{ marginTop: 6, color: "#6b7280" }}>
              Browse services available in your area. Choose a category to view available services and professionals.
            </p>
          </div>

          <div>
            <Link to="/" style={ctaBtn}>
              ← Back to home
            </Link>
          </div>
        </div>
      </div>

      {/* Categories grid component */}
      <Categories />

      {/* Example quick links / popular categories */}
      <div style={{ maxWidth: 1100, margin: "28px auto", padding: "0 18px" }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>Popular near you</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link to="/categories/ac-appliance-repair" style={pill}>
            AC & Appliance Repair
          </Link>
          <Link to="/categories/cleaning-pest-control" style={pill}>
            Cleaning & Pest Control
          </Link>
          <Link to="/categories/womens-salon" style={pill}>
            Women's Salon & Spa
          </Link>
          <Link to="/categories/mens-salon" style={pill}>
            Men's Salon & Massage
          </Link>
        </div>
      </div>
    </main>
  );
}

const ctaBtn = {
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: 8,
  background: "#0b72b9",
  color: "#fff",
  textDecoration: "none",
};

const pill = {
  background: "#fff",
  border: "1px solid #eef2f7",
  padding: "8px 12px",
  borderRadius: 999,
  textDecoration: "none",
  color: "#0f172a",
  fontSize: 14,
};
