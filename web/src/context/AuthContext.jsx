import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_USER = {
  id: "usr-001",
  name: "Arjun Verma",
  email: "arjun.verma@example.com",
  phone: "+91 98765 43210",
  isGold: false,
  goldExpiry: null,
  goldPlan: null,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
  addresses: [
    {
      id: "addr-1",
      title: "Home",
      address: "Flat 402, Green Glen Layout, Bellandur, Bengaluru",
      landmark: "Near Central Mall",
      isDefault: true
    },
    {
      id: "addr-2",
      title: "Work",
      address: "Prestige Tech Park, Block C, 3rd Floor, Marathahalli-Sarjapur Road, Bengaluru",
      landmark: "Opposite Cessna Business Park",
      isDefault: false
    }
  ]
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('yumdrop_user');
      return saved ? JSON.parse(saved) : DEMO_USER;
    } catch {
      return DEMO_USER;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('yumdrop_orders');
      if (saved) return JSON.parse(saved);
      // Default sample past order
      return [
        {
          id: "ORD-94821",
          date: "Yesterday, 8:45 PM",
          restaurant: {
            id: "rest-1",
            name: "Royal Biryani House",
            image: "/images/70127abf-d5b0-4856-a439-703e4ee48934_1209174.jpg"
          },
          items: [
            { name: "Royal Mutton Dum Biryani (Hyderabadi)", quantity: 1, price: 389 }
          ],
          totalAmount: 435,
          status: "Delivered",
          currentStage: 5,
          deliveryAddress: "Flat 402, Green Glen Layout, Bellandur, Bengaluru",
          paymentMethod: "UPI / GPay"
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('yumdrop_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('yumdrop_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const login = async (emailOrPhone, password) => {
    // Simulated authentication
    await new Promise(resolve => setTimeout(resolve, 800));
    const loggedInUser = {
      ...DEMO_USER,
      email: emailOrPhone.includes('@') ? emailOrPhone : DEMO_USER.email,
      phone: !emailOrPhone.includes('@') ? emailOrPhone : DEMO_USER.phone
    };
    setUser(loggedInUser);
    return { success: true, user: loggedInUser };
  };

  const signup = async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 900));
    const newUser = {
      id: "usr-" + Date.now(),
      name: userData.name || "Foodie Explorer",
      email: userData.email,
      phone: userData.phone,
      isGold: false,
      goldExpiry: null,
      goldPlan: null,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80",
      addresses: [
        {
          id: "addr-new",
          title: "Home",
          address: "124, 7th Cross, Indiranagar, Bengaluru",
          landmark: "Near Metro Station",
          isDefault: true
        }
      ]
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('yumdrop_user');
  };

  const activateGold = (planName = "Quarterly GOLD", months = 3) => {
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + months);
    setUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        isGold: true,
        goldPlan: planName,
        goldExpiry: expiry.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };
    });
  };

  const addOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId, stage, statusText) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return { ...ord, currentStage: stage, status: statusText };
      }
      return ord;
    }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      signup,
      logout,
      activateGold,
      orders,
      addOrder,
      updateOrderStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

