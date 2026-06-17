export class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentRoute = null;
        window.addEventListener('hashchange', () => this.handleHashChange());
    }

    init() {
        if (!window.location.hash) {
            window.location.hash = '#/';
        } else {
            this.handleHashChange();
        }
    }

    handleHashChange() {
        const hash = window.location.hash.slice(1) || '/';
        const route = this.routes.find(r => r.path === hash);
        
        if (route) {
            this.currentRoute = route;
            this.render();
        } else {
            // Fallback to home
            window.location.hash = '#/';
        }
    }

    render() {
        const appDiv = document.getElementById('app');
        // Clear current content
        appDiv.innerHTML = '';
        
        // Render view
        const viewHtml = this.currentRoute.view();
        appDiv.innerHTML = viewHtml;

        // Call init script if it exists
        if (this.currentRoute.init) {
            this.currentRoute.init();
        }
    }

    navigate(path) {
        window.location.hash = `#${path}`;
    }
}
