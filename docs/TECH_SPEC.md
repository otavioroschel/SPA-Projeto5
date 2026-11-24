# TECH_SPEC — Technical Specification

> **Projeto Final 05 — Coffee Delivery (React + TypeScript + IA)**
> Versão: 1.1 · Status: base técnica para validação.
> Requisitos de origem: `PRD_SPEC.md` (RF-01..RF-16 / RN-01..RN-10) e `STYLE_GUIDE.md` (tokens visuais e UI Kit).

## 1. Stack e dependências

| Tecnologia | Uso | Justificativa |
|---|---|---|
| React + Vite + TypeScript | SPA e componentes | Desenvolvimento rápido e tipagem estática. |
| React Router | `/`, `/checkout`, `/success` | Navegação SPA. |
| Context API + `useReducer` | Estado do carrinho | Transições previsíveis e reducer testável. |
| Hooks React/customizados | Estado local, tema, CEP e persistência | Reuso sem abstrações excessivas. |
| localStorage | Carrinho, tema e último pedido | Persistência local sem backend. |
| React Hook Form + Zod | Checkout e validação | Formulário tipado e schema central. |
| styled-components | Estilos e temas | Tema tipado via ThemeProvider. |
| ViaCEP | Consulta de CEP | API pública, sem chave. |
| Vitest + RTL + jsdom | Testes | Integração natural com Vite e foco no comportamento. |
| Playwright (opcional) | E2E | Fluxo completo em navegador. |
| ESLint + Prettier | Qualidade | Consistência e detecção de problemas. |
| Git/GitHub | Versionamento | Histórico de implementação. |

Dependências de runtime previstas: `react`, `react-dom`, `react-router-dom`, `styled-components`, `react-hook-form`, `zod`, `@hookform/resolvers`.
Dev: `typescript`, `vite`, `@vitejs/plugin-react`, `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `jsdom`, `eslint` e plugins, `prettier`, tipos necessários e `@playwright/test` (opcional).

Não instalar tudo antecipadamente sem conferir a versão compatível e a necessidade real. Registrar novas bibliotecas e justificativas nesta seção.

## 2. Arquitetura

Princípio: separar dados, tipos, regras, estado, integração externa e UI.

- `data/`: catálogo estático.
- `types/`: tipos de domínio.
- `utils/`: funções puras de preço, formatação e armazenamento.
- `reducers/`: transições puras e imutáveis.
- `contexts/`: providers e exposição de estado/ações.
- `hooks/`: lógica reutilizável de carrinho, tema e CEP.
- `schemas/`: validação Zod.
- `components/`: UI reutilizável.
- `pages/`: composição por rota.
- `styles/`: tokens, temas e estilos globais.
- `tests/`: testes, preferencialmente próximos ao módulo ou organizados por domínio.

## 3. Estrutura sugerida

```text
coffee-delivery/
├── public/                 # favicon e arquivos públicos
├── src/
│   ├── assets/             # logos e imagens
│   ├── components/
│   │   ├── Header/
│   │   ├── ThemeToggle/
│   │   ├── CartBadge/
│   │   ├── CoffeeCard/
│   │   ├── CoffeeCatalog/
│   │   ├── QuantityInput/
│   │   ├── CartItem/
│   │   ├── CartSummary/
│   │   ├── EmptyCart/
│   │   ├── DeliveryAddressForm/
│   │   ├── PaymentMethodSelector/
│   │   └── OrderSuccess/
│   ├── pages/              # Home.tsx, Checkout.tsx, Success.tsx
│   ├── contexts/           # CartContext.tsx, ThemeContext.tsx
│   ├── reducers/           # cartReducer.ts
│   ├── hooks/              # useCart, useTheme, useCep
│   ├── data/               # coffees.ts
│   ├── types/
│   ├── schemas/
│   ├── utils/              # pricing, format, storage, cep
│   ├── styles/             # tokens, themes, GlobalStyle, styled.d.ts
│   ├── App.tsx
│   └── main.tsx
├── docs/                   # PRD_SPEC, TECH_SPEC, TASKS_SPEC, STYLE_GUIDE, AI_USAGE
├── AGENTS.md
└── README.md
```

A estrutura é uma orientação, não uma exigência para criar pastas vazias. Criar arquivos conforme a tarefa atual.

## 4. Componentes

| Componente | Responsabilidade | Requisitos |
|---|---|---|
| `PageLayout` | Estrutura comum, Header e main | RF-07 |
| `Header` | Marca, navegação, tema e carrinho | RF-04/14/16 |
| `ThemeToggle` | Alternar tema acessivelmente | RF-14 |
| `CartBadge` | Link para checkout e contador de unidades | RF-04 |
| `CoffeeCatalog` | Grid/lista do catálogo | RF-01 |
| `CoffeeCard` | Exibir café, preço, tags e ação de adicionar | RF-01/02/03 |
| `QuantityInput` | Controle de quantidade 1..99 | RF-02, RN-01 |
| `CartItem` | Item, quantidade, subtotal e remoção | RF-05 |
| `CartSummary` | Subtotal, frete e total | RF-10/11 |
| `EmptyCart` | Estado vazio com retorno à Home | RN-09 |
| `DeliveryAddressForm` | Campos e feedback de CEP | RF-08 |
| `PaymentMethodSelector` | Seleção exclusiva de pagamento | RF-09 |
| `OrderSuccess` | Resumo do pedido | RF-12 |

## 5. Tipos de domínio

```ts
// src/types/coffee.ts
export type CoffeeTag =
  | 'tradicional'
  | 'gelado'
  | 'com leite'
  | 'especial';

export interface Coffee {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string;
  tags: CoffeeTag[];
}

// src/types/cart.ts
export interface CartItem {
  coffeeId: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface CartLine {
  coffee: Coffee;
  coffeeId: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
}

export interface Totals {
  subtotalCents: number;
  deliveryFeeCents: number;
  totalCents: number;
  totalUnits: number;
}

// src/types/address.ts
export type UF =
  | 'AC' | 'AL' | 'AP' | 'AM' | 'BA' | 'CE' | 'DF' | 'ES'
  | 'GO' | 'MA' | 'MT' | 'MS' | 'MG' | 'PA' | 'PB' | 'PR'
  | 'PE' | 'PI' | 'RJ' | 'RN' | 'RS' | 'RO' | 'RR' | 'SC'
  | 'SP' | 'SE' | 'TO';

export interface DeliveryAddress {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  uf: UF;
}

// src/types/order.ts
export type PaymentMethod = 'credit' | 'debit' | 'cash';

export interface OrderItemSnapshot {
  coffeeId: string;
  name: string;
  unitPriceCents: number;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  items: OrderItemSnapshot[];
  address: DeliveryAddress;
  paymentMethod: PaymentMethod;
  subtotalCents: number;
  deliveryFeeCents: number;
  totalCents: number;
}

export type ThemeMode = 'light' | 'dark';
export type CepStatus = 'idle' | 'loading' | 'success' | 'not-found' | 'error';
```

`CartLine` é derivado do catálogo e do carrinho; não deve ser persistido. Os nomes e preços do pedido concluído são copiados para `OrderItemSnapshot`, garantindo independência do catálogo.

## 6. Carrinho: reducer e contexto

### 6.1 Ações

```ts
export type CartAction =
  | { type: 'ADD_ITEM'; payload: { coffeeId: string; quantity: number } }
  | { type: 'INCREMENT'; payload: { coffeeId: string } }
  | { type: 'DECREMENT'; payload: { coffeeId: string } }
  | { type: 'REMOVE_ITEM'; payload: { coffeeId: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: { items: CartItem[] } };
```

### 6.2 Regras
- `ADD_ITEM`: ignorar quantidade menor que 1; somar ao item existente; limitar a 99.
- `INCREMENT`: incrementar até 99.
- `DECREMENT`: reduzir somente quando quantidade for maior que 1.
- `REMOVE_ITEM`: remover pelo `coffeeId`.
- `CLEAR_CART`: retornar `{ items: [] }`.
- `HYDRATE`: receber dados previamente validados/sanitizados; descartar IDs inexistentes e quantidades fora do intervalo 1..99.

O reducer não acessa `localStorage`, catálogo externo, rede ou React. Não mutar estado.

### 6.3 Contexto
`CartProvider` usa `useReducer`. Expõe `items`, `lines`, `totals` e ações. `lines` e `totals` são derivados do catálogo e calculados com funções puras; `useMemo` só deve ser usado se trouxer benefício ou clareza.

O hook `useCart()` deve lançar erro claro se usado fora do provider. O pedido concluído não pertence ao estado do carrinho.

## 7. Persistência e hooks

Chaves oficiais:
- `coffee-delivery:cart:v1` — `CartItem[]`.
- `coffee-delivery:theme:v1` — `'light' | 'dark'`.
- `coffee-delivery:last-order:v1` — `Order`.

Ajuste correspondente: PRD RN-06 e TECH_SPEC devem usar exatamente as mesmas chaves.

A leitura deve tratar `localStorage` indisponível, JSON corrompido e formato inválido. Validar os dados antes de usá-los. A hidratação do carrinho também verifica IDs presentes no catálogo e quantidades válidas.

Persistir alterações do carrinho e tema. Evitar gravar o estado inicial vazio antes de concluir a hidratação do carrinho, para não sobrescrever dados salvos durante a inicialização.

`useCep(cep)`:
- Só consultar com oito dígitos.
- Usar `AbortController` para cancelar requisição anterior ou obsoleta.
- Expor status e dados tipados.
- Tratar resposta HTTP não OK, erro `{"erro": true}`, falha de rede e resposta incompleta.
- Não preencher número ou complemento.
- Não sobrescrever campos que o usuário já editou sem uma regra explícita e aprovada.

## 8. Rotas

| Rota | Página | Comportamento |
|---|---|---|
| `/` | `Home` | Catálogo |
| `/checkout` | `Checkout` | Carrinho, endereço, pagamento e resumo |
| `/success` | `Success` | Snapshot do último pedido válido |
| `*` | `NotFound` (recomendado) | Link para Home |

Usar `Link` e `useNavigate`. Em mudanças de rota, considerar foco no título principal e rolagem ao topo, sem prejudicar a navegação por teclado.

## 9. Validação do checkout

Usar React Hook Form com `zodResolver`. O schema deve validar CEP normalizado com oito dígitos, campos obrigatórios, UF válida, complemento opcional e forma de pagamento válida.

```ts
import { z } from 'zod';

const UFS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
] as const;

export const addressSchema = z.object({
  cep: z.string().transform((value) => value.replace(/\D/g, ''))
    .refine((value) => value.length === 8, 'Informe um CEP válido (8 dígitos)'),
  street: z.string().trim().min(1, 'Informe a rua'),
  number: z.string().trim().min(1, 'Informe o número').max(10),
  complement: z.string().trim().max(60).optional(),
  neighborhood: z.string().trim().min(1, 'Informe o bairro'),
  city: z.string().trim().min(1, 'Informe a cidade'),
  uf: z.enum(UFS),
});

export const checkoutSchema = z.object({
  address: addressSchema,
  paymentMethod: z.enum(['credit', 'debit', 'cash']),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
```

A sintaxe de mensagens personalizadas do Zod deve ser ajustada à versão efetivamente instalada. Não copiar opções de uma versão diferente sem conferir a documentação da versão do projeto.

Erros devem ser associados aos campos; no submit inválido, focar o primeiro erro. Máscara de CEP é apresentação; normalizar para dígitos na validação.

A leitura do último pedido deve usar um `orderSchema` compatível com `Order`, validando também os itens e os valores.

## 10. Consulta ViaCEP

Endpoint: `https://viacep.com.br/ws/{cep}/json/`.

Mapeamento:
- `logradouro` → `street`
- `bairro` → `neighborhood`
- `localidade` → `city`
- `uf` → `uf`

`numero` e `complemento` permanecem sob controle do usuário. Campo retornado vazio deve continuar editável. Tratar estados `idle`, `loading`, `success`, `not-found` e `error`; permitir nova tentativa e preenchimento manual.

## 11. Preços e formatação

```ts
// src/utils/pricing.ts
export const DELIVERY_FEE_CENTS = 350;
export const MIN_QTY = 1;
export const MAX_QTY = 99;

type PricedLine = {
  unitPriceCents: number;
  quantity: number;
};

export const subtotalCents = (lines: PricedLine[]): number =>
  lines.reduce((total, line) =>
    total + line.unitPriceCents * line.quantity, 0);

export const deliveryFeeCents = (subtotal: number): number =>
  subtotal > 0 ? DELIVERY_FEE_CENTS : 0;

export const totalUnits = (items: { quantity: number }[]): number =>
  items.reduce((total, item) => total + item.quantity, 0);

export const calcTotals = (lines: PricedLine[]) => {
  const subtotal = subtotalCents(lines);
  const fee = deliveryFeeCents(subtotal);

  return {
    subtotalCents: subtotal,
    deliveryFeeCents: fee,
    totalCents: subtotal + fee,
    totalUnits: totalUnits(lines),
  };
};
```

```ts
// src/utils/format.ts
const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const formatBRL = (cents: number): string =>
  brlFormatter.format(cents / 100);
```

Não usar números decimais para cálculos monetários. A taxa de entrega deve ser definida somente em `pricing.ts`.

## 12. Tema, tokens e responsividade

Usar `ThemeProvider` do styled-components com interface `AppTheme` compartilhada pelos temas. **A fonte de verdade para cores, tipografia, componentes, estados e ícones é `STYLE_GUIDE.md`.** Não escolher HEX por aproximação nem criar uma segunda paleta concorrente.

### 12.1 Tokens de cor obrigatórios

Cores de produto:
| Token | HEX |
|---|---|
| `yellow-dark` | `#C47F17` |
| `yellow` | `#DBAC2C` |
| `yellow-light` | `#F1E9C9` |
| `purple-dark` | `#4B2995` |
| `purple` | `#8047F8` |
| `purple-light` | `#EBE5F9` |

Cores de base:
| Token | HEX |
|---|---|
| `base-title` | `#272221` |
| `base-subtitle` | `#403937` |
| `base-text` | `#574F4D` |
| `base-label` | `#8D8686` |
| `base-hover` | `#D7D5D5` |
| `base-button` | `#E6E5E5` |
| `base-input` | `#EDEDED` |
| `base-card` | `#F3F2F2` |
| `background` | `#FAFAFA` |
| `white` | `#FFFFFF` |

Criar tokens semânticos (`bg`, `surface`, `text`, `textMuted`, `border`, `primary`, `accent`, `focusRing`, `success`, `error`, `warning`, `overlay`) mapeados aos tokens de marca/base. Manter os tokens de origem reconhecíveis para facilitar a conferência com o Style Guide.

### 12.2 Tipografia e UI Kit

- Baloo 2 para títulos: XL 48px, L 32px, M 24px (ExtraBold); S 20px e XS 18px (Bold); line-height 130%.
- Roboto para textos: L 20px, M 16px, S 14px, XS 12px; Tag 10px; Button G 14px e Button M 12px, com pesos e line-heights conforme `STYLE_GUIDE.md`.
- Reproduzir variantes/estados de Button (Primary, Secondary, Icon), Cart (Empty/Full), Select (Default/Hover/Selected), Input Text (Default/Active/Empty/Filled) e Input Number conforme `STYLE_GUIDE.md`.
- Catalog card: imagem superior, tag, título, descrição, preço, quantidade e ação de carrinho.
- Cart card: layout horizontal, imagem, nome, quantidade, ação Remover e preço.

### 12.3 Dark mode e responsividade

A paleta HEX acima corresponde à referência clara. Não tratar cores claras como valores do tema escuro. Criar estrutura semântica para dark mode e usar imagens dark enviadas pelo aluno; na ausência delas, apresentar proposta de cores dark e aguardar aprovação antes de consolidar os valores.

Breakpoints iniciais (ajustáveis às referências):
- base: 0–479 px
- sm: ≥ 480 px
- md: ≥ 768 px
- lg: ≥ 1024 px
- xl: ≥ 1280 px

Mobile first. Testar 320, 375/390, 768 e 1280/1440 px. Não presumir que o layout mobile é apenas uma versão comprimida do desktop.

### 12.4 Ícones e imagens

- A referência indica Phosphor Icons. Usar os ícones descritos em `STYLE_GUIDE.md` e manter consistência visual; não substituir por emojis.
- O catálogo prevê 14 imagens de cafés em perspectiva superior (top-down), listadas no Style Guide. Preservar o enquadramento e a consistência entre imagens.
- Não criar ou trocar assets finais sem autorização do aluno. Se faltarem imagens, registrar a pendência e solicitar os arquivos ou aprovação de alternativa.

## 13. Acessibilidade

- Landmarks semânticos e um `h1` principal por página.
- Link para pular ao conteúdo.
- `:focus-visible` perceptível nos dois temas.
- Botões apenas com ícone devem ter `aria-label`.
- Contador e feedback dinâmico anunciados sem excesso de mensagens.
- Erros associados aos campos.
- Respeitar `prefers-reduced-motion`.
- Contraste e alvos de toque conforme PRD.

## 14. Testes

### Unitários
| ID | Alvo | Caso |
|---|---|---|
| TC-01 | reducer | ADD_ITEM cria item |
| TC-02 | reducer | ADD_ITEM repetido soma sem duplicar |
| TC-03 | reducer | Quantidade zero/negativa é ignorada |
| TC-04 | reducer | INCREMENT respeita 99 |
| TC-05 | reducer | DECREMENT 2→1; em 1 permanece |
| TC-06 | reducer | REMOVE_ITEM remove somente alvo |
| TC-07 | reducer | CLEAR_CART esvazia |
| TC-08 | reducer | Estado anterior não é mutado |
| TC-09 | pricing | Subtotal, frete e total corretos |
| TC-10 | pricing | Cálculo em centavos |
| TC-11 | pricing | Frete zero com carrinho vazio |
| TC-12 | pricing | Contador soma unidades |
| TC-13 | format | 1990 → R$ 19,90 |
| TC-14 | schema | CEP, UF e campos obrigatórios |
| TC-15 | schema | Pagamento obrigatório e opções válidas |
| TC-16 | storage | JSON inválido/falha de storage não quebra app |
| TC-17 | hidratação | Remove IDs inexistentes e quantidades inválidas |
| TC-18 | orderSchema | Pedido salvo inválido é rejeitado |

### Integração
| ID | Caso |
|---|---|
| TC-20 | Home apresenta catálogo e informações |
| TC-21 | Adicionar item atualiza contador |
| TC-22 | Alterar carrinho atualiza totais |
| TC-23 | Refresh recupera carrinho |
| TC-24 | CEP válido preenche campos corretos sem número/complemento |
| TC-25 | CEP não encontrado e falha de rede exibem feedback |
| TC-26 | Carrinho vazio/formulário inválido bloqueia confirmação |
| TC-27 | Pedido válido navega para sucesso e limpa carrinho |
| TC-28 | `/success` sem pedido apresenta estado vazio |
| TC-29 | Tema alterna e persiste; fallback usa preferência do sistema |

### E2E/manual
| ID | Caso |
|---|---|
| TC-30 | Fluxo completo em mobile e desktop |
| TC-31 | Navegação por teclado nos dois temas |
| TC-32 | Sem rolagem horizontal em 320 px |
| TC-33 | Logo, favicon e imagens carregam |
| TC-34 | Lighthouse como verificação orientativa |

## 15. Scripts esperados

Conferir `package.json`; não presumir que os scripts já existem.

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
npm run test:run
npm run build
npm run preview
```

`test:e2e` pode ser adicionado se Playwright for adotado. `typecheck` deve executar `tsc --noEmit`. Configurar scripts de acordo com as ferramentas efetivamente instaladas.

Deploy em Vercel, Netlify ou GitHub Pages. Configurar fallback de SPA para `index.html` para que rotas funcionem ao atualizar a página.

## 16. Riscos

| Risco | Mitigação |
|---|---|
| ViaCEP indisponível | Erro, retry e preenchimento manual |
| localStorage corrompido/indisponível | try/catch, validação e fallback |
| Contraste inadequado | Validar ambos os temas |
| Refresh em rota retorna 404 | Fallback SPA |
| Imagem gerada ilegível pequena | Testar versão reduzida e favicon simplificado |
| Design incompleto nas imagens | Identificar lacunas e pedir decisão |
| Código gerado sem compreensão | Tarefas pequenas e explicações |

## 17. Matriz de rastreabilidade

| Requisito | Implementação principal | Testes |
|---|---|---|
| RF-01 | `data/coffees.ts`, catálogo e card | TC-20 |
| RF-02 | `QuantityInput` | TC-03/04 |
| RF-03 | `ADD_ITEM` | TC-01/02/21 |
| RF-04 | `CartBadge`, `totalUnits` | TC-12/21 |
| RF-05 | ações do reducer e `CartItem` | TC-04..06/22 |
| RF-06 | persistência e hidratação | TC-16/17/23 |
| RF-07 | React Router | TC-30 |
| RF-08 | formulário, `useCep`, schema | TC-14/24/25 |
| RF-09 | seletor de pagamento e schema | TC-15 |
| RF-10 | `calcTotals`, `CartSummary` | TC-09..11 |
| RF-11 | validação e guarda de submit | TC-26 |
| RF-12 | snapshot e `OrderSuccess` | TC-27 |
| RF-13 | `CLEAR_CART` e último pedido | TC-07/27 |
| RF-14 | ThemeProvider e toggle | TC-29/31 |
| RF-15 | layout responsivo | TC-30/32 |
| RF-16 | assets, Header e favicon | TC-33 |
| RN-01/02 | reducer e controles | TC-02..05 |
| RN-03/04 | pricing e format | TC-09..13 |
| RN-05 | `PaymentMethod` | TC-15 |
| RN-06 | snapshot independente | TC-18/27 |
| RN-07 | `useCep` e estados de UI | TC-24/25 |
| RN-08 | catálogo local e ViaCEP | TC-20/24 |
| RN-09 | estados vazios | TC-28 |
| RN-10 | validação, hidratação e submit | TC-17/26 |
