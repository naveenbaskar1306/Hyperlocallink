// src/components/Categories.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * Categories grid — links to dedicated category pages.
 * Replace images/icons as needed.
 */

const items = [
  { title: "Women's Salon & Spa", icon: "💅", path: "/categories/womens-salon" },
  { title: "Men's Salon & Massage", icon: "💈", path: "/categories/mens-salon" },
  { title: "Cleaning & Pest Control", icon: "🧹", path: "/categories/cleaning-pest-control" },
  { title: "Electrician, Plumber & Carpenter", icon: "🔧", path: "/categories/electrician-plumber" },
  { title: "AC & Appliance Repair", icon: "❄️", path: "/categories/ac-appliance-repair" },
  { title: "Native Water Purifier", icon: "🚰", path: "/categories/water-purifier" },
];

export default function Categories() {
  return (
    <div className="container" style={{ padding: "24px 0" }}>
      <div
        className="categories"
        role="list"
        aria-label="Categories"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 18,
          alignItems: "start",
        }}
      >
        {items.map((i) => (
          <Link
            key={i.title}
            to={i.path}
            className="cat-item"
            role="listitem"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              padding: 18,
              borderRadius: 12,
              background: "#fff",
              boxShadow: "0 8px 20px rgba(11,114,185,0.03)",
              textDecoration: "none",
              color: "#0f172a",
              border: "1px solid #f1f5f9",
            }}
          >
            <div style={{ fontSize: 28 }}>{i.icon}</div>
            <div style={{ textAlign: "center", fontSize: 14 }}>{i.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
