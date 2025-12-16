import React from "react";
import { Link } from "react-router-dom";

/* ========= CONFIG ========= */
const BACKEND =
  import.meta.env.VITE_BACKEND_URL ||
  (import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "")
    : "http://localhost:5000");

function isAbsolute(url) {
  return (
    typeof url === "string" &&
    (url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("//"))
  );
}

function prefixBackend(url) {
  if (!url) return null;
  if (isAbsolute(url)) return url;
  const clean = url.startsWith("/") ? url : `/${url}`;
  return `${BACKEND}${clean}`;
}

/* ========= IMAGE RESOLVER ========= */
function resolveImage(service) {
  if (!service) return null;

  const raw = [
    service.imageUrl,
    service.image,
    Array.isArray(service.images) ? service.images[0] : null,
    service.photo,
    service.img,
    service.image_path,
  ];

  for (const c of raw) {
    if (!c) continue;
    if (typeof c === "object") {
      const deep = c.url || c.src || c.path || c.imageUrl;
      if (deep) return prefixBackend(deep);
      continue;
    }
    if (typeof c === "string" && c.trim() !== "") {
      return prefixBackend(c.trim());
    }
  }

  return "/no-image.png";
}

function formatPrice(service) {
  if (!service) return "₹0";
  const values = [service.basePrice, service.price, service.amount];
  for (const v of values) {
    if (v !== undefined && v !== null && v !== "") {
      const num = Number(v);
      if (!isNaN(num)) return `₹${num}`;
    }
  }
  return "₹0";
}

/* ========= COMPONENT ========= */
/**
 * variant = "detailed" | "simple"
 * - "simple"  -> New & noteworthy (circle image, compact card)
 * - "detailed" (default) -> Most booked services (price, button, etc.)
 */
export default function ServiceCard({ service, variant = "detailed" }) {
  const img = resolveImage(service);

  /* ---------- SIMPLE VARIANT: NEW & NOTEWORTHY (CIRCLE IMAGE) ---------- */
  if (variant === "simple") {
    return (
      <div
        style={{
          width: 160,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Circular image tile */}
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            overflow: "hidden",
            background: "#f5f5f7",
            boxShadow: "0 6px 18px rgba(15,23,42,0.08)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          className="nn-card"
        >
          <img
            src={img}
            alt={service?.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.currentTarget.src = "/no-image.png";
            }}
          />
        </div>

        {/* Title below circle */}
        <p
          style={{
            marginTop: 10,
            fontSize: 15,
            fontWeight: 600,
            color: "#111827",
            textAlign: "center",
            lineHeight: 1.35,
            maxWidth: 160,
          }}
        >
          {service?.title}
        </p>
      </div>
    );
  }

  /* ---------- DETAILED VARIANT: MOST BOOKED SERVICES ---------- */
  return (
    <article
      className="service-card"
      aria-label={service?.title}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 24,
        overflow: "hidden",
        background: "#ffffff",
        boxShadow: "0 10px 26px rgba(15, 23, 42, 0.12)",
        minWidth: 280,
        maxWidth: 280,
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          minHeight: 220,
          maxHeight: 220,
          background: "#f3f6fb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={img}
          alt={service?.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            e.currentTarget.src = "/no-image.png";
          }}
        />
      </div>

      {/* BODY */}
      <div
        style={{
          padding: "16px 18px 0",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          background: "#ffffff",
        }}
      >
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            lineHeight: 1.3,
          }}
        >
          {service?.title}
        </h3>

        <span
          style={{
            color: "#64748b",
            fontSize: 14,
          }}
        >
          60 mins
        </span>

        <p
          style={{
            fontSize: 14,
            color: "#475569",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {service?.description}
        </p>
      </div>

      {/* FOOTER */}
      <div
        style={{
          padding: "12px 18px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          background: "#ffffff",
        }}
      >
        <strong style={{ fontSize: 16 }}>{formatPrice(service)}</strong>

        <Link
          to={`/services/${service?._id}`}
          style={{
            padding: "8px 20px",
            background: "#0d6efd",
            color: "#ffffff",
            fontSize: 14,
            borderRadius: 999,
            border: "none",
            textDecoration: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          View
        </Link>
      </div>
    </article>
  );
}
