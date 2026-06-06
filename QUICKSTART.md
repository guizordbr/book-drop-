# ⚡ Quick Start - BookDrop

## Iniciar em 30 segundos

### 1. Servir o projeto
```bash
# Windows PowerShell
python -m http.server 8000
# ou
npx http-server -p 8000
```

### 2. Abrir no navegador
```
http://localhost:8000/src/
```

### 3. Testar funcionalidades
- ✅ Clique em "Entrar" para fazer login
- ✅ Crie uma conta (username: teste, senha: 1234)
- ✅ Navegue pelas seções (Feed, Buscar, etc)
- ✅ Clique em "Postar" e cole uma URL de produto

## Estrutura Rápida

```
src/
├── js/          ← Lógica (módulos independentes)
├── styles/      ← Estilos (separados por funcionalidade)
├── index.html   ← Versão nova (use esta!)
└── ARCHITECTURE.md ← Leia para entender melhor
```

## Arquivos Principais

| Arquivo | Descrição |
|---------|-----------|
| `src/js/app.js` | Inicializa app e conecta eventos |
| `src/js/auth.js` | Login/registro |
| `src/js/feed.js` | Feed de promoções |
| `src/js/ui.js` | Navegação e UI |
| `src/styles/main.css` | Importa todos os estilos |

## Adicionar Funcionalidade (Passo a Passo)

### Criar novo módulo
```javascript
// src/js/meu-modulo.js
export function minhaFuncao() {
    console.log('Funcionando!');
}
```

### Usar em app.js
```javascript
import { minhaFuncao } from './meu-modulo.js';

// Adicionar em setupEventListeners()
element.addEventListener('click', minhaFuncao);
```

### Testar
1. Abra console (F12)
2. Teste no navegador
3. Verifique console para erros

## Dicas

💡 **CSS:** Use variáveis em `src/styles/variables.css`
💡 **JS:** Cada módulo exporta funções reutilizáveis
💡 **HTML:** Abra `src/index.html`, não `index.html` raiz
💡 **Debug:** Use `console.log()` e DevTools (F12)

## Próximos Passos

1. Leia [ARCHITECTURE.md](src/ARCHITECTURE.md)
2. Explorar os módulos em `src/js/`
3. Entender o fluxo em CONTRIBUTING.md
4. Fazer sua primeira contribuição!

---

**Pronto para começar?** 🚀
