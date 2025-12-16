import React, { useEffect, useRef } from "react";
import ServiceCard from "./ServiceCard";

export default function ServicesCarouselSection({ title, services = [] }) {
  const trackRef = useRef(null);

  // Determine if section is "New and noteworthy"
  const isNewAndNoteworthy =
    title && title.toLowerCase().includes("new and noteworthy");

  /* ========= AUTO SCROLL LOGIC ========= */
  useEffect(() => {
    const el = trackRef.current;
    if (!el || services.length === 0) return;

    const stepMs = 3000; // time between slides
    const gap = 24; // must match gap below

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
    }, stepMs);

    return () => clearInterval(id);
  }, [services.length]);

  if (!services || services.length === 0) return null;

  /* ========= RENDER ========= */
  return (
    <section style={{ padding: "32px 0" }}>
      <h2
        style={{
          fontSize: 30,
          fontWeight: 800,
          marginBottom: 26,
          color: "#111",
        }}
      >
        {title}
      </h2>

      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: isNewAndNoteworthy ? 30 : 24,
          overflowX: "hidden",
          paddingBottom: 12,
          alignItems: isNewAndNoteworthy ? "flex-start" : "stretch",
        }}
      >
        {services.map((s) => (
          <ServiceCard
            key={s._id || s.id}
            service={s}
            variant={isNewAndNoteworthy ? "simple" : "detailed"}
          />
        ))}
      </div>
    </section>
  );
}
