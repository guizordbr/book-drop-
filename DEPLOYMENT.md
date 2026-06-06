# 📦 Build & Deployment - BookDrop

## Ambiente de Desenvolvimento

### Setup Local

1. **Clone o repositório**
   ```bash
   git clone <repo-url>
   cd barbada-prototype
   ```

2. **Inicie servidor local**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server -p 8000
   ```

3. **Acesse**
   ```
   http://localhost:8000/src/
   ```

## Estrutura de Arquivos para Produção

```
dist/
├── index.html          (minificado)
├── css/
│   └── main.min.css    (minificado + bundled)
├── js/
│   └── app.min.js      (minificado + bundled)
└── assets/
    └── icons/
```

## Build Process (Futuro)

### Com Webpack/Vite

```bash
npm install -D vite
npm run build
```

**vite.config.js**
```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'auth': ['src/js/auth.js'],
          'feed': ['src/js/feed.js'],
        }
      }
    }
  }
})
```

## Deploy para Produção

### Opção 1: GitHub Pages

1. **Push para GitHub**
   ```bash
   git push origin main
   ```

2. **Configurar GitHub Pages**
   - Settings → Pages
   - Source: `main branch /root`
   - Publish site

3. **Acessar**
   ```
   https://seu-username.github.io/barbada-prototype/src/
   ```

### Opção 2: Netlify

1. **Conectar repositório**
   - https://app.netlify.com/
   - Connect Git
   - Escolher repo

2. **Configurar build**
   - Build command: `npm run build` (quando adicionar)
   - Publish directory: `src/` (ou `dist/`)

3. **Deploy automático**
   - Todo push → redeploy automático

### Opção 3: Vercel

1. **Importar projeto**
   ```bash
   vercel
   ```

2. **Seguir prompts**

3. **Deploy automático**
   - Cada push → redeploy

### Opção 4: Servidor Próprio

1. **Prepare servidor**
   ```bash
   # Em seu servidor
   git clone <repo>
   cd barbada-prototype
   ```

2. **Configure web server**
   ```nginx
   # Nginx
   server {
       listen 80;
       server_name seu-dominio.com;
       root /var/www/barbada-prototype/src;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

3. **Restart servidor**
   ```bash
   sudo systemctl restart nginx
   ```

## Checklist de Deployment

Antes de fazer deploy:

- [ ] Testar em múltiplos navegadores
- [ ] Verificar console (F12) - sem erros
- [ ] Testar responsividade mobile
- [ ] Verificar localStorage (DevTools → Application)
- [ ] Links e rotas funcionam
- [ ] Imagens carregam corretamente
- [ ] Performance acceptable
- [ ] Segurança verificada

## Performance Otimization

### CSS
```bash
# Minify
cssnano style.css -o style.min.css
```

### JavaScript
```bash
# Minify com Terser
terser script.js -o script.min.js -c -m
```

### Lazy Loading (Futuro)
```javascript
// Para imagens
<img src="placeholder.jpg" 
     data-src="real-image.jpg" 
     loading="lazy">
```

## Monitoramento em Produção

### Ferramentas

1. **Sentry** - Error tracking
   ```javascript
   import * as Sentry from "@sentry/browser";
   
   Sentry.init({
       dsn: "sua-dsn-url",
       environment: "production"
   });
   ```

2. **Google Analytics**
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
   <script>
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'GA_ID');
   </script>
   ```

3. **Vercel Analytics**
   - Automático com Vercel

## Versionamento

### Semver (Semantic Versioning)

```
MAJOR.MINOR.PATCH
  1.0.0

- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes
```

### Tag Releases

```bash
git tag -a v1.0.0 -m "Version 1.0.0 - Initial release"
git push origin v1.0.0
```

## CI/CD com GitHub Actions

### .github/workflows/deploy.yml

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Rollback

```bash
# Reverter para versão anterior
git revert <commit-hash>
git push origin main

# Ou restaurar tag
git checkout v0.9.0
git push -f origin main
```

## Variáveis de Ambiente (Futuro Backend)

**.env**
```
REACT_APP_API_URL=https://api.bookdrop.com
REACT_APP_ENV=production
```

**.env.development**
```
REACT_APP_API_URL=http://localhost:3000
REACT_APP_ENV=development
```

## Segurança

### Pré-deployment

- [ ] Remover console.log() (debug)
- [ ] Validar dados no cliente E servidor
- [ ] Usar HTTPS em produção
- [ ] Implementar CSP headers
- [ ] Escanear dependências (`npm audit`)

### Exemplo: HTTP Headers (Nginx)

```nginx
add_header X-Content-Type-Options "nosniff";
add_header X-Frame-Options "SAMEORIGIN";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "no-referrer-when-downgrade";
```

## Troubleshooting

### Problema: Módulos não carregam

**Solução:**
```javascript
// Verificar no console:
// 1. Verificar Network tab (F12)
// 2. Verificar se arquivos existem
// 3. Verificar paths relativos
```

### Problema: CORS error

**Solução (development):**
```bash
npx http-server -p 8000 --cors
```

### Problema: Cache antigo

**Solução:**
```bash
# Limpar browser cache (Ctrl+Shift+Delete)
# Ou server: adicionar headers de versão
```

---

**Pronto para produção!** 🚀
