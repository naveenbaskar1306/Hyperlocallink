// src/components/PromoCarousel.jsx
import React from 'react';

// Import local images
import sofaImg from '../assets/promos/sofa.jpg';
import weddingImg from '../assets/promos/clean.jpg';
import paintingImg from '../assets/promos/painting.jpg';

const promos = [
  { title: 'Sofa deep cleaning starting at ₹569', img: sofaImg },
  { title: 'Home Clean packages upto 25% off', img: weddingImg },
  { title: 'Home painting & waterproofing', img: paintingImg }
];

export default function PromoCarousel() {
  return (
    <div className="container">
      <h3 className="section-title">Offers & discounts</h3>

      <div className="promo-row" role="list">
        {promos.map((p) => (
          <div key={p.title} className="promo-card" role="listitem">
            <img
              src={p.img}
              alt={p.title}
              style={{
                width: 160,
                height: 100,
                objectFit: 'cover',
                borderRadius: 8
              }}
            />
            <div>
              <h4 style={{ margin: 0 }}>{p.title}</h4>
              <div style={{ marginTop: 8 }}>
                <a className="btn" href="#">
                  Book now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
