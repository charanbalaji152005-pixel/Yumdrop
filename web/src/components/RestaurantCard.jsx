import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useFood } from '../context/FoodContext';

export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();
  const { favoriteRestaurants, toggleFavoriteRestaurant } = useFood();
  const isFavorite = favoriteRestaurants.includes(restaurant.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavoriteRestaurant(restaurant.id);
  };

  const handleCardClick = () => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onClick={handleCardClick}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '22px',
        overflow: 'hidden',
        border: '1px solid #EAF0EC',
        boxShadow: '0 4px 20px rgba(32, 40, 35, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease'
      }}
    >
      {/* Cover Image & Badges */}
      <div style={{ position: 'relative', width: '100%', height: '210px', overflow: 'hidden', backgroundColor: '#F0F4F2' }}>
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          className="restaurant-img-zoom"
        />

        {/* Gradient dark overlay on bottom for readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 55%)'
          }}
        />

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s ease, background-color 0.2s ease',
            zIndex: 2
          }}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={18}
            fill={isFavorite ? "#F04438" : "none"}
            color={isFavorite ? "#F04438" : "#202823"}
            strokeWidth={2.2}
          />
        </button>

        {/* Promoted or GOLD Badge */}
        {restaurant.isGoldPartner && (
          <div
            style={{
              position: 'absolute',
              top: '14px',
              left: '14px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D4AF37 100%)',
              color: '#1a1600',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 3px 8px rgba(0,0,0,0.2)'
            }}
          >
            <Sparkles size={12} fill="#1a1600" />
            GOLD PARTNER
          </div>
        )}

        {/* Offer Label Banner over image bottom */}
        {restaurant.offer && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '14px',
              right: '14px',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textShadow: '0 1px 3px rgba(0,0,0,0.7)'
            }}
          >
            <span
              style={{
                backgroundColor: '#F04438',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: '4px',
                letterSpacing: '0.5px'
              }}
            >
              OFFER
            </span>
            {restaurant.offer}
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <h3
            style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: '#202823',
              lineHeight: 1.25
            }}
          >
            {restaurant.name}
          </h3>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: '#087C45',
              color: '#FFFFFF',
              padding: '4px 8px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 800
            }}
          >
            <Star size={13} fill="#FFFFFF" color="#FFFFFF" />
            {restaurant.rating}
          </div>
        </div>

        {/* Cuisines */}
        <p
          style={{
            fontSize: '0.85rem',
            color: '#5E6962',
            marginBottom: '12px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {restaurant.cuisine.join(' • ')}
        </p>

        {/* Metrics Row: Time, Delivery fee, Cost for two */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.82rem',
            color: '#5E6962',
            paddingTop: '12px',
            borderTop: '1px solid #F0F4F2',
            marginBottom: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <Clock size={14} color="#087C45" />
            {restaurant.deliveryTime}
          </div>
          <div style={{ fontWeight: 600 }}>
            {restaurant.distance}
          </div>
          <div style={{ fontWeight: 700, color: '#202823' }}>
            {restaurant.costForTwo}
          </div>
        </div>

        {/* View Menu Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/restaurant/${restaurant.id}`);
          }}
          className="btn-secondary"
          style={{
            width: '100%',
            padding: '10px 16px',
            fontSize: '0.9rem',
            fontWeight: 700,
            justifyContent: 'space-between'
          }}
        >
          <span>View Menu & Dishes</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

