# WhatsApp Widget — Design Spec

**Data:** 2026-04-09  
**Autor:** Marcelo Matos  
**Status:** Aprovado

---

## Objetivo

Adicionar um widget de contato via WhatsApp ao site `marcelomatos.dev` para facilitar que visitantes entrem em contato de forma rápida e direta, aumentando a taxa de conversão de visitantes em clientes/contatos.

---

## Decisões de Design

| Decisão | Escolha |
|---|---|
| Estilo | Widget expandível flutuante (canto inferior direito) |
| Tom da mensagem | Orientado a resultado |
| Comportamento de abertura | Auto-abre após 8 segundos |
| Mensagem pré-digitada no WhatsApp | Sim |
| Abordagem técnica | Componente JS separado |

---

## Comportamento

### Estado fechado
- Botão circular verde (56px) fixo no canto inferior direito (`bottom: 24px; right: 24px`)
- Ícone SVG do WhatsApp em branco
- Tooltip `"Fale comigo 👋"` visível ao lado do botão; some permanentemente após o widget ser aberto pela primeira vez (salvo em `sessionStorage`)

### Auto-abertura
- Após **8 segundos** de permanência na página, o widget expande automaticamente
- Só acontece uma vez por sessão — salvo em `sessionStorage` com chave `ww_dismissed`
- Se o usuário já fechou o widget (`ww_dismissed = "1"`), o auto-open não dispara

### Estado expandido (bubble)
- Animação de slide-up + fade ao expandir
- **Header verde** (`#25D366`) com:
  - Avatar circular branco com letra "M" em verde
  - Nome: `"Marcelo Matos"`
  - Status: `"● Online agora"`
  - Botão ✕ para fechar (define `ww_dismissed`)
- **Body** fundo verde claro (`#f0fdf4`) com balão de mensagem estilo WhatsApp:
  > *"Vamos transformar sua ideia em realidade? 🚀 Me conta o que você precisa e a gente resolve juntos."*
- **CTA** botão verde: `"💬 Falar sobre meu projeto →"`
  - Abre em nova aba: `https://api.whatsapp.com/send?phone=5511977974431&text=Ol%C3%A1%20Marcelo!%20Vi%20seu%20site%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.`

### Fechar
- Clicar em ✕ colapsa o widget e define `sessionStorage.ww_dismissed = "1"`
- Widget volta ao estado de botão fechado (FAB simples)
- Clicar no FAB quando fechado reabre o bubble (mesmo na mesma sessão)

---

## Arquivos

### Novo
- `assets/js/whatsapp-widget.js`
  - Cria e injeta o HTML do widget no DOM
  - Gerencia estado (aberto/fechado) e timer de auto-open
  - Lê/escreve `sessionStorage`
  - Sem dependências externas

### Modificados
- `assets/css/style.css` — estilos do widget adicionados ao final do arquivo
- `index.html` — adicionar antes de `</body>`:
  ```html
  <script src="assets/js/whatsapp-widget.js"></script>
  ```

---

## Estilos

```
Cor principal:     #25D366 (WhatsApp green)
Cor hover:         #1ebe5d
Shadow FAB:        0 4px 16px rgba(37,211,102,0.45)
Shadow bubble:     0 8px 32px rgba(0,0,0,0.20)
Border-radius FAB: 50%
Border-radius bubble: 16px 16px 4px 16px
Z-index:           9999
Posição:           fixed, bottom: 24px, right: 24px
Largura bubble:    280px
Animação:          slide-up + fade-in (200ms ease-out)
```

---

## Fora do escopo

- Não será adicionado nas páginas `github/index.html` e `vcard/index.html` neste momento (foco no `index.html` principal)
- Sem analytics de cliques (pode ser adicionado futuramente via Google Tag Manager)
- Sem suporte a múltiplos números de telefone
