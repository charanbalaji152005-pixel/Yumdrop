import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Search,
  Send,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const FAQS = [
  {
    q: "How does YumDrop deliver my meals so quickly?",
    a: "We partner with hyper-local cloud kitchens and restaurants with dedicated live prep slots and automated order routing to nearby electric delivery captains within a 5-8km radius."
  },
  {
    q: "What benefits do I get with YumDrop GOLD?",
    a: "YumDrop GOLD members get unlimited free deliveries on eligible orders above ₹199, up to 40% exclusive restaurant discounts, priority dispatch, and special birthday rewards."
  },
  {
    q: "How do I apply coupon codes?",
    a: "You can copy coupon codes from our Offers page or enter them directly inside your cart drawer or checkout page in the 'Enter Promo Code' box."
  },
  {
    q: "What should I do if an item is marked Out of Stock?",
    a: "Simply click the 'Notify Me' button on the food card. You will receive an immediate notification as soon as the kitchen updates their inventory!"
  },
  {
    q: "Can I cancel or modify my order after placing it?",
    a: "Orders can be cancelled before the restaurant accepts it (Stage 1: Order Placed). Once food preparation begins, cancellations may incur a nominal restaurant prep fee."
  },
  {
    q: "Are the payments safe and secure?",
    a: "Yes! All transactions on YumDrop are secured via 256-bit bank grade encryption. In this demonstration prototype, mock sandboxed simulations are active."
  }
];

export default function Help() {
  const { showToast } = useCart();
  const [openFaq, setOpenFaq] = useState(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Live Chat Simulator State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I am DropBot, your YumDrop Support Assistant. How can I assist you with your craving or delivery today?' }
  ]);
  const [inputChat, setInputChat] = useState('');

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!inputChat.trim()) return;

    const userText = inputChat;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputChat('');

    setTimeout(() => {
      let botReply = "Thank you for reaching out! Our team is monitoring your delivery status. Everything is on schedule.";
      if (userText.toLowerCase().includes('gold')) {
        botReply = "YumDrop GOLD provides zero delivery fee waivers and up to 40% VIP discounts on all partner kitchens!";
      } else if (userText.toLowerCase().includes('refund') || userText.toLowerCase().includes('cancel')) {
        botReply = "Refunds are processed automatically to your original payment method within 2-4 hours.";
      } else if (userText.toLowerCase().includes('coupon') || userText.toLowerCase().includes('discount')) {
        botReply = "Try using coupon code YUMDROP50 for 50% discount or BOGOFEAST for Buy 1 Get 1 Free!";
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 700);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Support ticket #YD-9912 submitted! Our executive will call you within 15 minutes. 🎫');
    setTicketSubject('');
    setTicketMessage('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', paddingBottom: '90px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #087C45 0%, #064E35 100%)',
          color: '#FFFFFF',
          padding: '54px 0 42px'
        }}
      >
        <div className="container-wide">
          <div style={{ maxWidth: '640px' }}>
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
                color: '#A3D4B6'
              }}
            >
              <HelpCircle size={14} />
              24/7 CUSTOMER CARE
            </div>
            <h1 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', fontWeight: 900, marginTop: '14px', marginBottom: '10px' }}>
              We're Here To Help
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#A3D4B6', lineHeight: 1.55 }}>
              Questions about an order, restaurant hygiene, GOLD membership, or refunds? Get instant support right here.
            </p>
          </div>
        </div>
      </div>

      <div className="container-wide" style={{ marginTop: '48px' }}>
        {/* 3 Quick Action Contact Tiles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '24px',
              border: '1.5px solid #EAF0EC',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#EAF7EF', color: '#087C45', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#202823' }}>Phone Support</h3>
            <p style={{ fontSize: '0.85rem', color: '#5E6962', lineHeight: 1.45 }}>
              Toll-free customer hotline for urgent delivery assistance.
            </p>
            <a
              href="tel:1800123986"
              style={{ fontSize: '0.92rem', fontWeight: 800, color: '#087C45', marginTop: 'auto' }}
            >
              1800-123-YUM (986) →
            </a>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '24px',
              border: '1.5px solid #EAF0EC',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#EAF7EF', color: '#087C45', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mail size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#202823' }}>Email Assistance</h3>
            <p style={{ fontSize: '0.85rem', color: '#5E6962', lineHeight: 1.45 }}>
              Reach out for corporate partnerships, refunds, or invoice inquiries.
            </p>
            <a
              href="mailto:support@yumdrop.com"
              style={{ fontSize: '0.92rem', fontWeight: 800, color: '#087C45', marginTop: 'auto' }}
            >
              support@yumdrop.com →
            </a>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '24px',
              border: '1.5px solid #EAF0EC',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#EAF7EF', color: '#087C45', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#202823' }}>Instant Resolution</h3>
            <p style={{ fontSize: '0.85rem', color: '#5E6962', lineHeight: 1.45 }}>
              Average response time under 90 seconds with our dedicated AI agent.
            </p>
            <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#087C45', marginTop: 'auto' }}>
              24×7 Active Operation
            </span>
          </div>
        </div>

        {/* 2-Column: FAQs on Left, Live Chat & Ticket on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'flex-start'
          }}
        >
          {/* LEFT: FAQS ACCORDION */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#202823', marginBottom: '20px' }}>
              Frequently Asked Questions
            </h2>

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
                      overflow: 'hidden',
                      transition: 'border-color 0.2s ease'
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
                        fontSize: '0.96rem',
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
          </div>

          {/* RIGHT: LIVE SUPPORT CHAT SIMULATOR */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px',
              border: '1.5px solid #EAF0EC',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              height: '520px'
            }}
          >
            {/* Chat Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #F0F4F2', paddingBottom: '14px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#087C45', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={18} />
                </div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e', border: '2px solid #fff' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#202823' }}>DropBot Support Assistant</h4>
                <span style={{ fontSize: '0.78rem', color: '#087C45', fontWeight: 700 }}>Online • Instant Replies</span>
              </div>
            </div>

            {/* Chat Body */}
            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    backgroundColor: msg.sender === 'user' ? '#087C45' : '#F4F7F5',
                    color: msg.sender === 'user' ? '#FFFFFF' : '#202823',
                    fontSize: '0.88rem',
                    lineHeight: 1.45
                  }}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F0F4F2', paddingTop: '12px' }}>
              <input
                type="text"
                value={inputChat}
                onChange={(e) => setInputChat(e.target.value)}
                placeholder="Ask about orders, GOLD, coupons..."
                style={{
                  flexGrow: 1,
                  padding: '10px 16px',
                  borderRadius: '9999px',
                  border: '1.5px solid #D6E4DB',
                  outline: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600
                }}
              />
              <button
                type="submit"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#087C45',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

