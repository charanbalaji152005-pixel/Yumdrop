import React from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Minus, Bell, BellCheck, Sparkles } from 'lucide-react';
import { useFood } from '../context/FoodContext';
import { useCart } from '../context/CartContext';

export default function FoodCard({ food, showRestaurant = true }) {
  const { setHoveredFood, clearHoveredFood, notifyMe, notifiedItems } = useFood();
  const { cartItems, addToCart, updateQuantity, showToast } = useCart();

  const cartItem = cartItems.find(item => item.id === food.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isNotified = notifiedItems.includes(food.id);

  const handleNotify = (e) => {
    e.stopPropagation();
    notifyMe(food);
    showToast(`Alert set! We will notify you when ${food.name} is restocked.`, 'success');
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(food);
  };

  const handleQuantity = (e, delta) => {
    e.stopPropagation();
    updateQuantity(food.id, delta);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={food.inStock ? { y: -6, transition: { duration: 0.25 } } : {}}
      onMouseEnter={() => setHoveredFood(food)}
      onMouseLeave={clearHoveredFood}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid #EAF0EC',
        boxShadow: '0 4px 18px rgba(32, 40, 35, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        cursor: food.inStock ? 'pointer' : 'not-allowed'
      }}
    >
      {/* Food Image Container */}
      <div style={{ position: 'relative', width: '100%', height: '190px', overflow: 'hidden', backgroundColor: '#F4F7F5' }}>
        <img
          src={food.image}
          alt={food.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            filter: food.inStock ? 'none' : 'grayscale(100%) contrast(85%) opacity(0.65)'
          }}
          className={food.inStock ? "food-img-zoom" : ""}
        />

        {/* Veg / Non-Veg Indicator */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)',
            borderRadius: '6px',
            padding: '4px 6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span className={`diet-badge ${food.isVeg ? 'veg' : 'non-veg'}`}>
            <span className="diet-dot" />
          </span>
          <span style={{ fontSize: '11px', fontWeight: 700, color: food.isVeg ? '#16a34a' : '#dc2626' }}>
            {food.isVeg ? 'VEG' : 'NON-VEG'}
          </span>
        </div>

        {/* Rating Pill on image */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'rgba(8, 124, 69, 0.92)',
            color: '#FFFFFF',
            padding: '3px 8px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
        >
          <Star size={12} fill="#FFD700" color="#FFD700" />
          {food.rating}
        </div>

        {/* Bestseller ribbon if applicable */}
        {food.isBestseller && food.inStock && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              backgroundColor: '#F04438',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: '9999px',
              letterSpacing: '0.4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 4px 10px rgba(240, 68, 56, 0.35)'
            }}
          >
            <Sparkles size={11} />
            BESTSELLER
          </div>
        )}

        {/* OUT OF ORDER OVERLAY */}
        {!food.inStock && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(20, 28, 24, 0.72)',
              backdropFilter: 'blur(3px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              padding: '16px',
              textAlign: 'center'
            }}
          >
            <span
              style={{
                backgroundColor: '#F04438',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 900,
                padding: '5px 14px',
                borderRadius: '9999px',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                boxShadow: '0 4px 14px rgba(240, 68, 56, 0.5)',
                marginBottom: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'inline-block' }} />
              OUT OF ORDER
            </span>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#FEE2E2', opacity: 0.95, margin: 0 }}>
              Kitchen restock in progress
            </p>
          </div>
        )}
      </div>

      {/* Food Details Body */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {showRestaurant && (
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#087C45', marginBottom: '4px' }}>
            {food.restaurantName}
          </div>
        )}

        <h4
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            color: '#202823',
            marginBottom: '6px',
            lineHeight: 1.3
          }}
        >
          {food.name}
        </h4>

        <p
          style={{
            fontSize: '0.82rem',
            color: '#5E6962',
            lineHeight: 1.45,
            marginBottom: '14px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {food.description}
        </p>

        {/* Price & Action Row */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '10px',
            borderTop: '1px dashed #EAF0EC'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '1.18rem', fontWeight: 800, color: '#202823' }}>
              ₹{food.price}
            </span>
            {food.originalPrice && (
              <span style={{ fontSize: '0.85rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                ₹{food.originalPrice}
              </span>
            )}
          </div>

          {/* Action Button: In-Stock Add to Cart vs Out-of-Stock Notify Me */}
          {food.inStock ? (
            quantity > 0 ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#EAF7EF',
                  border: '1.5px solid #087C45',
                  borderRadius: '9999px',
                  padding: '2px'
                }}
              >
                <button
                  onClick={(e) => handleQuantity(e, -1)}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: '#087C45',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.15s ease'
                  }}
                  title="Decrease quantity"
                >
                  <Minus size={14} strokeWidth={3} />
                </button>
                <span
                  style={{
                    padding: '0 12px',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    color: '#087C45'
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={(e) => handleQuantity(e, 1)}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: '#087C45',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.15s ease'
                  }}
                  title="Increase quantity"
                >
                  <Plus size={14} strokeWidth={3} />
                </button>
              </div>
            ) : (
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={handleAdd}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#087C45',
                  color: '#FFFFFF',
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  boxShadow: '0 4px 12px rgba(8, 124, 69, 0.25)',
                  transition: 'background-color 0.2s ease, transform 0.2s ease'
                }}
              >
                <Plus size={16} strokeWidth={2.8} />
                ADD
              </motion.button>
            )
          ) : (
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={handleNotify}
              disabled={isNotified}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: isNotified ? '#E5E7EB' : '#FFF1F0',
                color: isNotified ? '#6B7280' : '#F04438',
                border: isNotified ? '1px solid #D1D5DB' : '1px solid rgba(240, 68, 56, 0.35)',
                padding: '7px 14px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: isNotified ? 'default' : 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {isNotified ? (
                <>
                  <BellCheck size={14} color="#16a34a" />
                  Notified
                </>
              ) : (
                <>
                  <Bell size={14} />
                  Notify Me
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

