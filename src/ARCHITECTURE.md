# 🗂️ Guia de Arquitetura - BookDrop

## Visão Geral da Arquitetura

O BookDrop é estruturado como uma **SPA (Single Page Application)** com **JavaScript Modular ES6**.

```
┌─────────────────────────────────────┐
│         HTML (index.html)           │
├─────────────────────────────────────┤
│       src/js/app.js                 │
│   (Orquestrador Principal)          │
├─────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  │
│  │ Módulos JS  │  │ CSS Modular  │  │
│  ├─────────────┤  ├──────────────┤  │
│  │ storage.js  │  │ variables.css│  │
│  │ auth.js     │  │ layout.css   │  │
│  │ ui.js       │  │ feed.css     │  │
│  │ feed.js     │  │ modal.css    │  │
│  │ utils.js    │  │ ...          │  │
│  └─────────────┘  └──────────────┘  │
└─────────────────────────────────────┘
```

## Fluxo de Dados

```
User Interaction
       ↓
Event Listener (app.js)
       ↓
Módulo Específico (auth.js, feed.js, etc)
       ↓
Storage/State (storage.js)
       ↓
DOM Update (UI Render)
       ↓
CSS Applied (styles/)
```

## Padrões de Projeto Utilizados

### 1. **Módulos (ES6)**
Cada funcionalidade está em seu próprio arquivo com exports/imports claros.

```javascript
// storage.js
export function getLoggedUser() { ... }
export function setLoggedUser(username) { ... }

// auth.js
import { getLoggedUser, setLoggedUser } from './storage.js';
export function handleLogin(event) { ... }
```

### 2. **Injeção de Dependências**
Funções recebem dependências como parâmetros.

```javascript
export function navClick(el, openPostModal, sectionIds) {
    // openPostModal é injetado ao invés de ser importado direto
}
```

### 3. **Separação de Responsabilidades**

| Módulo | Responsabilidade |
|--------|------------------|
| `storage.js` | Persistência de dados (localStorage) |
| `auth.js` | Lógica de autenticação |
| `ui.js` | Manipulação de UI e navegação |
| `feed.js` | Gerenciamento do feed |
| `utils.js` | Funções utilitárias |
| `app.js` | Orquestração e inicialização |

### 4. **CSS em Cascata**

```css
/* variables.css - Define cores, tamanhos, etc */
:root {
    --color-primary: #D85A30;
    --spacing-md: 12px;
}

/* layout.css - Estrutura base */
.phone { ... }
.screen { ... }

/* topbar.css, feed.css, etc - Componentes específicos */
.topbar { ... }
.deal-card { ... }

/* main.css - Importa tudo em ordem */
@import url('./variables.css');
@import url('./layout.css');
```

## Ciclo de Vida da Aplicação

### 1. **Inicialização (DOM Loaded)**
```javascript
document.addEventListener('DOMContentLoaded', initializeApp);
```

### 2. **Setup do Estado Inicial**
```javascript
function initializeApp() {
    const loggedUser = getLoggedUser();
    updateAuthState(loggedUser);
    updateAuthButtons(Boolean(loggedUser));
    setupEventListeners();
}
```

### 3. **Interação do Usuário**
```javascript
// Usuário clica em botão
button.addEventListener('click', () => {
    // Chama função do módulo apropriado
    handleLogin(event);
});
```

### 4. **Atualização de Estado**
```javascript
// storage.js - Persiste dados
setLoggedUser(username);

// auth.js - Atualiza UI
updateAuthState(username);
```

### 5. **Renderização**
```javascript
// ui.js - Mostra/esconde elementos
showSection('feed-section');
```

## Estrutura de um Módulo Típico

```javascript
/**
 * Nome do Módulo
 * Descrição breve da funcionalidade
 */

// Imports necessários
import { outroModulo } from './outro-modulo.js';

// Constantes do módulo
const CHAVE_STORAGE = 'minha-chave';

/**
 * Função 1
 * @param {tipo} param - Descrição
 * @returns {tipo}
 */
export function funcao1(param) {
    // Implementação
}

/**
 * Função 2
 * @param {tipo} param1
 * @param {tipo} param2
 */
export function funcao2(param1, param2) {
    // Implementação
}
```

## Fluxo de Login

```
┌─────────────────────┐
│ Usuário clica login │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ openLoginModal()    │ (auth.js)
│ - Mostra overlay    │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Usuário preenche    │
│ formulário          │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ handleLogin(event)  │ (auth.js)
│ - Valida dados      │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ validateUser()      │ (storage.js)
│ - Valida credenciais│
└──────────┬──────────┘
           ↓
    ┌──────┴──────┐
    ↓             ↓
┌─────┐       ┌────────┐
│ OK  │       │ Erro   │
└──┬──┘       └────────┘
   ↓
┌─────────────────────┐
│ setLoggedUser()     │ (storage.js)
│ - Salva localStorage│
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ updateAuthState()   │ (auth.js)
│ - Atualiza UI       │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ closeLoginModal()   │ (auth.js)
│ - Esconde overlay   │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Usuário autenticado!│
└─────────────────────┘
```

## Fluxo de Criação de Promoção

```
┌──────────────────────┐
│ Usuário clica Postar │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ openPostModal()      │ (ui.js)
│ - Mostra modal       │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Usuário cola URL     │
│ e submete            │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ handlePostSubmit()   │ (feed.js)
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ createPromoDataFrom  │ (feed.js)
│ Link(link)           │
│ - Parse URL          │
│ - Extrai ASIN Amazon │
│ - Gera preços        │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ createDealCard()     │ (feed.js)
│ - Cria HTML card     │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ feed.insertBefore()  │
│ - Adiciona ao DOM    │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ closePostModal()     │ (ui.js)
│ - Esconde modal      │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Promoção criada!     │
└──────────────────────┘
```

## Expansibilidade

### Adicionar Novo Módulo

1. **Criar arquivo** `src/js/novo-modulo.js`
```javascript
export function minhaFuncao() { ... }
```

2. **Importar em** `src/js/app.js`
```javascript
import { minhaFuncao } from './novo-modulo.js';
```

3. **Usar nas inicializações**
```javascript
function setupEventListeners() {
    element.addEventListener('click', minhaFuncao);
}
```

### Adicionar Novo Estilo

1. **Criar arquivo** `src/styles/novo-componente.css`
```css
.meu-componente {
    color: var(--color-primary);
    padding: var(--spacing-md);
}
```

2. **Importar em** `src/styles/main.css`
```css
@import url('./novo-componente.css');
```

## Performance

- ✅ Lazy loading de módulos (imports apenas quando necessário)
- ✅ CSS minimalista sem frameworks pesados
- ✅ Cache de localStorage para usuários logados
- ✅ Event delegation para múltiplos elementos similares

## Melhorias Futuras

1. **TypeScript** - Adicionar tipagem estática
2. **Testing** - Jest/Vitest para testes automatizados
3. **Build Tool** - Webpack/Vite para minificação
4. **State Management** - Redux/Zustand para estado global
5. **API Integration** - Backend com Node.js/Express
6. **PWA** - Service Workers para offline
7. **Componentes** - Web Components ou Vue/React

---

**Mantido para**: Facilitar onboarding de novos desenvolvedores
