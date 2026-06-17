import { Router } from './core/Router.js';
import { appStore } from './core/Store.js';
import { renderNavbar } from './components/Navbar.js';
import { initModal } from './components/Modal.js';
import { initToast } from './components/Toast.js';

import { Home } from './pages/Home.js';
import { Places, Hotels } from './pages/PlacesHotels.js';
import { Transport, Food, Auth, Dashboard, AdminDashboard } from './pages/Pages.js';

// Setup global utilities
initModal();
initToast();

window.appUtils.handleLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById('log-email').value;
    const role = email.includes('admin') ? 'admin' : 'user';
    appStore.setState({ user: { name: email.split('@')[0], email, role } });
    window.appUtils.showToast('Login successful!');
    if (role === 'admin') window.router.navigate('/admin');
    else window.router.navigate('/dashboard');
};

window.appUtils.handleRegister = (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    appStore.setState({ user: { name, email, role: 'user' } });
    window.appUtils.showToast('Registration successful!');
    window.router.navigate('/dashboard');
};

window.appUtils.handleLogout = () => {
    appStore.setState({ user: null });
    window.appUtils.showToast('Logged out successfully');
    window.router.navigate('/');
};

window.appUtils.showDetails = async (type, id) => {
    if (type === 'place') {
        const { PLACES } = await import('./data/mockData.js');
        const place = PLACES.find(p => p.id === id);
        if (place) {
            const headerHtml = `
                <div style="height: 200px; background-color: var(--sand); position: relative; display: flex; align-items: center; justify-content: center; font-size: 5rem; overflow: hidden; margin: -1.5rem -1.5rem 1.5rem -1.5rem;">
                    ${place.image ? 
                        `<img src="${place.image}" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                         <span style="display:none;">${place.emoji}</span>` 
                    : place.emoji}
                </div>
            `;
            const contentHtml = `
                ${headerHtml}
                <div class="modal-detail-row"><span class="modal-detail-label">Location</span><span class="modal-detail-value">${place.location}</span></div>
                <div class="modal-detail-row"><span class="modal-detail-label">Category</span><span class="modal-detail-value">${place.category}</span></div>
                <div class="modal-detail-row"><span class="modal-detail-label">Rating</span><span class="modal-detail-value">${place.rating} ★</span></div>
                <div class="modal-detail-row"><span class="modal-detail-label">Entry Price</span><span class="modal-detail-value">${place.price}</span></div>
                <p style="margin-top: 1rem; color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">${place.desc}</p>
            `;
            const actionsHtml = `<button class="btn-book sky" onclick="window.router.navigate('/hotels'); window.appUtils.closeModal();">Find Hotels Nearby</button>`;
            window.appUtils.showModal(place.name, contentHtml, actionsHtml);
            return;
        }
    }
    window.appUtils.showModal(`${type.toUpperCase()} Details`, `<p>Viewing details for ${type} ID: ${id}</p><p>Wait for backend integration to see full details.</p>`);
};

window.appUtils.bookItem = (type, id) => {
    if (!appStore.getState().user) {
        window.appUtils.showToast('Please login to book!', 'error');
        window.router.navigate('/login');
        return;
    }
    window.appUtils.showModal('Confirm Booking', `<p>Are you sure you want to book this ${type}?</p>`, `<button class="btn-book" onclick="window.appUtils.confirmBooking('${type}', ${id})">Confirm</button>`);
};

window.appUtils.confirmBooking = (type, id) => {
    window.appUtils.closeModal();
    window.appUtils.showToast(`Booking confirmed for ${type}!`);
    // Here we will eventually send to backend API
};

window.appUtils.performSearch = () => {
    import('./components/Search.js').then(module => {
        module.performSearch();
    });
};

window.appUtils.showSearchResultDetails = (id) => {
    import('./components/Search.js').then(module => {
        module.showSearchResultDetails(id);
    });
};

// Layout rendering
function renderLayout(viewHtml) {
    return `
        ${renderNavbar()}
        <main class="page active">
            ${viewHtml}
        </main>
        <footer class="footer" style="background:var(--ink); color:#fff; padding: 3rem 2rem; text-align:center;">
            <h2 style="font-family:'Playfair Display',serif; color:var(--gold);">Wanderly</h2>
            <p style="opacity:0.6; font-size:0.9rem; margin:1rem 0;">Experience the world like never before.</p>
            <p style="opacity:0.4; font-size:0.8rem;">&copy; 2026 Wanderly Tourist Management System</p>
        </footer>
    `;
}

// Router Setup
const routes = [
    { path: '/', view: () => renderLayout(Home.view()), init: Home.init },
    { path: '/places', view: () => renderLayout(Places.view()), init: Places.init },
    { path: '/hotels', view: () => renderLayout(Hotels.view()), init: Hotels.init },
    { path: '/transport', view: () => renderLayout(Transport.view()), init: Transport.init },
    { path: '/food', view: () => renderLayout(Food.view()), init: Food.init },
    { path: '/login', view: () => renderLayout(Auth.view()), init: Auth.init },
    { path: '/dashboard', view: () => renderLayout(Dashboard.view()), init: Dashboard.init },
    { path: '/admin', view: () => renderLayout(AdminDashboard.view()), init: AdminDashboard.init }
];

const router = new Router(routes);
window.router = router;

// Re-render when state changes (only navbar needs update technically, but we re-render current route for simplicity)
appStore.subscribe(() => {
    router.render();
});

// Start app
router.init();
