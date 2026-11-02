import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ShieldCheck, Heart, Sparkles, Phone, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { assetUrl } from '../utils/assetUrl';

export default function Footer() {
  const { showToast } = useCart();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      showToast('Thank you for subscribing to YumDrop newsletter! ✉️');
      setEmail('');
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#064E35', // Deep Green
        color: '#FFFFFF',
        paddingTop: '64px',
        paddingBottom: '32px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        marginTop: '60px'
      }}
    >
      <div className="container-wide">
        {/* Top Newsletter Strip */}
        <div
          style={{
            backgroundColor: 'rgba(8, 124, 69, 0.35)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '24px',
            padding: '32px 36px',
            marginBottom: '54px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div style={{ maxWidth: '480px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sparkles size={18} color="#D4AF37" />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#D4AF37', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Exclusive Cravings Club
              </span>
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1.25, color: '#FFFFFF' }}>
              Get 50% OFF your first order delivered
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#A3D4B6', marginTop: '6px' }}>
              Join 1,00,000+ foodies getting secret flash deals, weekly coupons, and new chef menus.
            </p>
          </div>

          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '440px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '9999px',
                padding: '4px 16px',
                flexGrow: 1
              }}
            >
              <Mail size={18} color="#087C45" style={{ marginRight: '8px' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  width: '100%',
                  fontSize: '0.9rem',
                  color: '#202823',
                  fontWeight: 600
                }}
              />
            </div>
            <button
              type="submit"
              className="btn-danger"
              style={{
                borderRadius: '9999px',
                padding: '12px 24px',
                fontWeight: 800,
                fontSize: '0.9rem',
                flexShrink: 0
              }}
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Main Footer Links Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '48px'
          }}
        >
          {/* Brand Info Column */}
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: '#087C45',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2.5C12 2.5 5 11 5 15.5C5 19.09 7.91 22 11.5 22C15.09 22 18 19.09 18 15.5C18 11 12 2.5 12 2.5Z"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="11" r="1.8" fill="#F04438" />
                </svg>
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFFFFF' }}>
                Yum<span style={{ color: '#F04438' }}>Drop</span>
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#A3D4B6', lineHeight: 1.6, marginBottom: '20px' }}>
              "Your Cravings. Our Delivery." Discover, order, and relish hand-crafted meals from Bengaluru’s highest-rated culinary hubs.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a href="#facebook" style={{ opacity: 0.85, transition: 'opacity 0.2s' }}>
                <img src={assetUrl("/images/icon-facebook.png")} alt="Facebook" style={{ width: '28px', height: '28px' }} />
              </a>
              <a href="#instagram" style={{ opacity: 0.85, transition: 'opacity 0.2s' }}>
                <img src={assetUrl("/images/icon-instagram.png")} alt="Instagram" style={{ width: '28px', height: '28px' }} />
              </a>
              <a href="#twitter" style={{ opacity: 0.85, transition: 'opacity 0.2s' }}>
                <img src={assetUrl("/images/icon-twitter.png")} alt="Twitter" style={{ width: '28px', height: '28px' }} />
              </a>
              <a href="#linkedin" style={{ opacity: 0.85, transition: 'opacity 0.2s' }}>
                <img src={assetUrl("/images/icon-linkedin.png")} alt="LinkedIn" style={{ width: '28px', height: '28px' }} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '18px' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/help" style={{ fontSize: '0.88rem', color: '#A3D4B6', transition: 'color 0.15s' }}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/help" style={{ fontSize: '0.88rem', color: '#A3D4B6' }}>
                  Careers (We're Hiring!)
                </Link>
              </li>
              <li>
                <Link to="/offers" style={{ fontSize: '0.88rem', color: '#A3D4B6' }}>
                  Offers & Coupons
                </Link>
              </li>
              <li>
                <Link to="/help" style={{ fontSize: '0.88rem', color: '#A3D4B6' }}>
                  YumDrop Impact
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '18px' }}>
              Help & Support
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/help" style={{ fontSize: '0.88rem', color: '#A3D4B6' }}>
                  Help Center & FAQs
                </Link>
              </li>
              <li>
                <Link to="/orders" style={{ fontSize: '0.88rem', color: '#A3D4B6' }}>
                  Track Active Order
                </Link>
              </li>
              <li>
                <Link to="/help" style={{ fontSize: '0.88rem', color: '#A3D4B6' }}>
                  Partner Support
                </Link>
              </li>
              <li>
                <Link to="/help" style={{ fontSize: '0.88rem', color: '#A3D4B6' }}>
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/help" style={{ fontSize: '0.88rem', color: '#A3D4B6' }}>
                  Safety & Hygiene Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Partner & Download */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '18px' }}>
              For Food Partners
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <li>
                <Link to="/help" style={{ fontSize: '0.88rem', color: '#A3D4B6' }}>
                  Restaurant Partner Registration
                </Link>
              </li>
              <li>
                <Link to="/help" style={{ fontSize: '0.88rem', color: '#A3D4B6' }}>
                  Partner Dashboard
                </Link>
              </li>
              <li>
                <Link to="/help" style={{ fontSize: '0.88rem', color: '#A3D4B6' }}>
                  Rider Delivery Fleet Join
                </Link>
              </li>
            </ul>

            {/* App Store / Play Store Badges */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <img
                src={assetUrl("/images/app_store.png")}
                alt="App Store"
                style={{ height: '36px', borderRadius: '6px', cursor: 'pointer' }}
              />
              <img
                src={assetUrl("/images/play_store.png")}
                alt="Google Play"
                style={{ height: '36px', borderRadius: '6px', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.82rem',
            color: '#A3D4B6'
          }}
        >
          <div>
            © 2026 YumDrop Technologies Pvt. Ltd. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '18px' }}>
            <Link to="/help" style={{ color: '#A3D4B6' }}>Privacy Policy</Link>
            <span>•</span>
            <Link to="/help" style={{ color: '#A3D4B6' }}>Terms of Service</Link>
            <span>•</span>
            <Link to="/help" style={{ color: '#A3D4B6' }}>Cookie Policy</Link>
            <span>•</span>
            <Link to="/help" style={{ color: '#A3D4B6' }}>Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
