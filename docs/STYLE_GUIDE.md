# STYLE_GUIDE — Identidade visual e UI Kit

> Projeto: Coffee Delivery
> Fonte: transcrição fornecida pelo aluno a partir das duas imagens do Design System / UI Kit.
> Status: referência visual oficial para a implementação. Não substituir por uma paleta genérica.

## 1. Diretriz geral

A interface deve seguir a identidade visual do Style Guide: amarelo e roxo como cores de marca, superfícies claras e tipografia Baloo 2 + Roboto. Os tokens abaixo são os valores de referência e devem ser centralizados na implementação, sem espalhar códigos HEX pelos componentes.

## 2. Paleta de cores

### 2.1 Cores de produto

| Token | HEX | Uso de referência |
|---|---|---|
| `yellow-dark` | `#C47F17` | Hover do botão primário, borda de input ativo e ícone do carrinho vazio |
| `yellow` | `#DBAC2C` | Botão primário e elementos de destaque amarelos |
| `yellow-light` | `#F1E9C9` | Fundo do botão/estado do carrinho |
| `purple-dark` | `#4B2995` | Botão de ícone/carrinho e ícones roxos |
| `purple` | `#8047F8` | Hover do botão de ícone e borda do select selecionado |
| `purple-light` | `#EBE5F9` | Fundo do select selecionado |

### 2.2 Cores de base

| Token | HEX | Uso de referência |
|---|---|---|
| `base-title` | `#272221` | Títulos |
| `base-subtitle` | `#403937` | Subtítulos |
| `base-text` | `#574F4D` | Texto principal |
| `base-label` | `#8D8686` | Labels e texto secundário |
| `base-hover` | `#D7D5D5` | Hover de superfícies e controles cinza |
| `base-button` | `#E6E5E5` | Botões secundários e opções padrão |
| `base-input` | `#EDEDED` | Fundo dos campos de texto |
| `base-card` | `#F3F2F2` | Fundo de cards |
| `background` | `#FAFAFA` | Fundo geral |
| `white` | `#FFFFFF` | Texto/elementos brancos quando previstos |

### 2.3 Regras de uso

- Usar os nomes dos tokens como referência semântica, não nomes genéricos como `color1`.
- Centralizar cores em `src/styles/` (por exemplo, `tokens.ts` ou estrutura equivalente já existente).
- Não trocar amarelo e roxo por outras cores de marca.
- Não inventar tonalidades adicionais para estados. Se um estado não estiver especificado, reutilizar o token semanticamente mais próximo e validar com o aluno.
- A paleta acima descreve principalmente a referência clara. Não presumir que `background`, `base-card` e demais cores claras sejam também os valores do tema escuro.
- Para dark mode, criar tokens semânticos separados e coerentes, mas solicitar/usar referência dark fornecida pelo aluno. Se não houver referência, apresentar proposta para aprovação antes de definir valores finais.
- Verificar contraste dos textos e controles. Se um par de cores da referência não atingir o contraste recomendado, reportar a diferença e propor alternativa; não alterar silenciosamente a identidade visual aprovada.

## 3. Tipografia

### 3.1 Famílias

- **Baloo 2:** títulos.
- **Roboto:** textos, labels, tags e botões.

Ambas podem ser carregadas pelo Google Fonts. Definir fallbacks adequados e evitar carregar pesos não utilizados.

### 3.2 Escala tipográfica

| Estilo | Família | Tamanho | Line-height | Peso |
|---|---|---:|---:|---|
| Title XL | Baloo 2 | 48 px | 130% | ExtraBold |
| Title L | Baloo 2 | 32 px | 130% | ExtraBold |
| Title M | Baloo 2 | 24 px | 130% | ExtraBold |
| Title S | Baloo 2 | 20 px | 130% | Bold |
| Title XS | Baloo 2 | 18 px | 130% | Bold |
| Text L | Roboto | 20 px | 130% | Regular / Bold |
| Text M | Roboto | 16 px | 130% | Regular / Bold |
| Text S | Roboto | 14 px | 130% | Regular |
| Text XS | Roboto | 12 px | 130% | Bold |
| Tag | Roboto | 10 px | 130% | Bold |
| Button G | Roboto | 14 px | 160% | Bold |
| Button M | Roboto | 12 px | 160% | Regular |

## 4. Componentes e estados do UI Kit

### 4.1 Button

| Variante/estado | Aparência |
|---|---|
| Primary / Default | Retangular, fundo `yellow` (`#DBAC2C`), texto branco em caixa alta |
| Primary / Hover | Fundo `yellow-dark` (`#C47F17`), texto branco em caixa alta |
| Secondary / Default | Fundo `base-button` (`#E6E5E5`), ícone de lixeira roxo, texto cinza escuro |
| Secondary / Hover | Fundo `base-hover` (`#D7D5D5`), ícone de lixeira roxo, texto mais escuro |
| Icon / Default | Botão quadrado `purple-dark` (`#4B2995`), ícone branco |
| Icon / Hover | Botão quadrado `purple` (`#8047F8`), ícone branco |

### 4.2 Cart

- Estado Empty: botão quadrado com fundo `yellow-light` (`#F1E9C9`) e ícone de carrinho `yellow-dark` (`#C47F17`).
- Estado Full: mesmo componente com badge circular `yellow-dark` no canto superior direito e número branco.
- O contador deve representar a soma das unidades no carrinho, conforme RF-04.

### 4.3 Select — forma de pagamento

- Default: fundo `base-button` (`#E6E5E5`), ícone roxo e texto.
- Hover: fundo `base-hover` (`#D7D5D5`).
- Selected: fundo `purple-light` (`#EBE5F9`), borda `purple` (`#8047F8`), ícone roxo e texto.
- A seleção deve ser visualmente perceptível e semanticamente acessível.

### 4.4 Input Text

- Default / Empty: fundo `base-input` (`#EDEDED`), placeholder/label à esquerda e indicação “Opcional” à direita quando aplicável.
- Active / Empty e Active / Filled: borda `yellow-dark` (`#C47F17`).
- Default / Filled: fundo `base-input`, sem borda de destaque.
- Estados de erro, disabled e foco por teclado devem permanecer perceptíveis e acessíveis. Não confundir foco de teclado com estado de erro.

### 4.5 Input Number

- Controle com fundo cinza claro, sinais `−` e `+` em roxo e quantidade central.
- Hover do `+` e do `−`: usar o estado roxo mais escuro mostrado no UI Kit.
- Respeitar limites de quantidade definidos em `PRD_SPEC.md`.

### 4.6 Cards de produto e carrinho

**Catalog card**
- Imagem de café na parte superior.
- Tag amarela.
- Título e descrição.
- Rodapé com preço, seletor de quantidade e botão de carrinho roxo.

**Cart card**
- Layout horizontal.
- Imagem do café à esquerda.
- Nome, seletor de quantidade e botão Remover.
- Preço alinhado à direita.

## 5. Ícones

A referência indica **Phosphor Icons**. Ícones listados:

1. `MapPinFill`
2. `MapPinLine`
3. `Trash`
4. `CurrencyDollar`
5. `ShoppingCartFill`
6. `Timer`
7. `Package`
8. `Coffee`
9. `Plus`
10. `Minus`
11. `CreditCard`
12. `Money`
13. `Bank`

Usar os equivalentes Phosphor correspondentes e manter consistência de peso/estilo. Não substituir por emojis. Caso a biblioteca ou pacote escolhido não ofereça um ícone exato, informar e propor o equivalente mais próximo antes de alterar o padrão.

## 6. Imagens de produto

A referência prevê 14 imagens/ilustrações de cafés em perspectiva superior (top-down):

1. Expresso tradicional
2. Americano
3. Cremoso
4. Gelado
5. Café com leite
6. Latte
7. Capuccino
8. Macchiato
9. Mocaccino
10. Chocolate quente
11. Cubano
12. Havaiano
13. Árabe
14. Irlandês

Manter o enquadramento superior e a consistência visual entre as imagens. Não inventar nem substituir assets finais sem autorização do aluno. Se as imagens ainda não estiverem disponíveis no repositório, registrar a pendência e solicitar os arquivos ou aprovação de uma fonte alternativa.

## 7. Implementação e validação

- Transformar a paleta e a escala tipográfica em tokens reutilizáveis.
- Mapear os estados dos componentes em variantes explícitas, evitando CSS duplicado.
- Verificar estados default, hover, selected, active e filled quando aplicáveis.
- Validar contraste, foco visível, navegação por teclado, responsividade e os temas claro/escuro.
- Este documento registra a transcrição textual do Style Guide. Quando as imagens originais do UI Kit forem disponibilizadas, elas continuam sendo a referência visual para dimensões, espaçamentos, proporções e detalhes que a transcrição não especifica.
