// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * Modern responsive footer (drop-in replacement).
 * - Uses react-router-dom <Link> for internal navigation.
 * - Keep external links as <a>.
 * - Self-contained styles (move to CSS if you prefer).
 */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      style={{
        background:
          "linear-gradient(180deg, rgba(15,23,42,0.02) 0%, rgba(11,114,185,0.02) 100%)",
        borderTop: "1px solid rgba(15,23,42,0.04)",
        padding: "48px 20px",
        marginTop: 48,
      }}
    >
      <style>{`
        .hl-footer-inner { 
          max-width: 1200px; 
          margin: 0 auto; 
          display: grid; 
          grid-template-columns: 1.4fr 1fr 1fr 1fr; 
          gap: 28px; 
          align-items: start;
        }

        @media (max-width: 980px) {
          .hl-footer-inner {
            grid-template-columns: 1fr;
          }
        }

        .hl-brand {
          background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 6px 14px rgba(2,6,23,0.04);
          border: 1px solid rgba(11,72,118,0.03);
        }

        .hl-logo {
          width: 64px;
          height: 64px;
          border-radius: 12px;
          background: linear-gradient(135deg,#0b72b9,#0e9bd7);
          color: white;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 20px;
          box-shadow: 0 6px 18px rgba(11,114,185,0.12);
        }

        .hl-h1 { font-size: 18px; font-weight: 700; color: #0b1630; }
        .hl-sub { color: #64748b; font-size: 13px; margin-top: 4px; }

        .hl-desc { margin-top: 12px; color: #334155; line-height: 1.5; font-size: 14px; }

        .hl-news {
          display:flex;
          gap:10px;
          margin-top: 14px;
        }

        .hl-news input {
          flex:1;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid rgba(14,76,120,0.08);
          outline: none;
          font-size: 14px;
          background: #fff;
          transition: box-shadow .18s, transform .12s;
        }
        .hl-news input:focus {
          box-shadow: 0 6px 18px rgba(11,114,185,0.12);
          transform: translateY(-1px);
        }

        .hl-news button {
          padding: 10px 14px;
          border-radius: 10px;
          background: linear-gradient(180deg,#0b72b9,#0e9bd7);
          border: none;
          color: white;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(11,114,185,0.12);
        }

        .hl-col h4 { font-size: 15px; margin-bottom: 12px; color: #0f172a; }
        .hl-col a, .hl-col .router-link { display:block; margin-bottom:10px; color:#475569; text-decoration:none; font-size:14px; }
        .hl-col a:hover, .hl-col .router-link:hover { color: #0b72b9; transform: translateX(4px); transition: all .14s; }

        .hl-social {
          display:flex;
          gap:10px;
          margin-top:8px;
        }

        .hl-social a {
          width:44px;
          height:44px;
          border-radius:10px;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          background:white;
          border:1px solid rgba(15,23,42,0.04);
          box-shadow: 0 6px 16px rgba(2,6,23,0.04);
          transition: transform .14s, box-shadow .14s, background .14s;
        }
        .hl-social a:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 14px 34px rgba(2,6,23,0.08);
        }

        .hl-bottom {
          max-width:1200px;
          margin: 28px auto 0;
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:12px;
          flex-wrap:wrap;
          padding-top:18px;
          border-top:1px solid rgba(15,23,42,0.03);
        }

        .hl-small { color: #64748b; font-size:13px; }
      `}</style>

      <div className="hl-footer-inner">
        {/* Brand + newsletter */}
        <div className="hl-brand" aria-hidden="false">
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div className="hl-logo" aria-hidden="true">HL</div>
            <div>
              <div className="hl-h1">HYPERLOCAL</div>
              <div className="hl-sub">Home services — near you</div>
            </div>
          </div>

          <p className="hl-desc">
            Local, reliable professionals for home repairs, cleaning, and beauty services.
            Trusted by thousands of customers in your city.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const email = form.elements["email"]?.value?.trim();
              if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
                alert("Please enter a valid email.");
                return;
              }
              // TODO: connect to API
              alert("Thanks — we'll send deals to " + email);
              form.reset();
            }}
            aria-label="Subscribe to deals"
            style={{ marginTop: 10 }}
          >
            <div className="hl-news">
              <input
                name="email"
                placeholder="Enter your email address"
                aria-label="Email for newsletter"
              />
              <button type="submit">Subscribe</button>
            </div>
            <div style={{ marginTop: 8 }} className="hl-small">
              We respect your privacy — unsubscribe anytime.
            </div>
          </form>
        </div>

        {/* Column: Company */}
        <div className="hl-col" aria-label="Company links">
          <h4>Company</h4>
          <Link to="/about" className="router-link">About us</Link>
          <Link to="/investors" className="router-link">Investor Relations</Link>
          <Link to="/terms" className="router-link">Terms & conditions</Link>
          <Link to="/privacy" className="router-link">Privacy policy</Link>
        </div>

        {/* Column: Customers */}
        <div className="hl-col" aria-label="For customers">
          <h4>For customers</h4>
          <Link to="/Review" className="router-link">Reviews</Link>
          <Link to="/categories" className="router-link">Categories near you</Link>
          <Link to="/contact" className="router-link">Contact us</Link>
          <Link to="/faq" className="router-link">Help & FAQ</Link>
        </div>

        {/* Column: Professionals + Social */}
        <div className="hl-col" aria-label="For professionals and social">
          <h4>For professionals</h4>
          <Link to="/pro/register" className="router-link">Register as a professional</Link>
          <Link to="/pro/resources" className="router-link">Partner resources</Link>
          <Link to="/pro/pricing" className="router-link">Pricing & payouts</Link>

          <div style={{ marginTop: 12 }}>
            <h4>Social</h4>
            <div className="hl-social" aria-hidden="false">
              <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" fill="none" stroke="#E1306C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3.2" stroke="#E1306C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="17.5" cy="6.5" r="0.6" fill="#E1306C"/>
                </svg>
              </a>

              <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12a10 10 0 1 0-11.5 9.9V14.9h-2.4v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.18 2.1.18v2.3h-1.2c-1.2 0-1.6.77-1.6 1.6v1.9h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" fill="#1877F2"/>
                </svg>
              </a>

              <a aria-label="Twitter" href="https://twitter.com" target="_blank" rel="noreferrer" title="Twitter">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.3-.8.5-1.6.9-2.5 1.1C18 5 16.6 4.5 15 4.5c-2.2 0-4 1.8-4 4 0 .3 0 .6.1.9C7.7 9 5 7.6 3.2 5.4c-.4.7-.6 1.4-.6 2.2 0 1.4.7 2.6 1.7 3.3-.6 0-1.2-.2-1.7-.4v.1c0 2.1 1.5 3.8 3.4 4.2-.4.1-.8.1-1.2.1-.3 0-.6 0-.9-.1.6 1.9 2.4 3.3 4.5 3.4-1.6 1.3-3.6 2.1-5.8 2.1-.4 0-.7 0-1.1-.1 2.1 1.4 4.6 2.2 7.3 2.2 8.8 0 13.6-7.6 13.6-14.1v-.6c.9-.6 1.6-1.4 2.2-2.3-.8.4-1.7.7-2.6.8z" fill="#1DA1F2"/>
                </svg>
              </a>

              <a aria-label="YouTube" href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23 7.3s-.2-1.6-.8-2.3c-.7-.9-1.5-.9-1.9-1C17.3 3.9 12 3.9 12 3.9s-5.3 0-8.3.1c-.4 0-1.2.1-1.9 1C1.2 5.7 1 7.3 1 7.3S.8 9 .8 10.6v2.8C.8 15 1 16.6 1 16.6s.2 1.6.8 2.3c.7.9 1.6.9 2 1 1.5.3 6.3.3 6.3.3s5 0 7.9-.1c.4 0 1.2-.1 1.9-1 .6-.7.8-2.3.8-2.3s.2-1.9.2-3.5v-2.8C23.2 9 23 7.3 23 7.3z" fill="#FF0000"/>
                  <polygon points="10,15 16,12 10,9" fill="#fff"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hl-bottom" role="note" aria-label="Footer attribution">
        <div className="hl-small">© {year} Hyperlocal — All rights reserved</div>

        <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
          
          <div className="hl-small">Made with ♥ for your city</div>
        </div>
      </div>
    </footer>
  );
}
