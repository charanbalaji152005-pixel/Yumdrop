import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Sparkles,
  Crown,
  Flame,
  Percent,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star,
  MapPin,
  Heart,
  Plus,
  Minus,
  Bell,
  BellCheck,
  Calculator,
  Film,
  Truck,
  Zap,
  Gift,
  Copy,
  Check,
  X,
  Play,
  Bike,
  ChefHat,
  Home as HomeIcon,
  Phone,
  MessageSquare,
  QrCode,
  CreditCard,
  Banknote,
  Info,
  ChevronDown,
  ChevronUp,
  Send,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useFood } from '../context/FoodContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { offersData } from '../data/offers';
import FoodCard from '../components/FoodCard';
import RestaurantCard from '../components/RestaurantCard';
import OfferCard from '../components/OfferCard';
import SearchBar from '../components/SearchBar';

const STAGES = [
  { stage: 1, title: "Order Placed", desc: "Sent to kitchen", icon: Clock },
  { stage: 2, title: "Restaurant Confirmed", desc: "Accepted", icon: CheckCircle2 },
  { stage: 3, title: "Food Preparing", desc: "Chef cooking", icon: ChefHat },
  { stage: 4, title: "Out for Delivery", desc: "Rider on way", icon: Bike },
  { stage: 5, title: "Delivered", desc: "Enjoy meal!", icon: HomeIcon },
];

const FAQS = [
  {
    q: "How does YumDrop deliver my meals so quickly?",
    a: "We partner with hyper-local cloud kitchens and restaurants with dedicated live prep slots and automated order routing to nearby electric delivery captains within a 5-8km radius."
  },
  {
    q: "How can I get free delivery on my orders?",
    a: "Use coupon code FREEDEL at checkout to enjoy zero delivery charges on eligible feast orders, or explore selected restaurants offering complimentary delivery."
  },
  {
    q: "How does the custom stock and out-of-stock cursor work?",
    a: "Hover your mouse over any food card: in-stock items display a green food basket icon with an 'AVAILABLE' label; sold-out dishes display a tomato-red crossed icon with a 'SOLD OUT' label and a 'Notify Me' restock alert."
  },
  {
    q: "How do I apply coupon codes?",
    a: "You can copy coupon codes directly from the Offers section or apply them to your active cart with one click."
  },
  {
    q: "Are the payments safe and secure?",
    a: "Yes! All transactions on YumDrop are simulated with a sandbox checkout flow for secure demonstration."
  }
];

export default function Home() {
  const {
    restaurants,
    foods,
    categories,
    selectedCategory,
    setSelectedCategory,
    toggleItemStock
  } = useFood();

  const {
    cartItems,
    openCart,
    showToast,
    subtotal,
    deliveryFee,
    packagingFee,
    taxes,
    finalPayable,
    clearCart
  } = useCart();

  const { user, login, signup, addOrder, orders, updateOrderStatus } = useAuth();

  // Landing page interactive states
  const [restaurantFilterCuisine, setRestaurantFilterCuisine] = useState('All');
  const [selectedOfferCategory, setSelectedOfferCategory] = useState('All');

  // Video Auth Card State
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'signup'
  const [authEmail, setAuthEmail] = useState('arjun.verma@example.com');
  const [authPassword, setAuthPassword] = useState('password123');
  const [authName, setAuthName] = useState('Arjun Verma');
  const [authPhone, setAuthPhone] = useState('+91 98765 43210');
  const [showAuthPass, setShowAuthPass] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Live Tracking Demo State
  const [activeOrderStage, setActiveOrderStage] = useState(3); // Food preparing

  // Menu Modal State (when clicking View Menu from restaurant card)
  const [activeMenuRestaurant, setActiveMenuRestaurant] = useState(null);

  // FAQ State
  const [openFaq, setOpenFaq] = useState(0);

  // Chat Simulator State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I am DropBot, your YumDrop Support Assistant. Ask me anything about dishes, restaurants, coupons, or order tracking!' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Filtered restaurants for the section
  const displayedRestaurants = useMemo(() => {
    if (restaurantFilterCuisine === 'All') return restaurants;
    return restaurants.filter(r => r.cuisine.some(c => c.toLowerCase() === restaurantFilterCuisine.toLowerCase()));
  }, [restaurants, restaurantFilterCuisine]);

  // Filtered offers
  const displayedOffers = useMemo(() => {
    if (selectedOfferCategory === 'All') return offersData;
    return offersData.filter(o => o.category.toLowerCase() === selectedOfferCategory.toLowerCase());
  }, [selectedOfferCategory]);

  // Auth Submit handler
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setIsAuthLoading(true);
    try {
      if (authTab === 'login') {
        await login(authEmail, authPassword);
        showToast('Logged in successfully! Welcome to YumDrop 🎉');
      } else {
        await signup({ name: authName, email: authEmail, phone: authPhone });
        showToast('Account created successfully! Welcome to YumDrop 🥳');
      }
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Advance live order stage simulator
  const handleAdvanceStage = () => {
    setActiveOrderStage(prev => {
      const next = prev < 5 ? prev + 1 : 1;
      const stageMeta = STAGES.find(s => s.stage === next);
      showToast(`Tracking status updated: ${stageMeta.title} 🚀`);
      return next;
    });
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const text = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text }]);
    setChatInput('');
    setTimeout(() => {
      let reply = "I am monitoring your orders and live kitchen preparation! Everything is running smooth.";
      if (text.toLowerCase().includes('coupon') || text.toLowerCase().includes('offer') || text.toLowerCase().includes('discount')) {
        reply = "Use coupon code YUMDROP50 for 50% discount, BOGOFEAST for Buy 1 Get 1 Free, or FREEDEL for zero delivery charges!";
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', position: 'relative' }}>

      {/* ========================================================
          1. HERO SECTION (#hero)
          ======================================================== */}
      <section
        id="hero"
        style={{
          position: 'relative',
          background: 'linear-gradient(180deg, #EAF7EF 0%, #FFFFFF 100%)',
          paddingTop: '48px',
          paddingBottom: '64px',
          overflow: 'hidden'
        }}
      >
        {/* Decorative blur blob */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(8, 124, 69, 0.14) 0%, rgba(255,255,255,0) 70%)',
            pointerEvents: 'none'
          }}
        />

        <div className="container-wide">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              alignItems: 'center',
              gap: '40px'
            }}
          >
            {/* Left Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#FFFFFF',
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  boxShadow: '0 4px 14px rgba(8, 124, 69, 0.12)',
                  border: '1px solid #D6E4DB',
                  marginBottom: '20px'
                }}
              >
                <span
                  style={{
                    backgroundColor: '#F04438',
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    letterSpacing: '0.4px'
                  }}
                >
                  FASTEST DELIVERY
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#087C45' }}>
                  ⚡ Delivering steaming hot meals in 20-30 mins
                </span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                  fontWeight: 900,
                  color: '#202823',
                  lineHeight: 1.15,
                  letterSpacing: '-1px',
                  marginBottom: '18px'
                }}
              >
                Discover Food That <br />
                <span style={{ color: '#087C45' }}>Makes You Happy.</span>
              </h1>

              <p
                style={{
                  fontSize: '1.12rem',
                  color: '#5E6962',
                  lineHeight: 1.6,
                  maxWidth: '520px',
                  marginBottom: '32px'
                }}
              >
                "Your Cravings. Our Delivery." Handpicked royal dum biryanis, sourdough woodfired pizzas, wok noodles, and artisan desserts delivered fresh in Bengaluru.
              </p>

              {/* Live Search Bar */}
              <div style={{ maxWidth: '500px', marginBottom: '28px' }}>
                <SearchBar placeholder="Try searching 'Hyderabadi Dum Biryani' or 'Truffle Pizza'" />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <a
                  href="#trending"
                  className="btn-primary"
                  style={{ padding: '14px 30px', fontSize: '1.02rem' }}
                >
                  <span>Explore Trending Dishes</span>
                  <ArrowRight size={18} />
                </a>

                <a
                  href="#auth-experience"
                  className="btn-secondary"
                  style={{ padding: '14px 26px', fontSize: '1.02rem' }}
                >
                  <Film size={18} />
                  <span>Watch Kitchen Video</span>
                </a>
              </div>

              {/* Trust badges */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  marginTop: '36px',
                  paddingTop: '24px',
                  borderTop: '1px solid #D6E4DB'
                }}
              >
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#087C45' }}>500+</div>
                  <div style={{ fontSize: '0.8rem', color: '#5E6962', fontWeight: 600 }}>Curated Kitchens</div>
                </div>
                <div style={{ height: '30px', width: '1px', backgroundColor: '#D6E4DB' }} />
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#087C45' }}>25 Min</div>
                  <div style={{ fontSize: '0.8rem', color: '#5E6962', fontWeight: 600 }}>Avg Delivery Time</div>
                </div>
                <div style={{ height: '30px', width: '1px', backgroundColor: '#D6E4DB' }} />
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#087C45' }}>4.8 ★</div>
                  <div style={{ fontSize: '0.8rem', color: '#5E6962', fontWeight: 600 }}>Customer Rating</div>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
            >
              <div
                style={{
                  position: 'relative',
                  width: 'min(440px, 90vw)',
                  height: 'min(440px, 90vw)',
                  borderRadius: '50%',
                  background: 'linear-gradient(145deg, #087C45 0%, #064E35 100%)',
                  padding: '12px',
                  boxShadow: '0 24px 60px rgba(8, 124, 69, 0.35)'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '5px solid #FFFFFF'
                  }}
                >
                  <img
                    src="/images/70127abf-d5b0-4856-a439-703e4ee48934_1209174.jpg"
                    alt="Royal Dum Biryani"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Floating Card 1 */}
                <motion.div
                  className="animate-float"
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '-20px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '12px 18px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.14)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: '1px solid #EAF0EC'
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#FFF1F0', color: '#F04438', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                    %
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#202823' }}>FLAT 50% OFF</div>
                    <div style={{ fontSize: '0.74rem', color: '#5E6962' }}>Use code YUMDROP50</div>
                  </div>
                </motion.div>

                {/* Floating Card 2 */}
                <motion.div
                  className="animate-float-delayed"
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '-25px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '12px 18px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.14)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: '1px solid #EAF0EC'
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#EAF7EF', color: '#087C45', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#202823' }}>22 Mins Arrival</div>
                    <div style={{ fontSize: '0.74rem', color: '#087C45', fontWeight: 700 }}>Chef preparing order</div>
                  </div>
                </motion.div>

                {/* Floating Card 3 */}
                <a
                  href="#offers"
                  style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '30px',
                    background: 'linear-gradient(135deg, #F04438 0%, #D92D20 100%)',
                    color: '#FFFFFF',
                    borderRadius: '14px',
                    padding: '8px 16px',
                    boxShadow: '0 8px 24px rgba(240, 68, 56, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    textDecoration: 'none'
                  }}
                >
                  <Percent size={16} />
                  <span>50% OFF & Free Delivery</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. FOOD CATEGORIES SECTION (#categories)
          ======================================================== */}
      <section id="categories" style={{ padding: '60px 0 40px', backgroundColor: '#FFFFFF' }}>
        <div className="container-wide">
          <div className="section-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Flame size={20} color="#F04438" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#F04438', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  Explore Cuisines
                </span>
              </div>
              <h2 className="section-title">What's On Your Mind?</h2>
              <p className="section-subtitle">Click any cuisine to filter our popular restaurants below</p>
            </div>
          </div>

          <div
            className="grid-categories"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: '20px',
              textAlign: 'center'
            }}
          >
            {categories.map((cat) => {
              const isSelected = restaurantFilterCuisine === cat.name;

              return (
                <motion.div
                  key={cat.id}
                  whileHover={{ y: -8, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setRestaurantFilterCuisine(isSelected ? 'All' : cat.name);
                    const restEl = document.getElementById('restaurants');
                    if (restEl) restEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div
                    style={{
                      width: '84px',
                      height: '84px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? '#EAF7EF' : '#F4F8F5',
                      border: isSelected ? '2.5px solid #087C45' : '2px solid #E2ECE5',
                      boxShadow: '0 6px 16px rgba(8, 124, 69, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '10px',
                      overflow: 'hidden',
                      padding: '8px'
                    }}
                  >
                    <img
                      src={cat.icon}
                      alt={cat.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: isSelected ? '#087C45' : '#202823' }}>
                    {cat.name}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: '#5E6962', marginTop: '2px' }}>
                    {cat.count}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. POPULAR RESTAURANTS SECTION (#restaurants)
          ======================================================== */}
      <section id="restaurants" style={{ padding: '50px 0 64px', backgroundColor: '#F8FCF9', borderTop: '1px solid #EAF0EC' }}>
        <div className="container-wide">
          <div className="section-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#087C45', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  Top Culinary Destinations
                </span>
              </div>
              <h2 className="section-title">Popular Restaurants In Bengaluru</h2>
              <p className="section-subtitle">
                {restaurantFilterCuisine === 'All' ? 'Showing all verified partner restaurants' : `Filtered for "${restaurantFilterCuisine}"`}
              </p>
            </div>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setRestaurantFilterCuisine('All')}
                className={`filter-pill ${restaurantFilterCuisine === 'All' ? 'active' : ''}`}
              >
                All
              </button>
              {['Biryani', 'Pizza', 'Chinese', 'South Indian', 'Burgers'].map(c => (
                <button
                  key={c}
                  onClick={() => setRestaurantFilterCuisine(c)}
                  className={`filter-pill ${restaurantFilterCuisine === c ? 'active' : ''}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Restaurant Grid */}
          <div
            className="grid-restaurants"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '28px'
            }}
          >
            {displayedRestaurants.map(rest => (
              <RestaurantCard key={rest.id} restaurant={rest} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. TRENDING DISHES (#trending)
          ======================================================== */}
      <section id="trending" style={{ padding: '64px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container-wide">
          <div className="section-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Sparkles size={18} color="#087C45" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#087C45', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  Handcrafted Cravings
                </span>
              </div>
              <h2 className="section-title">Trending Dishes Ready To Drop</h2>
              <p className="section-subtitle">Add directly to cart or set instant restock alerts for out-of-order items</p>
            </div>
          </div>

          {/* Food Cards Grid */}
          <div
            className="grid-foods"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {foods.slice(0, 8).map(food => (
              <FoodCard key={food.id} food={food} showRestaurant={true} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. OFFERS & PROMO VAULT SECTION (#offers)
          ======================================================== */}
      <section id="offers" style={{ padding: '64px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container-wide">
          <div className="section-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Percent size={18} color="#F04438" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#F04438', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  Deals & Discounts
                </span>
              </div>
              <h2 className="section-title">Exclusive YumDrop Coupons</h2>
              <p className="section-subtitle">Copy any code with one click or apply directly to your feast cart</p>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['All', 'Featured', 'Combos', 'Delivery', 'Mega Deals', 'Welcome'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedOfferCategory(cat)}
                  className={`filter-pill ${selectedOfferCategory === cat ? 'active' : ''}`}
                >
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {displayedOffers.map(offer => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          7. CINEMATIC FOOD PREP VIDEO & AUTH EXPERIENCE (#auth-experience)
          ======================================================== */}
      <section
        id="auth-experience"
        style={{
          position: 'relative',
          padding: '80px 0',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Full-Screen Looping Cooking Video Background */}
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
        </video>

        {/* Dark Transparent Overlay with Blur */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(6, 78, 53, 0.9) 0%, rgba(32, 40, 35, 0.86) 50%, rgba(8, 124, 69, 0.88) 100%)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 2
          }}
        />

        <div className="container-wide" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              alignItems: 'center',
              gap: '48px'
            }}
          >
            {/* Left Brand Pitch */}
            <div style={{ color: '#FFFFFF' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  padding: '4px 14px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  color: '#A3D4B6',
                  marginBottom: '16px'
                }}
              >
                <Film size={14} />
                CINEMATIC KITCHEN EXPERIENCE
              </div>

              <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '14px' }}>
                Good Food. <br />
                <span style={{ color: '#A3D4B6' }}>Great Mood.</span>
              </h2>

              <p style={{ fontSize: '1.15rem', color: '#EAF7EF', lineHeight: 1.6, maxWidth: '460px', marginBottom: '28px' }}>
                "Your favourite meals are just a drop away." Sign in to sync your saved addresses, track live orders, and enjoy exclusive discounts.
              </p>

              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  padding: '16px 20px',
                  borderRadius: '18px',
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
                  <strong style={{ fontSize: '0.96rem', display: 'block' }}>First Order Gift: Flat ₹100 OFF</strong>
                  <span style={{ fontSize: '0.8rem', color: '#A3D4B6' }}>Code: WELCOME100 active upon signing up</span>
                </div>
              </div>
            </div>

            {/* Right: Glassmorphism Authentication Card */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                {/* Switcher Tabs */}
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
                    onClick={() => setAuthTab('login')}
                    style={{
                      padding: '10px 0',
                      borderRadius: '9999px',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                      backgroundColor: authTab === 'login' ? '#087C45' : 'transparent',
                      color: authTab === 'login' ? '#FFFFFF' : '#5E6962',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setAuthTab('signup')}
                    style={{
                      padding: '10px 0',
                      borderRadius: '9999px',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                      backgroundColor: authTab === 'signup' ? '#087C45' : 'transparent',
                      color: authTab === 'signup' ? '#FFFFFF' : '#5E6962',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Sign Up
                  </button>
                </div>

                <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {authTab === 'signup' && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#202823', marginBottom: '5px' }}>
                        Full Name
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF', border: '1.5px solid #D6E4DB', borderRadius: '12px', padding: '10px 14px' }}>
                        <User size={16} color="#087C45" style={{ marginRight: '8px' }} />
                        <input
                          type="text"
                          required
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          placeholder="Arjun Verma"
                          style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.88rem', fontWeight: 600 }}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#202823', marginBottom: '5px' }}>
                      Email or Mobile
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF', border: '1.5px solid #D6E4DB', borderRadius: '12px', padding: '10px 14px' }}>
                      <Mail size={16} color="#087C45" style={{ marginRight: '8px' }} />
                      <input
                        type="text"
                        required
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="you@email.com"
                        style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.88rem', fontWeight: 600 }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#202823', marginBottom: '5px' }}>
                      Password
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF', border: '1.5px solid #D6E4DB', borderRadius: '12px', padding: '10px 14px' }}>
                      <Lock size={16} color="#087C45" style={{ marginRight: '8px' }} />
                      <input
                        type={showAuthPass ? 'text' : 'password'}
                        required
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="Secret password"
                        style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.88rem', fontWeight: 600 }}
                      />
                      <button type="button" onClick={() => setShowAuthPass(!showAuthPass)} style={{ color: '#5E6962' }}>
                        {showAuthPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isAuthLoading}
                    className="btn-primary"
                    style={{ width: '100%', padding: '13px', fontSize: '0.96rem', marginTop: '6px' }}
                  >
                    {isAuthLoading ? 'Processing...' : authTab === 'login' ? 'Login to YumDrop' : 'Create Account'}
                  </button>

                  <div style={{ textAlign: 'center', fontSize: '0.82rem', color: '#5E6962', marginTop: '6px' }}>
                    {authTab === 'login' ? (
                      <>New to YumDrop? <button type="button" onClick={() => setAuthTab('signup')} style={{ color: '#087C45', fontWeight: 800 }}>Create account</button></>
                    ) : (
                      <>Already have an account? <button type="button" onClick={() => setAuthTab('login')} style={{ color: '#087C45', fontWeight: 800 }}>Log in</button></>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. INTERACTIVE 5-STAGE ORDER TRACKING SIMULATOR (#tracking)
          ======================================================== */}
      <section id="tracking" style={{ padding: '64px 0', backgroundColor: '#F8FCF9', borderTop: '1px solid #EAF0EC' }}>
        <div className="container-wide">
          <div className="section-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Clock size={18} color="#087C45" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#087C45', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  Live Order Tracker
                </span>
              </div>
              <h2 className="section-title">Interactive Delivery Timeline</h2>
              <p className="section-subtitle">Real-time simulation of how your meal moves from the hot pan to your plate</p>
            </div>

            <button
              onClick={handleAdvanceStage}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.9rem' }}
            >
              <Play size={15} fill="#fff" />
              <span>Simulate Next Stage ({activeOrderStage}/5)</span>
            </button>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '36px 32px',
              border: '1.5px solid #EAF0EC',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
            }}
          >
            {/* 5-Stage Stepper Bar */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', margin: '20px 0 36px' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  right: '20px',
                  height: '4px',
                  backgroundColor: '#E2ECE5',
                  zIndex: 1
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((activeOrderStage - 1) / 4) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{ height: '100%', backgroundColor: '#087C45', borderRadius: '2px' }}
                />
              </div>

              {STAGES.map(s => {
                const IconComponent = s.icon;
                const isDone = activeOrderStage >= s.stage;
                const isCurrent = activeOrderStage === s.stage;

                return (
                  <div
                    key={s.stage}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                      zIndex: 2,
                      width: '70px',
                      textAlign: 'center'
                    }}
                  >
                    <motion.div
                      animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: isDone ? '#087C45' : '#FFFFFF',
                        color: isDone ? '#FFFFFF' : '#8C9B92',
                        border: isDone ? '2px solid #087C45' : '2px solid #D6E4DB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isDone ? '0 4px 12px rgba(8, 124, 69, 0.3)' : 'none',
                        marginBottom: '8px'
                      }}
                    >
                      <IconComponent size={20} strokeWidth={2.4} />
                    </motion.div>
                    <span style={{ fontSize: '11px', fontWeight: isDone ? 800 : 600, color: isDone ? '#202823' : '#8C9B92' }}>
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Simulated Delivery Captain Info Card */}
            <div
              style={{
                backgroundColor: '#F6FCF8',
                borderRadius: '18px',
                padding: '20px',
                border: '1px solid #D6E4DB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#087C45', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 900 }}>
                  R
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#202823' }}>Ramesh Kumar (Delivery Fleet Captain)</div>
                  <div style={{ fontSize: '0.82rem', color: '#5E6962' }}>Electric Hero Nyx (KA-01-EQ-4492) • 4.9 ★ • ETA 18 mins</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => showToast('Calling delivery rider Ramesh Kumar... 📞')}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  <Phone size={14} />
                  <span>Call Rider</span>
                </button>
                <button
                  onClick={() => showToast('Chat opened with delivery captain! 💬')}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  <MessageSquare size={14} />
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          9. FAQS & LIVE SUPPORT CHAT SIMULATOR (#faq)
          ======================================================== */}
      <section id="faq" style={{ padding: '64px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container-wide">
          <div className="section-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <HelpCircle size={18} color="#087C45" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#087C45', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  Customer Support
                </span>
              </div>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">Everything you need to know about ordering, delivery, and hygiene</p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px',
              alignItems: 'flex-start'
            }}
          >
            {/* FAQ Accordion */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;

                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1.5px solid #EAF0EC',
                      overflow: 'hidden'
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '18px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        color: isOpen ? '#087C45' : '#202823',
                        backgroundColor: isOpen ? '#F6FCF8' : '#FFFFFF'
                      }}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {isOpen && (
                      <div style={{ padding: '16px 20px', fontSize: '0.88rem', color: '#5E6962', lineHeight: 1.6, borderTop: '1px solid #EAF0EC' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Live Support Bot Simulator */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '24px',
                border: '1.5px solid #EAF0EC',
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                height: '420px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #F0F4F2', paddingBottom: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#087C45', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={17} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#202823' }}>DropBot Support Assistant</h4>
                  <span style={{ fontSize: '0.78rem', color: '#087C45', fontWeight: 700 }}>Online • Instant Replies</span>
                </div>
              </div>

              <div style={{ flexGrow: 1, overflowY: 'auto', padding: '14px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '82%',
                      padding: '10px 14px',
                      borderRadius: '14px',
                      backgroundColor: msg.sender === 'user' ? '#087C45' : '#F4F7F5',
                      color: msg.sender === 'user' ? '#FFFFFF' : '#202823',
                      fontSize: '0.86rem',
                      lineHeight: 1.4
                    }}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F0F4F2', paddingTop: '10px' }}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about orders, delivery, coupons..."
                  style={{
                    flexGrow: 1,
                    padding: '8px 14px',
                    borderRadius: '9999px',
                    border: '1.5px solid #D6E4DB',
                    outline: 'none',
                    fontSize: '0.85rem'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: '#087C45',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
