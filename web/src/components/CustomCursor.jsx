import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Ban, CheckCircle2, AlertCircle } from 'lucide-react';
import { useFood } from '../context/FoodContext';

export default function CustomCursor() {
  const { customCursor } = useFood();
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isPointerOnScreen, setIsPointerOnScreen] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
                      'ontouchstart' in window ||
                      navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsPointerOnScreen(true);
    };

    const handleMouseLeave = () => {
      setIsPointerOnScreen(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Do not render on touch devices
  if (isTouchDevice || !isPointerOnScreen || !customCursor.active) {
    return null;
  }

  const isAvailable = customCursor.type === 'available';

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        willChange: 'transform'
      }}
    >
      <AnimatePresence>
        <motion.div
          key={customCursor.type}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 350 }}
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Circular Animation Ring */}
          <div
            style={{
              position: 'absolute',
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              border: `2px solid ${isAvailable ? 'rgba(8, 124, 69, 0.5)' : 'rgba(240, 68, 56, 0.5)'}`,
              animation: isAvailable ? 'cursorRippleAvailable 1.6s infinite' : 'cursorRippleSoldOut 1.6s infinite',
              pointerEvents: 'none'
            }}
          />

          {/* Main Cursor Core */}
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: isAvailable ? '#087C45' : '#F04438',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isAvailable
                ? '0 8px 20px rgba(8, 124, 69, 0.45)'
                : '0 8px 20px rgba(240, 68, 56, 0.5)',
              border: '2.5px solid #FFFFFF',
              transition: 'background-color 0.25s ease'
            }}
          >
            {isAvailable ? (
              <ShoppingBag size={20} strokeWidth={2.4} />
            ) : (
              <Ban size={20} strokeWidth={2.4} />
            )}
          </div>

          {/* Text Label Pill */}
          <motion.div
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
            style={{
              marginTop: '8px',
              padding: '3px 10px',
              borderRadius: '12px',
              backgroundColor: isAvailable ? '#087C45' : '#F04438',
              color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.18)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              whiteSpace: 'nowrap'
            }}
          >
            {isAvailable ? (
              <>
                <CheckCircle2 size={11} strokeWidth={3} />
                AVAILABLE
              </>
            ) : (
              <>
                <AlertCircle size={11} strokeWidth={3} />
                OUT OF ORDER
              </>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

