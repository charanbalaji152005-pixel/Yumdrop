import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  User,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { user, addOrder } = useAuth();
  const {
    cartItems,
    clearCart,
    subtotal,
    deliveryFee,
    packagingFee,
    taxes,
    couponDiscount,
    goldSavings,
    totalDiscount,
    finalPayable,
    itemsCount,
    showToast
  } = useCart();

  // Address state
  const defaultAddress = user?.addresses?.find(a => a.isDefault) || user?.addresses?.[0] || {
    id: "addr-custom",
    title: "Home",
    address: "Flat 402, Green Glen Layout, Bellandur, Bengaluru",
    landmark: "Near Central Mall"
  };

  const [selectedAddress, setSelectedAddress] = useState(defaultAddress.id);
  const [deliveryInstruction, setDeliveryInstruction] = useState('Leave with guard or call on arrival');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'cod', 'netbanking'
  const [upiId, setUpiId] = useState('arjun@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const primaryRestaurant = {
    id: cartItems[0]?.restaurantId || 'rest-1',
    name: cartItems[0]?.restaurantName || 'Royal Biryani House',
    image: cartItems[0]?.image || '/images/70127abf-d5b0-4856-a439-703e4ee48934_1209174.jpg'
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment authorization & order creation
    await new Promise(resolve => setTimeout(resolve, 1400));

    const orderId = "ORD-" + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      id: orderId,
      date: "Just now",
      restaurant: primaryRestaurant,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        isVeg: item.isVeg,
        image: item.image
      })),
      totalAmount: finalPayable,
      status: "Order Placed",
      currentStage: 1, // 1: Order Placed, 2: Restaurant Confirmed, 3: Food Preparing, 4: Out for Delivery, 5: Delivered
      deliveryAddress: defaultAddress.address,
      paymentMethod: paymentMethod === 'upi' ? 'UPI (Simulated)' : paymentMethod === 'card' ? 'Credit Card (Simulated)' : 'Cash on Delivery',
      deliveryEstimate: "25-30 mins",
      rider: {
        name: "Ramesh Kumar",
        phone: "+91 98450 12345",
        vehicle: "Electric Hero Nyx (KA-01-EQ-4492)",
        rating: 4.9
      }
    };

    addOrder(newOrder);
    clearCart();
    setIsProcessing(false);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#087C45', '#F04438', '#D4AF37', '#FFFFFF']
      });
    } catch (err) {
      console.error(err);
    }

    showToast(`Order #${orderId} placed successfully! 🚀`);
    navigate(`/orders?active=${orderId}`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FCF9', padding: '40px 0 90px' }}>
      <div className="container-wide">
        {/* Page Title */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#202823' }}>
            Checkout & Delivery
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#5E6962', marginTop: '4px' }}>
            Verify your address and select a simulated payment method.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              alignItems: 'flex-start'
            }}
          >
            {/* Left Column: Address & Payment Selection */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* 1. Delivery Address Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '24px',
                  border: '1px solid #EAF0EC',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#EAF7EF', color: '#087C45', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={18} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#202823' }}>
                    Delivery Address
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {user?.addresses?.map(addr => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddress(addr.id)}
                      style={{
                        padding: '16px',
                        borderRadius: '14px',
                        border: selectedAddress === addr.id ? '2px solid #087C45' : '1px solid #EAF0EC',
                        backgroundColor: selectedAddress === addr.id ? '#F6FCF8' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress === addr.id}
                        onChange={() => setSelectedAddress(addr.id)}
                        style={{ accentColor: '#087C45', marginTop: '4px' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <strong style={{ fontSize: '0.98rem', color: '#202823' }}>{addr.title}</strong>
                          {addr.isDefault && (
                            <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#EAF7EF', color: '#087C45', padding: '1px 6px', borderRadius: '4px' }}>
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.88rem', color: '#5E6962', marginTop: '4px', lineHeight: 1.45 }}>
                          {addr.address}
                        </p>
                        {addr.landmark && (
                          <span style={{ fontSize: '0.78rem', color: '#8C9B92' }}>Landmark: {addr.landmark}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Instructions */}
                <div style={{ marginTop: '18px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#202823', marginBottom: '6px' }}>
                    Delivery Instructions for Rider
                  </label>
                  <input
                    type="text"
                    value={deliveryInstruction}
                    onChange={(e) => setDeliveryInstruction(e.target.value)}
                    placeholder="e.g. Leave with security, don't ring doorbell"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #D6E4DB',
                      backgroundColor: '#F6FCF8',
                      fontSize: '0.88rem',
                      fontWeight: 500,
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* 2. Simulated Payment Method Selection */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '24px',
                  border: '1px solid #EAF0EC',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#EAF7EF', color: '#087C45', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#202823' }}>
                      Payment Method
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: '#087C45', fontWeight: 700 }}>
                      (Simulated Prototype Payment Sandbox)
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#FFF7DC',
                    border: '1px solid #F59E0B',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    fontSize: '0.8rem',
                    color: '#92400E',
                    marginBottom: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Info size={16} />
                  <span>
                    This prototype uses safe sandbox simulation. No real charges are made.
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* UPI Option */}
                  <label
                    style={{
                      padding: '14px 16px',
                      borderRadius: '14px',
                      border: paymentMethod === 'upi' ? '2px solid #087C45' : '1px solid #EAF0EC',
                      backgroundColor: paymentMethod === 'upi' ? '#F6FCF8' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        style={{ accentColor: '#087C45' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#202823' }}>
                          Instant UPI / Google Pay / PhonePe
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#5E6962' }}>
                          Fastest simulated one-tap checkout
                        </div>
                      </div>
                    </div>
                    <QrCode size={20} color="#087C45" />
                  </label>

                  {/* Credit / Debit Card Option */}
                  <label
                    style={{
                      padding: '14px 16px',
                      borderRadius: '14px',
                      border: paymentMethod === 'card' ? '2px solid #087C45' : '1px solid #EAF0EC',
                      backgroundColor: paymentMethod === 'card' ? '#F6FCF8' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        style={{ accentColor: '#087C45' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#202823' }}>
                          Credit / Debit Card
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#5E6962' }}>
                          Visa, Mastercard, RuPay & Amex
                        </div>
                      </div>
                    </div>
                    <CreditCard size={20} color="#087C45" />
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    style={{
                      padding: '14px 16px',
                      borderRadius: '14px',
                      border: paymentMethod === 'cod' ? '2px solid #087C45' : '1px solid #EAF0EC',
                      backgroundColor: paymentMethod === 'cod' ? '#F6FCF8' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        style={{ accentColor: '#087C45' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#202823' }}>
                          Pay on Delivery (Cash / UPI at door)
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#5E6962' }}>
                          Pay our delivery fleet directly
                        </div>
                      </div>
                    </div>
                    <Banknote size={20} color="#087C45" />
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Place Order CTA */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid #EAF0EC',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#202823', borderBottom: '1px solid #F0F4F2', paddingBottom: '12px' }}>
                Order Summary
              </h3>

              {/* Restaurant Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={primaryRestaurant.image}
                  alt={primaryRestaurant.name}
                  style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#202823' }}>{primaryRestaurant.name}</h4>
                  <span style={{ fontSize: '0.78rem', color: '#087C45', fontWeight: 700 }}>25-30 min estimated delivery</span>
                </div>
              </div>

              {/* Cart Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '8px 0' }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className={`diet-badge ${item.isVeg ? 'veg' : 'non-veg'}`}>
                        <span className="diet-dot" />
                      </span>
                      <span style={{ color: '#202823', fontWeight: 600 }}>{item.name} × {item.quantity}</span>
                    </div>
                    <span style={{ fontWeight: 800, color: '#202823' }}>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div style={{ borderTop: '1px dashed #D6E4DB', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem', color: '#5E6962' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Item Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Delivery Charges</span>
                  <span>{deliveryFee === 0 ? <strong style={{ color: '#087C45' }}>FREE</strong> : `₹${deliveryFee}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Taxes & Packaging</span>
                  <span>₹{taxes + packagingFee}</span>
                </div>
                {totalDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#087C45', fontWeight: 800 }}>
                    <span>Total Discount Saved</span>
                    <span>-₹{totalDiscount}</span>
                  </div>
                )}
                <div style={{ borderTop: '1.5px dashed #D6E4DB', paddingTop: '12px', marginTop: '4px', display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 900, color: '#202823' }}>
                  <span>Amount to Pay</span>
                  <span style={{ color: '#087C45' }}>₹{finalPayable}</span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  marginTop: '12px'
                }}
              >
                {isProcessing ? (
                  <span>Processing Simulated Order...</span>
                ) : (
                  <>
                    <span>Place Order • ₹{finalPayable}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.78rem', color: '#5E6962', textAlign: 'center' }}>
                <ShieldCheck size={14} color="#087C45" />
                <span>100% Guaranteed Contactless Hot Meal Delivery</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

