import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Percent, Sparkles, Tag, Crown, Check, ArrowRight } from 'lucide-react';
import { offersData } from '../data/offers';
import OfferCard from '../components/OfferCard';

export default function Offers() {
  const [selectedTab, setSelectedTab] = useState('All');

  const categories = ['All', 'Featured', 'Combos', 'Delivery', 'Mega Deals', 'Welcome', 'Weekend'];

  const filteredOffers = selectedTab === 'All'
    ? offersData
    : offersData.filter(o => o.category.toLowerCase() === selectedTab.toLowerCase());

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', paddingBottom: '80px' }}>
      {/* Top Promotional Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #087C45 0%, #064E35 100%)',
          color: '#FFFFFF',
          padding: '48px 0 36px'
        }}
      >
        <div className="container-wide">
          <div style={{ maxWidth: '640px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                padding: '4px 14px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                color: '#A3D4B6'
              }}
            >
              <Percent size={14} />
              EXCLUSIVE PROMO VAULT
            </div>
            <h1 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', fontWeight: 900, marginTop: '14px', marginBottom: '10px' }}>
              Deals, Coupons & Discounts
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#A3D4B6', lineHeight: 1.55 }}>
              Satisfy your cravings without denting your wallet. Copy coupon codes with one tap or directly apply them to your active cart.
            </p>
          </div>
        </div>
      </div>

      <div className="container-wide" style={{ marginTop: '36px' }}>
        {/* Category Tab Filters */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '8px',
            marginBottom: '32px',
            borderBottom: '1px solid #EAF0EC'
          }}
        >
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTab(cat)}
              className={`filter-pill ${selectedTab === cat ? 'active' : ''}`}
            >
              <span>{cat === 'All' ? 'All Offers' : `${cat} Deals`}</span>
            </button>
          ))}
        </div>

        {/* Offers Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '28px'
          }}
        >
          {filteredOffers.map(offer => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </div>
  );
}

