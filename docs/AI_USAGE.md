# AI_USAGE — Registro de uso de IA

> Projeto: Coffee Delivery · Disciplina: Single Page Application (SPA)
> Ferramenta: OpenCode (agente de IA) · Modelo: DeepSeek V4.1 Flash Free
> Período: implementação executada a partir das SPECs do repositório.

Este documento registra interações relevantes, decisões tomadas e evidências. Não substitui os testes nem a revisão do aluno.

## Interação 1 — Análise inicial e planejamento

**Prompt (resumo):** "Vamos iniciar o desenvolvimento do projeto Coffee Delivery. Antes de implementar qualquer coisa, quero que você faça uma análise completa do projeto e das especificações."

**Objetivo:** ler AGENTS, PRD, TECH, TASKS e STYLE GUIDE, inspecionar o repositório e apontar divergências antes de alterar arquivos.

**Resumo da resposta:** o projeto era um scaffold Vite + React + TypeScript sem dependências de produto; as 4 imagens de referência estavam em `src/assets/figma/`; faltavam Router, styled-components, RHF/Zod, testes, scripts e assets de catálogo/logo; o TASKS_SPEC era uma proposta derivada.

**Decisão:** não alterar arquivos nessa etapa; apresentar diagnóstico e aguardar autonomia.

**Evidência:** diagnóstico apresentado no chat; nenhuma modificação feita nessa interação.

## Interação 2 — Execução incremental das tarefas

**Prompt (resumo):** "A partir de agora, você tem autonomia para executar o projeto de ponta a ponta, seguindo rigorosamente o fluxo Spec Driven... Não pare para pedir autorização entre tarefas."

**Objetivo:** implementar T-01 a T-16 sem commits/push automáticos, mantendo qualidade e registrando pendências.

**Resumo da resposta:** dependências instaladas; tipos, catálogo, tokens, temas, componentes, contexto, reducer, schemas, ViaCEP, checkout, sucesso, testes e documentação implementados.

**Decisão:** executar uma tarefa por vez, validando com lint, typecheck, testes e build; não commitar por instrução explícita.

**Evidência:** `npm run lint`, `npm run typecheck`, `npm run test:run` (50 testes) e `npm run build` executados; fluxo validado no navegador em `http://127.0.0.1:5173`.

## Interação 3 — Correção de lint no `useCep`

**Prompt (resumo):** erro real retornado por `npm run lint`: `react-hooks/set-state-in-effect` em `useCep.ts`.

**Objetivo:** remover `setState` síncrono dentro do efeito sem perder os estados `idle/loading/success/not-found/error`.

**Resumo da resposta:** o hook passou a guardar apenas o resultado da consulta e a derivar `loading` quando o resultado não corresponde ao CEP atual.

**Decisão:** manter o `AbortController` e derivar o estado em vez de sincronizar com efeito.

**Evidência:** lint sem erros; TC-24/25 passando; ViaCEP real preenchendo endereço no navegador.

## Interação 4 — Decisão sobre assets provisórios

**Prompt (resumo):** "Para imagens de produtos e logo ausentes, utilize soluções provisórias coerentes... Registre o que precisa ser substituído."

**Objetivo:** permitir o desenvolvimento visual sem inventar assets que contrariem o Style Guide.

**Resumo da resposta:** inicialmente foram criados SVGs provisórios de xícaras; em seguida o aluno forneceu um PNG oficial para cada um dos 14 cafés, que passaram a ser usados no catálogo.

**Decisão:** usar os PNGs oficiais fornecidos em `src/assets/coffees`, mantendo provisórios apenas hero, ilustração de entrega e logo/favicon.

**Evidência:** `src/data/coffees.ts` importa os 14 PNGs; build e testes executados após a substituição.

## Branding criado com IA

- **Ferramenta:** agente de IA (OpenCode) gerando SVG por código, sem uso de gerador de imagem.
- **Prompt:** criar uma marca provisória simples para "Coffee Delivery", com xícara roxa e vapor, legível em tamanho pequeno, usando `purple-dark`/`purple` do Style Guide.
- **Resultado:** `src/assets/logo-icon.svg` e `public/favicon.svg`.
- **Justificativa:** solução provisória, vetorial, leve e coerente com a paleta oficial.
- **Pendência:** substituir pela logo final criada com ferramenta de imagem por IA, registrando prompt, resultado e termos de uso, conforme RF-16.

## Decisões técnicas e pendências registradas

1. **Dependências:** `@phosphor-icons/react` (ícones do Style Guide), `react-router-dom`, `styled-components`, `react-hook-form`, `zod` 4 e `@hookform/resolvers` 7; testes com `vitest` 5 + Testing Library + jsdom.
2. **Zod 4:** mensagens usam a sintaxe aceita pela versão instalada; o CEP é validado por `refine` e normalizado ao criar o pedido.
3. **Tag `alcoólico`:** adicionada ao tipo `CoffeeTag` porque as imagens mostram essa tag em Cubano e Irlandês (o TECH_SPEC listava apenas quatro tags).
4. **Tema escuro:** estrutura completa implementada, com paleta provisória; o Style Guide descreve apenas o tema claro. Substituir/validar os valores finais.
5. **Assets:** as imagens dos 14 cafés são os PNGs oficiais fornecidos pelo aluno em `src/assets/coffees`. Hero, ilustração de entrega, logo e favicon continuam provisórios e devem ser substituídos pelos arquivos oficiais.
6. **Contextos:** no Windows, arquivos que diferem apenas por maiúsculas colidem no TypeScript; por isso os providers ficam em `CartProvider.tsx`/`ThemeProvider.tsx` e os contextos em `cartContext.ts`/`themeContext.ts`.
7. **Commits/push:** não realizados por instrução explícita do aluno nesta execução.
8. **Responsividade:** layout mobile first implementado; validação visual completa em 320, 375/390, 768 e 1280/1440 px ainda deve ser feita manualmente.
9. **Contraste do botão primário:** o Style Guide define texto branco sobre `yellow` (#DBAC2C); a combinação não atinge 4,5:1. Mantida a fidelidade à referência e registrada a divergência para decisão.
