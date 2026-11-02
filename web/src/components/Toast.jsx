import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { notification } = useCart();

  if (!notification) return null;

  const isError = notification.type === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 999999,
        pointerEvents: 'none'
      }}
    >
      <AnimatePresence>
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{
            backgroundColor: isError ? '#F04438' : '#087C45',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '9999px',
            boxShadow: isError
              ? '0 12px 30px rgba(240, 68, 56, 0.45)'
              : '0 12px 30px rgba(8, 124, 69, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.92rem',
            fontWeight: 700,
            border: '2px solid rgba(255, 255, 255, 0.35)',
            pointerEvents: 'auto'
          }}
        >
          {isError ? (
            <AlertCircle size={20} strokeWidth={2.5} />
          ) : (
            <CheckCircle2 size={20} strokeWidth={2.5} />
          )}
          <span>{notification.message}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

