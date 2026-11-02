import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Sparkles, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OfferCard({ offer }) {
  const { applyCoupon, showToast, appliedCoupon } = useCart();
  const [copied, setCopied] = useState(false);
  const [showConditions, setShowConditions] = useState(false);

  const isApplied = appliedCoupon?.code === offer.code;

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    showToast(`Coupon code ${offer.code} copied to clipboard! 📋`);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleApply = (e) => {
    e.stopPropagation();
    applyCoupon(offer.code);
  };

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px dashed #D6E4DB',
        overflow: 'hidden',
        boxShadow: '0 4px 18px rgba(32, 40, 35, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Top Banner Tag */}
      <div
        style={{
          backgroundColor: offer.isGoldOnly ? '#F59E0B' : (offer.color || '#087C45'),
          color: '#FFFFFF',
          padding: '8px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          fontWeight: 800,
          letterSpacing: '0.6px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Tag size={14} />
          {offer.badge}
        </div>
        <span>Valid till {offer.validTill}</span>
      </div>

      {/* Main Content Body */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#202823', marginBottom: '6px' }}>
          {offer.title}
        </h4>

        <p style={{ fontSize: '0.86rem', color: '#5E6962', lineHeight: 1.45, marginBottom: '16px' }}>
          {offer.description}
        </p>

        {/* Coupon Code Block */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F6FCF8',
            border: '1px solid #D6E4DB',
            borderRadius: '12px',
            padding: '10px 14px',
            marginBottom: '16px'
          }}
        >
          <div>
            <span style={{ fontSize: '10px', color: '#5E6962', textTransform: 'uppercase', fontWeight: 700 }}>
              Coupon Code
            </span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#087C45', letterSpacing: '1px' }}>
              {offer.code}
            </div>
          </div>

          <button
            onClick={handleCopy}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: copied ? '#EAF7EF' : '#FFFFFF',
              color: copied ? '#087C45' : '#202823',
              border: '1px solid #D6E4DB',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {copied ? (
              <>
                <Check size={14} color="#087C45" />
                Copied!
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Applicable conditions toggle */}
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => setShowConditions(!showConditions)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.8rem',
              color: '#087C45',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <span>{showConditions ? 'Hide Terms & Conditions' : 'View Terms & Conditions'}</span>
            {showConditions ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showConditions && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{
                marginTop: '8px',
                paddingLeft: '18px',
                fontSize: '0.78rem',
                color: '#5E6962',
                lineHeight: 1.5
              }}
            >
              {offer.conditions.map((cond, idx) => (
                <li key={idx} style={{ marginBottom: '3px' }}>{cond}</li>
              ))}
            </motion.ul>
          )}
        </div>

        {/* Apply Offer Button */}
        <button
          onClick={handleApply}
          disabled={isApplied}
          className={isApplied ? "btn-secondary" : "btn-primary"}
          style={{
            width: '100%',
            padding: '10px 16px',
            fontSize: '0.9rem',
            fontWeight: 800,
            marginTop: 'auto'
          }}
        >
          {isApplied ? 'Offer Already Applied' : 'Apply Offer to Cart'}
        </button>
      </div>
    </motion.div>
  );
}

