import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Percent,
  HelpCircle,
  Crown,
  ShoppingBag,
  User,
  Menu,
  X,
  LogOut,
  Clock,
  ChevronDown,
  Sparkles,
  MapPin,
  Film,
  Compass
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';

export default function Navbar({ onOpenAuthModal }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAuth();
  const { itemsCount, openCart } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'categories', 'restaurants', 'trending', 'offers', 'tracking', 'auth-experience', 'faq'];
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (elementId) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${elementId}`);
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(elementId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 2px 16px rgba(8, 124, 69, 0.08)',
        borderBottom: '1px solid #EAF0EC'
      }}
    >
      <div className="container-wide">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '74px',
            gap: '16px'
          }}
        >
          {/* Logo & Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('hero');
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
            >
              {/* Original Food-Drop Logo Icon */}
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #087C45 0%, #064E35 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(8, 124, 69, 0.35)',
                  position: 'relative'
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2.5C12 2.5 5 11 5 15.5C5 19.09 7.91 22 11.5 22C15.09 22 18 19.09 18 15.5C18 11 12 2.5 12 2.5Z"
                    fill="white"
                    fillOpacity="0.15"
                  />
                  <path
                    d="M12 2.5C12 2.5 5 11 5 15.5C5 19.09 7.91 22 11.5 22C15.09 22 18 19.09 18 15.5C18 11 12 2.5 12 2.5Z"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 16C9 14.5 10.3 13.5 12 13.5C13.7 13.5 15 14.5 15 16"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <line x1="8.5" y1="17.5" x2="15.5" y2="17.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="12" cy="10.5" r="1.6" fill="#F04438" />
                </svg>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                  <span
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 900,
                      color: '#087C45',
                      letterSpacing: '-0.5px'
                    }}
                  >
                    Yum<span style={{ color: '#F04438' }}>Drop</span>
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '9.5px',
                    fontWeight: 700,
                    color: '#5E6962',
                    letterSpacing: '0.4px',
                    textTransform: 'uppercase',
                    marginTop: '-3px'
                  }}
                >
                  Your Cravings. Our Delivery.
                </div>
              </div>
            </a>

            {/* Quick Location Indicator */}
            <div
              className="desktop-only"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.84rem',
                color: '#5E6962',
                paddingLeft: '14px',
                borderLeft: '1px solid #EAF0EC'
              }}
            >
              <MapPin size={15} color="#087C45" />
              <div>
                <span style={{ fontWeight: 800, color: '#202823' }}>Bengaluru</span>
                <span style={{ fontSize: '0.76rem', marginLeft: '4px', opacity: 0.8 }}>Indiranagar</span>
              </div>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="desktop-only" style={{ flexGrow: 1, maxWidth: '320px', margin: '0 8px' }}>
            <SearchBar placeholder="Search dishes & restaurants..." />
          </div>

          {/* Desktop Landing Page Section Navigation Links */}
          <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Restaurants */}
            <button
              onClick={() => scrollTo('restaurants')}
              style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                color: activeSection === 'restaurants' ? '#087C45' : '#202823',
                padding: '6px 8px',
                position: 'relative',
                transition: 'color 0.15s ease'
              }}
            >
              Restaurants
              {activeSection === 'restaurants' && (
                <motion.div
                  layoutId="landingNavIndicator"
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2.5px',
                    backgroundColor: '#087C45',
                    borderRadius: '2px'
                  }}
                />
              )}
            </button>

            {/* Trending Food */}
            <button
              onClick={() => scrollTo('trending')}
              style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                color: activeSection === 'trending' ? '#087C45' : '#202823',
                padding: '6px 8px',
                position: 'relative'
              }}
            >
              Trending Dishes
              {activeSection === 'trending' && (
                <motion.div
                  layoutId="landingNavIndicator"
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2.5px',
                    backgroundColor: '#087C45',
                    borderRadius: '2px'
                  }}
                />
              )}
            </button>

            {/* Offers */}
            <button
              onClick={() => scrollTo('offers')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: activeSection === 'offers' ? '#087C45' : '#202823',
                padding: '6px 8px',
                position: 'relative'
              }}
            >
              <Percent size={15} color="#F04438" />
              <span>Offers</span>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 800,
                  backgroundColor: '#F04438',
                  color: '#fff',
                  padding: '1px 5px',
                  borderRadius: '4px',
                  marginLeft: '2px'
                }}
              >
                50%
              </span>
              {activeSection === 'offers' && (
                <motion.div
                  layoutId="landingNavIndicator"
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2.5px',
                    backgroundColor: '#087C45',
                    borderRadius: '2px'
                  }}
                />
              )}
            </button>

            {/* Video Auth Experience */}
            <button
              onClick={() => scrollTo('auth-experience')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: activeSection === 'auth-experience' ? '#087C45' : '#202823',
                padding: '6px 8px',
                position: 'relative'
              }}
            >
              <Film size={15} color="#087C45" />
              <span>Video Auth</span>
              {activeSection === 'auth-experience' && (
                <motion.div
                  layoutId="landingNavIndicator"
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2.5px',
                    backgroundColor: '#087C45',
                    borderRadius: '2px'
                  }}
                />
              )}
            </button>

            {/* Order Tracking */}
            <button
              onClick={() => scrollTo('tracking')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: activeSection === 'tracking' ? '#087C45' : '#202823',
                padding: '6px 8px',
                position: 'relative'
              }}
            >
              <Clock size={15} color="#087C45" />
              <span>Live Track</span>
              {activeSection === 'tracking' && (
                <motion.div
                  layoutId="landingNavIndicator"
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2.5px',
                    backgroundColor: '#087C45',
                    borderRadius: '2px'
                  }}
                />
              )}
            </button>

            {/* Profile / Login */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    scrollTo('auth-experience');
                  } else {
                    setIsProfileDropdownOpen(!isProfileDropdownOpen);
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  border: '1px solid #D6E4DB',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: '#EAF7EF',
                    color: '#087C45',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '11px'
                  }}
                >
                  {isLoggedIn ? (user.name ? user.name[0] : 'U') : <User size={14} />}
                </div>
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#202823' }}>
                  {isLoggedIn ? user.name.split(' ')[0] : 'Sign In'}
                </span>
                {isLoggedIn && <ChevronDown size={13} color="#5E6962" />}
              </button>

              {/* Profile dropdown if logged in */}
              {isLoggedIn && isProfileDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '210px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    boxShadow: '0 12px 32px rgba(32, 40, 35, 0.14)',
                    border: '1px solid #EAF0EC',
                    padding: '8px',
                    zIndex: 1100
                  }}
                  onMouseLeave={() => setIsProfileDropdownOpen(false)}
                >
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid #F0F4F2', marginBottom: '6px' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#202823' }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#5E6962' }}>{user.email}</div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#F04438'
                    }}
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '9999px',
                backgroundColor: itemsCount > 0 ? '#087C45' : '#EAF7EF',
                color: itemsCount > 0 ? '#FFFFFF' : '#087C45',
                fontSize: '0.88rem',
                fontWeight: 800,
                boxShadow: itemsCount > 0 ? '0 4px 14px rgba(8, 124, 69, 0.35)' : 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <div style={{ position: 'relative' }}>
                <ShoppingBag size={17} />
                {itemsCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '-7px',
                      backgroundColor: '#F04438',
                      color: '#fff',
                      fontSize: '9.5px',
                      fontWeight: 900,
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1.5px solid #FFFFFF'
                    }}
                  >
                    {itemsCount}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </button>
          </nav>

          {/* Mobile Right Controls */}
          <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#F6FCF8',
                color: '#087C45',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Search size={18} />
            </button>

            <button
              onClick={openCart}
              style={{
                position: 'relative',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: itemsCount > 0 ? '#087C45' : '#EAF7EF',
                color: itemsCount > 0 ? '#FFFFFF' : '#087C45',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ShoppingBag size={18} />
              {itemsCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: '#F04438',
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: 900,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1.5px solid #FFFFFF'
                  }}
                >
                  {itemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#F0F4F2',
                color: '#202823',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown Bar */}
        {showMobileSearch && (
          <div className="mobile-only" style={{ padding: '8px 0 14px' }}>
            <SearchBar autoFocus />
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid #EAF0EC',
              padding: '16px 20px 24px',
              boxShadow: '0 10px 24px rgba(0,0,0,0.08)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <button
                onClick={() => scrollTo('restaurants')}
                style={{ textAlign: 'left', fontSize: '1rem', fontWeight: 700, color: '#202823' }}
              >
                Top Restaurants
              </button>
              <button
                onClick={() => scrollTo('trending')}
                style={{ textAlign: 'left', fontSize: '1rem', fontWeight: 700, color: '#202823' }}
              >
                Trending Dishes
              </button>
              <button
                onClick={() => scrollTo('offers')}
                style={{ textAlign: 'left', fontSize: '1rem', fontWeight: 700, color: '#202823' }}
              >
                Offers & Promo Codes
              </button>
              <button
                onClick={() => scrollTo('auth-experience')}
                style={{ textAlign: 'left', fontSize: '1rem', fontWeight: 700, color: '#087C45' }}
              >
                Video Login & Signup
              </button>
              <button
                onClick={() => scrollTo('tracking')}
                style={{ textAlign: 'left', fontSize: '1rem', fontWeight: 700, color: '#202823' }}
              >
                Live Order Tracking Simulator
              </button>
              <button
                onClick={() => scrollTo('faq')}
                style={{ textAlign: 'left', fontSize: '1rem', fontWeight: 700, color: '#202823' }}
              >
                FAQs & Support Care
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
