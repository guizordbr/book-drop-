/**
 * Feed Module
 * Handles feed data, deal cards, and post creation
 */

/**
 * Create promo data from URL
 * @param {string} link
 * @returns {Object|null}
 */
export function createPromoDataFromLink(link) {
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

            // Extract ASIN using regex for multiple formats
            const dpMatch = pathname.match(/\/dp\/([A-Z0-9]{10})/);
            const gpMatch = pathname.match(/\/gp\/product\/([A-Z0-9]{10})/);
            const awMatch = pathname.match(/\/gp\/aw\/d\/([A-Z0-9]{10})/);

            const asin = dpMatch ? dpMatch[1] : (gpMatch ? gpMatch[1] : (awMatch ? awMatch[1] : ''));

            if (asin) {
                coverImage = `https://images-na.ssl-images-amazon.com/images/P/${asin}.jpg`;
            }

            // Extract title from slug before /dp/
            const beforeDp = pathname.split('/dp/')[0];
            const parts = beforeDp.split('/').filter(Boolean);
            if (parts.length > 0) {
                const lastPart = parts[parts.length - 1];
                if (lastPart && lastPart !== 's' && lastPart !== 'ref') {
                    title = lastPart.replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
                }
            }

            // Extract author from keywords or use Amazon as default
            const keywords = searchParams.get('keywords');
            if (keywords) {
                author = keywords.replace(/\+/g, ' ');
            } else {
                author = 'Amazon';
            }

            // Detect category by keywords
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

        // Generate random prices
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

/**
 * Create deal card HTML element
 * @param {Object} promo
 * @param {Function} voteHandler
 * @returns {HTMLElement}
 */
export function createDealCard(promo, voteHandler) {
    const card = document.createElement('div');
    card.className = 'deal-card hot';
    
    const coverStyle = promo.coverImage 
        ? `background-image:url('${promo.coverImage}'); background-size:cover; background-position:center;`
        : 'background:#124d26;';
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
    
    card.querySelector('.vote-btn').addEventListener('click', () => {
        voteHandler(card.querySelector('.vote-btn'));
    });
    
    return card;
}

/**
 * Handle post form submission
 * @param {Event} event
 * @param {Function} createCardCallback
 * @param {Function} closeModalCallback
 */
export function handlePostSubmit(event, createCardCallback, closeModalCallback) {
    event.preventDefault();
    
    const linkInput = document.getElementById('post-link');
    const promo = createPromoDataFromLink(linkInput.value.trim());
    
    if (!promo) {
        alert('Não foi possível ler os dados do link. Cole um link válido e tente novamente.');
        return;
    }

    const feed = document.getElementById('feed-list');
    if (feed) {
        createCardCallback(promo);
        closeModalCallback();
        linkInput.value = '';
    }
}
