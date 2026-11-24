# Coffee Delivery

SPA de cafeteria desenvolvida como projeto final da disciplina **Single Page Application (SPA)**.

O cliente consulta o catálogo, escolhe quantidades, monta o carrinho, informa o endereço de entrega (com consulta de CEP via ViaCEP), seleciona uma forma de pagamento fictícia e recebe a confirmação de um pedido simulado.

## Stack

- React 19 + Vite 7 + TypeScript (`strict`)
- React Router 7
- Context API + `useReducer`
- styled-components (temas claro/escuro)
- React Hook Form + Zod
- ViaCEP
- Vitest + React Testing Library + jsdom
- ESLint + Prettier

## Como executar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Scripts

| Script | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Typecheck + build de produção |
| `npm run preview` | Pré-visualiza o build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc -b` |
| `npm run test` | Vitest em modo watch |
| `npm run test:run` | Vitest uma vez |
| `npm run format` | Prettier |

## Funcionalidades

- Catálogo com 14 cafés, tags, preços em centavos e imagens.
- Seleção de quantidade (1 a 99) e adição ao carrinho.
- Contador de unidades no Header.
- Carrinho editável e persistido em `localStorage`.
- Checkout com endereço consultado via ViaCEP, máscara de CEP, validação Zod e foco no primeiro erro.
- Pagamento fictício: crédito, débito ou dinheiro (sem coleta de dados de cartão).
- Snapshot independente do pedido, limpeza do carrinho e tela de sucesso.
- Tema claro/escuro com persistência e fallback para `prefers-color-scheme`.
- Rotas `/`, `/checkout`, `/success` e fallback 404.
- Acessibilidade: skip link, labels, `aria-invalid`, `aria-describedby`, `aria-live`, foco visível e `prefers-reduced-motion`.

## Estrutura

```text
src/
├── assets/          # imagens provisórias (SVG)
├── components/      # UI reutilizável
├── contexts/        # CartProvider, ThemeProvider e contextos
├── data/            # catálogo local
├── hooks/           # useCart, useTheme, useCep
├── pages/           # Home, Checkout, Success, NotFound
├── reducers/        # cartReducer
├── schemas/         # checkout e pedido (Zod)
├── styles/          # tokens, temas, GlobalStyle
├── tests/           # testes de integração
├── types/           # tipos de domínio
└── utils/           # pricing, format, storage, cep, order
```

## Chaves de localStorage

- `coffee-delivery:cart:v1`
- `coffee-delivery:theme:v1`
- `coffee-delivery:last-order:v1`

## Decisões e pendências

- **Assets:** as imagens dos 14 cafés são os PNGs oficiais fornecidos em `src/assets/coffees`. Hero, ilustração de entrega, logo e favicon ainda são provisórios e devem ser substituídos pelos arquivos oficiais.
- **Tema escuro:** estrutura pronta; a paleta escura é provisória porque o Style Guide descreve apenas o tema claro.
- **Logo com IA:** pendente a versão final criada com ferramenta de imagem por IA (RF-16).
- **Deploy:** não executado nesta etapa. Para Vercel/Netlify, configure fallback de SPA para `index.html`; no GitHub Pages, use `HashRouter` ou um fallback equivalente.
- **Commits:** não realizados automaticamente.

## Qualidade

```bash
npm run lint
npm run typecheck
npm run test:run
npm run build
```

Resultado da última execução: lint limpo, typecheck limpo, 50 testes passando e build concluído.

## Documentação

- `AGENTS.md` — diretrizes do projeto
- `docs/PRD_SPEC.md` — requisitos
- `docs/TECH_SPEC.md` — arquitetura
- `docs/TASKS_SPEC.md` — plano e registro de execução
- `docs/STYLE_GUIDE.md` — identidade visual
- `docs/AI_USAGE.md` — registro de uso de IA
