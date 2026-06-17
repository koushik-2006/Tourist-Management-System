export function initModal() {
    window.appUtils = window.appUtils || {};
    window.appUtils.closeModal = () => {
        document.getElementById('modal-root').innerHTML = '';
    };

    window.appUtils.showModal = (title, content, actions = '') => {
        const modalHtml = `
            <div class="modal-overlay open" onclick="if(event.target===this) window.appUtils.closeModal()">
                <div class="modal">
                    <div class="modal-head">
                        <h3>${title}</h3>
                        <button class="modal-close" onclick="window.appUtils.closeModal()"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    ${actions ? `<div class="modal-footer">${actions}</div>` : ''}
                </div>
            </div>
        `;
        document.getElementById('modal-root').innerHTML = modalHtml;
    };
}
