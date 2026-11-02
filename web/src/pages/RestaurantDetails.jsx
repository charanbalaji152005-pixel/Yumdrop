import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star,
  Clock,
  MapPin,
  Heart,
  Search,
  Sparkles,
  Info,
  ArrowLeft,
  Share2,
  Check,
  Percent
} from 'lucide-react';
import { useFood } from '../context/FoodContext';
import { useCart } from '../context/CartContext';
import FoodCard from '../components/FoodCard';

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { restaurants, foods, favoriteRestaurants, toggleFavoriteRestaurant } = useFood();
  const { showToast } = useCart();

  const [menuSearch, setMenuSearch] = useState('');
  const [selectedMenuCategory, setSelectedMenuCategory] = useState('All');
  const [vegFilterOnly, setVegFilterOnly] = useState(false);
  const [inStockFilterOnly, setInStockFilterOnly] = useState(false);

  // Find the restaurant
  const restaurant = restaurants.find(r => r.id === id) || restaurants[0];
  const isFavorite = favoriteRestaurants.includes(restaurant.id);

  // Dishes belonging to this restaurant
  const restaurantFoods = useMemo(() => {
    return foods.filter(f => f.restaurantId === restaurant.id);
  }, [foods, restaurant.id]);

  // Extract unique categories available in this restaurant's menu
  const menuCategories = useMemo(() => {
    const cats = ['All', ...new Set(restaurantFoods.map(f => f.category))];
    return cats;
  }, [restaurantFoods]);

  // Filtered dishes
  const displayedFoods = useMemo(() => {
    let result = [...restaurantFoods];

    if (selectedMenuCategory !== 'All') {
      result = result.filter(f => f.category === selectedMenuCategory);
    }

    if (vegFilterOnly) {
      result = result.filter(f => f.isVeg);
    }

    if (inStockFilterOnly) {
      result = result.filter(f => f.inStock);
    }

    if (menuSearch.trim()) {
      const q = menuSearch.toLowerCase().trim();
      result = result.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [restaurantFoods, selectedMenuCategory, vegFilterOnly, inStockFilterOnly, menuSearch]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: restaurant.name,
        text: `Order delicious food from ${restaurant.name} on YumDrop!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Restaurant link copied to clipboard! 📋');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', paddingBottom: '80px' }}>
      {/* Back button link */}
      <div className="container-wide" style={{ padding: '16px 24px 0' }}>
        <button
          onClick={() => navigate('/restaurants')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: '#5E6962',
            padding: '6px 0'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to all restaurants</span>
        </button>
      </div>

      {/* Restaurant Header Banner */}
      <div className="container-wide" style={{ marginTop: '12px' }}>
        <div
          style={{
            borderRadius: '26px',
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #EAF0EC',
            boxShadow: '0 8px 30px rgba(32, 40, 35, 0.08)',
            position: 'relative'
          }}
        >
          {/* Cover Photo */}
          <div style={{ position: 'relative', width: '100%', height: '280px', backgroundColor: '#F0F4F2' }}>
            <img
              src={restaurant.coverImage}
              alt={restaurant.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)'
              }}
            />

            {/* Quick Actions on Cover (Favorite & Share) */}
            <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '10px' }}>
              <button
                onClick={() => toggleFavoriteRestaurant(restaurant.id)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                <Heart size={20} fill={isFavorite ? "#F04438" : "none"} color={isFavorite ? "#F04438" : "#202823"} />
              </button>
              <button
                onClick={handleShare}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                <Share2 size={18} color="#202823" />
              </button>
            </div>

            {/* Floating Gold Partner Ribbon */}
            {restaurant.isGoldPartner && (
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D4AF37 100%)',
                  color: '#1a1600',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              >
                <Sparkles size={14} fill="#1a1600" />
                YUMDROP GOLD PARTNER
              </div>
            )}
          </div>

          {/* Restaurant Details Info */}
          <div style={{ padding: '28px 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, color: '#202823', lineHeight: 1.2 }}>
                  {restaurant.name}
                </h1>
                <p style={{ fontSize: '1rem', color: '#5E6962', marginTop: '6px' }}>
                  {restaurant.cuisine.join(' • ')}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', color: '#5E6962', marginTop: '6px' }}>
                  <MapPin size={15} color="#087C45" />
                  <span>{restaurant.address} • {restaurant.distance}</span>
                </div>
              </div>

              {/* Rating Box */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#F6FCF8',
                  border: '1.5px solid #D6E4DB',
                  borderRadius: '16px',
                  padding: '12px 18px',
                  minWidth: '100px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '1.3rem', fontWeight: 900, color: '#087C45' }}>
                  <Star size={18} fill="#087C45" color="#087C45" />
                  {restaurant.rating}
                </div>
                <span style={{ fontSize: '11px', color: '#5E6962', fontWeight: 700 }}>
                  {restaurant.reviewsCount} reviews
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar: Delivery time, cost for two, delivery fee */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '28px',
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid #F0F4F2',
                fontSize: '0.92rem',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="#087C45" />
                <span style={{ fontWeight: 700, color: '#202823' }}>{restaurant.deliveryTime}</span>
              </div>
              <div>
                <span style={{ color: '#5E6962' }}>Cost: </span>
                <span style={{ fontWeight: 700, color: '#202823' }}>{restaurant.costForTwo}</span>
              </div>
              <div>
                <span style={{ color: '#5E6962' }}>Delivery Fee: </span>
                <span style={{ fontWeight: 700, color: '#087C45' }}>₹{restaurant.deliveryFee}</span>
              </div>

              {/* Offer pill */}
              {restaurant.offer && (
                <div
                  style={{
                    marginLeft: 'auto',
                    backgroundColor: '#FFF1F0',
                    color: '#F04438',
                    border: '1px dashed #F04438',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Percent size={14} />
                  {restaurant.offer}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu & Filter Section */}
      <div className="container-wide" style={{ marginTop: '36px' }}>
        {/* Menu Search & Toggle Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '28px',
            paddingBottom: '20px',
            borderBottom: '1px solid #EAF0EC'
          }}
        >
          {/* Menu Search Input */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F6FCF8',
              border: '1.5px solid #D6E4DB',
              borderRadius: '9999px',
              padding: '8px 18px',
              width: '100%',
              maxWidth: '380px'
            }}
          >
            <Search size={18} color="#087C45" style={{ marginRight: '8px' }} />
            <input
              type="text"
              value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              placeholder="Search in this restaurant's menu..."
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                width: '100%',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#202823'
              }}
            />
          </div>

          {/* Veg-only and In-stock toggles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setVegFilterOnly(!vegFilterOnly)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '9999px',
                border: vegFilterOnly ? '2px solid #16a34a' : '1.5px solid #D6E4DB',
                backgroundColor: vegFilterOnly ? '#EAF7EF' : '#FFFFFF',
                color: vegFilterOnly ? '#16a34a' : '#5E6962',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span className="diet-badge veg">
                <span className="diet-dot" />
              </span>
              <span>Pure Veg Only</span>
            </button>

            <button
              onClick={() => setInStockFilterOnly(!inStockFilterOnly)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '9999px',
                border: inStockFilterOnly ? '2px solid #087C45' : '1.5px solid #D6E4DB',
                backgroundColor: inStockFilterOnly ? '#EAF7EF' : '#FFFFFF',
                color: inStockFilterOnly ? '#087C45' : '#5E6962',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span>Available In-Stock Only</span>
            </button>
          </div>
        </div>

        {/* Menu Category Pills */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '24px' }}>
          {menuCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMenuCategory(cat)}
              className={`filter-pill ${selectedMenuCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dishes Grid */}
        {displayedFoods.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#202823' }}>No dishes matching your filter.</p>
            <p style={{ color: '#5E6962', marginTop: '6px' }}>Try switching off the veg or in-stock toggle.</p>
          </div>
        ) : (
          <div
            className="grid-foods"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {displayedFoods.map(food => (
              <FoodCard key={food.id} food={food} showRestaurant={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

