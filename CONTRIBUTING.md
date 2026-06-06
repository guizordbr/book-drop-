# 🚀 Guia de Contribuição - BookDrop

Bem-vindo ao projeto BookDrop! Este documento ajudará você a contribuir efetivamente.

## Antes de Começar

1. **Leia a documentação**
   - [README.md](../README.md) - Visão geral do projeto
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitetura técnica
   - Este arquivo (CONTRIBUTING.md)

2. **Entenda a estrutura**
   ```
   src/
   ├── js/        # Módulos JavaScript
   ├── styles/    # Estilos CSS
   ├── components/# Componentes (futuro)
   ├── assets/    # Recursos
   └── index.html # HTML principal
   ```

3. **Ferramentas necessárias**
   - Editor de código (VS Code recomendado)
   - Git para versionamento
   - Navegador moderno para testes

## Como Contribuir

### 1. Encontrar uma Tarefa

- Procure por issues abertas no repositório
- Ou escolha uma tarefa do TODO no README.md
- Ou reporte um novo bug/feature

### 2. Criar uma Branch

```bash
git checkout -b feature/sua-feature
# ou
git checkout -b fix/seu-bug
```

**Convenção de nomes:**
- `feature/nome-descritivo` - Nova funcionalidade
- `fix/nome-descritivo` - Correção de bug
- `docs/nome-descritivo` - Documentação
- `refactor/nome-descritivo` - Refatoração de código

### 3. Fazer Alterações

#### Adicionando Nova Funcionalidade (Módulo)

**1. Criar arquivo do módulo:**
```javascript
// src/js/meu-novo-modulo.js
/**
 * Descrição do módulo
 */

/**
 * Minha função principal
 * @param {tipo} param - Descrição do parâmetro
 * @returns {tipo} - Descrição do retorno
 */
export function minhaFuncao(param) {
    // Implementação
    return resultado;
}

export function outraFuncao() {
    // Implementação
}
```

**2. Importar no app.js:**
```javascript
// src/js/app.js
import { minhaFuncao, outraFuncao } from './meu-novo-modulo.js';

function setupEventListeners() {
    document.getElementById('meu-botao').addEventListener('click', minhaFuncao);
}
```

**3. Testar no navegador**

#### Adicionando Novo Componente Visual

**1. Criar estilos:**
```css
/* src/styles/meu-componente.css */

.meu-componente {
    /* Use variáveis CSS */
    background: var(--color-primary);
    padding: var(--spacing-md);
    border-radius: var(--radius-lg);
    transition: all var(--transition-fast);
}

.meu-componente:hover {
    box-shadow: var(--shadow-md);
}

.meu-componente.ativo {
    color: var(--color-text-dark);
}
```

**2. Importar em main.css:**
```css
/* src/styles/main.css */
@import url('./meu-componente.css');
```

**3. Usar no HTML:**
```html
<div class="meu-componente">Conteúdo</div>
```

### 4. Padrões de Código

#### JavaScript

✅ **DO (Faça)**
```javascript
// Nomes descritivos
export function handleUserLogin(event) {
    event.preventDefault();
    const username = getUserInput();
    if (validateUsername(username)) {
        saveUser(username);
    }
}

// Comentários em português
// Explicar o "por quê", não o "o quê"
export function parseAmazonUrl(url) {
    // Extrai ASIN (Amazon Standard Identification Number)
    // para buscar capa do livro
    const match = url.match(/\/dp\/([A-Z0-9]{10})/);
    return match ? match[1] : null;
}

// JSDoc para documentar
/**
 * Valida formato de email
 * @param {string} email - Email para validar
 * @returns {boolean} - Verdadeiro se válido
 */
export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

❌ **DON'T (Não Faça)**
```javascript
// Nomes genéricos
function handle(e) {
    const u = document.getElementById('user').value;
    // difícil de entender
}

// Lógica complexa sem comentários
export function x(a) {
    return a.split('').reverse().join('').toLowerCase();
}

// Sem documentação
function calc(n) {
    return n * 2;
}
```

#### CSS

✅ **DO (Faça)**
```css
/* Use variáveis para cores e tamanhos */
.card {
    background: var(--color-bg-white);
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
}

/* Nomes de classe descritivos */
.deal-card-header { }
.filter-pill-active { }
.topbar-button { }

/* Mobile-first */
@media (min-width: 768px) {
    .card {
        display: grid;
        grid-template-columns: 1fr 2fr;
    }
}
```

❌ **DON'T (Não Faça)**
```css
/* Cores hardcoded */
.card {
    background: #ffffff;
    padding: 12px;
}

/* Nomes genéricos */
.big-box { }
.red-text { }
.hover-effect { }

/* Desktop-first (evitar) */
@media (max-width: 768px) {
    .card {
        display: block;
    }
}
```

#### HTML

✅ **DO (Faça)**
```html
<!-- IDs e classes semânticas -->
<button id="login-btn" class="topbar-btn">Login</button>

<!-- Atributos ARIA para acessibilidade -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <h2 id="modal-title">Título do Diálogo</h2>
</div>

<!-- Nomes descritivos em atributos -->
<input type="email" placeholder="seu@email.com" required>
```

❌ **DON'T (Não Faça)**
```html
<!-- IDs genéricos -->
<button id="btn1" class="c1">Login</button>

<!-- Sem ARIA -->
<div class="modal">Conteúdo</div>

<!-- Placeholders vagos -->
<input type="email" placeholder="Email">
```

### 5. Testes

Antes de fazer commit:

1. **Teste no navegador**
   ```bash
   # Abra src/index.html em um servidor local
   python -m http.server 8000
   # Visite http://localhost:8000/src/
   ```

2. **Verifique casos de teste**
   - [ ] Funciona no Chrome
   - [ ] Funciona no Firefox
   - [ ] Funciona no Safari
   - [ ] Funciona em mobile (devtools)
   - [ ] Sem erros no console
   - [ ] Sem console warnings

3. **Teste funcionalidades relacionadas**
   - Se modificou `auth.js`, teste login/registro
   - Se modificou CSS, verifique responsividade
   - Se modificou `feed.js`, crie novo post

### 6. Fazer Commit

```bash
# Estágio suas mudanças
git add src/

# Commit com mensagem descritiva
git commit -m "feat: adiciona novo módulo de notificações"

# Ou para fixes
git commit -m "fix: corrige bug ao votar em promoção"
```

**Convenção de mensagens:**
```
feat: nova funcionalidade
fix: correção de bug
docs: alterações em documentação
refactor: melhoria de código sem mudar funcionalidade
style: alterações de formatação/estilos
test: adicionar/modificar testes
chore: tarefas de manutenção
```

### 7. Push e Pull Request

```bash
# Envie sua branch
git push origin feature/sua-feature

# Crie um Pull Request no GitHub
```

**Template de PR:**
```markdown
## Descrição
O que esta mudança faz?

## Tipo de Mudança
- [ ] Nova funcionalidade
- [ ] Correção de bug
- [ ] Breaking change
- [ ] Documentação

## Como Testar
Passos para testar a mudança:
1. Abrir `src/index.html`
2. Fazer login
3. Verificar se...

## Checklist
- [ ] Código segue padrões do projeto
- [ ] Sem console errors/warnings
- [ ] Testado em múltiplos navegadores
- [ ] Documentação atualizada
- [ ] Mensagens de commit descritivas
```

## Reportar Bugs

**Template de Issue:**
```markdown
## Descrição do Bug
Descrição clara do problema

## Passos para Reproduzir
1. Abrir navegador
2. Fazer login com...
3. Clicar em...
4. Ver erro

## Comportamento Esperado
O que deveria acontecer

## Comportamento Real
O que realmente aconteceu

## Environment
- Navegador: Chrome 99
- SO: Windows 11
- Versão: 1.0.0

## Screenshot
[Se aplicável, adicionar screenshot]
```

## Sugerir Melhorias

**Template de Feature Request:**
```markdown
## Descrição
O que você gostaria de adicionar?

## Justificativa
Por que isso seria útil?

## Exemplo de Uso
Como você imaginaria usando?

## Complexidade
Estimativa: Baixa / Média / Alta
```

## Guia de Estilo

### Convenções de Nomenclatura

| Item | Padrão | Exemplo |
|------|--------|---------|
| Variáveis | camelCase | `userEmail`, `isLoggedIn` |
| Constantes | UPPER_SNAKE_CASE | `MAX_PASSWORD_LENGTH`, `API_URL` |
| Funções | camelCase com verbo | `getUserData()`, `handleClick()` |
| Classes CSS | kebab-case | `.deal-card`, `.topbar-btn` |
| IDs HTML | kebab-case | `id="login-btn"`, `id="feed-list"` |
| Arquivos | kebab-case.js | `auth.js`, `storage.js` |
| Branches Git | kebab-case | `feature/add-notifications` |

### Tamanho de Funções

- Máximo 20 linhas por função
- Se ficar maior, dividir em funções menores
- Cada função deve fazer uma coisa bem

### Imports/Exports

```javascript
// ✅ Bom: Agrupar imports
import { function1, function2 } from './module.js';
import { helper } from './utils.js';

// ❌ Ruim: Imports espalhados
import { f1 } from './m1.js';
// ... código ...
import { f2 } from './m2.js';
```

## Recursos Úteis

- [MDN Web Docs](https://developer.mozilla.org) - Documentação web
- [CSS Tricks](https://css-tricks.com) - Artigos CSS
- [JavaScript.info](https://javascript.info) - Tutorial JavaScript
- [Web Accessibility](https://www.w3.org/WAI/) - Acessibilidade

## Dúvidas?

- Abra uma issue com a tag `question`
- Mencione @maintainers para mais rápida resposta
- Visite nossas discussões

## Código de Conduta

- Seja respeitoso com os outros contribuidores
- Dê feedback construtivo
- Reportar comportamento inadequado para maintainers
- Diversidade e inclusão são valores importantes

---

**Obrigado por contribuir com BookDrop! 🎉**
