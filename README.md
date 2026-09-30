# 🌍 Wanderly — Tourist Management System

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen?logo=github)](https://koushik-2006.github.io/Tourist-Management-System/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Technology](https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20JS%20(ES6+)-orange)](#-technologies-used)

> An all-in-one travel and tourism management platform designed to help travelers discover incredible destinations, book authentic heritage stays and luxury hotels, arrange travel transportation, order regional culinary delights, and manage itineraries.

---

## 🌐 Live Demo

- **GitHub Pages:** [https://koushik-2006.github.io/Tourist-Management-System/](https://koushik-2006.github.io/Tourist-Management-System/)

---

## 📌 Project Overview

The **Tourist Management System (Wanderly)** is an interactive, web-based travel ecosystem. It offers a seamless, centralized platform for discovering tourist destinations across India, booking hotels and local transportation, exploring regional foods, and managing travel bookings.

Designed with modern aesthetics and client-side resilience, Wanderly operates completely as a high-performance **static web application** (ideal for GitHub Pages hosting) while offering an optional **Node.js/Express + MySQL backend** for database synchronization.

---

## ✨ Features

### 👤 Tourist Experience
- **🌍 Explore Destinations:** Browse iconic monuments, natural wonders, wildlife sanctuaries, and spiritual retreats categorized by theme with high-resolution image slideshows.
- **🏨 Hotel Reservations:** Search and filter accommodations by destination or state, preview room galleries, and book stays with real-time rate calculations.
- **🚆 Transport Booking:** Search buses, trains, and flights between cities with departure times, seat counts, and instant booking confirmation.
- **🍱 Regional Cuisine & Food Ordering:** Discover traditional culinary specialties from all Indian states, add dishes to your cart, and order with real-time bill calculations (subtotal, tax, delivery).
- **🛒 Shopping Cart System:** Interactive shopping cart modal with badge counters, quantity increments/decrements, and checkout.
- **👤 Tourist Profile & Dashboard:** Track active reservations, view booking history across hotels, transport, and food orders, or cancel bookings in real time.
- **🔐 User Authentication:** Switch between login and registration with automatic session persistence using `localStorage`.

### 🛠️ Administration Portal
- **📊 Business KPIs:** High-level overview of total tourist bookings, revenue metrics, available destinations, and registered accommodations.
- **📍 Destination Management:** Admin view of registered attractions with real-time data inspection.
- **🏨 Accommodation Management:** Monitor active hotel listings, capacities, and pricing.
- **📋 Booking Management:** Centralized registry of all tourist bookings and statuses.

---

## 🏗️ Architecture & Workflow

```text
                     Tourist Management System (Wanderly)
                                      │
              ┌───────────────────────┴───────────────────────┐
              │                                               │
          👤 Tourist                                      🛠️ Admin
              │                                               │
      ┌───────┴───────────────────┐                           ▼
      ▼                           ▼                    Manage System
  Destinations & Hotels       Transport & Food          - Oversee Bookings
      │                           │                     - Monitor KPI Metrics
      └─────────────┬─────────────┘                     - Manage Inventory
                    ▼                                         │
              Booking & Cart                                  │
                    │                                         │
                    ▼                                         ▼
            Dashboard Review ◄────────────────────────────────┘
```

---

## 🛠️ Technologies Used

### Frontend (Static & Deployment Ready)
- **HTML5:** Semantic layout with accessible modal dialogs and responsive image containers.
- **CSS3 (Vanilla):** Custom design system featuring CSS variables, flexbox, CSS Grid layouts, glassmorphism, smooth slideshow animations, and `@media` queries for mobile responsiveness.
- **JavaScript (ES6+):** Component-based client-side architecture, Web Components (`image-slideshow`), hash routing (`#places`, `#hotels`, `#transport`, `#food`, `#dashboard`, `#admin`), and asynchronous state management.
- **Local Persistence:** Resilient `localStorage` architecture ensuring complete functionality on static web hosts like GitHub Pages.

### Backend (Optional Full-Stack Integration)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL (Relational database with schema for Users, Places, Hotels, Transport, and Bookings)
- **Libraries:** `mysql2`, `dotenv`, `cors`, `axios`

---

## 📂 Project Structure

```text
Tourist-Management-System/
├── index.html                 # Root redirect & entry point for GitHub Pages
├── 404.html                   # SPA routing fallback for GitHub Pages
├── .nojekyll                  # Disables Jekyll processing on GitHub Pages
├── .gitignore                 # Prevents committing secrets & dependencies
├── README.md                  # Project documentation & portfolio guide
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions automated Pages deployment
│
├── frontend/
│   ├── index.html             # Primary SPA application (Home, Hotels, Transport, Food, Admin)
│   ├── wanderly.html          # Alternative standalone template
│   ├── css/
│   │   └── style.css          # Core stylesheet
│   ├── js/
│   │   ├── app.js             # Client application helpers
│   │   ├── indiaPlaces.js     # Destination dataset
│   │   └── indiaHotels.js     # Hotel dataset
│   ├── foods_generated.json   # Regional food catalog
│   ├── hotels_generated_v4.json# Verified hotel catalog
│   ├── places_generated.json  # Destination catalog
│   └── images/                # Local asset repository
│       ├── destinations/      # Destination photo galleries
│       ├── hotels/            # Hotel room & exterior galleries
│       └── foods/             # Regional food photos
│
└── backend/                   # Optional Node.js/Express backend
    ├── server.js              # Express server setup
    ├── database.sql           # Database schema & initial tables
    ├── update_schema.js       # Database migration script
    ├── .env.example           # Safe environment variable template
    ├── package.json           # Backend dependencies
    ├── config/                # Database pool connection
    └── routes/                # API endpoints (/api/booking, /api/food-order, etc.)
```

---

## 🚀 How to Run Locally

### 1. Run the Frontend (Static)
The frontend requires **no compilation, bundlers, or package managers**. You can launch it using any local static file server:

#### Using Python:
```bash
# In the project root directory:
python -m http.server 3000
```
Then open [http://localhost:3000](http://localhost:3000) or [http://localhost:3000/frontend/](http://localhost:3000/frontend/) in your browser.

#### Using Node.js `npx`:
```bash
npx serve .
```

#### Using VS Code:
Right-click `frontend/index.html` or the root `index.html` and click **"Open with Live Server"**.

---

### 2. Optional: Run Backend (Node.js & MySQL)
If you wish to run the optional MySQL backend:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Configure your MySQL credentials in `.env`.
5. Import `database.sql` into your MySQL instance:
   ```bash
   mysql -u root -p tourist_db < database.sql
   ```
6. Start the backend server:
   ```bash
   node server.js
   ```
   The backend API will run on `http://localhost:5000`.

---

## 📦 How to Build / Verify

Because Wanderly is built using modern vanilla web technologies:
- There is no required compilation step (`npm run build` is not required for static HTML/JS/CSS).
- Every asset path uses relative resolution (`./images/...`), ensuring that it works under any hosting subpath or domain root.
- To verify the website locally, launch the static server and open the browser console (`F12`) to verify that all images, styles, and scripts load with `200 OK` status and zero errors.

---

## 🚀 GitHub Pages Deployment Instructions

This repository is pre-configured for instant deployment on GitHub Pages using either of the following two methods:

### Method 1: GitHub Actions (Recommended)
1. In your GitHub repository, navigate to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Push changes to the `main` branch. The pre-configured `.github/workflows/deploy.yml` workflow will automatically build and publish the site.

### Method 2: Deploy from Branch
1. Navigate to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
3. Select branch: `main` and folder: `/ (root)`.
4. Click **Save**.
5. The root `index.html` and `.nojekyll` will immediately serve the site at:
   `https://<username>.github.io/<repository-name>/`

---

## 🔮 Future Enhancements

- 🤖 **AI-Powered Travel Itineraries:** Personalized recommendations based on traveler preferences and budget.
- 🗺️ **Interactive Leaflet/Mapbox Maps:** Live geographic routing with attractions plotted on an interactive map.
- 🌦️ **Real-time Weather Forecasts:** Live meteorological widgets for destination check-in dates.
- 💳 **Payment Gateway Integration:** Razorpay / Stripe sandbox checkout for real payments.
- ⭐ **Community Reviews & UGC:** User reviews, rating submission, and traveler photos.
- 🔔 **Push Notifications:** Instant booking reminders and SMS alerts.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
