import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showToast } = useCart();

  const [identifier, setIdentifier] = useState('arjun.verma@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Please enter your email or mobile number');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    try {
      setIsLoading(true);
      await login(identifier, password);
      showToast('Logged in successfully! Welcome back to YumDrop 🎉');
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid credentials, please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(async () => {
      await login('google.user@gmail.com', 'demo');
      setIsLoading(false);
      showToast('Signed in with Google! Welcome back 🎉');
      navigate(from, { replace: true });
    }, 600);
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

      {/* 2. DARK TRANSPARENT OVERLAY WITH BLUR */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(6, 78, 53, 0.88) 0%, rgba(32, 40, 35, 0.82) 50%, rgba(8, 124, 69, 0.85) 100%)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 2
        }}
      />

      {/* 3. MAIN AUTH CONTAINER */}
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
        {/* LEFT SECTION: BRAND STORY & CINEMATIC COPY */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ color: '#FFFFFF', padding: '20px' }}
        >
          {/* Logo with original food-drop icon */}
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

          {/* Heading */}
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.18,
              marginBottom: '16px',
              color: '#FFFFFF'
            }}
          >
            Good Food. <br />
            <span style={{ color: '#A3D4B6' }}>Great Mood.</span>
          </h2>

          <p style={{ fontSize: '1.15rem', color: '#EAF7EF', lineHeight: 1.6, maxWidth: '460px', marginBottom: '32px' }}>
            "Your favourite meals are just a drop away." Relish live culinary perfection delivered steaming hot right to your doorstep.
          </p>

          {/* Live food promotional tags */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '420px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                padding: '12px 18px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#087C45', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={14} />
              </div>
              <div>
                <strong style={{ fontSize: '0.92rem' }}>50% OFF Welcome Bonus</strong>
                <p style={{ fontSize: '0.78rem', opacity: 0.85 }}>Auto-applied at checkout for new foodies</p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                padding: '12px 18px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#D4AF37', color: '#1a1600', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ★
              </div>
              <div>
                <strong style={{ fontSize: '0.92rem' }}>YumDrop GOLD Privileges</strong>
                <p style={{ fontSize: '0.78rem', opacity: 0.85 }}>Zero delivery fees and VIP restaurant priority</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SECTION: PREMIUM GLASSMORPHISM AUTH CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
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
                marginBottom: '28px'
              }}
            >
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
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                style={{
                  padding: '10px 0',
                  borderRadius: '9999px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#5E6962'
                }}
              >
                Sign Up
              </button>
            </div>

            <div style={{ marginBottom: '22px' }}>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#202823' }}>
                Welcome Back!
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#5E6962', marginTop: '4px' }}>
                Login to access your saved addresses, past orders and GOLD perks.
              </p>
            </div>

            {/* Error Message */}
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
                  marginBottom: '18px',
                  border: '1px solid rgba(240, 68, 56, 0.3)'
                }}
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Identifier Field */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#202823', marginBottom: '6px' }}>
                  Email or Mobile Number
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #D6E4DB',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <Mail size={18} color="#087C45" style={{ marginRight: '10px', flexShrink: 0 }} />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="name@example.com or 9876543210"
                    style={{
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      width: '100%',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      color: '#202823'
                    }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#202823' }}>
                    Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      showToast('Password reset link sent to registered email! 📧');
                    }}
                    style={{ fontSize: '0.78rem', fontWeight: 700, color: '#087C45' }}
                  >
                    Forgot Password?
                  </a>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #D6E4DB',
                    borderRadius: '12px',
                    padding: '12px 14px'
                  }}
                >
                  <Lock size={18} color="#087C45" style={{ marginRight: '10px', flexShrink: 0 }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your secret password"
                    style={{
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      width: '100%',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      color: '#202823'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ color: '#5E6962', padding: '2px', display: 'flex', alignItems: 'center' }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: '#087C45', width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <label htmlFor="remember" style={{ fontSize: '0.84rem', color: '#5E6962', fontWeight: 600, cursor: 'pointer' }}>
                  Remember my session
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '1rem',
                  fontWeight: 800,
                  marginTop: '6px'
                }}
              >
                {isLoading ? (
                  <span>Logging in securely...</span>
                ) : (
                  <>
                    <span>Login to YumDrop</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* Divider */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '8px 0',
                  gap: '12px',
                  color: '#9CA3AF',
                  fontSize: '0.78rem',
                  fontWeight: 700
                }}
              >
                <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#E2ECE5' }} />
                <span>OR CONTINUE WITH</span>
                <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#E2ECE5' }} />
              </div>

              {/* Google Login UI */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1.5px solid #D6E4DB',
                  backgroundColor: '#FFFFFF',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#202823',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Continue with Google
              </button>

              {/* Sign Up Link */}
              <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.86rem', color: '#5E6962' }}>
                New to YumDrop?{' '}
                <Link to="/signup" style={{ fontWeight: 800, color: '#087C45', textDecoration: 'underline' }}>
                  Create an account
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

