import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Crown,
  Sparkles,
  CheckCircle2,
  Truck,
  Percent,
  Clock,
  Gift,
  ShieldCheck,
  Zap,
  Calculator,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import GoldMembershipCard from '../components/GoldMembershipCard';

const goldPlans = [
  {
    id: "plan-monthly",
    name: "Monthly GOLD",
    duration: "1 Month Validity",
    durationMonths: 1,
    price: 149,
    billingNote: "/ month",
    savingsNote: "Save approx ₹650 / month",
    badge: "100% FREE DELIVERY",
    features: [
      "100% Unlimited FREE Delivery on every order (Save ₹35+ per delivery)",
      "Extra 15% VIP discount auto-applied on all orders",
      "Unlock GOLDBONUS (Extra ₹100 OFF) & GOLDEXTRA coupons",
      "Priority kitchen prep & express courier dispatch",
      "No surge charges during rain or peak lunch/dinner hours"
    ]
  },
  {
    id: "plan-quarterly",
    name: "Quarterly GOLD",
    duration: "3 Months Validity",
    durationMonths: 3,
    price: 349,
    billingNote: "for 3 months (₹116/mo)",
    savingsNote: "Save approx ₹2,200 over 3 months",
    badge: "MOST POPULAR • BEST DEAL",
    features: [
      "Unlimited FREE Delivery on all orders across Bengaluru",
      "Extra 25% exclusive restaurant promotional discounts",
      "VIP Buy-1-Get-1-Free (BOGO) gourmet dining offers",
      "Unlock GOLDFEAST (40% OFF up to ₹200) & GOLDEXTRA (₹150 OFF)",
      "Top priority express fleet routing with dedicated captains",
      "Early bird VIP access to weekend and festival food sales"
    ]
  },
  {
    id: "plan-annual",
    name: "Annual GOLD",
    duration: "12 Months Validity",
    durationMonths: 12,
    price: 999,
    billingNote: "for 1 full year (₹83/mo)",
    savingsNote: "Save approx ₹9,500 annually",
    badge: "VIP ALL-ACCESS",
    features: [
      "365 Days Unlimited Zero Delivery Fees (Save ₹4,000+)",
      "Up to 40% exclusive restaurant mega offers & discounts",
      "Flat ₹300 cash gift coupon on your Birthday feast",
      "All VIP GOLD coupons unlocked: GOLDEXTRA, GOLDFEAST, GOLDBONUS",
      "Secret VIP menu tasting invitations & chef specials",
      "Dedicated 24/7 personal foodie concierge assistance"
    ]
  }
];

export default function GoldMembership() {
  const { user, activateGold } = useAuth();
  const { showToast } = useCart();
  const [selectedPlan, setSelectedPlan] = useState(goldPlans[1]); // Default quarterly
  const [ordersPerWeek, setOrdersPerWeek] = useState(3);

  // Interactive savings calculator: Free delivery (₹35) + Extra offers & VIP discounts (₹85)
  const deliverySavingsPerOrder = 35;
  const offersSavingsPerOrder = 85;
  const totalSavingsPerOrder = 120;
  const totalMonthlyOrders = ordersPerWeek * 4;
  const monthlyDeliverySavings = totalMonthlyOrders * deliverySavingsPerOrder;
  const monthlyOffersSavings = totalMonthlyOrders * offersSavingsPerOrder;
  const monthlySavings = totalMonthlyOrders * totalSavingsPerOrder;
  const annualSavings = monthlySavings * 12;

  const handleJoin = (plan) => {
    activateGold(plan.name, plan.durationMonths);
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#D4AF37', '#F59E0B', '#087C45', '#FFFFFF']
      });
    } catch (e) {
      console.error(e);
    }
    showToast(`You have successfully unlocked ${plan.name}! Welcome to VIP dining! 👑`, 'success');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', paddingBottom: '90px' }}>
      {/* 1. CINEMATIC GOLD HERO SECTION */}
      <section
        style={{
          background: 'linear-gradient(135deg, #064E35 0%, #087C45 45%, #053b28 100%)',
          color: '#FFFFFF',
          padding: '64px 0 80px',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '2px solid rgba(212, 175, 55, 0.4)'
        }}
      >
        {/* Floating golden particles background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 75% 30%, rgba(212, 175, 55, 0.25) 0%, rgba(6, 78, 53, 0) 65%)',
            pointerEvents: 'none'
          }}
        />

        <div className="container-wide" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              alignItems: 'center',
              gap: '48px'
            }}
          >
            {/* Left Headline & VIP Pitch */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(212, 175, 55, 0.25)',
                  border: '1px solid #D4AF37',
                  borderRadius: '9999px',
                  padding: '6px 16px',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#FFD700',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '20px'
                }}
              >
                <Crown size={16} fill="#FFD700" />
                VIP MEMBERSHIP PROGRAM
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                  fontWeight: 900,
                  lineHeight: 1.15,
                  marginBottom: '16px'
                }}
              >
                Upgrade Your Hunger. <br />
                <span className="shimmer-gold">Unlock GOLD.</span>
              </h1>

              <p
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#FFF7DC',
                  marginBottom: '10px'
                }}
              >
                100% Free Delivery • Extra Offers • VIP Savings
              </p>

              <p
                style={{
                  fontSize: '1rem',
                  color: '#A3D4B6',
                  lineHeight: 1.6,
                  maxWidth: '520px',
                  marginBottom: '32px'
                }}
              >
                YumDrop GOLD is engineered for true food lovers. Zero delivery fees on all orders, extra 15% VIP discount auto-applied at checkout, up to 40% exclusive restaurant extra offers, and priority express dispatch.
              </p>

              {user?.isGold ? (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'linear-gradient(135deg, #FFF7DC 0%, #FDF3C7 100%)',
                    color: '#92400E',
                    padding: '14px 24px',
                    borderRadius: '16px',
                    border: '1.5px solid #F59E0B',
                    boxShadow: '0 8px 24px rgba(212, 175, 55, 0.35)'
                  }}
                >
                  <Crown size={24} color="#D97706" fill="#D97706" />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem' }}>Active Member: {user.goldPlan}</div>
                    <div style={{ fontSize: '0.8rem' }}>Enjoy your complimentary zero delivery & VIP savings!</div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleJoin(selectedPlan)}
                    className="btn-gold"
                    style={{ padding: '16px 36px', fontSize: '1.05rem' }}
                  >
                    <span>Join GOLD for ₹{selectedPlan.price}</span>
                    <ArrowRight size={18} />
                  </button>
                  <span style={{ fontSize: '0.85rem', color: '#A3D4B6' }}>
                    Configurable sample membership offer
                  </span>
                </div>
              )}
            </motion.div>

            {/* Right: 3D ANIMATED GOLDEN MEMBERSHIP CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div
                style={{
                  width: 'min(420px, 90vw)',
                  height: '260px',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 35%, #B45309 70%, #F59E0B 100%)',
                  padding: '28px',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.4), 0 0 35px rgba(212, 175, 55, 0.45)',
                  border: '2px solid rgba(255, 255, 255, 0.6)',
                  color: '#1a1600',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Diagonal Card Shimmer Effect */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.45) 50%, transparent 60%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Card Top Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#064E35', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                      <Crown size={20} fill="#FFD700" color="#FFD700" />
                    </div>
                    <div>
                      <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.5px' }}>YumDrop</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 900, marginLeft: '4px', letterSpacing: '1px' }}>GOLD</span>
                    </div>
                  </div>

                  <span style={{ fontSize: '11px', fontWeight: 900, backgroundColor: 'rgba(0,0,0,0.15)', padding: '3px 10px', borderRadius: '9999px', letterSpacing: '0.5px' }}>
                    VIP PASS
                  </span>
                </div>

                {/* Card Chip & Number */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ width: '42px', height: '30px', borderRadius: '6px', background: 'linear-gradient(135deg, #FFE899 0%, #D4AF37 100%)', border: '1px solid #B45309', marginBottom: '8px' }} />
                  <div style={{ fontSize: '1.15rem', fontWeight: 900, letterSpacing: '2px', fontFamily: 'monospace' }}>
                    YD-GOLD-8492-7103
                  </div>
                </div>

                {/* Card Bottom Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 2 }}>
                  <div>
                    <span style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', opacity: 0.8 }}>MEMBER NAME</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: 900 }}>{user ? user.name : 'VIP Foodie'}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', opacity: 0.8 }}>PRIVILEGE</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: 900 }}>UNLIMITED ACCESS</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. MEMBERSHIP PLANS CARDS */}
      <section style={{ padding: '64px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container-wide">
          <div className="section-header" style={{ textAlign: 'center', justifyContent: 'center', marginBottom: '40px' }}>
            <div style={{ maxWidth: '600px' }}>
              <h2 className="section-title">Select Your GOLD Membership Plan</h2>
              <p className="section-subtitle">
                Flexible options tailored for occasional foodies to daily epicureans. Easily upgrade or cancel anytime.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px'
            }}
          >
            {goldPlans.map(plan => (
              <GoldMembershipCard
                key={plan.id}
                plan={plan}
                isSelected={selectedPlan.id === plan.id}
                onSelect={(p) => setSelectedPlan(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SAVINGS CALCULATOR */}
      <section style={{ padding: '50px 0', backgroundColor: '#F8FCF9', borderTop: '1px solid #EAF0EC', borderBottom: '1px solid #EAF0EC' }}>
        <div className="container-wide">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '40px 36px',
              border: '1.5px solid #D6E4DB',
              boxShadow: '0 8px 30px rgba(8, 124, 69, 0.06)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              alignItems: 'center',
              gap: '36px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Calculator size={20} color="#087C45" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#087C45', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  Interactive Simulator
                </span>
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#202823', lineHeight: 1.25 }}>
                Calculate How Much You Save With GOLD
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#5E6962', marginTop: '6px', marginBottom: '24px' }}>
                Move the slider based on how often you order takeout or meals each week.
              </p>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 700, fontSize: '0.95rem' }}>
                  <span>Orders per week:</span>
                  <span style={{ color: '#087C45', fontSize: '1.15rem' }}>{ordersPerWeek} orders / week</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={ordersPerWeek}
                  onChange={(e) => setOrdersPerWeek(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: '#087C45',
                    cursor: 'pointer',
                    height: '8px'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#5E6962', marginTop: '4px' }}>
                  <span>1 order</span>
                  <span>7 orders (Daily)</span>
                  <span>14 orders (Lunch & Dinner)</span>
                </div>
              </div>
            </div>

            {/* Calculated Results Box */}
            <div
              style={{
                background: 'linear-gradient(135deg, #064E35 0%, #087C45 100%)',
                color: '#FFFFFF',
                borderRadius: '20px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '11px', color: '#A3D4B6', textTransform: 'uppercase', fontWeight: 800 }}>
                    🚚 Free Delivery
                  </span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#6EE7B7' }}>
                    ₹{monthlyDeliverySavings.toLocaleString()}
                  </div>
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '11px', color: '#A3D4B6', textTransform: 'uppercase', fontWeight: 800 }}>
                    🎁 Extra Offers
                  </span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FCD34D' }}>
                    ₹{monthlyOffersSavings.toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '12px', color: '#A3D4B6', textTransform: 'uppercase', fontWeight: 800 }}>
                  Total Estimated Monthly Savings
                </span>
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#FFD700', lineHeight: 1.1 }}>
                  ₹{monthlySavings.toLocaleString()}
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '14px' }}>
                <span style={{ fontSize: '12px', color: '#A3D4B6', textTransform: 'uppercase', fontWeight: 800 }}>
                  Estimated Annual Savings
                </span>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF' }}>
                  ₹{annualSavings.toLocaleString()}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#A3D4B6', marginTop: '4px' }}>
                  Includes 100% free delivery fee waivers (₹35/order) + extra 15% VIP discount & exclusive GOLD offers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEVEN GOLD BENEFITS BREAKDOWN */}
      <section style={{ padding: '60px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container-wide">
          <div className="section-header" style={{ textAlign: 'center', justifyContent: 'center', marginBottom: '40px' }}>
            <div style={{ maxWidth: '620px' }}>
              <h2 className="section-title">All 7 YumDrop GOLD Privileges</h2>
              <p className="section-subtitle">
                Everything you need to turn everyday food ordering into a Michelin-level delight.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            {[
              {
                icon: <Truck size={24} color="#087C45" />,
                title: "Free Delivery on Eligible Orders",
                desc: "No surge pricing and zero delivery fees on orders above ₹199 from thousands of partner restaurants."
              },
              {
                icon: <Percent size={24} color="#087C45" />,
                title: "Exclusive Restaurant Discounts",
                desc: "Get an additional 10% to 40% instant bill reduction automatically deducted in your cart."
              },
              {
                icon: <Sparkles size={24} color="#087C45" />,
                title: "Special GOLD-Only Coupons",
                desc: "Unlock VIP discount codes like GOLDBONUS that regular users cannot access."
              },
              {
                icon: <Zap size={24} color="#087C45" />,
                title: "Priority Delivery Fleet",
                desc: "Your meal jumps to top dispatch queue with our fastest rated delivery captains."
              },
              {
                icon: <Crown size={24} color="#087C45" />,
                title: "Exclusive Food Offers",
                desc: "Access secret chef specials, pre-release menus, and tasting flights only available to members."
              },
              {
                icon: <Clock size={24} color="#087C45" />,
                title: "Early Access Promotions",
                desc: "Shop festival flash sales and holiday weekend deals 2 hours before the public."
              },
              {
                icon: <Gift size={24} color="#087C45" />,
                title: "Birthday Rewards & Surprises",
                desc: "Receive celebratory dessert vouchers and dining cashback during your birthday month."
              }
            ].map((ben, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '24px',
                  border: '1.5px solid #EAF0EC',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    backgroundColor: '#EAF7EF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {ben.icon}
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#202823' }}>{ben.title}</h4>
                <p style={{ fontSize: '0.86rem', color: '#5E6962', lineHeight: 1.5 }}>{ben.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

