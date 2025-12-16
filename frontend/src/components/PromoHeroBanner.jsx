import React from "react";
import RO from "../assets/promos/ro.jpg";

export default function PromoHeroBanner() {
  return (
    <>
      <section className="promo-hero">
        <div className="promo-left">
          <span className="promo-badge">Up to ₹2,100 off</span>

          <h1 className="promo-title">RO water purifier</h1>
          <p className="promo-subtitle">
            Needs no service for 2 years
          </p>

          <button className="promo-btn">Buy now</button>
        </div>

        <div className="promo-right">
          <img
            src={RO}
            alt="RO Water Purifier"
            className="promo-human"
          />
        </div>
      </section>

      <style>{`
        /* ===== DESKTOP (UNCHANGED) ===== */
        .promo-hero {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 32px;
          align-items: center;
          background: #f5f3ef;
          border-radius: 16px;
          padding: 40px;
          margin: 32px 0;
        }

        .promo-left {
          max-width: 520px;
        }

        .promo-badge {
          background: #1f7a4f;
          color: #fff;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 16px;
        }

        .promo-title {
          font-size: 42px;
          font-weight: 800;
          margin: 0 0 12px;
          color: #111;
        }

        .promo-subtitle {
          font-size: 18px;
          color: #555;
          margin-bottom: 24px;
        }

        .promo-btn {
          background: #00ff48;
          border: none;
          padding: 14px 28px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        .promo-right {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .promo-human {
          max-height: 280px;
          border-radius: 12px;
          object-fit: cover;
        }

        /* ===== MOBILE FIX ONLY ===== */
        @media (max-width: 768px) {
          .promo-hero {
            grid-template-columns: 1fr;
            padding: 20px;
            gap: 16px;
            text-align: center;
            border-radius: 14px;
          }

          .promo-left {
            max-width: 100%;
          }

          .promo-badge {
            font-size: 12px;
            margin-bottom: 10px;
          }

          .promo-title {
            font-size: 22px;
            line-height: 1.2;
          }

          .promo-subtitle {
            font-size: 14px;
            margin-bottom: 16px;
          }

          .promo-btn {
            width: 100%;
            padding: 12px;
            font-size: 15px;
            border-radius: 8px;
          }

          .promo-right {
            margin-top: 8px;
          }

          .promo-human {
            width: 100%;
            max-height: 200px;
            border-radius: 12px;
          }
        }
      `}</style>
    </>
  );
}
