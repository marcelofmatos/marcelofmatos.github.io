# Vitrine de Serviços — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar marcelomatos.dev de portfólio/currículo em página de captação de clientes, adicionando seção de serviços com CTAs para WhatsApp e reescrevendo o hero e objetivo com linguagem orientada ao cliente.

**Architecture:** Modificações puras em HTML estático (`index.html`) e CSS (`assets/css/style.css`). Sem JavaScript novo. A seção Serviços é inserida entre a seção "Como posso ajudar" e a seção GitHub Repos. Os botões de serviço usam links `wa.me` com mensagem pré-preenchida por card.

**Tech Stack:** HTML5, CSS3 com variáveis CSS existentes, Font Awesome 6.4 (já carregado), AOS animations (já carregado)

---

## Mapa de Arquivos

| Arquivo | Ação | Descrição da mudança |
|---------|------|----------------------|
| `index.html` | Modificar | Hero descrição + CTA; nav link; seção objetivo; nova seção serviços |
| `assets/css/style.css` | Modificar | Adicionar estilos da seção serviços ao final do arquivo |

---

## Task 1: Atualizar Hero — descrição e CTA

**Files:**
- Modify: `index.html:159-181`

- [ ] **Step 1: Localizar o bloco hero-description e hero-cta**

Abrir `index.html` e confirmar as linhas (L159–L181):
```html
<div class="hero-description">
    <p>Desenvolvo sistemas web utilizando softwares livres como PHP, JavaScript, Java, Python, Perl, MySQL e PostgreSQL. Especializado em gerenciamento de rede, automação de sistemas em nuvem e soluções SaaS.</p>
</div>
...
<div class="hero-cta">
    <a href="#contact" class="btn btn-primary pulse-btn">
        <i class="fas fa-envelope"></i>
        Entre em Contato
    </a>
</div>
```

- [ ] **Step 2: Substituir a descrição do hero**

Trocar o parágrafo em `hero-description` de:
```html
<p>Desenvolvo sistemas web utilizando softwares livres como PHP, JavaScript, Java, Python, Perl, MySQL e PostgreSQL. Especializado em gerenciamento de rede, automação de sistemas em nuvem e soluções SaaS.</p>
```
Para:
```html
<p>Desenvolvo sistemas web utilizando softwares livres como PHP, JavaScript, Java, Python, Perl, MySQL e PostgreSQL. Especializado em gerenciamento de rede, automação de sistemas em nuvem e soluções SaaS. Se você precisa de um sistema confiável, automação ou infraestrutura escalável — sem precisar acompanhar cada detalhe — posso ajudar.</p>
```

- [ ] **Step 3: Atualizar o CTA principal**

Trocar o bloco `hero-cta` de:
```html
<div class="hero-cta">
    <a href="#contact" class="btn btn-primary pulse-btn">
        <i class="fas fa-envelope"></i>
        Entre em Contato
    </a>
</div>
```
Para:
```html
<div class="hero-cta">
    <a href="#services" class="btn btn-primary pulse-btn">
        <i class="fas fa-briefcase"></i>
        Solicitar orçamento
    </a>
</div>
```

- [ ] **Step 4: Verificação visual**

Abrir o site no navegador e confirmar:
- A frase extra aparece no parágrafo do hero
- O botão diz "Solicitar orçamento" e ao clicar rola para a seção #services (que será criada na Task 4)

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: atualizar hero com descrição orientada ao cliente e CTA de orçamento"
```

---

## Task 2: Adicionar link "Serviços" na navbar

**Files:**
- Modify: `index.html:92-94`

- [ ] **Step 1: Localizar o nav-menu**

Confirmar o bloco em `index.html` (~L92):
```html
<a href="#about" class="nav-link">Sobre</a>
<a href="#github-repos" class="nav-link">GitHub</a>
```

- [ ] **Step 2: Inserir link de Serviços**

Adicionar após a linha `<a href="#about" class="nav-link">Sobre</a>`:
```html
<a href="#services" class="nav-link">Serviços</a>
```

Resultado esperado na nav:
```html
<a href="#about" class="nav-link">Sobre</a>
<a href="#services" class="nav-link">Serviços</a>
<a href="#github-repos" class="nav-link">GitHub</a>
```

- [ ] **Step 3: Verificação visual**

Confirmar que "Serviços" aparece na navbar e o scroll funciona (quando a seção existir).

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: adicionar link Serviços na navbar"
```

---

## Task 3: Transformar seção "Objetivo Profissional" em "Como posso ajudar"

**Files:**
- Modify: `index.html:186-194`

- [ ] **Step 1: Localizar a seção objetivo**

Confirmar em `index.html` (~L186–L194):
```html
<section class="section objective-section" id="objective">
    <div class="objective-card" data-aos="zoom-in">
        <div class="objective-icon">
            <i class="fas fa-bullseye"></i>
        </div>
        <h2>Objetivo Profissional</h2>
        <p>Busco contribuir com minha experiência e conhecimentos para apoiar o desenvolvimento de soluções tecnológicas eficientes e inovadoras com ferramentas de automação.</p>
    </div>
</section>
```

- [ ] **Step 2: Substituir o conteúdo da seção**

Trocar todo o bloco acima por:
```html
<section class="section objective-section" id="objective">
    <div class="objective-card" data-aos="zoom-in">
        <div class="objective-icon">
            <i class="fas fa-handshake"></i>
        </div>
        <h2>Como posso ajudar</h2>
        <p>Com mais de 15 anos de experiência, ajudo empresas e profissionais a resolver problemas técnicos reais — sem precisar contratar um time interno.</p>
        <ul class="objective-list">
            <li><i class="fas fa-check-circle"></i> Startups e PMEs que precisam de sistemas web personalizados</li>
            <li><i class="fas fa-check-circle"></i> Empresas que precisam de infraestrutura e DevOps sem equipe dedicada</li>
            <li><i class="fas fa-check-circle"></i> Agências que precisam de um desenvolvedor externo de confiança</li>
        </ul>
    </div>
</section>
```

- [ ] **Step 3: Adicionar estilos da lista no CSS**

Em `assets/css/style.css`, adicionar ao final do arquivo:
```css
/* Objective list */
.objective-list {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0 0;
    text-align: left;
    display: inline-block;
}

.objective-list li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    color: var(--text-secondary);
    font-size: 0.95rem;
}

.objective-list li i {
    color: var(--accent-green);
    flex-shrink: 0;
}
```

- [ ] **Step 4: Verificação visual**

Confirmar no navegador:
- Título mudou para "Como posso ajudar"
- Ícone é um aperto de mão
- Lista de 3 perfis aparece com ícones verdes de check

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/style.css
git commit -m "feat: transformar seção objetivo em 'Como posso ajudar' com perfis de cliente"
```

---

## Task 4: Adicionar HTML da seção Serviços

**Files:**
- Modify: `index.html` — inserir antes da linha que contém `<section class="section" id="github-repos">`

- [ ] **Step 1: Localizar ponto de inserção**

Em `index.html`, encontrar (~L196):
```html
        <!-- GitHub Repos Section -->
        <section class="section" id="github-repos">
```

- [ ] **Step 2: Inserir a seção Serviços antes do comentário GitHub Repos**

Adicionar o bloco abaixo **antes** do comentário `<!-- GitHub Repos Section -->`:

```html
        <!-- Services Section -->
        <section class="section services-section" id="services">
            <h2 class="section-title" data-aos="fade-up">
                <i class="fas fa-briefcase"></i>
                Serviços
            </h2>
            <p class="services-subtitle" data-aos="fade-up" data-aos-delay="100">Soluções sob medida para o seu negócio</p>
            <div class="services-grid">
                <div class="service-card" data-aos="fade-up" data-aos-delay="100">
                    <div class="service-icon">
                        <i class="fas fa-laptop-code"></i>
                    </div>
                    <h3>Desenvolvimento sob medida</h3>
                    <p>Sistemas web, APIs e integrações — do briefing ao deploy, com código limpo e documentado.</p>
                    <a href="https://wa.me/5511977974431?text=Ol%C3%A1%20Marcelo%2C%20preciso%20de%20um%20sistema%20web%20personalizado%20e%20gostaria%20de%20um%20or%C3%A7amento." target="_blank" rel="noopener" class="service-btn">
                        <i class="fab fa-whatsapp"></i> Solicitar orçamento
                    </a>
                </div>
                <div class="service-card" data-aos="fade-up" data-aos-delay="200">
                    <div class="service-icon">
                        <i class="fas fa-tools"></i>
                    </div>
                    <h3>Manutenção &amp; Suporte</h3>
                    <p>Atendimento recorrente: correção de bugs, atualizações de segurança e melhorias contínuas.</p>
                    <a href="https://wa.me/5511977974431?text=Ol%C3%A1%20Marcelo%2C%20tenho%20interesse%20no%20servi%C3%A7o%20de%20manuten%C3%A7%C3%A3o%20e%20suporte%20mensal." target="_blank" rel="noopener" class="service-btn">
                        <i class="fab fa-whatsapp"></i> Solicitar orçamento
                    </a>
                </div>
                <div class="service-card" data-aos="fade-up" data-aos-delay="300">
                    <div class="service-icon">
                        <i class="fab fa-docker"></i>
                    </div>
                    <h3>DevOps &amp; Infra</h3>
                    <p>Docker, CI/CD, cloud e servidores — implantação e automação de infraestrutura escalável.</p>
                    <a href="https://wa.me/5511977974431?text=Ol%C3%A1%20Marcelo%2C%20preciso%20de%20apoio%20com%20DevOps%2Finfraestrutura%20e%20gostaria%20de%20conversar." target="_blank" rel="noopener" class="service-btn">
                        <i class="fab fa-whatsapp"></i> Solicitar orçamento
                    </a>
                </div>
                <div class="service-card" data-aos="fade-up" data-aos-delay="400">
                    <div class="service-icon">
                        <i class="fas fa-search-plus"></i>
                    </div>
                    <h3>Consultoria Técnica</h3>
                    <p>Revisão de arquitetura, auditoria de código e orientação para decisões técnicas críticas.</p>
                    <a href="https://wa.me/5511977974431?text=Ol%C3%A1%20Marcelo%2C%20gostaria%20de%20agendar%20uma%20consultoria%20t%C3%A9cnica." target="_blank" rel="noopener" class="service-btn">
                        <i class="fab fa-whatsapp"></i> Agendar conversa
                    </a>
                </div>
            </div>
        </section>

```

- [ ] **Step 3: Verificação — HTML bruto**

Abrir `index.html` no navegador e confirmar que a seção aparece com 4 cards visíveis (estilo ainda sem CSS dedicado, mas estrutura presente).

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: adicionar HTML da seção Serviços com 4 cards e links WhatsApp"
```

---

## Task 5: Adicionar CSS da seção Serviços

**Files:**
- Modify: `assets/css/style.css` — adicionar ao final do arquivo

- [ ] **Step 1: Adicionar estilos dos cards de serviço**

Ao final de `assets/css/style.css`, adicionar:

```css
/* ===========================
   Services Section
   =========================== */

.services-subtitle {
    text-align: center;
    color: var(--text-secondary);
    margin-bottom: 2.5rem;
    font-size: 1rem;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    max-width: 900px;
    margin: 0 auto;
}

.service-card {
    background: var(--bg-card);
    padding: 2rem 1.75rem;
    border-radius: 16px;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.service-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gradient-primary);
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.service-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl);
}

.service-card:hover::before {
    transform: scaleX(1);
}

.service-icon {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    background: var(--bg-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    color: var(--primary-color);
    margin-bottom: 0.25rem;
}

.service-card h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
}

.service-card p {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
    flex: 1;
}

.service-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    padding: 0.6rem 1.2rem;
    background: var(--primary-color);
    color: white;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s ease, transform 0.2s ease;
}

.service-btn:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
}

.service-btn i {
    font-size: 1rem;
}

/* Responsive: services grid */
@media (max-width: 768px) {
    .services-grid {
        grid-template-columns: 1fr;
    }
}
```

- [ ] **Step 2: Verificação visual completa**

Abrir o site no navegador e confirmar:
- 4 cards em grade 2x2 no desktop
- Cards têm ícone, título, descrição e botão azul
- Hover levanta o card e mostra barra de gradiente no topo
- No mobile (< 768px) os cards ficam em coluna única
- Cada botão ao clicar abre o WhatsApp com a mensagem correta

Testar cada link de WhatsApp manualmente:
- Card 1: mensagem sobre sistema web personalizado
- Card 2: mensagem sobre manutenção mensal
- Card 3: mensagem sobre DevOps/infra
- Card 4: mensagem sobre consultoria técnica

- [ ] **Step 3: Commit**

```bash
git add assets/css/style.css
git commit -m "feat: adicionar estilos CSS da seção Serviços"
```

---

## Task 6: Verificação final e deploy

- [ ] **Step 1: Revisar o fluxo completo no navegador**

Percorrer a página do topo ao fim e verificar:
- [ ] Hero: frase extra visível, botão diz "Solicitar orçamento"
- [ ] Navbar: link "Serviços" presente e funcional
- [ ] Seção "Como posso ajudar": título, parágrafo e lista de 3 perfis com ícones verdes
- [ ] Seção Serviços: 4 cards com ícone, título, descrição e botão
- [ ] Todos os 4 botões abrem o WhatsApp com a mensagem correta
- [ ] Mobile (redimensionar para < 768px): cards em coluna única, sem quebras de layout

- [ ] **Step 2: Push para GitHub Pages**

```bash
git push origin master
```

- [ ] **Step 3: Confirmar deploy em produção**

Acessar `https://marcelomatos.dev` e repetir a verificação do Step 1.

---

## Fase 2 — Depoimentos (implementar após coletar textos)

Quando tiver 3–5 depoimentos coletados (ver spec `docs/superpowers/specs/2026-04-10-vitrine-servicos-design.md` seção "Fase 2"), criar nova tarefa para adicionar a seção entre Serviços e GitHub Repos.
