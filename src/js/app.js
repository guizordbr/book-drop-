/**
 * BookDrop Application
 * Main application entry point with event listeners initialization
 */

import { getLoggedUser, clearLoggedUser } from './storage.js';
import {
    openLoginModal,
    closeLoginModal,
    switchToRegister,
    switchToLogin,
    updateAuthButtons,
    updateAuthState,
    handleLogin,
    handleRegister,
    handleLogout
} from './auth.js';
import {
    showSection,
    navClick,
    filterChange,
    openPostModal,
    closePostModal,
    hideOverlay,
    vote
} from './ui.js';
import {
    createPromoDataFromLink,
    createDealCard,
    handlePostSubmit
} from './feed.js';

// Navigation configuration
const navLabels = ['Feed', 'Buscar', 'Postar', 'Salvos', 'Perfil'];
const sectionIds = ['feed-section', 'buscar-section', null, 'salvos-section', 'perfil-section'];

/**
 * Initialize application
 */
function initializeApp() {
    const loggedUser = getLoggedUser();
    updateAuthState(loggedUser);
    updateAuthButtons(Boolean(loggedUser));
    
    if (loggedUser) {
        showSection('feed-section');
        document.querySelectorAll('.nav-item').forEach((item, index) => {
            item.classList.toggle('active', index === 0);
        });
    }

    setupEventListeners();
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Promo form
    const promoForm = document.getElementById('promo-form');
    if (promoForm) {
        promoForm.addEventListener('submit', (event) => {
            handlePostSubmit(event, (promo) => {
                const feed = document.getElementById('feed-list');
                const card = createDealCard(promo, vote);
                const firstDeal = feed.querySelector('.deal-card');
                if (firstDeal) {
                    feed.insertBefore(card, firstDeal);
                } else {
                    feed.appendChild(card);
                }
            }, closePostModal);
        });
    }

    // Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => navClick(item, openPostModal, sectionIds));
    });

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', hideOverlay);
    });

    // Filter pills
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', () => filterChange(pill));
    });

    // Vote buttons
    document.querySelectorAll('.vote-btn').forEach(btn => {
        btn.addEventListener('click', () => vote(btn));
    });

    // Auth handlers
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', openLoginModal);
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    const profileLogoutBtn = document.getElementById('profile-logout-btn');
    if (profileLogoutBtn) {
        profileLogoutBtn.addEventListener('click', handleLogout);
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    const switchToRegisterLink = document.getElementById('switch-to-register');
    if (switchToRegisterLink) {
        switchToRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchToRegister();
        });
    }

    const switchToLoginLink = document.getElementById('switch-to-login');
    if (switchToLoginLink) {
        switchToLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchToLogin();
        });
    }

    const loginClose = document.getElementById('login-close');
    if (loginClose) {
        loginClose.addEventListener('click', closeLoginModal);
    }

    // Close modal on outside click
    const loginOverlay = document.getElementById('login-overlay');
    if (loginOverlay) {
        loginOverlay.addEventListener('click', (e) => {
            if (e.target === loginOverlay) closeLoginModal();
        });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);
