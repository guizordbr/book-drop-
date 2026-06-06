/**
 * Authentication Module
 * Handles login, registration, and auth state management
 */

import { 
    getLoggedUser, 
    setLoggedUser, 
    clearLoggedUser,
    getUsers,
    saveUser,
    userExists,
    validateUser
} from './storage.js';

/**
 * Open login/register modal
 */
export function openLoginModal() {
    const overlay = document.getElementById('login-overlay');
    if (!overlay) return;
    
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    
    // Reset to login panel
    document.getElementById('login-panel')?.classList.remove('hidden');
    document.getElementById('register-panel')?.classList.add('hidden');
    
    // Clear fields
    document.getElementById('login-form')?.reset();
    document.getElementById('register-form')?.reset();
}

/**
 * Close login/register modal
 */
export function closeLoginModal() {
    const overlay = document.getElementById('login-overlay');
    if (!overlay) return;
    
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
}

/**
 * Switch to register panel
 */
export function switchToRegister() {
    document.getElementById('login-panel')?.classList.add('hidden');
    document.getElementById('register-panel')?.classList.remove('hidden');
}

/**
 * Switch to login panel
 */
export function switchToLogin() {
    document.getElementById('register-panel')?.classList.add('hidden');
    document.getElementById('login-panel')?.classList.remove('hidden');
}

/**
 * Update auth buttons visibility
 * @param {boolean} isLoggedIn
 */
export function updateAuthButtons(isLoggedIn) {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (loginBtn) loginBtn.classList.toggle('hidden', isLoggedIn);
    if (logoutBtn) logoutBtn.classList.toggle('hidden', !isLoggedIn);
}

/**
 * Update auth state in UI
 * @param {string|null} username
 */
export function updateAuthState(username) {
    const isLoggedIn = Boolean(username);
    document.body.classList.toggle('logged-in', isLoggedIn);
    document.body.classList.toggle('logged-out', !isLoggedIn);

    const profileName = document.getElementById('profile-name');
    if (profileName) {
        profileName.textContent = username || 'Usuário BookDrop';
    }

    const profileHandle = document.getElementById('profile-handle');
    if (profileHandle) {
        profileHandle.textContent = username 
            ? `@${username.toLowerCase().replace(/\s+/g, '')}`
            : '@usuario.bookdrop';
    }
}

/**
 * Handle login form submission
 * @param {Event} event
 */
export function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username')?.value.trim();
    const password = document.getElementById('login-password')?.value;

    if (!username || !password) {
        alert('Preencha todos os campos.');
        return;
    }

    if (!userExists(username)) {
        alert('Usuário não encontrado. Cadastre-se primeiro!');
        return;
    }

    if (!validateUser(username, password)) {
        alert('Senha incorreta.');
        return;
    }

    setLoggedUser(username);
    updateAuthState(username);
    updateAuthButtons(true);
    closeLoginModal();
    
    // Import showSection from ui module to avoid circular dependency
    import('./ui.js').then(ui => ui.showSection('feed-section'));
}

/**
 * Handle register form submission
 * @param {Event} event
 */
export function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('register-username')?.value.trim();
    const email = document.getElementById('register-email')?.value.trim();
    const password = document.getElementById('register-password')?.value;
    const confirm = document.getElementById('register-confirm')?.value;

    if (!username || !email || !password || !confirm) {
        alert('Preencha todos os campos.');
        return;
    }

    if (username.length < 3 || username.length > 20) {
        alert('O nome de usuário deve ter entre 3 e 20 caracteres.');
        return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        alert('O nome de usuário só pode conter letras, números e underscore.');
        return;
    }

    if (password.length < 4) {
        alert('A senha deve ter pelo menos 4 caracteres.');
        return;
    }

    if (password !== confirm) {
        alert('As senhas não coincidem.');
        return;
    }

    if (userExists(username)) {
        alert('Este nome de usuário já está em uso. Escolha outro.');
        return;
    }

    saveUser(username, password, email);
    setLoggedUser(username);
    updateAuthState(username);
    updateAuthButtons(true);
    closeLoginModal();
    
    import('./ui.js').then(ui => ui.showSection('feed-section'));
    alert(`Bem-vindo(a), ${username}! Sua conta foi criada com sucesso.`);
}

/**
 * Handle logout
 */
export function handleLogout() {
    clearLoggedUser();
    updateAuthState(null);
    updateAuthButtons(false);
    
    import('./ui.js').then(ui => {
        ui.showSection('feed-section');
        
        // Reset nav
        document.querySelectorAll('.nav-item').forEach((item, index) => {
            item.classList.toggle('active', index === 0);
        });
    });
}
