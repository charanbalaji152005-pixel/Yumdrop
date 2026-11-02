// Offers and coupons data for YumDrop
export const offersData = [
  {
    id: "offer-1",
    code: "YUMDROP50",
    title: "50% OFF up to ₹120",
    description: "Get 50% discount on your favorite meals from top-rated restaurants.",
    discountType: "percentage",
    discountValue: 50,
    maxDiscount: 120,
    minOrderValue: 249,
    validTill: "30 Nov 2026",
    badge: "50% OFF",
    category: "Featured",
    color: "#F04438",
    conditions: [
      "Valid on orders above ₹249",
      "Maximum discount capped at ₹120",
      "Applicable on all partner restaurants",
      "Can be used once per user per day"
    ]
  },
  {
    id: "offer-2",
    code: "BOGOFEAST",
    title: "Buy 1 Get 1 Free Feast",
    description: "Buy any selected pizza, bowl or biryani and get the second one free!",
    discountType: "bogo",
    discountValue: 150,
    maxDiscount: 150,
    minOrderValue: 399,
    validTill: "15 Dec 2026",
    badge: "BOGO FREE",
    category: "Combos",
    color: "#087C45",
    conditions: [
      "Valid on selected BOGO menu items",
      "Minimum cart value of ₹399 required",
      "Discount auto-calculated at checkout",
      "Available across all participating outlets"
    ]
  },
  {
    id: "offer-3",
    code: "FREEDEL",
    title: "Zero Delivery Fee",
    description: "Enjoy zero delivery fee on all orders regardless of distance today.",
    discountType: "delivery",
    discountValue: 40,
    maxDiscount: 40,
    minOrderValue: 199,
    validTill: "31 Dec 2026",
    badge: "FREE DELIVERY",
    category: "Delivery",
    color: "#087C45",
    conditions: [
      "No delivery charges applied",
      "Minimum order value of ₹199",
      "Valid within 10 km delivery radius",
      "Exclusive online coupon"
    ]
  },
  {
    id: "offer-4",
    code: "BONUS100",
    title: "Flat ₹100 OFF on Orders",
    description: "Special savings bonus on any meal above ₹399 across all top partner restaurants.",
    discountType: "flat",
    discountValue: 100,
    maxDiscount: 100,
    minOrderValue: 399,
    validTill: "31 Dec 2026",
    badge: "BONUS DEAL",
    category: "Featured",
    color: "#087C45",
    conditions: [
      "Valid on orders above ₹399",
      "Stackable with restaurant discounts",
      "Instant deduction on checkout",
      "Available for all registered customers"
    ]
  },
  {
    id: "offer-4b",
    code: "FEAST150",
    title: "Flat ₹150 OFF + Free Delivery",
    description: "Mega celebration discount with extra ₹150 instant off and zero delivery charge.",
    discountType: "flat",
    discountValue: 150,
    maxDiscount: 150,
    minOrderValue: 499,
    validTill: "31 Dec 2026",
    badge: "MEGA DEAL",
    category: "Mega Deals",
    color: "#087C45",
    conditions: [
      "Applicable across all participating restaurants",
      "Zero delivery fee automatically included",
      "Minimum order value ₹499",
      "Valid on online payments"
    ]
  },
  {
    id: "offer-4c",
    code: "TASTEFEST40",
    title: "Mega Feast: 40% OFF up to ₹200",
    description: "Get 40% extra savings on family biryani buckets and artisan pizza combos.",
    discountType: "percentage",
    discountValue: 40,
    maxDiscount: 200,
    minOrderValue: 449,
    validTill: "31 Dec 2026",
    badge: "40% OFF",
    category: "Mega Deals",
    color: "#F04438",
    conditions: [
      "Maximum discount capped at ₹200",
      "Valid on Biryani, Pizza & Asian categories",
      "Applicable on all orders above ₹449",
      "Valid for all customers"
    ]
  },
  {
    id: "offer-5",
    code: "WELCOME100",
    title: "Flat ₹100 OFF on 1st Order",
    description: "Welcome to YumDrop! Enjoy flat ₹100 instant cash off on your first order.",
    discountType: "flat",
    discountValue: 100,
    maxDiscount: 100,
    minOrderValue: 299,
    validTill: "31 Dec 2026",
    badge: "FIRST ORDER",
    category: "Welcome",
    color: "#F04438",
    conditions: [
      "Applicable for new users on their first order",
      "Minimum order value ₹299",
      "Cannot be clubbed with other promotional codes",
      "Valid on payment via any online method"
    ]
  },
  {
    id: "offer-6",
    code: "WEEKENDVIBES",
    title: "Weekend Party Special – 30% OFF",
    description: "Get 30% discount up to ₹150 for your weekend family gatherings.",
    discountType: "percentage",
    discountValue: 30,
    maxDiscount: 150,
    minOrderValue: 499,
    validTill: "Every Sat-Sun",
    badge: "WEEKEND SPECIAL",
    category: "Weekend",
    color: "#064E35",
    conditions: [
      "Valid Friday 6 PM to Sunday midnight",
      "Applicable on all Biryanis, Pizzas & Platters",
      "Maximum discount capped at ₹150",
      "Valid on orders above ₹499"
    ]
  }
];

