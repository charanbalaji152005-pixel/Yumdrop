import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Tag, Check, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartDrawer() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    isFreeDelivery,
    packagingFee,
    taxes,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponDiscount,
    goldSavings,
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

  const handleProceedToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(6, 78, 53, 0.45)',
            backdropFilter: 'blur(5px)'
          }}
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="cart-drawer-content"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '440px',
            maxWidth: '100vw',
            backgroundColor: '#FFFFFF',
            boxShadow: '-8px 0 36px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 10000
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '20px 24px',
              borderBottom: '1px solid #EAF0EC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#FAFCFA'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#EAF7EF',
                  color: '#087C45',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ShoppingBag size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#202823' }}>Your Cart</h3>
                <p style={{ fontSize: '0.82rem', color: '#5E6962' }}>{itemsCount} {itemsCount === 1 ? 'item' : 'items'} selected</p>
              </div>
            </div>

            <button
              onClick={closeCart}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#F0F4F2',
                color: '#5E6962',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart Items List */}
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px 24px' }}>
            {cartItems.length === 0 ? (
              <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                <img
                  src="/images/6ef07bda-b707-48ea-9b14-2594071593d1_Biryani.png"
                  alt="Empty Cart"
                  style={{ width: '120px', margin: '0 auto 16px', opacity: 0.8 }}
                />
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#202823', marginBottom: '6px' }}>
                  Your cart is empty!
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#5E6962', marginBottom: '20px' }}>
                  Good food is always just a drop away. Add your cravings now!
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/restaurants');
                  }}
                  className="btn-primary"
                >
                  Explore Restaurants
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {cartItems.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: '14px',
                      border: '1px solid #EAF0EC',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className={`diet-badge ${item.isVeg ? 'veg' : 'non-veg'}`}>
                          <span className="diet-dot" />
                        </span>
                        <h5 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#202823', lineHeight: 1.3 }}>
                          {item.name}
                        </h5>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#5E6962', marginTop: '2px' }}>
                        {item.restaurantName}
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#087C45', marginTop: '4px' }}>
                        ₹{item.price * item.quantity}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#EAF7EF',
                        borderRadius: '9999px',
                        padding: '2px',
                        border: '1px solid #087C45'
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: '#087C45',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Minus size={12} strokeWidth={3} />
                      </button>
                      <span style={{ padding: '0 8px', fontSize: '0.85rem', fontWeight: 800, color: '#087C45' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: '#087C45',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Plus size={12} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Coupon Code Input */}
                <div style={{ marginTop: '8px' }}>
                  {appliedCoupon ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        backgroundColor: '#EAF7EF',
                        borderRadius: '12px',
                        border: '1px dashed #087C45'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Tag size={16} color="#087C45" />
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#087C45' }}>
                            {appliedCoupon.code} Applied
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#064E35' }}>
                            You save ₹{couponDiscount}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={removeCoupon}
                        style={{ fontSize: '0.8rem', fontWeight: 700, color: '#F04438' }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexGrow: 1,
                          backgroundColor: '#F6FCF8',
                          borderRadius: '10px',
                          border: '1px solid #D6E4DB',
                          padding: '8px 12px'
                        }}
                      >
                        <Tag size={16} color="#5E6962" style={{ marginRight: '8px' }} />
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          placeholder="Enter coupon (e.g. YUMDROP50)"
                          style={{
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            width: '100%',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            textTransform: 'uppercase'
                          }}
                        />
                      </div>
                      <button
                        type="submit"
                        style={{
                          backgroundColor: '#087C45',
                          color: '#fff',
                          padding: '0 16px',
                          borderRadius: '10px',
                          fontSize: '0.82rem',
                          fontWeight: 700
                        }}
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>

                {/* Bill Details Breakdown */}
                <div
                  style={{
                    backgroundColor: '#FAFCFA',
                    borderRadius: '14px',
                    padding: '16px',
                    border: '1px solid #EAF0EC',
                    marginTop: '8px'
                  }}
                >
                  <h6 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#202823', marginBottom: '12px' }}>
                    Bill Summary
                  </h6>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#5E6962', marginBottom: '8px' }}>
                    <span>Item Total</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#5E6962', marginBottom: '8px' }}>
                    <span>Delivery Fee</span>
                    <span>{isFreeDelivery ? <span style={{ color: '#087C45', fontWeight: 700 }}>FREE</span> : `₹${deliveryFee}`}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#5E6962', marginBottom: '8px' }}>
                    <span>Govt Taxes & Packaging</span>
                    <span>₹{taxes + packagingFee}</span>
                  </div>

                  {couponDiscount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#087C45', fontWeight: 700, marginBottom: '8px' }}>
                      <span>Coupon Discount</span>
                      <span>-₹{couponDiscount}</span>
                    </div>
                  )}

                  <div
                    style={{
                      borderTop: '1px dashed #D6E4DB',
                      paddingTop: '10px',
                      marginTop: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      color: '#202823'
                    }}
                  >
                    <span>To Pay</span>
                    <span>₹{finalPayable}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout CTA */}
          {cartItems.length > 0 && (
            <div
              style={{
                padding: '20px 24px',
                borderTop: '1px solid #EAF0EC',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 -4px 18px rgba(0,0,0,0.04)'
              }}
            >
              <button
                onClick={handleProceedToCheckout}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  fontSize: '1.02rem',
                  fontWeight: 800,
                  justifyContent: 'space-between'
                }}
              >
                <span>₹{finalPayable} • Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

