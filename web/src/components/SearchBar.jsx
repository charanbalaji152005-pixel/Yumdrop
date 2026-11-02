import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Utensils, Store, ArrowRight } from 'lucide-react';
import { useFood } from '../context/FoodContext';

export default function SearchBar({ placeholder = "Search for restaurants, biryani, pizza, cuisines...", autoFocus = false }) {
  const navigate = useNavigate();
  const { restaurants, foods, searchTerm, setSearchTerm } = useFood();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const query = searchTerm.toLowerCase().trim();

  // Matched restaurants
  const matchedRestaurants = query
    ? restaurants.filter(r =>
        r.name.toLowerCase().includes(query) ||
        r.cuisine.some(c => c.toLowerCase().includes(query))
      ).slice(0, 4)
    : [];

  // Matched food items
  const matchedFoods = query
    ? foods.filter(f =>
        f.name.toLowerCase().includes(query) ||
        f.category.toLowerCase().includes(query) ||
        f.description.toLowerCase().includes(query)
      ).slice(0, 5)
    : [];

  const handleSelectRestaurant = (restaurantId) => {
    setIsOpen(false);
    navigate(`/restaurant/${restaurantId}`);
  };

  const handleSelectFood = (food) => {
    setIsOpen(false);
    navigate(`/restaurant/${food.restaurantId}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query) {
      setIsOpen(false);
      navigate(`/restaurants?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      {/* Search Input Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '9999px',
          border: isOpen ? '2px solid #087C45' : '1.5px solid #D6E4DB',
          padding: '8px 18px',
          boxShadow: isOpen ? '0 6px 20px rgba(8, 124, 69, 0.16)' : '0 2px 10px rgba(32, 40, 35, 0.05)',
          transition: 'all 0.25s ease'
        }}
      >
        <Search size={20} color="#087C45" style={{ marginRight: '10px', flexShrink: 0 }} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            fontSize: '0.96rem',
            color: '#202823',
            fontWeight: 500,
            background: 'transparent'
          }}
        />

        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              setIsOpen(false);
            }}
            style={{
              padding: '4px',
              borderRadius: '50%',
              backgroundColor: '#EAF7EF',
              color: '#087C45',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '8px',
              flexShrink: 0
            }}
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Live Suggestions Dropdown */}
      {isOpen && query && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
            boxShadow: '0 16px 36px rgba(32, 40, 35, 0.16)',
            border: '1px solid #EAF0EC',
            zIndex: 1000,
            overflow: 'hidden',
            maxHeight: '440px',
            overflowY: 'auto'
          }}
        >
          {matchedRestaurants.length === 0 && matchedFoods.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#5E6962' }}>
              <p style={{ fontWeight: 600 }}>No dishes or restaurants found for "{searchTerm}"</p>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Try searching for Biryani, Pizza, Burger, or Chinese</p>
            </div>
          ) : (
            <div style={{ padding: '12px' }}>
              {/* Restaurants Section */}
              {matchedRestaurants.length > 0 && (
                <div style={{ marginBottom: '14px' }}>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#087C45',
                      letterSpacing: '0.8px',
                      textTransform: 'uppercase',
                      padding: '4px 8px 8px'
                    }}
                  >
                    Restaurants
                  </div>
                  {matchedRestaurants.map(r => (
                    <div
                      key={r.id}
                      onClick={() => handleSelectRestaurant(r.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F6FCF8'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <img
                        src={r.avatarImage || r.coverImage}
                        alt={r.name}
                        style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover' }}
                      />
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#202823' }}>{r.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#5E6962' }}>{r.cuisine.join(', ')} • {r.deliveryTime}</div>
                      </div>
                      <ArrowRight size={16} color="#087C45" />
                    </div>
                  ))}
                </div>
              )}

              {/* Foods Section */}
              {matchedFoods.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#087C45',
                      letterSpacing: '0.8px',
                      textTransform: 'uppercase',
                      padding: '4px 8px 8px'
                    }}
                  >
                    Dishes & Food Items
                  </div>
                  {matchedFoods.map(f => (
                    <div
                      key={f.id}
                      onClick={() => handleSelectFood(f)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F6FCF8'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <img
                        src={f.image}
                        alt={f.name}
                        style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover' }}
                      />
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className={`diet-badge ${f.isVeg ? 'veg' : 'non-veg'}`}>
                            <span className="diet-dot" />
                          </span>
                          <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#202823' }}>{f.name}</span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#5E6962' }}>{f.restaurantName} • ₹{f.price}</div>
                      </div>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          backgroundColor: f.inStock ? '#EAF7EF' : '#FFF1F0',
                          color: f.inStock ? '#087C45' : '#F04438'
                        }}
                      >
                        {f.inStock ? 'Available' : 'Sold Out'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

