import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { offersData } from '../data/offers';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('yumdrop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('yumdrop_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('yumdrop_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('yumdrop_coupon', JSON.stringify(appliedCoupon));
    } catch (e) {
      console.error(e);
    }
  }, [appliedCoupon]);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(prev => (prev?.message === message ? null : prev));
    }, 3200);
  };

  const addToCart = (food) => {
    if (!food.inStock) {
      showToast(`${food.name} is currently Out of Stock!`, 'error');
      return;
    }

    setCartItems(prev => {
      // If cart has items from different restaurant, we can allow or notify
      const existing = prev.find(item => item.id === food.id);
      if (existing) {
        return prev.map(item =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...food, quantity: 1 }];
    });

    showToast(`Added ${food.name} to cart!`);
  };

  const removeFromCart = (foodId) => {
    setCartItems(prev => prev.filter(item => item.id !== foodId));
  };

  const updateQuantity = (foodId, delta) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.id === foodId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (couponCode) => {
    const code = couponCode.trim().toUpperCase();
    const coupon = offersData.find(c => c.code === code);

    if (!coupon) {
      showToast('Invalid coupon code!', 'error');
      return { success: false, message: 'Invalid coupon code' };
    }

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    if (subtotal < coupon.minOrderValue) {
      showToast(`Minimum order of ₹${coupon.minOrderValue} required for ${code}`, 'error');
      return { success: false, message: `Minimum order of ₹${coupon.minOrderValue} required` };
    }

    setAppliedCoupon(coupon);
    showToast(`Coupon ${code} applied successfully! 🎉`);
    return { success: true, coupon };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  // Pricing calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Delivery fee logic: standard ₹35, but FREE if FREEDEL coupon applied or delivery promotion
  const isFreeDelivery = appliedCoupon?.code === 'FREEDEL' || appliedCoupon?.discountType === 'delivery';
  const deliveryFee = subtotal > 0 ? (isFreeDelivery ? 0 : 35) : 0;
  const packagingFee = subtotal > 0 ? 25 : 0;
  const taxes = Math.round(subtotal * 0.05); // 5% GST

  // Discount calculation
  let couponDiscount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'percentage') {
      const calculated = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      couponDiscount = Math.min(calculated, appliedCoupon.maxDiscount);
    } else if (appliedCoupon.discountType === 'flat' || appliedCoupon.discountType === 'bogo') {
      couponDiscount = Math.min(appliedCoupon.discountValue, appliedCoupon.maxDiscount);
    }
  }

  const goldSavings = 0;
  const totalDiscount = couponDiscount;
  const finalPayable = Math.max(0, subtotal + deliveryFee + packagingFee + taxes - totalDiscount);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      itemsCount,
      subtotal,
      deliveryFee,
      isFreeDelivery,
      packagingFee,
      taxes,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      couponDiscount,
      goldSavings,
      totalDiscount,
      finalPayable,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      notification,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

