import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { showToast } = useCart();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address');
      return;
    }
    if (!phone.trim()) {
      setError('Please provide your mobile number');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept the Terms & Conditions to proceed');
      return;
    }

    try {
      setIsLoading(true);
      await signup({ name: fullName, email, phone });
      showToast('Account created successfully! Welcome to YumDrop 🥳', 'success');
      navigate('/');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* 1. CINEMATIC FULL-SCREEN LOOPING FOOD PREPARATION VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          zIndex: 1
        }}
      >
        <source src="/videos/food_prep.mp4" type="video/mp4" />
        <source src="/videos/food_prep.webm" type="video/webm" />
        Your browser does not support HTML5 video.
      </video>

      {/* 2. DARK OVERLAY */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(6, 78, 53, 0.88) 0%, rgba(32, 40, 35, 0.84) 50%, rgba(8, 124, 69, 0.86) 100%)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 2
        }}
      />

      {/* 3. MAIN SIGNUP WRAPPER */}
      <div
        className="container-wide"
        style={{
          position: 'relative',
          zIndex: 3,
          padding: '40px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '48px',
          width: '100%'
        }}
      >
        {/* LEFT BRAND SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ color: '#FFFFFF', padding: '20px' }}
        >
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #087C45 0%, #064E35 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(8, 124, 69, 0.5)',
                border: '1.5px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2.5C12 2.5 5 11 5 15.5C5 19.09 7.91 22 11.5 22C15.09 22 18 19.09 18 15.5C18 11 12 2.5 12 2.5Z"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  fill="rgba(255,255,255,0.2)"
                />
                <circle cx="12" cy="11" r="2" fill="#F04438" />
              </svg>
            </div>
            <div>
              <span style={{ fontSize: '1.9rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
                Yum<span style={{ color: '#F04438' }}>Drop</span>
              </span>
              <div style={{ fontSize: '10px', color: '#A3D4B6', fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                Your Cravings. Our Delivery.
              </div>
            </div>
          </Link>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.18,
              marginBottom: '16px',
              color: '#FFFFFF'
            }}
          >
            Join 1M+ Foodies. <br />
            <span style={{ color: '#A3D4B6' }}>Relish Good Taste.</span>
          </h2>

          <p style={{ fontSize: '1.15rem', color: '#EAF7EF', lineHeight: 1.6, maxWidth: '460px', marginBottom: '32px' }}>
            Get instant access to top-rated biryanis, sourdough pizzas, artisanal desserts, and daily chef offers.
          </p>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              padding: '16px 20px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              maxWidth: '420px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}
          >
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#F04438', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
              🎁
            </div>
            <div>
              <strong style={{ fontSize: '0.96rem', display: 'block' }}>First Order Gift: ₹100 Instant Discount</strong>
              <span style={{ fontSize: '0.8rem', color: '#A3D4B6' }}>Apply coupon WELCOME100 after signing up</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SECTION: SIGNUP FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '480px',
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: '28px',
              padding: '36px 32px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.8)'
            }}
          >
            {/* Header Switcher Tabs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                backgroundColor: '#F0F4F2',
                padding: '4px',
                borderRadius: '9999px',
                marginBottom: '24px'
              }}
            >
              <button
                onClick={() => navigate('/login')}
                style={{
                  padding: '10px 0',
                  borderRadius: '9999px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#5E6962'
                }}
              >
                Login
              </button>
              <button
                style={{
                  padding: '10px 0',
                  borderRadius: '9999px',
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  backgroundColor: '#087C45',
                  color: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(8, 124, 69, 0.25)'
                }}
              >
                Sign Up
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#202823' }}>
                Create Your Account
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#5E6962', marginTop: '2px' }}>
                Sign up in seconds to start ordering from top restaurants.
              </p>
            </div>

            {error && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#FFF1F0',
                  color: '#F04438',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  marginBottom: '16px',
                  border: '1px solid rgba(240, 68, 56, 0.3)'
                }}
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Full Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#202823', marginBottom: '5px' }}>
                  Full Name
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #D6E4DB',
                    borderRadius: '12px',
                    padding: '10px 14px'
                  }}
                >
                  <User size={17} color="#087C45" style={{ marginRight: '10px', flexShrink: 0 }} />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Arjun Verma"
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
              </div>

              {/* Email & Phone Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#202823', marginBottom: '5px' }}>
                    Email Address
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid #D6E4DB',
                      borderRadius: '12px',
                      padding: '10px 14px'
                    }}
                  >
                    <Mail size={16} color="#087C45" style={{ marginRight: '8px', flexShrink: 0 }} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      style={{
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        width: '100%',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: '#202823'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#202823', marginBottom: '5px' }}>
                    Mobile Number
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid #D6E4DB',
                      borderRadius: '12px',
                      padding: '10px 14px'
                    }}
                  >
                    <Phone size={16} color="#087C45" style={{ marginRight: '8px', flexShrink: 0 }} />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      style={{
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        width: '100%',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: '#202823'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Password & Confirm Password Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#202823', marginBottom: '5px' }}>
                    Password
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid #D6E4DB',
                      borderRadius: '12px',
                      padding: '10px 12px'
                    }}
                  >
                    <Lock size={16} color="#087C45" style={{ marginRight: '8px', flexShrink: 0 }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 6 chars"
                      style={{
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        width: '100%',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: '#202823'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#202823', marginBottom: '5px' }}>
                    Confirm Password
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid #D6E4DB',
                      borderRadius: '12px',
                      padding: '10px 12px'
                    }}
                  >
                    <Lock size={16} color="#087C45" style={{ marginRight: '8px', flexShrink: 0 }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      style={{
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        width: '100%',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: '#202823'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ color: '#5E6962', padding: '2px', display: 'flex', alignItems: 'center' }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '4px' }}>
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  style={{ accentColor: '#087C45', width: '16px', height: '16px', marginTop: '2px', cursor: 'pointer' }}
                />
                <label htmlFor="agree" style={{ fontSize: '0.8rem', color: '#5E6962', lineHeight: 1.4, cursor: 'pointer' }}>
                  I agree to YumDrop's <Link to="/help" style={{ color: '#087C45', fontWeight: 700 }}>Terms of Service</Link> and <Link to="/help" style={{ color: '#087C45', fontWeight: 700 }}>Privacy Policy</Link>.
                </label>
              </div>

              {/* Create Account CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '13px',
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  marginTop: '8px'
                }}
              >
                {isLoading ? (
                  <span>Creating your account...</span>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* Already have an account */}
              <div style={{ textAlign: 'center', marginTop: '6px', fontSize: '0.85rem', color: '#5E6962' }}>
                Already a YumDrop member?{' '}
                <Link to="/login" style={{ fontWeight: 800, color: '#087C45', textDecoration: 'underline' }}>
                  Log In
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

