---
name: Vitrine de Serviços — marcelomatos.dev
description: Transformar o site de portfólio/currículo em página de captação de clientes para projetos freelance e serviços recorrentes
type: project
date: 2026-04-10
status: approved
---

# Vitrine de Serviços — marcelomatos.dev

## Contexto

O site atual funciona bem como cartão de visitas de confirmação (clientes chegam via indicação ou LinkedIn e usam o site para validar), mas não converte visitantes em clientes por conta própria. O tom é de candidato a emprego, não de prestador de serviços. Não há seção de serviços nem prova social.

**Objetivo:** converter o site num ponto de captação de clientes para duas frentes:
- Projetos freelance pontuais
- Serviços recorrentes (manutenção, suporte, consultoria)

---

## Mudanças — Fase 1 (implementar agora)

### 1. Reescrita do Hero e Objetivo Profissional

**Hero:**
- Manter o subtítulo *"Desenvolvendo ideias escalando qualidade"* (lema consolidado com bom feedback)
- Adicionar ao fim da descrição existente uma frase orientada ao cliente:
  > *"Se você precisa de um sistema confiável, automação ou infraestrutura escalável — sem precisar acompanhar cada detalhe — posso ajudar."*
- Trocar o CTA principal de *"Entre em Contato"* para *"Solicitar orçamento"*

**Seção Objetivo Profissional:**
- Renomear para **"Como posso ajudar"**
- Reescrever o texto com foco em quem contrata, descrevendo os 3 perfis de cliente ideais:
  - Startups e PMEs que precisam de sistemas web
  - Empresas que precisam de infra/DevOps sem contratar um time interno
  - Agências que precisam de um dev externo de confiança para projetos

---

### 2. Seção de Serviços

**Posição na página:** logo após o hero/objetivo, antes dos repositórios GitHub.

**Título da seção:** `Serviços`

**4 cards**, cada um com ícone, título, descrição curta (2-3 linhas) e botão CTA que abre WhatsApp com mensagem pré-preenchida:

| Card | Título | Descrição | Mensagem WhatsApp |
|------|--------|-----------|-------------------|
| 1 | Desenvolvimento sob medida | Sistemas web, APIs, integrações — do briefing ao deploy | "Olá Marcelo, preciso de um sistema web personalizado e gostaria de um orçamento." |
| 2 | Manutenção & Suporte | Atendimento recorrente: correção de bugs, atualizações e melhorias mensais | "Olá Marcelo, tenho interesse no serviço de manutenção e suporte mensal." |
| 3 | DevOps & Infra | Docker, CI/CD, cloud, servidores — implantação e automação de infraestrutura | "Olá Marcelo, preciso de apoio com DevOps/infraestrutura e gostaria de conversar." |
| 4 | Consultoria Técnica | Revisão de arquitetura, auditoria de código, orientação para decisões técnicas | "Olá Marcelo, gostaria de agendar uma consultoria técnica." |

**Implementação dos botões:**
- Usar `https://wa.me/55XXXXXXXXXXX?text=<mensagem codificada em URL>`
- Número do WhatsApp a ser preenchido pelo Marcelo antes do deploy
- Texto do botão: *"Solicitar orçamento"* (cards 1, 2, 3) e *"Agendar conversa"* (card 4)

---

## Mudanças — Fase 2 (após coleta de depoimentos)

### 3. Seção de Depoimentos

**Posição:** entre Serviços e repositórios GitHub.

**Título:** `O que dizem sobre meu trabalho`

**Estrutura de cada card:**
- Foto ou avatar com inicial do nome
- Nome completo + cargo/empresa
- Texto do depoimento (3-5 linhas)
- Estrelas (opcional)

**Como coletar:** pedir para cada pessoa responder via WhatsApp ou e-mail:
1. Qual problema você precisava resolver quando me contratou?
2. O que te surpreendeu positivamente no trabalho?
3. Para quem você indicaria meu trabalho?

Marcelo monta o depoimento com as respostas e a pessoa aprova antes de publicar. Meta: 3 a 5 depoimentos.

---

## O que não muda

- Lema *"Desenvolvendo ideias escalando qualidade"* — mantido
- Seções existentes (GitHub repos, Skills, Experiência, Projetos, Formação, Contato) — mantidas sem alteração
- Widget WhatsApp flutuante — mantido
- Sem preços fixos por enquanto — todos os CTAs abrem conversa

---

## Critérios de sucesso

- Visitante consegue entender em menos de 10 segundos o que Marcelo oferece e como contratar
- Cada serviço tem um caminho claro de conversão (botão → WhatsApp → mensagem pronta)
- O tom da página é de especialista que vende serviço, não de candidato a emprego
