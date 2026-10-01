# 🌍 Wanderly — Premier India Tourist Management System

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen?logo=github)](https://koushik-2006.github.io/Tourist-Management-System/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Technology](https://img.shields.io/badge/Frontend-Vanilla%20HTML5%20%7C%20CSS3%20%7C%20ES6%2B-orange)](#-technologies-used)
[![Maps](https://img.shields.io/badge/Maps-Leaflet%20%2B%20OpenStreetMap-green)](https://leafletjs.com/)
[![Weather](https://img.shields.io/badge/Weather-Open--Meteo%20API-blue)](https://open-meteo.com/)

> A modern, comprehensive, luxury tourist management and trip planning platform designed to showcase Incredible India. Wanderly offers interactive destination discovery, live meteorological data, interactive geographic maps, curated tour packages, smart trip itinerary generation, a 6-step booking engine, user wishlists, and executive administrative analytics.

---

## 🌐 Live Platform & Links

- **Live Website (GitHub Pages):** [https://koushik-2006.github.io/Tourist-Management-System/](https://koushik-2006.github.io/Tourist-Management-System/)
- **GitHub Repository:** [https://github.com/koushik-2006/Tourist-Management-System](https://github.com/koushik-2006/Tourist-Management-System)
- **Local Dev Server:** `http://localhost:5000/frontend/` or `http://localhost:3000`

---

## 📌 Project Overview

**Wanderly** is an end-to-end tourist management platform engineered with modern web standards. It transitions a standard academic project into an enterprise-grade tourism portal with zero third-party framework overhead.

The platform is designed to operate **100% client-side for serverless environments like GitHub Pages** with graceful fallback state persistence (`localStorage`), while maintaining full optional compatibility with a **Node.js/Express + MySQL** backend for centralized storage and Google Places integration.

---

## ✨ Key Modules & Enhanced Features

### 1. 🌟 Hero Experience & Destination Search
- **3D Interactive Experience:** Smooth CSS 3D perspective card tilt with dynamic glare highlights on desktop mousemove, floating animated travel badges, and layered parallax elements (`prefers-reduced-motion` and mobile touch responsive).
- **Global Command Palette (`Ctrl + K` / `Cmd + K`):** Quick-launch search across destinations, hotels, transport routes, tour packages, and regional culinary dishes with live grouped results and instant keyboard navigation.
- **Visual Design:** High-contrast luxury photography background, shimmering animated headline (*"Discover Incredible India"*), refined typography with DM Sans and Playfair Display, and animated backdrop accents.
- **Dynamic Search Console:** Search across 28+ verified destinations by destination name, state/location, activity, or category.
- **Hero CTAs:** Direct anchors to `#places` (Explore India) and `#plan` (Plan My Trip).
- **Interactive Collections:** Dedicated "Where will you go next?" trending collection, 8-theme "Explore India" interactive catalog, and "Recommended for You" smart recommendation rail.
- **Category Quick-Pills:** Instant 1-click filters for Heritage, Spiritual, Nature, Adventure, Beach, Wildlife, Food, and Culture.

### 2. 🏛️ Featured & Popular Destinations
- **Featured Destinations:** Hand-selected marquee attractions (Amber Fort, Taj Mahal, Alleppey Backwaters, Dal Lake, Manali, Radhanagar Beach) with verified high-resolution photo galleries.
- **Popular Categories:** Filter by 🏖️ Beaches, 🏔️ Mountains, 🌿 Nature, 🏛️ Historical, 🛕 Cultural, 🏕️ Adventure, 👨‍👩‍👧 Family, and 💑 Honeymoon.
- **Interactive Cards:** Hover elevation, interactive ❤️ Wishlist toggle button, price badge, rating badge, category tags, and "Explore Details" modal trigger.

### 3. 🔍 Advanced Destination Search & Filtering
- **Multi-Parameter Filter Toolbar:** Search input (debounced at 250ms), Category filter, State/Region selector, Maximum Budget slider, Minimum Rating filter, and Sort By selector.
- **Sorting Modes:** Most Popular, Highest Rated, Lowest Price, Highest Price, and Alphabetical.
- **Live Counter & Empty State:** Displays real-time matching count (`"X destinations found"`) and an illustrated empty state with a "Reset Filters" action when no destinations match.

### 4. 🗺️ Destination Details Modal with Leaflet & Open-Meteo
- **High-Resolution Photo Gallery:** Responsive thumbnail and featured image viewer.
- **Live Weather Integration:** Real-time temperature, wind speed, relative humidity, and WMO weather condition fetched asynchronously via the free Open-Meteo API (zero private API keys exposed).
- **Interactive Leaflet Map:** Custom terracotta map pin rendered with OpenStreetMap tiles centered on the destination's exact geographic coordinates.
- **Practical Travel Information:** Best time to visit, nearby tourist attractions, recommended activities, and estimated budget breakdown.
- **Action Triggers:** "Plan Trip for this Destination", "Book Now", and "Add to Wishlist".

### 5. 🧭 Smart Trip Planner (Custom Itinerary Generator)
- **Input Parameters:** Select destination, number of travel days (1 to 14), group size, budget tier (Budget, Moderate, Luxury), travel type (Solo, Couple, Family, Friends, Adventure), and primary interests (Nature, Food, Culture, History, Photography, etc.).
- **Structured Day-by-Day Generation:** Morning, Afternoon, and Evening activities tailored to the selected destination and travel profile.
- **Actions:** Save itinerary to User Dashboard (`localStorage`), Print / Save as PDF, or Book Full Tour immediately.

### 6. 🎒 Curated Tour Packages
- **8 Handcrafted Regional Journeys:**
  1. *Golden Triangle Heritage Expedition* (Delhi, Agra, Jaipur — 5 Days)
  2. *Kerala Backwaters & Spice Trails* (Kochi, Alleppey, Munnar — 6 Days)
  3. *Royal Rajasthan Desert Odyssey* (Jaipur, Jodhpur, Udaipur — 7 Days)
  4. *Himalayan Heights & Valleys* (Shimla, Manali, Solang — 5 Days)
  5. *Goa Sun, Sand & Coastal Heritage* (North & South Goa — 4 Days)
  6. *Spiritual Varanasi & Sacred Ghats* (Varanasi, Sarnath — 3 Days)
  7. *Andaman Tropical Island Escapade* (Port Blair, Havelock — 5 Days)
  8. *Rishikesh & Haridwar Himalayan Yoga & Rafting* (Rishikesh — 3 Days)
- **Filters:** Filter packages by category, duration, budget, and rating.

### 7. 💳 6-Step Multi-Step Booking Engine
- **Step 1 — Tour & Package Selection:** Review package name, inclusions, and tier options (Standard, Deluxe, Luxury).
- **Step 2 — Date Selection:** Datepicker with `min` set to tomorrow to prevent invalid historical dates.
- **Step 3 — Travelers & Add-on Services:** Adult and child count steppers with instant price recalculation. Optional add-ons (Travel Insurance, Private Airport Transfer).
- **Step 4 — Traveler Contact Details:** Name, email, phone number, and special dietary/accessibility requirements.
- **Step 5 — Transparent Price Breakdown:** Base price × travelers, package tier multiplier, add-on fees, GST (18%), and Grand Total.
- **Step 6 — Payment Confirmation & Voucher:** Select payment method (UPI, Credit/Debit Card, Net Banking, Pay at Hotel), instant unique booking reference generation (e.g. `#TRV-986680`), and printable confirmation voucher.

### 8. 👤 User Dashboard & Profile Portal
- **KPI Summary Cards:** Upcoming Trips, Completed Stays, Wishlist Destinations, and Total Active Bookings.
- **Active & Past Bookings:** Filter bookings by All, Confirmed, Pending, and Cancelled with instant cancellation capability.
- **Wishlist / Favorites:** View all saved destinations with 1-click removal or modal view.
- **Saved Itineraries:** Access itineraries generated by the Smart Trip Planner with print capabilities.
- **My Reviews:** Manage submitted reviews with edit and delete capabilities.
- **Profile Management:** Edit profile name, email, phone number, travel preferences, and password.

### 9. ⭐ Destination Reviews & Rating System
- **Interactive Ratings:** 1 to 5 star rating picker with helpful category guidelines.
- **Community Feedback:** Displays average rating, total verified reviews, and rating distribution progress bars.
- **Authorization Guard:** Authenticated users can write, edit, and delete their own reviews; unauthorized modifications of other travelers' reviews are strictly prevented.

### 10. 📊 Executive Admin Dashboard
- **Business KPI Metrics:** Total Registered Users, Active Destinations, Available Tour Packages, Total Bookings, and Gross Revenue.
- **Interactive SVG Analytics Charts:**
  - *Booking Trends:* 6-month visual area chart of confirmed reservations.
  - *Destination Popularity:* Horizontal bar chart comparing visitor volume.
  - *Revenue & Category Distribution:* Donut breakdown of revenue streams across tours, hotels, and transport.
- **Management Tables:**
  - *Bookings Management:* Live table with status badges and status update controls (Confirmed, Completed, Cancelled).
  - *User Moderation:* View registered users, contact info, and toggle administrator privileges.

### 11. 🏨 Stays, Multi-Modal Transport & Regional Foods
- **Hotel Reservations & Side-by-Side Comparison:** 28+ verified hotels across all Indian states with gallery views, amenity filter chips, and interactive hotel comparison (compare up to 3 hotels side by side on price, rating, amenities, and room types).
- **Transport Booking & Interactive Seat Selection:** Inter-city express buses, high-speed Vande Bharat trains, and private cabs with quick sorting (Cheapest, Fastest, Best Rated, Earliest) and an interactive 24-seat selection grid with driver, aisle, window, and booked seat states.
- **Regional Culinary Catalog:** Traditional dishes from each state with state chips, veg/non-veg dietary toggle, interactive food details modal, and unified shopping cart checkout.
- **Interactive Travel Timeline:** Visual vertical roadmap in the user dashboard displaying past, active, and upcoming journey milestones.

---

## 🏗️ Architecture & Technical Stack

```text
                               Wanderly Architecture
                                         │
        ┌────────────────────────────────┴────────────────────────────────┐
        ▼                                                                 ▼
Frontend (Static / Client-Side)                               Backend (Optional Node/Express)
- HTML5 (Semantic & Accessible)                               - Express 5.2 & Node.js
- CSS3 (Custom Design System, Responsive)                     - MySQL 8.x Database
- JavaScript ES6+ (Modules, Custom Elements)                  - Google Places API Client
- Leaflet.js 1.9 + OpenStreetMap                              - RESTful APIs (/api/booking, etc.)
- Open-Meteo REST API (Live Weather)                          - Static File Server Middleware
- LocalStorage State Synchronization                                      │
        │                                                                 │
        └───────────────────────────────┬─────────────────────────────────┘
                                        ▼
                   Deployment: GitHub Pages (Automatic Workflow)
```

### Frontend Technologies
- **Markup:** Semantic HTML5 with ARIA labels, modal dialog accessibility, and responsive typography.
- **Styling:** Vanilla CSS3 design system using HSL color variables (`--primary: #C4623A`, `--gold: #D4A84B`, `--navy: #0D1B2A`), CSS Grid, Flexbox, glassmorphic blur filters, and CSS animations.
- **Logic:** Vanilla JavaScript (ES6+), Web Components (`image-slideshow`), hash routing (`#home`, `#places`, `#tours`, `#plan`, `#hotels`, `#transport`, `#food`, `#dashboard`, `#admin`, `#auth`, `#about`, `#contact`).
- **Maps:** Leaflet.js with OpenStreetMap tiles (no API keys required).
- **Weather:** Open-Meteo Free Weather API (no API keys required, SSL encrypted).

### Backend Technologies (Optional)
- **Runtime:** Node.js v18+ / v20+ / v24+
- **Server Framework:** Express.js 5.x
- **Database:** MySQL (Relational schema for Users, Places, Hotels, Transport, Bookings)
- **Dependencies:** `express`, `mysql2`, `dotenv`, `cors`, `axios`, `body-parser`

---

## 📂 Project Directory Structure

```text
Tourist-Management-System/
├── index.html                 # Root redirect entry point for GitHub Pages
├── 404.html                   # Intelligent SPA fallback routing for GitHub Pages
├── .nojekyll                  # Disables Jekyll build engine on GitHub Pages
├── .gitignore                 # Excludes node_modules, .env, and scratch artifacts
├── README.md                  # Comprehensive platform documentation
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions automated Pages deployment workflow
│
├── frontend/
│   ├── index.html             # Enhanced Single Page Application (All modules & modals)
│   ├── foods_generated.json   # Regional food catalog with local image paths
│   ├── hotels_generated_v4.json# 28+ verified hotel listings
│   ├── places_generated.json  # 28+ verified tourist destinations
│   └── images/                # 597 verified local image assets
│       ├── destinations/      # High-resolution destination photo folders
│       ├── hotels/            # Hotel exterior and suite galleries
│       └── foods/             # Regional cuisine imagery
│
└── backend/                   # Optional Node.js/Express API service
    ├── server.js              # Express API & static file serving on port 5000
    ├── database.sql           # Complete MySQL relational schema & seed data
    ├── googlePlaces.js        # Google Places API client with graceful fallbacks
    ├── package.json           # Backend dependencies and scripts
    ├── config/
    │   └── db.js              # MySQL connection pool configuration
    ├── controllers/           # API request controllers
    └── routes/                # Express API route handlers
```

---

## 🚀 How to Run Locally

### Option 1: Run with Built-in Express Backend (Recommended)
This starts both the API server and serves the full frontend at `http://localhost:5000/frontend/`.

```bash
# 1. Open terminal in the project directory
cd backend

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the server
npm start
```

Visit **[http://localhost:5000/frontend/](http://localhost:5000/frontend/)** in your browser.

---

### Option 2: Run Frontend as Pure Static Site
The frontend has **zero dependencies and requires no build step**. You can launch it using any static server:

#### Using Python:
```bash
# In the root directory:
python -m http.server 3000
```
Open **[http://localhost:3000/frontend/](http://localhost:3000/frontend/)**.

#### Using Node.js `npx`:
```bash
npx serve .
```

#### Using VS Code:
Right-click `frontend/index.html` and click **"Open with Live Server"**.

---

## 🔐 Demo Credentials

To test user and administrative features without registration, use the pre-configured credentials:

| Role | Email | Password | Access Privileges |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@wanderly.com` | `demo123` | Full Access: Executive Analytics, Bookings Management, User Moderation |
| **Standard Traveler**| `aarav@example.com` | `user123` | Traveler Portal: Trip Planner, Bookings, Wishlist, Reviews, Profile |

*Note: You can also register any new account on the Sign In / Register page.*

---

## 🌐 GitHub Pages Deployment

The repository is fully configured for automated GitHub Pages hosting:

1. In your GitHub repository, navigate to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, choose **GitHub Actions** (uses `.github/workflows/deploy.yml`) or select **Deploy from a branch** (`main` branch, `/ (root)` folder).
3. The root `index.html` and `404.html` automatically route incoming traffic to `/frontend/` with full SPA hash preservation.
4. Access the live site at:
   **`https://koushik-2006.github.io/Tourist-Management-System/`**

---

## 🛡️ Security & Privacy Best Practices

- **Zero Secret Exposure:** No private API keys or database passwords are hardcoded in frontend source files.
- **Client-Side Protection:** Admin routes and dashboards enforce role checks; regular travelers cannot access administrative views.
- **Safe Weather API:** Open-Meteo queries require no authentication keys and run over HTTPS.
- **Local Persistence Guard:** All traveler inputs (reviews, bookings, profile updates) are sanitized before rendering into the DOM.
- **Safe Environment Config:** Sensitive database settings reside in `backend/.env` which is tracked in `.gitignore`.

---

## 🔮 Future Enhancements

- 🤖 **Direct LLM AI Agent API:** Optional integration with Gemini 2.0 / OpenAI for conversational trip planning.
- 💳 **Razorpay / Stripe Payment Sandbox:** Direct online card and UPI checkout integration.
- 📱 **Progressive Web App (PWA):** Service worker offline caching and installable mobile app manifest.
- 🌐 **Multi-Language Support:** Hindi, Bengali, Tamil, Telugu, and international language localization.

---

## 📄 License

This project is licensed under the MIT License. Open source and free for educational and commercial adaptation.
