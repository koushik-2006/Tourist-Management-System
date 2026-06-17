import { PLACES, HOTELS } from '../data/mockData.js';
import { renderPlaceCard, renderHotelCard } from '../components/Cards.js';

import { renderSearchBar } from '../components/Search.js';

export const Home = {
    view: () => `
        <section class="hero">
            <div class="hero-overlay"></div>
            <div class="hero-content" style="position:relative; z-index:10;">
                <div class="hero-badge">✦ YOUR JOURNEY STARTS HERE</div>
                <h1 class="hero-title">Discover Incredible <em>India</em></h1>
                <p class="hero-subtitle">Search, plan, and book hotels, transport, and experiences across India — all in one place.</p>
                ${renderSearchBar()}
            </div>
        </section>
        
        <div id="search-results"></div>
        
        <section class="stats-row">
            <div class="stat-item"><div class="stat-num">120+</div><div class="stat-label">Destinations</div></div>
            <div class="stat-item"><div class="stat-num">850+</div><div class="stat-label">Hotels</div></div>
            <div class="stat-item"><div class="stat-num">24k+</div><div class="stat-label">Happy Tourists</div></div>
            <div class="stat-item"><div class="stat-num">4.8★</div><div class="stat-label">Rating</div></div>
        </section>

        <section class="section">
            <div class="section-header">
                <div>
                    <h2 class="section-title">Popular Destinations</h2>
                    <p class="section-sub">Explore the most visited places in India.</p>
                </div>
                <a href="#/places" class="see-all">See All Places <i class="fa-solid fa-arrow-right"></i></a>
            </div>
            <div class="places-grid">
                ${PLACES.slice(0, 4).map(renderPlaceCard).join('')}
            </div>
        </section>

        <section class="section" style="background: #fff; max-width: 100%; padding-left: 2rem; padding-right: 2rem;">
            <div style="max-width: 1200px; margin: 0 auto;">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">Premium Stays</h2>
                        <p class="section-sub">Handpicked luxury hotels for your comfort.</p>
                    </div>
                    <a href="#/hotels" class="see-all">Browse Hotels <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <div class="hotels-grid">
                    ${HOTELS.slice(0, 3).map(renderHotelCard).join('')}
                </div>
            </div>
        </section>
    `
};
