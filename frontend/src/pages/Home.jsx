// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import API from "../api/api";
import ServiceCard from "../components/ServiceCard";
import HeroGrid from "../components/HeroGrid";
import Banner from "../components/Banner";
import PromoCarousel from "../components/PromoCarousel";
import Footer from "../components/Footer";
import PromoHeroBanner from "../components/PromoHeroBanner";

// Reusable auto-slider row
function ServicesSliderRow({ title, services }) {
  const trackRef = useRef(null);

  // detect "New and noteworthy" section
  const isNewAndNoteworthy =
    title && title.toLowerCase().includes("new and noteworthy");

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !services || services.length === 0) return;

    const gap = 24; // must match gap in style below
    const intervalMs = 3000;

    const id = setInterval(() => {
      if (!el.firstElementChild) return;
      const cardWidth =
        el.firstElementChild.getBoundingClientRect().width || 0;
      const visibleWidth = el.clientWidth;
      const maxScroll = el.scrollWidth - visibleWidth - 1;

      if (el.scrollLeft >= maxScroll) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({
          left: cardWidth + gap,
          behavior: "smooth",
        });
      }
    }, intervalMs);

    return () => clearInterval(id);
  }, [services]);

  if (!services || services.length === 0) return null;

  return (
    <section style={{ padding: "32px 0" }}>
      <h3
        className="section-title"
        style={{
          fontSize: 30,
          fontWeight: 800,
          marginBottom: 24,
          color: "#111",
        }}
      >
        {title}
      </h3>

      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: isNewAndNoteworthy ? 30 : 24,
          overflowX: "hidden", // hide scrollbar, we move with JS
          paddingBottom: 12,
          alignItems: isNewAndNoteworthy ? "flex-start" : "stretch",
        }}
      >
        {services.map((s) => (
          <ServiceCard
            key={s._id || s.id}
            service={s}
            // 👇 use simple UC-style image card for New & noteworthy
            variant={isNewAndNoteworthy ? "simple" : "detailed"}
          />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    API.get("/services")
      .then((r) => setServices(r.data || []))
      .catch((err) => console.error(err));
  }, []);

  const newAndNoteworthy = services.slice(0, 8);
  const mostBooked = services; // later you can sort by "bookings" etc.

  return (
    <>
      <HeroGrid />
      <Banner />
      <PromoCarousel />

      <div className="container" id="services">
        <ServicesSliderRow
          title="New and noteworthy"
          services={newAndNoteworthy}
        />

        <ServicesSliderRow
          title="Most booked services"
          services={mostBooked}
        />
        <PromoHeroBanner />

      </div>

      <Footer />
    </>
  );
}
