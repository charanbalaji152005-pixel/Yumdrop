import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  Check,
  ArrowRight,
  Crown,
  Sparkles,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { offersData } from '../data/offers';
import { assetUrl } from '../utils/assetUrl';

export default function Cart() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    isFreeDelivery,
    packagingFee,
    taxes,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponDiscount,
    totalDiscount,
    finalPayable,
    itemsCount
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', backgroundColor: '#FFFFFF' }}>
        <div style={{ textAlign: 'center', maxWidth: '420px' }}>
          <img
            src={assetUrl("/images/6ef07bda-b707-48ea-9b14-2594071593d1_Biryani.png")}
            alt="Empty Cart"
            style={{ width: '140px', margin: '0 auto 20px' }}
          />
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#202823', marginBottom: '8px' }}>
            Your Cart is Hungry!
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#5E6962', lineHeight: 1.5, marginBottom: '28px' }}>
            Explore delicious handcrafted biryanis, sourdough pizzas, wok noodles, and desserts ready to drop at your doorstep.
          </p>
          <button onClick={() => navigate('/restaurants')} className="btn-primary" style={{ padding: '14px 32px' }}>
            <span>Explore Restaurants</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FCF9', paddingBottom: '90px', paddingTop: '36px' }}>
      <div className="container-wide">
        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.88rem',
              fontWeight: 700,
              color: '#5E6962',
              marginBottom: '12px'
            }}
          >
            <ArrowLeft size={16} />
            <span>Continue Browsing</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#202823' }}>
              Your Feast Cart ({itemsCount} {itemsCount === 1 ? 'item' : 'items'})
            </h1>
            <button
              onClick={clearCart}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#F04438'
              }}
            >
              <Trash2 size={15} />
              <span>Clear Cart</span>
            </button>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'flex-start'
          }}
        >
          {/* Left Column: Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cartItems.map(item => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '20px',
                  border: '1px solid #EAF0EC',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '74px', height: '74px', borderRadius: '14px', objectFit: 'cover' }}
                />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className={`diet-badge ${item.isVeg ? 'veg' : 'non-veg'}`}>
                      <span className="diet-dot" />
                    </span>
                    <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#202823' }}>
                      {item.name}
                    </h3>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#5E6962', marginTop: '2px' }}>
                    {item.restaurantName}
                  </div>
                  <div style={{ fontSize: '1.08rem', fontWeight: 900, color: '#087C45', marginTop: '6px' }}>
                    ₹{item.price * item.quantity}
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#9CA3AF', marginLeft: '6px' }}>
                      (₹{item.price} each)
                    </span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#EAF7EF',
                    borderRadius: '9999px',
                    padding: '3px',
                    border: '1.5px solid #087C45'
                  }}
                >
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#087C45',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Minus size={13} strokeWidth={3} />
                  </button>
                  <span style={{ padding: '0 12px', fontSize: '0.92rem', fontWeight: 800, color: '#087C45' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#087C45',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Plus size={13} strokeWidth={3} />
                  </button>
                </div>
              </div>
            ))}

          </div>

          {/* Right Column: Coupon & Bill Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Coupon Application Box */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid #EAF0EC',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
              }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#202823', marginBottom: '14px' }}>
                Offers & Coupons
              </h3>

              {appliedCoupon ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: '#EAF7EF',
                    borderRadius: '14px',
                    border: '1.5px dashed #087C45'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Tag size={18} color="#087C45" />
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#087C45' }}>
                        {appliedCoupon.code} Applied!
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#064E35' }}>
                        You saved ₹{couponDiscount}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F04438' }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '10px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexGrow: 1,
                      backgroundColor: '#F6FCF8',
                      borderRadius: '12px',
                      border: '1px solid #D6E4DB',
                      padding: '10px 14px'
                    }}
                  >
                    <Tag size={18} color="#087C45" style={{ marginRight: '8px' }} />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Enter promo code (e.g. YUMDROP50)"
                      style={{
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        width: '100%',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        textTransform: 'uppercase'
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ borderRadius: '12px', padding: '0 20px', fontSize: '0.88rem' }}
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Quick Coupon suggestions */}
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {offersData.slice(0, 3).map(off => (
                  <button
                    key={off.id}
                    onClick={() => applyCoupon(off.code)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#F6FCF8',
                      border: '1px dashed #D6E4DB',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#087C45',
                      cursor: 'pointer'
                    }}
                  >
                    {off.code}
                  </button>
                ))}
              </div>
            </div>

            {/* Bill Summary */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid #EAF0EC',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
              }}
            >
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#202823', marginBottom: '16px' }}>
                Bill Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', color: '#5E6962' }}>
                  <span>Item Subtotal</span>
                  <span style={{ fontWeight: 700, color: '#202823' }}>₹{subtotal}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', color: '#5E6962' }}>
                  <span>Delivery Partner Fee</span>
                  <span>
                    {isFreeDelivery ? (
                      <span style={{ color: '#087C45', fontWeight: 800 }}>FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', color: '#5E6962' }}>
                  <span>Restaurant Packaging & Eco Charges</span>
                  <span>₹{packagingFee}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', color: '#5E6962' }}>
                  <span>Govt. Taxes (5% GST)</span>
                  <span>₹{taxes}</span>
                </div>

                {couponDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', color: '#087C45', fontWeight: 800 }}>
                    <span>Coupon Discount ({appliedCoupon?.code})</span>
                    <span>-₹{couponDiscount}</span>
                  </div>
                )}

                <div
                  style={{
                    borderTop: '1.5px dashed #D6E4DB',
                    paddingTop: '16px',
                    marginTop: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline'
                  }}
                >
                  <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#202823' }}>
                    Total Amount
                  </span>
                  <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#087C45' }}>
                    ₹{finalPayable}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => navigate('/checkout')}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  marginTop: '24px',
                  justifyContent: 'space-between'
                }}
              >
                <span>Proceed to Delivery & Checkout</span>
                <ArrowRight size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.78rem', color: '#5E6962', marginTop: '12px' }}>
                <ShieldCheck size={14} color="#087C45" />
                <span>Safe & Contactless Delivery Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
