const API_URL = 'http://localhost:5000/api';

const app = {
    currentUser: null,

    init() {
        this.checkAuth();
        this.navigate('home');
        this.updateNav();
    },

    navigate(pageId) {
        const mainContent = document.getElementById('main-content');
        const template = document.getElementById(`tpl-${pageId}`);
        
        if (template) {
            mainContent.innerHTML = template.innerHTML;
            window.scrollTo(0, 0);

            // Trigger specific page initialization
            if (pageId === 'places') this.loadPlaces();
            if (pageId === 'hotels') this.loadHotels();
            if (pageId === 'transport') this.loadTransport();
            if (pageId === 'dashboard') this.loadDashboard();
        } else {
            mainContent.innerHTML = '<h2>Page not found</h2>';
        }
    },

    toggleMenu() {
        const navLinks = document.getElementById('navLinks');
        const navAuth = document.getElementById('navAuth');
        
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
            navAuth.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'white';
            navLinks.style.padding = '1rem';
            
            navAuth.style.display = 'flex';
            navAuth.style.flexDirection = 'column';
            navAuth.style.position = 'absolute';
            navAuth.style.top = '250px';
            navAuth.style.left = '0';
            navAuth.style.width = '100%';
            navAuth.style.background = 'white';
            navAuth.style.padding = '1rem';
        }
    },

    checkAuth() {
        const user = localStorage.getItem('wanderlust_user');
        if (user) {
            this.currentUser = JSON.parse(user);
        }
    },

    updateNav() {
        const navAuth = document.getElementById('navAuth');
        if (this.currentUser) {
            navAuth.innerHTML = `
                <button class="btn btn-outline" onclick="app.navigate('dashboard')"><i class="fa-solid fa-user"></i> Dashboard</button>
                <button class="btn btn-primary" onclick="app.logout()">Logout</button>
            `;
        } else {
            navAuth.innerHTML = `
                <button class="btn btn-outline" onclick="app.navigate('login')">Log In</button>
                <button class="btn btn-primary" onclick="app.navigate('register')">Sign Up</button>
            `;
        }
    },

    async handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            
            if (res.ok) {
                this.currentUser = data.user;
                localStorage.setItem('wanderlust_user', JSON.stringify(data.user));
                this.updateNav();
                this.navigate('dashboard');
            } else {
                alert(data.error || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            alert('Error connecting to server. Make sure the backend is running.');
        }
    },

    async handleRegister(event) {
        event.preventDefault();
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const phone = document.getElementById('reg-phone').value;
        const password = document.getElementById('reg-password').value;

        try {
            const res = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, password })
            });
            const data = await res.json();
            
            if (res.ok) {
                alert('Registration successful! Please log in.');
                this.navigate('login');
            } else {
                alert(data.error || 'Registration failed');
            }
        } catch (err) {
            console.error(err);
            alert('Error connecting to server.');
        }
    },

    logout() {
        this.currentUser = null;
        localStorage.removeItem('wanderlust_user');
        this.updateNav();
        this.navigate('home');
    },

    async loadPlaces() {
        const grid = document.getElementById('placesGrid');
        grid.innerHTML = '<div class="loader">Loading destinations...</div>';
        try {
            const res = await fetch(`${API_URL}/places`);
            const places = await res.json();
            grid.innerHTML = places.map(p => `
                <div class="card">
                    <div class="card-img-wrap">
                        <img src="https://source.unsplash.com/600x400/?${encodeURIComponent(p.place_name)}" alt="${p.place_name}" onerror="this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600'">
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">${p.place_name}</h3>
                        <p class="card-location"><i class="fa-solid fa-location-dot"></i> ${p.location}</p>
                        <p class="card-desc">${p.description}</p>
                        <div class="card-footer">
                            <button class="btn btn-primary" onclick="app.bookItem('place', ${p.place_id})">Explore</button>
                        </div>
                    </div>
                </div>
            `).join('');
        } catch (err) {
            grid.innerHTML = '<p>Error loading places. Ensure backend is running.</p>';
        }
    },

    async loadHotels() {
        const grid = document.getElementById('hotelsGrid');
        grid.innerHTML = '<div class="loader">Loading hotels...</div>';
        try {
            const res = await fetch(`${API_URL}/hotels`);
            const hotels = await res.json();
            grid.innerHTML = hotels.map(h => `
                <div class="card">
                    <div class="card-img-wrap">
                        <img src="https://source.unsplash.com/600x400/?hotel,${encodeURIComponent(h.location)}" alt="${h.hotel_name}" onerror="this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600'">
                        <div class="card-price-tag">$${h.price}/night</div>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">${h.hotel_name}</h3>
                        <p class="card-location"><i class="fa-solid fa-location-dot"></i> ${h.location}</p>
                        <p class="card-desc"><i class="fa-solid fa-star" style="color: #F59E0B;"></i> ${h.rating} / 5.0</p>
                        <div class="card-footer">
                            <button class="btn btn-primary" onclick="app.bookItem('hotel', ${h.hotel_id})">Book Now</button>
                        </div>
                    </div>
                </div>
            `).join('');
        } catch (err) {
            grid.innerHTML = '<p>Error loading hotels. Ensure backend is running.</p>';
        }
    },

    async loadTransport() {
        const grid = document.getElementById('transportGrid');
        grid.innerHTML = '<div class="loader">Loading transport...</div>';
        try {
            const res = await fetch(`${API_URL}/transport`);
            const transport = await res.json();
            grid.innerHTML = transport.map(t => {
                let icon = 'fa-plane';
                if(t.type.toLowerCase() === 'bus') icon = 'fa-bus';
                if(t.type.toLowerCase() === 'train') icon = 'fa-train';
                
                return `
                <div class="card">
                    <div class="card-body">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <i class="fa-solid ${icon} feature-icon" style="margin:0; font-size: 2rem;"></i>
                            <div class="card-price-tag" style="position:static;">$${t.fare}</div>
                        </div>
                        <h3 class="card-title">${t.type}</h3>
                        <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
                            <div>
                                <small>From</small>
                                <p><strong>${t.source}</strong></p>
                            </div>
                            <div><i class="fa-solid fa-arrow-right" style="color: var(--text-muted); margin-top: 1rem;"></i></div>
                            <div style="text-align: right;">
                                <small>To</small>
                                <p><strong>${t.destination}</strong></p>
                            </div>
                        </div>
                        <div class="card-footer" style="margin-top: 1.5rem;">
                            <button class="btn btn-outline btn-block" onclick="app.bookItem('transport', ${t.transport_id})">Select</button>
                        </div>
                    </div>
                </div>
            `}).join('');
        } catch (err) {
            grid.innerHTML = '<p>Error loading transport. Ensure backend is running.</p>';
        }
    },

    async loadDashboard() {
        if (!this.currentUser) {
            this.navigate('login');
            return;
        }

        document.getElementById('dash-name').textContent = this.currentUser.name;
        document.getElementById('dash-email').textContent = this.currentUser.email;

        const list = document.getElementById('bookingsList');
        try {
            const res = await fetch(`${API_URL}/bookings/${this.currentUser.user_id}`);
            const bookings = await res.json();
            
            if (bookings.length === 0) {
                list.innerHTML = '<p>You have no bookings yet. Time to plan a trip!</p>';
                return;
            }

            list.innerHTML = bookings.map(b => `
                <div class="booking-item">
                    <div class="booking-info">
                        <h4>${b.hotel_name || b.transport_type || 'Booking'}</h4>
                        <p>${b.source ? b.source + ' to ' + b.destination : 'Hotel Stay'}</p>
                        <p><i class="fa-regular fa-calendar"></i> ${new Date(b.booking_date).toLocaleDateString()}</p>
                    </div>
                    <span class="badge" style="background: var(--bg-light); color: var(--secondary); padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: bold;">Confirmed</span>
                </div>
            `).join('');
        } catch (err) {
            list.innerHTML = '<p>Error loading bookings.</p>';
        }
    },

    async bookItem(type, id) {
        if (!this.currentUser) {
            alert('Please log in to make a booking.');
            this.navigate('login');
            return;
        }

        const date = prompt("Enter booking date (YYYY-MM-DD):", new Date().toISOString().split('T')[0]);
        if (!date) return;

        const payload = {
            user_id: this.currentUser.user_id,
            booking_date: date,
            hotel_id: type === 'hotel' ? id : null,
            transport_id: type === 'transport' ? id : null
        };

        try {
            const res = await fetch(`${API_URL}/booking`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            
            if (res.ok) {
                alert('Booking confirmed!');
            } else {
                alert('Booking failed: ' + data.error);
            }
        } catch (err) {
            console.error(err);
            alert('Error connecting to server.');
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
