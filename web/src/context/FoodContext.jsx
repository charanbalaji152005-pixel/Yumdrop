import React, { createContext, useContext, useState } from 'react';
import { restaurantsData } from '../data/restaurants';
import { foodItemsData, foodCategories } from '../data/foodItems';

const FoodContext = createContext(null);

export const FoodProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState(restaurantsData);
  const [foods, setFoods] = useState(foodItemsData);
  const [categories] = useState(foodCategories);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [isInStockOnly, setIsInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended', 'rating', 'deliveryTime', 'priceLowToHigh'

  // Favorites
  const [favoriteRestaurants, setFavoriteRestaurants] = useState(() => {
    try {
      const saved = localStorage.getItem('yumdrop_fav_restaurants');
      return saved ? JSON.parse(saved) : ['rest-1', 'rest-4'];
    } catch {
      return ['rest-1', 'rest-4'];
    }
  });

  // Notified items
  const [notifiedItems, setNotifiedItems] = useState([]);

  // Custom Cursor state for Food Items
  const [customCursor, setCustomCursor] = useState({
    active: false,
    type: null, // 'available' | 'soldout'
    text: '',
    food: null
  });

  const toggleFavoriteRestaurant = (restaurantId) => {
    setFavoriteRestaurants(prev => {
      const next = prev.includes(restaurantId)
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId];
      try {
        localStorage.setItem('yumdrop_fav_restaurants', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const notifyMe = (food) => {
    if (!notifiedItems.includes(food.id)) {
      setNotifiedItems(prev => [...prev, food.id]);
    }
  };

  // Toggle item stock status dynamically for interactive testing
  const toggleItemStock = (foodId) => {
    setFoods(prev => prev.map(f => {
      if (f.id === foodId) {
        const updatedStock = !f.inStock;
        // Also update cursor if currently hovered
        if (customCursor.food?.id === foodId) {
          setCustomCursor({
            active: true,
            type: updatedStock ? 'available' : 'soldout',
            text: updatedStock ? 'AVAILABLE' : 'OUT OF ORDER',
            food: { ...f, inStock: updatedStock }
          });
        }
        return { ...f, inStock: updatedStock };
      }
      return f;
    }));
  };

  const setHoveredFood = (food) => {
    if (!food) {
      setCustomCursor({ active: false, type: null, text: '', food: null });
      return;
    }

    if (food.inStock) {
      setCustomCursor({
        active: true,
        type: 'available',
        text: 'AVAILABLE',
        food
      });
    } else {
      setCustomCursor({
        active: true,
        type: 'soldout',
        text: 'OUT OF ORDER',
        food
      });
    }
  };

  const clearHoveredFood = () => {
    setCustomCursor({ active: false, type: null, text: '', food: null });
  };

  return (
    <FoodContext.Provider value={{
      restaurants,
      foods,
      categories,
      searchTerm,
      setSearchTerm,
      selectedCategory,
      setSelectedCategory,
      isVegOnly,
      setIsVegOnly,
      isInStockOnly,
      setIsInStockOnly,
      sortBy,
      setSortBy,
      favoriteRestaurants,
      toggleFavoriteRestaurant,
      notifiedItems,
      notifyMe,
      toggleItemStock,
      customCursor,
      setHoveredFood,
      clearHoveredFood
    }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error('useFood must be used within a FoodProvider');
  }
  return context;
};

