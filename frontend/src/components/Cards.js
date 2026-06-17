export function renderPlaceCard(place) {
    return `
        <div class="place-card" onclick="window.appUtils.showDetails('place', ${place.id})">
            <div class="place-card-bg" style="background-color: var(--sand);">
                ${place.image ? 
                    `<img src="${place.image}" style="width:100%; height:100%; object-fit:cover; object-position:center; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" alt="${place.name}">
                     <span style="display:none;">${place.emoji}</span>` 
                : place.emoji}
            </div>
            <div class="place-card-overlay"></div>
            <div class="place-explore-btn"><i class="fa-solid fa-arrow-right"></i></div>
            <div class="place-card-content">
                <div class="place-cat-pill">${place.category}</div>
                <h3 class="place-card-name">${place.name}</h3>
                <div class="place-card-loc"><i class="fa-solid fa-location-dot"></i> ${place.location}</div>
                <div class="place-card-footer">
                    <div class="place-rating-pill"><i class="fa-solid fa-star"></i> ${place.rating}</div>
                    <div class="place-price-pill">${place.price}</div>
                </div>
            </div>
        </div>
    `;
}

export function renderHotelCard(hotel) {
    return `
        <div class="hotel-card">
            <div class="hotel-img" style="background-color: #e0e0e0;">🏨
                <div class="hotel-img-shine"></div>
                ${hotel.rating >= 4.8 ? '<div class="hotel-ribbon">TOP RATED</div>' : ''}
            </div>
            <div class="hotel-body">
                <h3 class="hotel-name">${hotel.name}</h3>
                <div class="hotel-stars">★★★★★</div>
                <div class="hotel-loc"><i class="fa-solid fa-location-dot"></i> ${hotel.location}</div>
                <div class="hotel-amenities">
                    ${hotel.amenities.map(a => `<span class="amenity-chip">${a}</span>`).join('')}
                </div>
                <div class="hotel-footer">
                    <div>
                        <div class="hotel-price">₹${hotel.price}</div>
                        <div class="hotel-price-label">per night</div>
                    </div>
                    <button class="btn-book" onclick="window.appUtils.bookItem('hotel', ${hotel.id})">Book Now</button>
                </div>
            </div>
        </div>
    `;
}

export function renderTransportCard(t) {
    const iconMap = { 'Flight': 'fa-plane', 'Train': 'fa-train', 'Bus': 'fa-bus', 'Cab': 'fa-taxi' };
    const icon = iconMap[t.type] || 'fa-car';
    return `
        <div class="route-card">
            <div class="route-icon"><i class="fa-solid ${icon}"></i></div>
            <div class="route-info">
                <div class="route-name">${t.source} <i class="fa-solid fa-arrow-right" style="font-size:0.8em; opacity:0.5; margin:0 5px;"></i> ${t.dest}</div>
                <div class="route-detail">${t.type} · ${t.seats} seats available</div>
                <div class="route-time"><i class="fa-regular fa-clock"></i> ${t.time}</div>
            </div>
            <div>
                <div class="route-price">₹${t.price}</div>
                <button class="btn-book sage" style="margin-top: 10px; width: 100%;" onclick="window.appUtils.bookItem('transport', ${t.id})">Book</button>
            </div>
        </div>
    `;
}

export function renderFoodCard(food) {
    return `
        <div class="food-card">
            <div class="food-img" style="background-color: #fce4ec;">🍲<div class="food-img-shine"></div></div>
            <div class="food-body">
                <h3 class="food-name">${food.name}</h3>
                <div class="food-type">${food.type} · ${food.restaurant}</div>
                <div class="food-footer">
                    <div class="food-price">₹${food.price}</div>
                    <button class="btn-book terracotta" onclick="window.appUtils.bookItem('food', ${food.id})">Order</button>
                </div>
            </div>
        </div>
    `;
}
