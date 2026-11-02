import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Star, Clock, Sparkles, Utensils, Check } from 'lucide-react';
import { useFood } from '../context/FoodContext';
import RestaurantCard from '../components/RestaurantCard';
import SearchBar from '../components/SearchBar';

export default function Restaurants() {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');
  const urlSearch = searchParams.get('search');

  const {
    restaurants,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    isVegOnly,
    setIsVegOnly,
    sortBy,
    setSortBy
  } = useFood();

  const [localCuisine, setLocalCuisine] = useState(urlCategory || 'All');

  // Filter and Sort Restaurants
  const filteredRestaurants = useMemo(() => {
    let result = [...restaurants];

    // Search query filter
    const query = (urlSearch || searchTerm).toLowerCase().trim();
    if (query) {
      result = result.filter(r =>
        r.name.toLowerCase().includes(query) ||
        r.cuisine.some(c => c.toLowerCase().includes(query)) ||
        r.tags.some(t => t.toLowerCase().includes(query)) ||
        r.address.toLowerCase().includes(query)
      );
    }

    // Cuisine filter
    if (localCuisine !== 'All') {
      result = result.filter(r =>
        r.cuisine.some(c => c.toLowerCase() === localCuisine.toLowerCase())
      );
    }

    // Sort order
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'deliveryTime') {
      result.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
    } else if (sortBy === 'costLow') {
      result.sort((a, b) => parseInt(a.costForTwo.replace(/\D/g, '')) - parseInt(b.costForTwo.replace(/\D/g, '')));
    }

    return result;
  }, [restaurants, searchTerm, urlSearch, localCuisine, sortBy]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', paddingBottom: '70px' }}>
      {/* Top Banner Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #087C45 0%, #064E35 100%)',
          color: '#FFFFFF',
          padding: '48px 0 36px'
        }}
      >
        <div className="container-wide">
          <div style={{ maxWidth: '640px' }}>
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#A3D4B6',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.8px',
                textTransform: 'uppercase'
              }}
            >
              Bengaluru Food Guide
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginTop: '12px', marginBottom: '8px' }}>
              Explore Top Kitchens & Menus
            </h1>
            <p style={{ fontSize: '1rem', color: '#A3D4B6', lineHeight: 1.5 }}>
              Browse authentic culinary destinations offering handpicked authentic meals delivered in 25-30 minutes.
            </p>
          </div>

          {/* Embedded Search on top of restaurants */}
          <div style={{ maxWidth: '580px', marginTop: '24px' }}>
            <SearchBar placeholder="Search restaurants by name, cuisine, or area..." />
          </div>
        </div>
      </div>

      <div className="container-wide" style={{ marginTop: '32px' }}>
        {/* Filter Controls Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            paddingBottom: '20px',
            borderBottom: '1px solid #EAF0EC',
            marginBottom: '28px'
          }}
        >
          {/* Cuisine Pill Selectors */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }}>
            <button
              onClick={() => setLocalCuisine('All')}
              className={`filter-pill ${localCuisine === 'All' ? 'active' : ''}`}
            >
              All Cuisines
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setLocalCuisine(c.name)}
                className={`filter-pill ${localCuisine === c.name ? 'active' : ''}`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Sort & Quick Toggles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#5E6962' }}>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '9999px',
                  border: '1.5px solid #D6E4DB',
                  backgroundColor: '#FFFFFF',
                  color: '#202823',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Rating: High to Low</option>
                <option value="deliveryTime">Delivery Time: Fastest</option>
                <option value="costLow">Cost: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ marginBottom: '20px', fontSize: '0.92rem', color: '#5E6962', fontWeight: 600 }}>
          Showing <strong style={{ color: '#202823' }}>{filteredRestaurants.length}</strong> restaurants {localCuisine !== 'All' ? `for "${localCuisine}"` : 'in Bengaluru'}
        </div>

        {/* Restaurant Cards Grid */}
        {filteredRestaurants.length === 0 ? (
          <div style={{ padding: '80px 20px', textAlign: 'center' }}>
            <Utensils size={48} color="#087C45" style={{ margin: '0 auto 16px', opacity: 0.6 }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#202823' }}>No restaurants found</h3>
            <p style={{ color: '#5E6962', marginTop: '6px' }}>Try switching cuisine filters or clear your search query.</p>
            <button
              onClick={() => {
                setLocalCuisine('All');
                setSearchTerm('');
              }}
              className="btn-primary"
              style={{ marginTop: '20px' }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            className="grid-restaurants"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '28px'
            }}
          >
            {filteredRestaurants.map(rest => (
              <RestaurantCard key={rest.id} restaurant={rest} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

