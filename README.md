# 📚 BookDrop Prototype - Estrutura de Projeto

Bem-vindo ao BookDrop! Esta é uma aplicação web de compartilhamento de promoções de livros, mangás e quadrinhos.

## 📁 Estrutura de Projeto

```
barbada-prototype/
├── src/
│   ├── js/
│   │   ├── app.js              # Ponto de entrada da aplicação
│   │   ├── storage.js          # Gerenciamento de localStorage
│   │   ├── auth.js             # Autenticação e login
│   │   ├── ui.js               # Manipulação de UI
│   │   ├── feed.js             # Gerenciamento do feed
│   │   └── utils.js            # Funções utilitárias
│   │
│   ├── styles/
│   │   ├── main.css            # Importação de todos os estilos
│   │   ├── variables.css       # Variáveis de design (cores, tipografia)
│   │   ├── layout.css          # Layout base (phone frame, screen)
│   │   ├── topbar.css          # Estilos da barra superior
│   │   ├── filters.css         # Estilos dos filtros
│   │   ├── feed.css            # Estilos do feed e cards
│   │   ├── sections.css        # Estilos das seções
│   │   ├── bottomnav.css       # Estilos da navegação inferior
│   │   ├── modal.css           # Estilos de modais
│   │   └── buttons.css         # Estilos de botões
│   │
│   ├── components/             # Componentes HTML reutilizáveis (futuro)
│   ├── assets/                 # Imagens, ícones, etc
│   └── index.html              # Arquivo HTML principal (versão modular)
│
├── index.html                  # HTML raiz (compatibilidade)
├── style.css                   # CSS legado (compatibilidade)
├── script.js                   # JS legado (compatibilidade)
├── package.json                # Dependências do projeto
└── README.md                   # Este arquivo
```

## 🚀 Como Usar

### Desenvolvimento

1. **Clone ou extraia o projeto**
   ```bash
   cd barbada-prototype
   ```

2. **Abra `src/index.html` no navegador**
   - Use um servidor local (recomendado):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   ```

3. **Acesse em seu navegador**
   ```
   http://localhost:8000/src/
   ```

### Versão Legada
- Se precisar da versão anterior, use `index.html` na raiz

## 📦 Módulos JavaScript

### `storage.js`
Gerencia dados no localStorage
- `getLoggedUser()` - Retorna usuário logado
- `setLoggedUser(username)` - Define usuário logado
- `saveUser(username, password, email)` - Salva novo usuário
- `validateUser(username, password)` - Valida credenciais

### `auth.js`
Controla autenticação e modais de login
- `openLoginModal()` - Abre modal de login
- `handleLogin(event)` - Processa login
- `handleRegister(event)` - Processa registro
- `handleLogout()` - Realiza logout

### `ui.js`
Manipulação de interface e navegação
- `showSection(sectionId)` - Mostra seção
- `navClick(el, ...)` - Trata cliques de navegação
- `filterChange(el)` - Aplica filtros
- `vote(btn)` - Incrementa votos

### `feed.js`
Gerenciamento do feed de promoções
- `createPromoDataFromLink(link)` - Extrai dados do URL
- `createDealCard(promo, voteHandler)` - Cria card HTML
- `handlePostSubmit(event, ...)` - Processa novo post

### `utils.js`
Funções utilitárias reutilizáveis
- `debounce(func, wait)` - Debounce para eventos
- `throttle(func, limit)` - Throttle para eventos
- `formatCurrency(value)` - Formata preços
- `formatDate(date)` - Formata datas

## 🎨 Sistema de Design

### Cores Principais
```css
--color-primary: #D85A30 (Laranja BookDrop)
--color-primary-dark: #993C1D
--color-bg-light: #F1EFE8 (Fundo claro)
--color-text-dark: #2C2C2A
--color-text-muted: #888780
```

### Componentes Estilizados
- **Topbar** - Barra superior com logo e botões
- **Filter Pills** - Filtros por categoria
- **Deal Cards** - Cards de promoções
- **Bottom Navigation** - Navegação inferior
- **Modals** - Diálogos de login e posts

## ✨ Funcionalidades Principais

✅ **Autenticação**
- Login/Registro local com localStorage
- Validação de dados

✅ **Feed de Promoções**
- Listagem de promoções
- Filtros por categoria
- Votação em promoções

✅ **Criar Promoções**
- Extrair dados automaticamente de URLs
- Suporte para Amazon, Panini Shop, etc.

✅ **Perfil de Usuário**
- Exibição de dados do usuário
- Estatísticas

✅ **Interface Responsiva**
- Design mobile-first
- Simulação de telefone (420px)

## 🔧 Desenvolvimento e Contribuição

### Adicionando Novos Módulos
1. Crie arquivo em `src/js/novo-modulo.js`
2. Exporte funções com `export`
3. Importe em `app.js`

### Adicionando Novos Estilos
1. Crie arquivo em `src/styles/novo-componente.css`
2. Importe em `src/styles/main.css`

### Boas Práticas
- Use variáveis CSS do `variables.css`
- Escreva comentários em português
- Mantenha funções pequenas e focadas
- Use nomes descritivos

## 📱 Compatibilidade

- ✅ Chrome/Edge (última versão)
- ✅ Firefox (última versão)
- ✅ Safari (última versão)
- ✅ Mobile browsers

## 🔐 Segurança

⚠️ **Nota Importante**: Este é um protótipo educacional.
- As senhas são armazenadas em plain text no localStorage
- Para produção, implementar backend seguro
- Adicionar criptografia
- Usar autenticação real (OAuth, JWT)

## 📋 TODO (Próximas Versões)

- [ ] Backend Node.js/Express
- [ ] Banco de dados real
- [ ] Autenticação JWT
- [ ] API REST completa
- [ ] Upload de imagens
- [ ] Busca avançada
- [ ] Sistema de comentários
- [ ] Notificações em tempo real
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados

## 👨‍💻 Autor

Desenvolvido como protótipo de SPA com JavaScript modular.

## 📄 Licença

Este projeto é fornecido como está para fins educacionais.

---

**Última atualização**: Junho 2026
