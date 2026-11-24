# TASKS_SPEC — Plano de implementação

> Versão: 1.0 · Plano inicial proposto a partir do PRD e TECH_SPEC.
> Status: sequência sugerida; o aluno deve validar a ordem antes da execução.
>
> **Importante:** o conteúdo original de TASKS_SPEC não foi incluído no material recebido. Portanto, este arquivo é uma proposta nova derivada dos requisitos apresentados, não uma recuperação do documento anterior.

## Como usar

- Executar uma tarefa por vez.
- O agente apresenta objetivo, requisitos, arquivos, critérios e testes antes de codificar.
- O aluno valida a proposta.
- Ao concluir, registrar resultado real, atualizar checklist e aguardar validação.
- Não avançar automaticamente para a tarefa seguinte.

## T-00 — Conferência inicial do projeto

**Objetivo:** entender o estado real do repositório antes de instalar ou alterar arquivos.

**Requisitos:** preparação para todos os RF/RN.

**Ações:**
- Inspecionar `package.json`, estrutura existente, configurações e arquivos já implementados.
- Comparar o estado do projeto com PRD e TECH_SPEC.
- Identificar dependências já instaladas e scripts existentes.
- Verificar quais imagens de referência o aluno já enviou e a quais telas correspondem.

**Aceite:** relatório de estado atual, divergências e proposta da próxima tarefa. Nenhuma alteração sem aprovação.

## T-01 — Configuração e fundação do projeto

**Objetivo:** garantir React, Vite, TypeScript strict e ferramentas de qualidade funcionando.

**Requisitos:** qualidade técnica geral.

**Arquivos possíveis:** `package.json`, `tsconfig*.json`, `vite.config.ts`, ESLint, Prettier, `src/main.tsx`.

**Aceite:** aplicação inicia; `strict` habilitado; scripts necessários configurados; lint, typecheck e build executáveis.

## T-02 — Tipos, catálogo e assets

**Objetivo:** modelar os cafés e dados estáticos.

**Requisitos:** RF-01, RF-16, RN-08.

**Arquivos possíveis:** `src/types/`, `src/data/coffees.ts`, `src/assets/`.

**Aceite:** catálogo tipado, preços em centavos, IDs estáveis e assets existentes. Não inventar imagens finais se o aluno ainda não as forneceu/aprovou.

## T-03 — Identidade visual, tokens e estilos globais

**Objetivo:** implementar a base visual a partir de `STYLE_GUIDE.md` e das imagens enviadas pelo aluno.

**Requisitos:** RF-14, RF-15, RF-16 e requisitos de acessibilidade.

**Arquivos possíveis:** `src/styles/`, `src/assets/`, `public/`.

**Aceite:** tokens de cor com os HEX exatos do Style Guide; Baloo 2 e Roboto configuradas; estados de componentes mapeados; análise das referências aprovada; foco e estilos globais definidos. Não inventar paleta dark: se não houver referência suficiente para light/dark ou mobile, apresentar proposta e solicitar aprovação.

## T-04 — Layout, Header e navegação

**Objetivo:** criar estrutura comum e rotas.

**Requisitos:** RF-04, RF-07, RF-14, RF-16.

**Arquivos possíveis:** `src/App.tsx`, `src/main.tsx`, `src/pages/`, `src/components/Header/`, `PageLayout/`.

**Aceite:** rotas Home, Checkout e Success funcionam; Header segue as imagens; navegação por teclado e landmarks corretos.

## T-05 — Catálogo e seleção de quantidade

**Objetivo:** exibir cafés e permitir selecionar quantidade.

**Requisitos:** RF-01, RF-02.

**Arquivos possíveis:** `CoffeeCatalog`, `CoffeeCard`, `QuantityInput`.

**Aceite:** catálogo completo; quantidade inteira entre 1 e 99; interface fiel às referências fornecidas.

## T-06 — Reducer e regras do carrinho

**Objetivo:** implementar transições puras do carrinho.

**Requisitos:** RF-03, RF-05, RN-01, RN-02.

**Arquivos possíveis:** `src/reducers/cartReducer.ts`, `src/types/cart.ts`, testes do reducer.

**Aceite:** ações previstas implementadas; sem mutação; limites respeitados; testes TC-01 a TC-08 passando.

## T-07 — Contexto, totais e persistência do carrinho

**Objetivo:** disponibilizar estado global e persistir carrinho.

**Requisitos:** RF-03, RF-04, RF-06, RF-10, RN-03, RN-04, RN-06, RN-10.

**Arquivos possíveis:** `CartContext`, `useCart`, `pricing.ts`, `format.ts`, `storage.ts`.

**Aceite:** contador soma unidades; valores em centavos; hidratação valida IDs e quantidades; refresh preserva carrinho; testes pertinentes passando.

## T-08 — Checkout: estrutura e resumo do carrinho

**Objetivo:** apresentar itens editáveis, estados vazios e resumo financeiro.

**Requisitos:** RF-05, RF-10, RF-11, RN-09.

**Arquivos possíveis:** `Checkout.tsx`, `CartItem`, `CartSummary`, `EmptyCart`.

**Aceite:** editar/remover itens atualiza totais; carrinho vazio não pode ser confirmado; layout segue referências.

## T-09 — Formulário e validação do endereço

**Objetivo:** construir formulário com React Hook Form e Zod.

**Requisitos:** RF-08, RF-11, RN-07.

**Arquivos possíveis:** `schemas/checkoutSchema.ts`, `DeliveryAddressForm`, tipos de endereço.

**Aceite:** campos, mensagens, labels, foco e acessibilidade funcionando; complemento opcional.

## T-10 — Consulta ViaCEP

**Objetivo:** integrar consulta de CEP com estados de carregamento e falha.

**Requisitos:** RF-08, RN-07.

**Arquivos possíveis:** `hooks/useCep.ts`, `utils/cep.ts`, testes.

**Aceite:** consulta somente com oito dígitos; cancelamento de requisição obsoleta; não sobrescrever número/complemento; tratar sucesso, não encontrado, erro e resposta incompleta.

## T-11 — Pagamento fictício e validação final do checkout

**Objetivo:** integrar as três opções de pagamento e impedir pedido inválido.

**Requisitos:** RF-09, RF-11, RN-05, RN-10.

**Arquivos possíveis:** `PaymentMethodSelector`, schema e `Checkout.tsx`.

**Aceite:** seleção exclusiva; pagamento obrigatório; nenhuma informação de cartão coletada; submit bloqueado com carrinho/formulário inválidos.

## T-12 — Criação do pedido e tela de sucesso

**Objetivo:** gerar snapshot independente, persistir e exibir confirmação.

**Requisitos:** RF-12, RF-13, RN-06, RN-09.

**Arquivos possíveis:** `types/order.ts`, `orderSchema`, `storage.ts`, `Success.tsx`, `OrderSuccess`.

**Aceite:** snapshot contém dados e preços do momento da confirmação; carrinho é limpo; refresh da página de sucesso mantém o último pedido válido; estado vazio funciona sem pedido.

## T-13 — Tema claro/escuro completo

**Objetivo:** implementar alternância e persistência dos temas em todas as telas.

**Requisitos:** RF-14.

**Arquivos possíveis:** `ThemeContext`, `useTheme`, `ThemeToggle`, `styles/themes.ts`.

**Aceite:** preferência salva prevalece; sem preferência usa `prefers-color-scheme`; contraste e estados verificados nos dois temas.

## T-14 — Responsividade e acessibilidade final

**Objetivo:** validar o fluxo em diferentes viewports e corrigir problemas.

**Requisitos:** RF-15 e requisitos não funcionais.

**Aceite:** 320, 375/390, 768 e 1280/1440 px verificados; sem rolagem horizontal involuntária; teclado, foco, labels, mensagens e alvos de toque revisados.

## T-15 — Testes de integração, revisão e build

**Objetivo:** completar a cobertura dos fluxos essenciais.

**Requisitos:** todos os RF/RN aplicáveis.

**Aceite:** testes unitários e de integração pertinentes passam; lint, typecheck e build executados; limitações registradas.

## T-16 — Branding com IA e documentação

**Objetivo:** finalizar logo e registrar o uso de IA.

**Requisitos:** RF-16 e critério pedagógico.

**Arquivos possíveis:** `src/assets/`, `public/`, `docs/AI_USAGE.md`, `README.md`.

**Aceite:** logo aprovada, versões necessárias integradas, favicon legível e processo documentado.

## T-17 — Deploy e entrega

**Objetivo:** publicar e preparar demonstração.

**Requisitos:** critérios gerais de aceite do PRD.

**Aceite:** deploy acessível; refresh das rotas funciona; README contém instalação, execução, tecnologias e link de publicação; repositório possui histórico coerente; aluno consegue explicar os principais fluxos.

## Registro de execução

Atualizar esta tabela ao concluir cada tarefa:

| Tarefa | Status | Commit | Testes/resultado | Validação do aluno |
|---|---|---|---|---|
| T-00 | Concluída | — | Diagnóstico e conferência inicial registrados | Pendente |
| T-01 | Concluída | — | lint, typecheck e build executáveis; scripts criados | Pendente |
| T-02 | Concluída | — | 14 cafés tipados em centavos; PNGs oficiais em `src/assets/coffees` | Pendente |
| T-03 | Concluída | — | Tokens light exatos; dark provisório; GlobalStyle | Pendente |
| T-04 | Concluída | — | Rotas e Header; landmarks e skip link | Pendente |
| T-05 | Concluída | — | Catálogo, card e QuantityInput; TC-20/21 | Pendente |
| T-06 | Concluída | — | Reducer imutável; TC-01 a TC-08 | Pendente |
| T-07 | Concluída | — | Contexto, pricing, storage e hidratação; TC-09 a TC-17, TC-23 | Pendente |
| T-08 | Concluída | — | CartItem, CartSummary, EmptyCart; TC-22 e TC-26 | Pendente |
| T-09 | Concluída | — | Schema Zod e formulário acessível; TC-14/15 | Pendente |
| T-10 | Concluída | — | useCep com AbortController; TC-24/25 e ViaCEP real | Pendente |
| T-11 | Concluída | — | Pagamento exclusivo e submit bloqueado; TC-15/26 | Pendente |
| T-12 | Concluída | — | Snapshot, sucesso e limpeza; TC-18/27/28 | Pendente |
| T-13 | Concluída | — | Tema alterna e persiste; TC-29; dark provisório | Pendente |
| T-14 | Parcial | — | Mobile first; validado em 1000 px; 320/768 pendentes de inspeção visual | Pendente |
| T-15 | Concluída | — | 50 testes; lint, typecheck e build | Pendente |
| T-16 | Concluída (provisória) | — | Logo SVG provisória e AI_USAGE criado | Pendente |
| T-17 | Pendente | — | Deploy não executado (sem push autorizado) | — |
