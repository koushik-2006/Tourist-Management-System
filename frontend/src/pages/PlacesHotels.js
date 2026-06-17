import { PLACES } from '../data/mockData.js';
import { renderPlaceCard } from '../components/Cards.js';

export const Places = {
    view: () => `
        <div class="page-hero">
            <h1>Destinations</h1>
            <p>Discover beautiful places across India.</p>
        </div>
        <div class="filters">
            <button class="filter-btn active">All</button>
            <button class="filter-btn">Heritage</button>
            <button class="filter-btn">Beach</button>
            <button class="filter-btn">Adventure</button>
            <button class="filter-btn">Nature</button>
            <button class="filter-btn">Spiritual</button>
        </div>
        <div class="section">
            <div class="places-grid">
                ${PLACES.map(renderPlaceCard).join('')}
            </div>
        </div>
    `
};

export const Hotels = {
    view: () => `
        <div class="page-hero">
            <h1>Luxury Stays</h1>
            <p>Find the perfect accommodation for your trip.</p>
        </div>
        <div class="transport-search" style="max-width: 1200px; margin: 2rem auto; border-radius: 0; border: none; background: #fff;">
            <div class="transport-row">
                <div class="form-group"><label>Destination</label><input type="text" placeholder="City or hotel name"></div>
                <div class="form-group"><label>Check-in</label><input type="date"></div>
                <div class="form-group"><label>Check-out</label><input type="date"></div>
                <div class="form-group"><label>Guests</label><input type="number" min="1" value="2"></div>
                <div class="form-group"><button class="btn-book terracotta" style="width:100%; padding: .75rem;">Search Hotels</button></div>
            </div>
        </div>
        <div class="section" style="padding-top:0;">
            <div class="hotels-grid" id="hotelsGrid"></div>
        </div>
    `,
    init: async () => {
        // Fetch from API later, use mock for now
        const { HOTELS } = await import('../data/mockData.js');
        const { renderHotelCard } = await import('../components/Cards.js');
        document.getElementById('hotelsGrid').innerHTML = HOTELS.map(renderHotelCard).join('');
    }
};
