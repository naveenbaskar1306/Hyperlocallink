// src/components/HeroGrid.jsx
import React, { useEffect, useState } from "react";

const BACKEND =
  import.meta.env.VITE_BACKEND_URL ||
  (import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "")
    : "http://localhost:5000");

function prefix(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${BACKEND}${url.startsWith("/") ? url : "/" + url}`;
}

export default function HeroGrid() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${BACKEND}/api/services`);
        const data = await res.json();

        const imgs = data
          .map((s) => prefix(s.imageUrl))
          .filter(Boolean)
          .slice(0, 3); // we only need 3 images

        setImages(imgs);
      } catch (err) {
        console.log("Image fetch error:", err);
      }
    }

    load();
  }, []);

  return (
    <>
      {/* HERO GRID */}
      <section className="hero-grid container" aria-labelledby="hero-heading">
        <div className="hero-left">
          <h1 id="hero-heading">Home services at your doorstep</h1>
          <p>
            Book trusted professionals for salon, cleaning, repair, and more —
            at your convenience.
          </p>
          <a className="cta" href="#services">
            Explore services
          </a>
        </div>

        {/* RIGHT SIDE (1 big + 2 small) */}
        <div className="hero-right-3">
          {/* BIG IMAGE */}
          <div className="big-image">
            <img src={images[0] ?? "/fallback.jpg"} alt="service" />
          </div>

          {/* TWO SMALL IMAGES */}
          <div className="small-image-row">
            <div className="small-tile">
              <img src={images[1] ?? "/fallback.jpg"} alt="service" />
            </div>

            <div className="small-tile">
              <img src={images[2] ?? "/fallback.jpg"} alt="service" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS ROW (Service rating / Customers globally, etc.) */}
      <section
        className="hero-stats container"
        aria-label="platform highlights"
      >
        <div className="hero-stat">
          <span className="hero-stat-icon">★</span>
          <div>
            <div className="hero-stat-value">4.8</div>
            <div className="hero-stat-label">Service rating*</div>
          </div>
        </div>

        <div className="hero-stat">
          <span className="hero-stat-icon">👥</span>
          <div>
            <div className="hero-stat-value">12M+</div>
            <div className="hero-stat-label">Customers globally*</div>
          </div>
        </div>

        <div className="hero-stat">
          <span className="hero-stat-icon">🛠️</span>
          <div>
            <div className="hero-stat-value">50K+</div>
            <div className="hero-stat-label">Bookings completed</div>
          </div>
        </div>
      </section>
    </>
  );
}
