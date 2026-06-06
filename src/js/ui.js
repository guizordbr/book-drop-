/**
 * UI Module
 * Handles UI interactions and navigation
 */

/**
 * Show specific section and hide others
 * @param {string} sectionId
 */
export function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }
}

/**
 * Handle bottom navigation clicks
 * @param {HTMLElement} el
 * @param {Function} openPostModal
 * @param {Array} sectionIds
 */
export function navClick(el, openPostModal, sectionIds) {
    const navItems = document.querySelectorAll('.nav-item');
    const navIndex = Array.from(navItems).indexOf(el);

    if (navIndex === 2) {
        openPostModal();
        return;
    }

    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    navItems.forEach(item => item.classList.remove('active'));
    el.classList.add('active');

    if (sectionIds[navIndex]) {
        document.getElementById(sectionIds[navIndex]).classList.add('active');
    }
}

/**
 * Handle filter changes
 * @param {HTMLElement} el
 */
export function filterChange(el) {
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.classList.remove('active');
        pill.classList.add('inactive');
    });
    
    el.classList.remove('inactive');
    el.classList.add('active');

    const selectedCategory = el.dataset.category;
    const dealCards = document.querySelectorAll('.deal-card');
    
    dealCards.forEach(card => {
        const cardCategory = card.querySelector('.deal-category')?.textContent.trim();
        
        if (selectedCategory === 'all') {
            card.style.display = '';
        } else if (cardCategory === selectedCategory) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Set overlay panel visibility
 * @param {string} panelId
 */
export function setOverlayPanel(panelId) {
    const overlay = document.getElementById('overlay');
    if (!overlay) return;

    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');

    overlay.querySelectorAll('.modal > div').forEach(panel => {
        panel.classList.add('hidden');
    });
    
    const panel = document.getElementById(panelId);
    if (panel) panel.classList.remove('hidden');
}

/**
 * Hide overlay
 */
export function hideOverlay() {
    const overlay = document.getElementById('overlay');
    if (!overlay) return;
    
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
}

/**
 * Open post modal
 */
export function openPostModal() {
    setOverlayPanel('promo-panel');
    const linkInput = document.getElementById('post-link');
    if (linkInput) {
        linkInput.value = '';
        linkInput.focus();
    }
}

/**
 * Close post modal
 */
export function closePostModal() {
    hideOverlay();
}

/**
 * Handle vote button click
 * @param {HTMLElement} btn
 */
export function vote(btn) {
    const span = btn.querySelector('span');
    let count = parseInt(span.textContent) || 0;
    span.textContent = count + 1;
}
