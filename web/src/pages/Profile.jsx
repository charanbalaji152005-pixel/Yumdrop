import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Crown,
  MapPin,
  Clock,
  Heart,
  LogOut,
  Sparkles,
  ShieldCheck,
  Check,
  ArrowRight,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFood } from '../context/FoodContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, orders } = useAuth();
  const { showToast } = useCart();
  const { favoriteRestaurants, restaurants } = useFood();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'addresses', 'favorites'

  if (!user) {
    navigate('/login');
    return null;
  }

  const favoriteRestaurantObjects = restaurants.filter(r => favoriteRestaurants.includes(r.id));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FCF9', padding: '40px 0 90px' }}>
      <div className="container-wide">
        {/* Top Profile Header */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid #EAF0EC',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '32px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                backgroundColor: '#EAF7EF',
                color: '#087C45',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 900,
                border: '3px solid #087C45'
              }}
            >
              {user.name ? user.name[0] : 'U'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#202823' }}>{user.name}</h1>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#5E6962', marginTop: '4px' }}>
                {user.email} • {user.phone}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => {
                logout();
                showToast('You have been logged out.');
                navigate('/');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '9999px',
                backgroundColor: '#FFF1F0',
                color: '#F04438',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('profile')}
            className={`filter-pill ${activeTab === 'profile' ? 'active' : ''}`}
          >
            <User size={15} />
            <span>Account Details</span>
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`filter-pill ${activeTab === 'addresses' ? 'active' : ''}`}
          >
            <MapPin size={15} />
            <span>Saved Addresses ({user.addresses?.length || 0})</span>
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`filter-pill ${activeTab === 'favorites' ? 'active' : ''}`}
          >
            <Heart size={15} />
            <span>Favorite Outlets ({favoriteRestaurants.length})</span>
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'profile' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px'
            }}
          >
            {/* Account Details Box */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '28px',
                border: '1px solid #EAF0EC'
              }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#202823', marginBottom: '20px' }}>
                Profile Information
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#5E6962', textTransform: 'uppercase', fontWeight: 800 }}>Full Name</span>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#202823' }}>{user.name}</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.78rem', color: '#5E6962', textTransform: 'uppercase', fontWeight: 800 }}>Email Address</span>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#202823' }}>{user.email}</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.78rem', color: '#5E6962', textTransform: 'uppercase', fontWeight: 800 }}>Mobile Number</span>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#202823' }}>{user.phone}</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.78rem', color: '#5E6962', textTransform: 'uppercase', fontWeight: 800 }}>Account Status</span>
                  <div style={{ fontSize: '0.92rem', color: '#087C45', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={16} /> Verified Active Member
                  </div>
                </div>
              </div>
            </div>

            {/* Offers & Discounts Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, #064E35 0%, #087C45 100%)',
                color: '#FFFFFF',
                borderRadius: '20px',
                padding: '28px',
                border: '1px solid #087C45',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <Tag size={26} color="#FFD700" />
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 900 }}>
                    Exclusive Offers & Promo Codes
                  </h3>
                </div>

                <p style={{ fontSize: '0.92rem', opacity: 0.9, lineHeight: 1.5, marginBottom: '20px', color: '#EAF7EF' }}>
                  Browse through dozens of active restaurant coupons, flat discounts, and zero delivery promotions for your next order.
                </p>
              </div>

              <div>
                <button
                  onClick={() => navigate('/offers')}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '9999px',
                    backgroundColor: '#FFFFFF',
                    color: '#087C45',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <span>Explore Available Offers</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {user.addresses?.map(addr => (
              <div
                key={addr.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '24px',
                  border: '1px solid #EAF0EC',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={18} color="#087C45" />
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#202823' }}>{addr.title}</h4>
                  </div>
                  {addr.isDefault && (
                    <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#EAF7EF', color: '#087C45', padding: '2px 8px', borderRadius: '4px' }}>
                      DEFAULT
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.88rem', color: '#5E6962', lineHeight: 1.5 }}>{addr.address}</p>
                {addr.landmark && <span style={{ fontSize: '0.8rem', color: '#8C9B92' }}>Landmark: {addr.landmark}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div>
            {favoriteRestaurantObjects.length === 0 ? (
              <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: '20px' }}>
                <Heart size={44} color="#D6E4DB" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>No favorites yet</h4>
                <p style={{ color: '#5E6962', fontSize: '0.9rem', marginTop: '4px' }}>
                  Click the heart icon on any restaurant to save it here for quick reordering.
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                {favoriteRestaurantObjects.map(r => (
                  <div
                    key={r.id}
                    onClick={() => navigate(`/restaurant/${r.id}`)}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      border: '1px solid #EAF0EC',
                      cursor: 'pointer',
                      display: 'flex',
                      gap: '14px',
                      padding: '14px'
                    }}
                  >
                    <img
                      src={r.coverImage}
                      alt={r.name}
                      style={{ width: '90px', height: '90px', borderRadius: '12px', objectFit: 'cover' }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <h4 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#202823' }}>{r.name}</h4>
                      <p style={{ fontSize: '0.8rem', color: '#5E6962', marginTop: '2px' }}>{r.cuisine.join(', ')}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', fontSize: '0.82rem', fontWeight: 700, color: '#087C45' }}>
                        <span>★ {r.rating}</span>
                        <span>•</span>
                        <span>{r.deliveryTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

