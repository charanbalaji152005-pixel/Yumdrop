# YumDrop – Commercial Food Delivery Landing Page

**Brand Name:** YumDrop  
**Tagline:** "Your Cravings. Our Delivery."  
**Technology Stack:** React.js, Vite, JavaScript, HTML5, CSS3, Framer Motion, Lucide React, Canvas Confetti  
**Design Palette:**
- **Royal Green:** `#087C45` (Primary brand color)
- **Pure White:** `#FFFFFF` (Main background)
- **Tomato Red:** `#F04438` (Discounts, offers & sold-out cursor)
- **Deep Green:** `#064E35` (Footer & dark sections)
- **Light Green:** `#EAF7EF` (Secondary backgrounds)
- **Charcoal:** `#202823` (Primary text)
- **Royal Gold:** `#D4AF37` / `#F59E0B` (GOLD membership)

---

## 🌟 Landing Page Sections Architecture

1. **Sticky Header & Navigation (`Navbar.jsx`)**:
   - Original YumDrop food-drop logo with cloche & flavor droplet
   - Active section scroll tracking & smooth jump navigation (`#hero`, `#categories`, `#restaurants`, `#trending`, `#gold`, `#offers`, `#auth-experience`, `#tracking`, `#faq`)
   - Live search bar with instant autocomplete
   - Live badge shopping cart drawer button

2. **Hero Section (`#hero`)**:
   - Headline: *"Discover Food That Makes You Happy."*
   - Subtitle: *"Order your favourites from the best restaurants near you."*
   - Search input for dishes and restaurants
   - Floating animated delivery cards (50% OFF, 22 Mins Arrival, Free Delivery with GOLD)

3. **Interactive Food Categories (`#categories`)**:
   - Circular animated category cards: Pizza, Burgers, Biryani, South Indian, Chinese, Desserts, Ice Cream, Healthy Food, Rolls, Beverages
   - One-tap cuisine filtering for the restaurants below

4. **Popular Restaurants Showcase (`#restaurants`)**:
   - Restaurant cards featuring cover photos, cuisine tags, star ratings, delivery estimates, distance, and cost for two
   - Live cuisine filter pills & favorite heart buttons

5. **Trending Dishes & Custom Food Cursor System (`#trending`)**:
   - **Custom In-Stock Cursor:** Green food basket icon, green ripple ring, label **`AVAILABLE`**, scale-up effect, and functional `+ ADD` controls.
   - **Custom Out-of-Stock Cursor:** Tomato-red crossed icon, red ripple ring, label **`SOLD OUT`**, unavailable image overlay, and `Notify Me` button.
   - **Interactive Live Stock Simulator:** Toggle stock status of dishes in real-time to watch cursor and UI adapt immediately.

6. **YumDrop GOLD VIP Membership (`#gold`)**:
   - Royal green & gold theme with shimmering typography
   - *"Upgrade Your Hunger. Unlock GOLD."*
   - 3D tilted metallic golden card
   - **Interactive Savings Calculator:** Slider adjusting orders/week with real-time monthly and annual projected savings
   - 3 Plan cards: Monthly (₹149), Quarterly (₹349), Annual (₹999) with confetti celebration

7. **Offers & Promo Vault (`#offers`)**:
   - Featured coupons: `YUMDROP50`, `BOGOFEAST`, `FREEDEL`, `GOLDBONUS`, `WELCOME100`, `WEEKENDVIBES`
   - One-click copy with toast notification and direct cart application

8. **Cinematic Looping Video Authentication Experience (`#auth-experience`)**:
   - Real looping background video (`/videos/food_prep.mp4` / `food_prep.webm`) showing woodfired pizza baking and chef plating
   - Dark transparent blur overlay (`backdrop-filter: blur(8px)`)
   - Glassmorphism authentication card with tab toggle for Login and Sign Up, password toggle, remember me, and Google sign-in UI

9. **Interactive 5-Stage Live Order Tracking Demo (`#tracking`)**:
   - 5 Stages: Order Placed → Restaurant Confirmed → Food Preparing → Out for Delivery → Delivered
   - Interactive **"Simulate Next Stage"** button allowing testing of all 5 stages in real time
   - Delivery fleet captain card with simulated call and message buttons

10. **Frequently Asked Questions & Live Support Bot (`#faq`)**:
    - FAQ accordion for instant answers
    - DropBot support assistant chat simulator with instant interactive replies

11. **Cart Drawer & Checkout Flow**:
    - Accessible from anywhere via sticky header
    - Item quantity increment/decrement, coupon application, bill breakdown, and simulated one-tap checkout

12. **Dark-Green Footer**:
    - Logo, company links, help & support links, app store & play store badges, social media icons, and newsletter form

---

## 🚀 Running the Project

```bash
# 1. Navigate to the web folder
cd "C:\Weekly Task\Task 26\web"

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the development server
npm run dev
```

Open your browser at [http://localhost:5173/](http://localhost:5173/).
