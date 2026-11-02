import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock,
  CheckCircle2,
  ChefHat,
  Bike,
  Home,
  Phone,
  MessageSquare,
  MapPin,
  ArrowRight,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  Play
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { assetUrl } from '../utils/assetUrl';

const STAGES = [
  { stage: 1, title: "Order Placed", desc: "Sent to kitchen", icon: Clock },
  { stage: 2, title: "Restaurant Confirmed", desc: "Order accepted", icon: CheckCircle2 },
  { stage: 3, title: "Food Preparing", desc: "Chef is seasoning dishes", icon: ChefHat },
  { stage: 4, title: "Out for Delivery", desc: "Rider on the way", icon: Bike },
  { stage: 5, title: "Delivered", desc: "Enjoy your hot meal!", icon: Home },
];

export default function Orders() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useAuth();
  const { addToCart, showToast } = useCart();

  const activeIdParam = searchParams.get('active');
  const [selectedOrder, setSelectedOrder] = useState(() => {
    if (activeIdParam) {
      const match = orders.find(o => o.id === activeIdParam);
      if (match) return match;
    }
    return orders[0] || null;
  });

  useEffect(() => {
    if (activeIdParam) {
      const match = orders.find(o => o.id === activeIdParam);
      if (match) setSelectedOrder(match);
    }
  }, [activeIdParam, orders]);

  // Simulate advancing the order stage
  const advanceStage = () => {
    if (!selectedOrder) return;
    const current = selectedOrder.currentStage || 1;
    if (current < 5) {
      const nextStage = current + 1;
      const stageMeta = STAGES.find(s => s.stage === nextStage);
      updateOrderStatus(selectedOrder.id, nextStage, stageMeta.title);
      setSelectedOrder(prev => ({
        ...prev,
        currentStage: nextStage,
        status: stageMeta.title
      }));
      showToast(`Order status updated: ${stageMeta.title} 🚀`);
    } else {
      showToast('Order is already fully delivered! 🎉');
    }
  };

  const handleReorder = (order) => {
    order.items.forEach(item => {
      addToCart({
        id: item.id || 'food-1',
        name: item.name,
        price: item.price,
        inStock: true,
        isVeg: item.isVeg !== undefined ? item.isVeg : true,
        image: item.image || order.restaurant?.image || assetUrl('/images/70127abf-d5b0-4856-a439-703e4ee48934_1209174.jpg'),
        restaurantName: order.restaurant?.name || 'YumDrop Partner'
      });
    });
    showToast(`Items from order ${order.id} added to cart!`);
    navigate('/cart');
  };

  if (!orders || orders.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', backgroundColor: '#FFFFFF' }}>
        <div style={{ textAlign: 'center', maxWidth: '440px' }}>
          <img
            src={assetUrl("/images/6ef07bda-b707-48ea-9b14-2594071593d1_Biryani.png")}
            alt="No Orders"
            style={{ width: '130px', margin: '0 auto 20px' }}
          />
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#202823', marginBottom: '8px' }}>
            No Orders Yet!
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#5E6962', lineHeight: 1.5, marginBottom: '24px' }}>
            When you place an order, live GPS tracking and progress stages will display here.
          </p>
          <button onClick={() => navigate('/restaurants')} className="btn-primary">
            <span>Explore Restaurants</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  const currentStage = selectedOrder?.currentStage || 1;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FCF9', padding: '36px 0 90px' }}>
      <div className="container-wide">
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#202823' }}>
            Live Order Tracking & History
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#5E6962', marginTop: '4px' }}>
            Track your delivery in real-time or review past receipts.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'flex-start'
          }}
        >
          {/* LEFT: LIVE TRACKING CARD */}
          {selectedOrder && (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '32px 28px',
                border: '1.5px solid #EAF0EC',
                boxShadow: '0 8px 30px rgba(8, 124, 69, 0.08)'
              }}
            >
              {/* Header Info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid #F0F4F2', paddingBottom: '20px' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#EAF7EF', color: '#087C45', padding: '3px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
                    <Sparkles size={13} />
                    Active Delivery
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#202823' }}>
                    {selectedOrder.restaurant?.name || 'Restaurant'}
                  </h2>
                  <div style={{ fontSize: '0.85rem', color: '#5E6962', marginTop: '2px' }}>
                    Order ID: <strong>{selectedOrder.id}</strong> • Placed {selectedOrder.date}
                  </div>
                </div>

                {/* Status Pill */}
                <div
                  style={{
                    backgroundColor: currentStage === 5 ? '#EAF7EF' : '#FFF1F0',
                    color: currentStage === 5 ? '#087C45' : '#F04438',
                    border: `1.5px solid ${currentStage === 5 ? '#087C45' : '#F04438'}`,
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontWeight: 800,
                    fontSize: '0.9rem'
                  }}
                >
                  {selectedOrder.status}
                </div>
              </div>

              {/* 5-STAGE INTERACTIVE PROGRESS TRACKER */}
              <div style={{ margin: '36px 0 28px' }}>
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                  {/* Background progress bar line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      right: '20px',
                      height: '4px',
                      backgroundColor: '#E2ECE5',
                      zIndex: 1
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStage - 1) / 4) * 100}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        backgroundColor: '#087C45',
                        borderRadius: '2px'
                      }}
                    />
                  </div>

                  {STAGES.map(s => {
                    const IconComponent = s.icon;
                    const isDone = currentStage >= s.stage;
                    const isCurrent = currentStage === s.stage;

                    return (
                      <div
                        key={s.stage}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          position: 'relative',
                          zIndex: 2,
                          width: '60px',
                          textAlign: 'center'
                        }}
                      >
                        <motion.div
                          animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            backgroundColor: isDone ? '#087C45' : '#FFFFFF',
                            color: isDone ? '#FFFFFF' : '#8C9B92',
                            border: isDone ? '2px solid #087C45' : '2px solid #D6E4DB',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: isDone ? '0 4px 12px rgba(8, 124, 69, 0.3)' : 'none',
                            marginBottom: '8px'
                          }}
                        >
                          <IconComponent size={20} strokeWidth={2.4} />
                        </motion.div>
                        <span style={{ fontSize: '11px', fontWeight: isDone ? 800 : 600, color: isDone ? '#202823' : '#8C9B92', lineHeight: 1.2 }}>
                          {s.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SIMULATOR BUTTON (Allows testing stages 1 to 5!) */}
              <div
                style={{
                  backgroundColor: '#F6FCF8',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  border: '1px dashed #087C45',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginBottom: '28px'
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.92rem', color: '#064E35', display: 'block' }}>
                    Order Stage Simulator
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: '#5E6962' }}>
                    Click button to simulate the next kitchen or rider stage!
                  </span>
                </div>

                <button
                  onClick={advanceStage}
                  className="btn-primary"
                  style={{ padding: '8px 18px', fontSize: '0.85rem', borderRadius: '9999px' }}
                >
                  <Play size={14} fill="#fff" />
                  <span>Advance Stage ({currentStage}/5)</span>
                </button>
              </div>

              {/* Delivery Captain / Rider Card */}
              {currentStage >= 4 && (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '18px',
                    border: '1.5px solid #EAF0EC',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#087C45', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 900 }}>
                      R
                    </div>
                    <div>
                      <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#202823' }}>
                        {selectedOrder.rider?.name || 'Ramesh Kumar'}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#5E6962' }}>
                        {selectedOrder.rider?.vehicle || 'Electric Bike (KA-01-EQ-4492)'} • 4.9 ★
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => showToast('Calling rider Ramesh Kumar (+91 98450 12345)... 📞')}
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
                      title="Call Rider"
                    >
                      <Phone size={17} />
                    </button>
                    <button
                      onClick={() => showToast('Live chat connected with delivery fleet! 💬')}
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
                      title="Message Rider"
                    >
                      <MessageSquare size={17} />
                    </button>
                  </div>
                </div>
              )}

              {/* Order Items & Receipt Summary */}
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#202823', marginBottom: '14px' }}>
                  Ordered Items
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                      <span style={{ color: '#202823', fontWeight: 600 }}>
                        {item.name} × {item.quantity}
                      </span>
                      <span style={{ fontWeight: 800, color: '#202823' }}>
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px dashed #D6E4DB', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.82rem', color: '#5E6962' }}>Paid via {selectedOrder.paymentMethod}</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#087C45' }}>
                      Total: ₹{selectedOrder.totalAmount}
                    </div>
                  </div>

                  <button
                    onClick={() => handleReorder(selectedOrder)}
                    className="btn-secondary"
                    style={{ padding: '8px 18px', fontSize: '0.86rem' }}
                  >
                    <RefreshCw size={14} />
                    <span>Reorder Items</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT: ALL ORDERS LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#202823' }}>
              Your Orders History ({orders.length})
            </h3>

            {orders.map(order => {
              const isSelected = selectedOrder?.id === order.id;

              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '18px',
                    padding: '20px',
                    border: isSelected ? '2px solid #087C45' : '1px solid #EAF0EC',
                    boxShadow: isSelected ? '0 8px 24px rgba(8, 124, 69, 0.12)' : '0 2px 8px rgba(0,0,0,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#202823' }}>
                        {order.restaurant?.name || 'Restaurant'}
                      </h4>
                      <span style={{ fontSize: '0.8rem', color: '#5E6962' }}>
                        {order.id} • {order.date}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        backgroundColor: order.status === 'Delivered' ? '#EAF7EF' : '#FFF1F0',
                        color: order.status === 'Delivered' ? '#087C45' : '#F04438',
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {order.status}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: '#5E6962', marginBottom: '12px' }}>
                    {order.items?.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #F0F4F2' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: '#202823' }}>
                      ₹{order.totalAmount}
                    </span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#087C45' }}>
                      {isSelected ? 'Currently Viewing' : 'Track Order →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
