import { TRANSPORT, FOOD } from '../data/mockData.js';
import { renderTransportCard, renderFoodCard } from '../components/Cards.js';
import { appStore } from '../core/Store.js';

export const Transport = {
    view: () => `
        <div class="page-hero">
            <h1>Seamless Travel</h1>
            <p>Book flights, buses, trains, and cabs easily.</p>
        </div>
        <div class="transport-tabs">
            <div class="transport-tab active">All</div>
            <div class="transport-tab">Flight</div>
            <div class="transport-tab">Train</div>
            <div class="transport-tab">Bus</div>
            <div class="transport-tab">Cab</div>
        </div>
        <div class="section">
            <div class="transport-search">
                <div class="transport-row">
                    <div class="form-group"><label>From</label><input type="text" placeholder="Origin City"></div>
                    <div class="form-group"><label>To</label><input type="text" placeholder="Destination City"></div>
                    <div class="form-group"><label>Date</label><input type="date"></div>
                    <div class="form-group"><button class="btn-book sky" style="width:100%; padding: .75rem;">Search Routes</button></div>
                </div>
            </div>
            <div class="route-list">
                ${TRANSPORT.map(renderTransportCard).join('')}
            </div>
        </div>
    `
};

export const Food = {
    view: () => `
        <div class="page-hero">
            <h1>Local Delicacies</h1>
            <p>Savor the best food from top restaurants.</p>
        </div>
        <div class="filters">
            <button class="filter-btn active">All</button>
            <button class="filter-btn">North Indian</button>
            <button class="filter-btn">South Indian</button>
            <button class="filter-btn">Chinese</button>
            <button class="filter-btn">Continental</button>
            <button class="filter-btn">Street Food</button>
        </div>
        <div class="section">
            <div class="food-grid">
                ${FOOD.map(renderFoodCard).join('')}
            </div>
        </div>
    `
};

export const Auth = {
    view: () => `
        <div class="auth-wrap">
            <div class="auth-card">
                <div class="auth-header">
                    <h2>Welcome to Wanderly</h2>
                    <p>Log in or create an account to manage bookings.</p>
                </div>
                <div class="auth-tabs">
                    <div class="auth-tab active" onclick="document.getElementById('login-form').style.display='block'; document.getElementById('reg-form').style.display='none'; this.classList.add('active'); this.nextElementSibling.classList.remove('active');">Login</div>
                    <div class="auth-tab" onclick="document.getElementById('reg-form').style.display='block'; document.getElementById('login-form').style.display='none'; this.classList.add('active'); this.previousElementSibling.classList.remove('active');">Register</div>
                </div>
                <div class="auth-body">
                    <form id="login-form" onsubmit="window.appUtils.handleLogin(event)">
                        <div class="form-group"><label>Email</label><input type="email" id="log-email" required value="admin@wanderly.com"></div>
                        <div class="form-group"><label>Password</label><input type="password" id="log-pass" required value="admin123"></div>
                        <button type="submit" class="btn-full">Log In</button>
                    </form>
                    <form id="reg-form" style="display:none;" onsubmit="window.appUtils.handleRegister(event)">
                        <div class="form-group"><label>Name</label><input type="text" id="reg-name" required></div>
                        <div class="form-group"><label>Email</label><input type="email" id="reg-email" required></div>
                        <div class="form-group"><label>Phone</label><input type="tel" id="reg-phone"></div>
                        <div class="form-group"><label>Password</label><input type="password" id="reg-pass" required></div>
                        <button type="submit" class="btn-full">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    `
};

export const Dashboard = {
    view: () => {
        const user = appStore.getState().user;
        if (!user) {
            window.router.navigate('/login');
            return '';
        }
        
        return `
            <div class="page-hero" style="padding: 1.5rem 2rem;">
                <h1 style="font-size: 1.8rem;">My Dashboard</h1>
            </div>
            <div class="dash-grid">
                <div class="dash-sidebar">
                    <div class="dash-user-head">
                        <div class="dash-avatar"><i class="fa-solid fa-user"></i></div>
                        <div class="dash-name">${user.name}</div>
                        <div class="dash-email">${user.email}</div>
                    </div>
                    <div class="dash-menu">
                        <a class="active"><i class="fa-solid fa-suitcase"></i> My Bookings</a>
                        <a><i class="fa-solid fa-heart"></i> Saved Places</a>
                        <a><i class="fa-solid fa-gear"></i> Settings</a>
                        <a onclick="window.appUtils.handleLogout()"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a>
                    </div>
                </div>
                <div class="dash-content">
                    <div class="dash-card">
                        <h3>Overview</h3>
                        <div class="kpi-row">
                            <div class="kpi"><div class="kpi-val">2</div><div class="kpi-lbl">Upcoming Trips</div></div>
                            <div class="kpi"><div class="kpi-val">5</div><div class="kpi-lbl">Places Visited</div></div>
                        </div>
                    </div>
                    <div class="dash-card">
                        <h3>Recent Bookings</h3>
                        <div>
                            <div class="booking-item">
                                <div class="booking-icon"><i class="fa-solid fa-hotel" style="color:var(--sky)"></i></div>
                                <div class="booking-info">
                                    <div class="booking-title">The Grand Palace</div>
                                    <div class="booking-date">Check-in: 25 Oct 2026</div>
                                </div>
                                <div class="status-badge status-confirmed">Confirmed</div>
                            </div>
                            <div class="booking-item">
                                <div class="booking-icon"><i class="fa-solid fa-plane" style="color:var(--terracotta)"></i></div>
                                <div class="booking-info">
                                    <div class="booking-title">Flight to Jaipur</div>
                                    <div class="booking-date">Departure: 24 Oct 2026</div>
                                </div>
                                <div class="status-badge status-pending">Pending</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

export const AdminDashboard = {
    view: () => {
        const user = appStore.getState().user;
        if (!user || user.role !== 'admin') {
            window.router.navigate('/');
            return '';
        }
        return `
            <div class="admin-header">
                <h1>Wanderly Admin Panel</h1>
                <button class="btn-book" onclick="window.appUtils.handleLogout()">Logout</button>
            </div>
            <div class="admin-grid">
                <div class="admin-sidebar">
                    <div class="admin-menu">
                        <a class="active"><i class="fa-solid fa-chart-line"></i> Dashboard</a>
                        <a><i class="fa-solid fa-users"></i> Users</a>
                        <a><i class="fa-solid fa-map-location-dot"></i> Places</a>
                        <a><i class="fa-solid fa-hotel"></i> Hotels</a>
                        <a><i class="fa-solid fa-bus"></i> Transport</a>
                        <a><i class="fa-solid fa-ticket"></i> Bookings</a>
                    </div>
                </div>
                <div class="admin-body">
                    <div class="admin-kpis">
                        <div class="admin-kpi"><div class="admin-kpi-val">1,248</div><div class="admin-kpi-lbl">Total Users</div></div>
                        <div class="admin-kpi"><div class="admin-kpi-val">850</div><div class="admin-kpi-lbl">Total Hotels</div></div>
                        <div class="admin-kpi"><div class="admin-kpi-val">3,492</div><div class="admin-kpi-lbl">Total Bookings</div></div>
                        <div class="admin-kpi"><div class="admin-kpi-val">₹42L</div><div class="admin-kpi-lbl">Revenue Generated</div></div>
                    </div>
                    <div class="data-table">
                        <div class="data-table-header">
                            <h3>Recent Users</h3>
                            <div class="table-actions"><button class="btn-sm btn-edit">Export</button></div>
                        </div>
                        <table>
                            <thead>
                                <tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Admin User</td><td>admin@wanderly.com</td><td>Admin</td><td class="action-btns"><button class="btn-sm btn-edit">Edit</button></td></tr>
                                <tr><td>John Doe</td><td>john@example.com</td><td>User</td><td class="action-btns"><button class="btn-sm btn-edit">Edit</button><button class="btn-sm btn-del">Del</button></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
};
