import React from "react";
import BannerImg from "../assets/promos/banner.png"; // <-- Your local image path

export default function Banner() {
  return (
    <section style={bannerWrapper}>
      {/* LEFT SECTION */}
      <div style={leftBox}>
        <p style={tag}>✨ Bathroom Cleaning ✨</p>
        <h1 style={heading}>Get squeaky clean bathrooms</h1>
        <button style={ctaBtn}>Explore now</button>
      </div>

      {/* RIGHT SECTION */}
      <div style={rightBox}>
        <img
          src={BannerImg}
          alt="Cleaning service"
          style={bannerImage}
        />
      </div>
    </section>
  );
}

/* === STYLES === */

const bannerWrapper = {
  width: "100%",
  backgroundColor: "rgb(240 243 255)",
  borderRadius: 22,
  padding: "32px 40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 30,
  margin: "20px auto",
  boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
};

const leftBox = {
  flex: 1,
};

const tag = {
  fontSize: 14,
  fontWeight: 600,
  color: "#1e293b",
  opacity: 0.7,
  marginBottom: 10,
  letterSpacing: "0.05em",
};

const heading = {
  fontSize: 36,
  fontWeight: 700,
  color: "#0f172a",
  margin: "0 0 20px 0",
  lineHeight: 1.25,
  maxWidth: 380,
};

const ctaBtn = {
  backgroundColor: "#111827",
  color: "#ffffff",
  border: "none",
  padding: "12px 22px",
  borderRadius: 8,
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
};

const rightBox = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
};

const bannerImage = {
  width: "100%",
  maxWidth: 450,
  borderRadius: 16,
  objectFit: "cover",
};
