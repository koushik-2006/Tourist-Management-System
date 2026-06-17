import { appStore } from '../core/Store.js';

export function renderNavbar() {
    const state = appStore.getState();
    const isLoggedIn = !!state.user;
    
    // Determine which links to show based on auth role
    let authLinks = '';
    if (isLoggedIn) {
        if (state.user.role === 'admin') {
            authLinks = `<div class="nav-user" onclick="window.router.navigate('/admin')"><div class="avatar"><i class="fa-solid fa-user-shield"></i></div> Admin</div>`;
        } else {
            authLinks = `<div class="nav-user" onclick="window.router.navigate('/dashboard')"><div class="avatar"><i class="fa-solid fa-user"></i></div> ${state.user.name}</div>`;
        }
    } else {
        authLinks = `<button class="nav-btn" onclick="window.router.navigate('/login')">Sign In</button>`;
    }

    return `
        <nav class="navbar">
            <div class="nav-logo" onclick="window.router.navigate('/')">Wander<span>ly</span></div>
            <div class="nav-links">
                <a onclick="window.router.navigate('/')" class="${window.location.hash === '#/' ? 'active' : ''}">Home</a>
                <a onclick="window.router.navigate('/places')" class="${window.location.hash === '#/places' ? 'active' : ''}">Places</a>
                <a onclick="window.router.navigate('/hotels')" class="${window.location.hash === '#/hotels' ? 'active' : ''}">Hotels</a>
                <a onclick="window.router.navigate('/transport')" class="${window.location.hash === '#/transport' ? 'active' : ''}">Transport</a>
                <a onclick="window.router.navigate('/food')" class="${window.location.hash === '#/food' ? 'active' : ''}">Food</a>
                ${authLinks}
            </div>
        </nav>
    `;
}
