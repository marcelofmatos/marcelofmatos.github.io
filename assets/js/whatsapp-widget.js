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
      +   '<div class="ww-bubble-title">👤 Fale com um humano</div>'
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
      +     'Vamos transformar sua ideia em realidade? 🚀 Diga-me o que você precisa e a gente resolve juntos.'
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
