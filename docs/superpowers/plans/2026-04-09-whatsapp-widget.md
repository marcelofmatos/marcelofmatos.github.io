# WhatsApp Widget Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar um widget de chat WhatsApp flutuante ao site `marcelomatos.dev` que se abre automaticamente após 8 segundos e encaminha o visitante para uma conversa WhatsApp com mensagem pré-digitada.

**Architecture:** Componente JS auto-contido (`assets/js/whatsapp-widget.js`) que injeta HTML e gerencia estado. Estilos em `assets/css/style.css`. Incluído em `index.html` com uma `<script>` tag. Sem dependências externas.

**Tech Stack:** Vanilla JS (ES5 compatível), CSS3 (animations, fixed positioning), sessionStorage API, HTML5.

**Spec:** `docs/superpowers/specs/2026-04-09-whatsapp-widget-design.md`

---

## Arquivos

| Ação | Arquivo | Responsabilidade |
|---|---|---|
| Criar | `assets/js/whatsapp-widget.js` | Todo o widget: HTML, lógica, auto-open, sessionStorage |
| Modificar | `assets/css/style.css` | Estilos do widget (adicionar ao final) |
| Modificar | `index.html` | Incluir script antes de `</body>` |

---

## Task 1: Adicionar CSS do widget ao style.css

**Files:**
- Modify: `assets/css/style.css` (adicionar ao final)

- [ ] **Step 1: Abrir `assets/css/style.css` e adicionar ao final do arquivo**

```css
/* =============================================
   WhatsApp Widget
   ============================================= */
.ww-fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.ww-btn {
  width: 56px;
  height: 56px;
  background: #25D366;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.45);
  transition: background 0.2s, transform 0.2s;
  flex-shrink: 0;
}

.ww-btn:hover {
  background: #1ebe5d;
  transform: scale(1.05);
}

.ww-tooltip {
  background: white;
  color: #1e293b;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  animation: ww-fade-in 0.3s ease-out;
}

.ww-bubble {
  width: 280px;
  background: white;
  border-radius: 16px 16px 4px 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.20);
  overflow: hidden;
  animation: ww-slide-up 0.2s ease-out;
  transform-origin: bottom right;
}

.ww-bubble-header {
  background: #25D366;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ww-bubble-identity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ww-avatar {
  width: 36px;
  height: 36px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #25D366;
  font-size: 1rem;
  flex-shrink: 0;
}

.ww-name {
  color: white;
  font-weight: 600;
  font-size: 0.85rem;
  line-height: 1.2;
}

.ww-status {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.7rem;
}

.ww-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 2px 6px;
  border-radius: 4px;
  transition: color 0.2s;
}

.ww-close:hover {
  color: white;
}

.ww-bubble-body {
  background: #f0fdf4;
  padding: 1rem;
}

.ww-message {
  background: white;
  border-radius: 0 10px 10px 10px;
  padding: 0.75rem;
  font-size: 0.82rem;
  color: #374151;
  line-height: 1.55;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.ww-cta {
  display: block;
  width: 100%;
  background: #25D366;
  color: white;
  border: none;
  padding: 0.65rem 1rem;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: background 0.2s;
  box-sizing: border-box;
}

.ww-cta:hover {
  background: #1ebe5d;
  color: white;
}

@keyframes ww-slide-up {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes ww-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/style.css
git commit -m "style: adicionar estilos do widget WhatsApp flutuante"
```

---

## Task 2: Criar `assets/js/whatsapp-widget.js`

**Files:**
- Create: `assets/js/whatsapp-widget.js`

- [ ] **Step 1: Criar o arquivo com o componente completo**

```javascript
(function () {
  'use strict';

  var PHONE       = '5511977974431';
  var TEXT        = 'Olá Marcelo! Vi seu site e gostaria de conversar sobre um projeto.';
  var WA_URL      = 'https://api.whatsapp.com/send?phone=' + PHONE
                  + '&text=' + encodeURIComponent(TEXT);
  var STORAGE_KEY = 'ww_dismissed';
  var AUTO_DELAY  = 8000;

  var fab, bubble, tooltip, autoOpenTimer;

  function isDismissed() {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  }

  function setDismissed() {
    sessionStorage.setItem(STORAGE_KEY, '1');
  }

  function removeTooltip() {
    if (tooltip) {
      tooltip.remove();
      tooltip = null;
    }
  }

  function openBubble() {
    removeTooltip();
    bubble.hidden = false;
  }

  function closeBubble() {
    bubble.hidden = true;
  }

  function handleFabClick() {
    if (bubble.hidden) {
      openBubble();
    } else {
      closeBubble();
    }
  }

  function handleClose() {
    closeBubble();
    setDismissed();
    clearTimeout(autoOpenTimer);
  }

  function buildHTML() {
    var WA_ICON = '<svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">'
      + '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15'
      + '-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475'
      + '-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52'
      + '.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207'
      + '-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372'
      + '-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2'
      + ' 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719'
      + ' 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>'
      + '<path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L0 24l6.335-1.508'
      + 'A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.49'
      + '-5.19-1.348L2 22l1.372-4.722A9.965 9.965 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10'
      + '-4.477 10-10 10z"/></svg>';

    // Container
    fab = document.createElement('div');
    fab.className = 'ww-fab';

    // Tooltip
    tooltip = document.createElement('span');
    tooltip.className = 'ww-tooltip';
    tooltip.textContent = 'Fale comigo 👋';

    // Bubble
    bubble = document.createElement('div');
    bubble.className = 'ww-bubble';
    bubble.hidden = true;
    bubble.innerHTML = ''
      + '<div class="ww-bubble-header">'
      +   '<div class="ww-bubble-identity">'
      +     '<div class="ww-avatar">M</div>'
      +     '<div>'
      +       '<div class="ww-name">Marcelo Matos</div>'
      +       '<div class="ww-status">&#9679; Online agora</div>'
      +     '</div>'
      +   '</div>'
      +   '<button class="ww-close" aria-label="Fechar">&times;</button>'
      + '</div>'
      + '<div class="ww-bubble-body">'
      +   '<div class="ww-message">'
      +     'Vamos transformar sua ideia em realidade? 🚀 Me conta o que você precisa e a gente resolve juntos.'
      +   '</div>'
      + '</div>'
      + '<a href="' + WA_URL + '" class="ww-cta" target="_blank" rel="noopener noreferrer">'
      +   '💬 Falar sobre meu projeto &rarr;'
      + '</a>';

    // FAB button
    var btn = document.createElement('button');
    btn.className = 'ww-btn';
    btn.setAttribute('aria-label', 'Abrir chat WhatsApp');
    btn.innerHTML = WA_ICON;

    // Assemble
    fab.appendChild(tooltip);
    fab.appendChild(bubble);
    fab.appendChild(btn);
    document.body.appendChild(fab);

    // Events
    btn.addEventListener('click', handleFabClick);
    bubble.querySelector('.ww-close').addEventListener('click', handleClose);
  }

  function init() {
    buildHTML();

    if (!isDismissed()) {
      autoOpenTimer = setTimeout(openBubble, AUTO_DELAY);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
```

- [ ] **Step 2: Verificar no browser que o widget aparece (sem incluir no index.html ainda)**

Abra `assets/js/whatsapp-widget.js` diretamente no browser via console de qualquer página para testar:
```javascript
// No console do browser em qualquer aba da página:
// Injete temporariamente o CSS e o script e confirme que:
// 1. O botão verde aparece no canto inferior direito
// 2. O tooltip "Fale comigo 👋" aparece ao lado
// 3. Clicar no botão abre o bubble
// 4. O bubble tem header verde, mensagem e botão CTA
// 5. Clicar em ✕ fecha o bubble
// 6. sessionStorage tem chave "ww_dismissed" = "1" após fechar
```

- [ ] **Step 3: Commit**

```bash
git add assets/js/whatsapp-widget.js
git commit -m "feat: criar componente whatsapp-widget.js com auto-open e sessionStorage"
```

---

## Task 3: Incluir o widget em `index.html`

**Files:**
- Modify: `index.html` (adicionar 1 linha antes de `</body>`)

- [ ] **Step 1: Localizar a tag `</body>` em `index.html` e adicionar a linha antes dela**

Localizar no arquivo a linha que contém `</body>` e inserir imediatamente antes:

```html
    <script src="assets/js/whatsapp-widget.js"></script>
</body>
```

- [ ] **Step 2: Abrir o site localmente e verificar comportamento completo**

Abra `index.html` em um servidor local (ex: `python3 -m http.server 8080` na raiz do projeto) e confirme todos os comportamentos:

```
Checklist de verificação:
[ ] Botão verde aparece no canto inferior direito
[ ] Tooltip "Fale comigo 👋" aparece ao lado do botão
[ ] Após 8 segundos o bubble abre automaticamente
[ ] Tooltip some quando o bubble abre
[ ] Bubble tem: header verde, avatar "M", "Marcelo Matos", "● Online agora", botão ✕
[ ] Mensagem: "Vamos transformar sua ideia em realidade? 🚀 Me conta o que você precisa..."
[ ] Botão CTA "💬 Falar sobre meu projeto →" abre WhatsApp em nova aba
[ ] URL do WhatsApp contém o número correto e a mensagem pré-digitada
[ ] Clicar ✕ fecha o bubble e define sessionStorage["ww_dismissed"] = "1"
[ ] Recarregar a página não dispara auto-open (sessionStorage persiste na sessão)
[ ] Clicar o botão verde após fechar via ✕ reabre o bubble manualmente
[ ] Em mobile (DevTools device mode): widget não sobrepõe conteúdo crítico
```

- [ ] **Step 3: Commit final**

```bash
git add index.html
git commit -m "feat: incluir whatsapp-widget no site principal"
```
