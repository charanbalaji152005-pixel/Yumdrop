import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function GoldMembershipCard({ plan, isSelected, onSelect }) {
  const { user, activateGold } = useAuth();
  const { showToast } = useCart();

  const handleJoin = (e) => {
    e.stopPropagation();
    activateGold(plan.name, plan.durationMonths);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F59E0B', '#087C45', '#FFFFFF']
      });
    } catch (e) {
      console.error(e);
    }
    showToast(`Congratulations! You are now a YumDrop GOLD member 🎉`, 'success');
  };

  const isCurrentPlan = user?.isGold && user?.goldPlan === plan.name;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      onClick={() => onSelect(plan)}
      style={{
        borderRadius: '24px',
        padding: '28px 24px',
        background: isSelected
          ? 'linear-gradient(145deg, #064E35 0%, #087C45 50%, #0d5f38 100%)'
          : '#FFFFFF',
        color: isSelected ? '#FFFFFF' : '#202823',
        border: isSelected ? '2px solid #D4AF37' : '1.5px solid #EAF0EC',
        boxShadow: isSelected
          ? '0 20px 40px rgba(8, 124, 69, 0.28), 0 0 25px rgba(212, 175, 55, 0.3)'
          : '0 6px 24px rgba(32, 40, 35, 0.05)',
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Popular or Best Value Badge */}
      {plan.badge && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: 'linear-gradient(135deg, #F59E0B 0%, #D4AF37 100%)',
            color: '#1a1600',
            fontSize: '11px',
            fontWeight: 800,
            padding: '5px 18px',
            borderBottomLeftRadius: '14px',
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Sparkles size={12} fill="#1a1600" />
          {plan.badge}
        </div>
      )}

      {/* Plan Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: isSelected ? 'rgba(212, 175, 55, 0.25)' : '#FFF7DC',
            color: '#D4AF37',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Crown size={22} fill="#D4AF37" />
        </div>
        <div>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{plan.name}</h4>
          <span style={{ fontSize: '0.82rem', opacity: 0.8 }}>{plan.duration}</span>
        </div>
      </div>

      {/* Pricing */}
      <div style={{ margin: '16px 0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{ fontSize: '2.2rem', fontWeight: 900, color: isSelected ? '#FFD700' : '#087C45' }}>
            ₹{plan.price}
          </span>
          <span style={{ fontSize: '0.85rem', opacity: 0.75 }}>
            {plan.billingNote}
          </span>
        </div>
        <p style={{ fontSize: '0.84rem', marginTop: '4px', color: isSelected ? '#A3D4B6' : '#087C45', fontWeight: 700 }}>
          {plan.savingsNote}
        </p>
      </div>

      {/* Features List */}
      <div style={{ flexGrow: 1, marginBottom: '24px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', opacity: 0.75 }}>
          Included Benefits
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {plan.features.map((feature, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: isSelected ? '#D4AF37' : '#EAF7EF',
                  color: isSelected ? '#1a1600' : '#087C45',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Check size={12} strokeWidth={3} />
              </div>
              <span style={{ opacity: 0.95 }}>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleJoin}
        style={{
          width: '100%',
          padding: '13px',
          borderRadius: '9999px',
          fontSize: '0.95rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: isCurrentPlan
            ? '#E5E7EB'
            : isSelected
              ? 'linear-gradient(135deg, #F59E0B 0%, #D4AF37 100%)'
              : 'var(--color-royal-green)',
          color: isCurrentPlan ? '#4B5563' : isSelected ? '#1a1600' : '#FFFFFF',
          boxShadow: isSelected ? '0 6px 20px rgba(212, 175, 55, 0.4)' : 'none',
          cursor: isCurrentPlan ? 'default' : 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        {isCurrentPlan ? (
          <>
            <Check size={16} strokeWidth={3} />
            Current Active Plan
          </>
        ) : (
          <>
            Join GOLD Now
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </motion.div>
  );
}

