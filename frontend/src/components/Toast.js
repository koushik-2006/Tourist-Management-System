export function initToast() {
    window.appUtils = window.appUtils || {};
    window.appUtils.showToast = (msg, type = 'success') => {
        const root = document.getElementById('toast-root');
        const icon = type === 'success' ? '✓ ' : '✕ ';
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = icon + msg;
        root.appendChild(toast);
        
        // Trigger reflow for animation
        setTimeout(() => toast.classList.add('show'), 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };
}
