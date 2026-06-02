const USER_STORAGE_KEY = 'bookdrop-user';
const USERS_STORAGE_KEY = 'bookdrop-users';
const POSTS_STORAGE_KEY = 'bookdrop-posts';
const navLabels = ['Feed', 'Buscar', 'Postar', 'Salvos', 'Perfil'];
const sectionIds = ['feed-section', 'buscar-section', null, 'salvos-section', 'perfil-section'];

function getLoggedUser() {
    return localStorage.getItem(USER_STORAGE_KEY);
}

function setLoggedUser(username) {
    localStorage.setItem(USER_STORAGE_KEY, username);
}

function clearLoggedUser() {
    localStorage.removeItem(USER_STORAGE_KEY);
}

// ========== LOGIN/REGISTER ==========
function getUsers() {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : {};
}

function saveUser(username, password, email) {
    const users = getUsers();
    users[username.toLowerCase()] = { password, email, createdAt: new Date().toISOString() };
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function userExists(username) {
    const users = getUsers();
    return username.toLowerCase() in users;
}

function validateUser(username, password) {
    const users = getUsers();
    const user = users[username.toLowerCase()];
    return user && user.password === password;
}

function openLoginModal() {
    const overlay = document.getElementById('login-overlay');
    if (!overlay) return;
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    // Reset para painel de login
    document.getElementById('login-panel').classList.remove('hidden');
    document.getElementById('register-panel').classList.add('hidden');
    // Limpar campos
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.reset();
    const registerForm = document.getElementById('register-form');
    if (registerForm) registerForm.reset();
}

function closeLoginModal() {
    const overlay = document.getElementById('login-overlay');
    if (!overlay) return;
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
}

function switchToRegister() {
    document.getElementById('login-panel').classList.add('hidden');
    document.getElementById('register-panel').classList.remove('hidden');
}

function switchToLogin() {
    document.getElementById('register-panel').classList.add('hidden');
    document.getElementById('login-panel').classList.remove('hidden');
}

function updateAuthButtons(isLoggedIn) {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    if (loginBtn) loginBtn.classList.toggle('hidden', isLoggedIn);
    if (logoutBtn) logoutBtn.classList.toggle('hidden', !isLoggedIn);
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

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
    showSection('feed-section');
}

function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;

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
    showSection('feed-section');
    alert(`Bem-vindo(a), ${username}! Sua conta foi criada com sucesso.`);
}

function handleLogout() {
    clearLoggedUser();
    updateAuthState(null);
    updateAuthButtons(false);
    showSection('feed-section');
    // Reset nav
    document.querySelectorAll('.nav-item').forEach((item, index) => {
        item.classList.toggle('active', index === 0);
    });
}

function updateAuthState(username) {
    const isLoggedIn = Boolean(username);
    document.body.classList.toggle('logged-in', isLoggedIn);
    document.body.classList.toggle('logged-out', !isLoggedIn);

    const profileName = document.getElementById('profile-name');
    if (profileName) {
        profileName.textContent = username || 'Usuário BookDrop';
    }

    const profileHandle = document.getElementById('profile-handle');
    if (profileHandle) {
        profileHandle.textContent = username ? `@${username.toLowerCase().replace(/\s+/g, '')}` : '@usuario.bookdrop';
    }
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }
}


function setOverlayPanel(panelId) {
    const overlay = document.getElementById('overlay');
    if (!overlay) return;

    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');

    overlay.querySelectorAll('.modal > div').forEach(panel => panel.classList.add('hidden'));
    const panel = document.getElementById(panelId);
    if (panel) panel.classList.remove('hidden');
}

function hideOverlay() {
    const overlay = document.getElementById('overlay');
    if (!overlay) return;
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
}

function openPostModal() {
    setOverlayPanel('promo-panel');
    const linkInput = document.getElementById('post-link');
    if (linkInput) {
        linkInput.value = '';
        linkInput.focus();
    }
}

function closePostModal() {
    hideOverlay();
}

function createPromoDataFromLink(link) {
    try {
        const url = new URL(link);
        const hostname = url.hostname.replace('www.', '').toLowerCase();
        const pathname = url.pathname;
        const searchParams = url.searchParams;

        let store = hostname.split('.')[0];
        let category = 'Livro';
        let title = 'Promoção imperdível';
        let author = `Loja ${store}`;
        let coverImage = '';

        if (hostname.includes('amazon.com.br') || hostname.includes('amazon.com')) {
            store = 'Amazon';

            // Extrair ASIN usando regex para múltiplos formatos
            let asin = '';
            const dpMatch = pathname.match(/\/dp\/([A-Z0-9]{10})/);
            const gpMatch = pathname.match(/\/gp\/product\/([A-Z0-9]{10})/);
            const awMatch = pathname.match(/\/gp\/aw\/d\/([A-Z0-9]{10})/);

            asin = dpMatch ? dpMatch[1] : (gpMatch ? gpMatch[1] : (awMatch ? awMatch[1] : ''));

            if (asin) {
                coverImage = `https://images-na.ssl-images-amazon.com/images/P/${asin}.jpg`;
            }

            // Extrair título do slug antes do /dp/
            const beforeDp = pathname.split('/dp/')[0];
            const parts = beforeDp.split('/').filter(Boolean);
            if (parts.length > 0) {
                const lastPart = parts[parts.length - 1];
                if (lastPart && lastPart !== 's' && lastPart !== 'ref') {
                    title = lastPart.replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
                }
            }

            // Extrair autor de keywords ou usar Amazon como padrão
            const keywords = searchParams.get('keywords');
            if (keywords) {
                author = keywords.replace(/\+/g, ' ');
            } else {
                author = 'Amazon';
            }

            // Detectar categoria por palavras-chave
            if (/manga|hq|comic|graphic|história em quadrinho/.test(link.toLowerCase())) {
                category = 'Mangá';
            }
        } else {
            const pathSegments = pathname.split('/').filter(Boolean);
            const words = pathSegments.join(' ').replace(/[-_]/g, ' ').trim();
            if (words) {
                title = words;
            }
            if (searchParams.get('keywords')) {
                author = searchParams.get('keywords').replace(/\+/g, ' ');
            }
        }

        // Gerar preços aleatórios
        let basePrice = Math.floor(Math.random() * 80) + 29;
        let oldPrice = basePrice + Math.floor(Math.random() * 60) + 20;
        const discount = Math.round(((oldPrice - basePrice) / oldPrice) * 100);

        if (hostname.includes('amazon.com')) {
            basePrice = Math.floor(Math.random() * 70) + 19;
            oldPrice = basePrice + Math.floor(Math.random() * 80) + 10;
        }

        return {
            title: title.length > 0 ? title : `Promoção ${store}`,
            author: author.length > 0 ? author : store,
            category,
            store: store.charAt(0).toUpperCase() + store.slice(1),
            priceNew: `R$ ${basePrice.toFixed(2).replace('.', ',')}`,
            priceOld: `R$ ${oldPrice.toFixed(2).replace('.', ',')}`,
            discount: `-${discount}%`,
            time: 'Agora',
            votes: 0,
            coverImage,
        };
    } catch (error) {
        console.error('Erro ao processar link:', error);
        return null;
    }
}

function createDealCard(promo) {
    const card = document.createElement('div');
    card.className = 'deal-card hot';
    const coverStyle = promo.coverImage ? `background-image:url('${promo.coverImage}'); background-size:cover; background-position:center;` : 'background:#124d26;';
    const titleOnCover = promo.coverImage ? '' : promo.title;

    card.innerHTML = `
        <div class="hot-label">
            <i class="ti ti-flame" style="font-size:12px" aria-hidden="true"></i> NOVA BOOKDROP
        </div>
        <div class="deal-body">
            <div class="book-cover" style="${coverStyle}">
                <div class="book-spine" style="background:rgba(0,0,0,0.25);"></div>
                <div class="book-title-on-cover">${titleOnCover}</div>
            </div>
            <div class="deal-info">
                <span class="deal-category">${promo.category}</span>
                <div class="deal-title">${promo.title}</div>
                <div class="deal-author">${promo.author}</div>
                <div class="price-row">
                    <span class="price-new">${promo.priceNew}</span>
                    <span class="price-old">${promo.priceOld}</span>
                    <span class="discount-badge">${promo.discount}</span>
                </div>
            </div>
        </div>
        <div class="deal-footer">
            <div class="deal-meta">
                <span class="meta-item"><i class="ti ti-clock" style="font-size:12px" aria-hidden="true"></i> ${promo.time}</span>
                <span class="meta-item"><i class="ti ti-message" style="font-size:12px" aria-hidden="true"></i> 0</span>
            </div>
            <div style="display:flex;gap:6px;align-items:center;">
                <span class="store-badge">${promo.store}</span>
                <button class="vote-btn" type="button"><i class="ti ti-arrow-big-up" style="font-size:14px" aria-hidden="true"></i> <span>${promo.votes}</span></button>
            </div>
        </div>
    `;
    card.querySelector('.vote-btn').addEventListener('click', () => vote(card.querySelector('.vote-btn')));
    return card;
}

function handlePostSubmit(event) {
    event.preventDefault();
    const linkInput = document.getElementById('post-link');
    const promo = createPromoDataFromLink(linkInput.value.trim());
    if (!promo) {
        alert('Não foi possível ler os dados do link. Cole um link válido e tente novamente.');
        return;
    }

    const feed = document.getElementById('feed-list');
    if (feed) {
        const card = createDealCard(promo);
        const firstDeal = feed.querySelector('.deal-card');
        if (firstDeal) {
            feed.insertBefore(card, firstDeal);
        } else {
            feed.appendChild(card);
        }
        closePostModal();
        linkInput.value = '';
    }
}

function navClick(el) {
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

function filterChange(el) {
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.classList.remove('active');
        pill.classList.add('inactive');
    });
    el.classList.remove('inactive');
    el.classList.add('active');

    // Aplicar filtro nos cards
    const selectedCategory = el.dataset.category;
    const dealCards = document.querySelectorAll('.deal-card');
    
    dealCards.forEach(card => {
        const cardCategory = card.querySelector('.deal-category')?.textContent.trim();
        
        if (selectedCategory === 'all') {
            // Mostrar todos os cards
            card.style.display = '';
        } else if (cardCategory === selectedCategory) {
            // Mostrar apenas cards que correspondem à categoria selecionada
            card.style.display = '';
        } else {
            // Ocultar cards que não correspondem
            card.style.display = 'none';
        }
    });
}

function vote(btn) {
    const span = btn.querySelector('span');
    let count = parseInt(span.textContent);
    span.textContent = count + 1;
}

document.addEventListener('DOMContentLoaded', () => {
    const loggedUser = getLoggedUser();
    updateAuthState(loggedUser);
    updateAuthButtons(Boolean(loggedUser));
    if (loggedUser) {
        showSection('feed-section');
        document.querySelectorAll('.nav-item').forEach((item, index) => {
            item.classList.toggle('active', index === 0);
        });
    }

    // Promo form
    const promoForm = document.getElementById('promo-form');
    if (promoForm) {
        promoForm.addEventListener('submit', handlePostSubmit);
    }

    // Nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => navClick(item));
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

    // ===== LOGIN/REGISTER HANDLERS =====
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
        switchToRegisterLink.addEventListener('click', (e) => { e.preventDefault(); switchToRegister(); });
    }

    const switchToLoginLink = document.getElementById('switch-to-login');
    if (switchToLoginLink) {
        switchToLoginLink.addEventListener('click', (e) => { e.preventDefault(); switchToLogin(); });
    }

    const loginClose = document.getElementById('login-close');
    if (loginClose) {
        loginClose.addEventListener('click', closeLoginModal);
    }

    // Fechar modal ao clicar fora
    const loginOverlay = document.getElementById('login-overlay');
    if (loginOverlay) {
        loginOverlay.addEventListener('click', (e) => {
            if (e.target === loginOverlay) closeLoginModal();
        });
    }
});
