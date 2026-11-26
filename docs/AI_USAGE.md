# AI_USAGE — Registro de uso de IA

> Projeto: Coffee Delivery · Disciplina: Single Page Application (SPA)
> Design de referência: [Coffee Delivery • Projeto Final React (Copy) – Figma](https://www.figma.com/design/8jovViiBDdcQdslqEbFiDS/Coffee-Delivery-%E2%80%A2-Projeto-Final-React--Copy-?node-id=0-1&p=f&t=xFKBrIrq09g7m5lz-0)
> Ferramentas: ChatGPT, OpenCode (DeepSeek V4.1 Flash Free, Big Pickle e Nemotron 3.5 Super VL) e Google Gemini

Neste documento registro como usei IA no Coffee Delivery: o que usei em cada etapa, as interações que mais importaram, as decisões que tomei e o que ficou por minha conta. A IA me ajudou bastante, mas não substituiu meus testes nem a minha revisão. Enquanto fazia o projeto, eu estava escutando "Time", do Pink Floyd.

## Outras ferramentas e o Figma sem MCP

Além do OpenCode, usei mais três ferramentas, em momentos diferentes.

**ChatGPT, no planejamento.** Li os requisitos da atividade com ele e montei o `AGENTS.md`, o `TECH_SPEC.md` e o `TASKS_SPEC.md`, que guiaram o agente depois. Também voltei a ele para tirar dúvidas técnicas e comparar soluções.

**Nemotron 3.5 Super VL (via OpenCode), na leitura do Figma.** Eu não usei o MCP do Figma, então o OpenCode não conseguia abrir o design direto. Exportei as telas em PNG e coloquei em `./assets/figma`, mas a pasta ficou só com as páginas inteiras, sem as imagens individuais de cafés e hero. O Nemotron leu essas telas e me ajudou a entender componentes, estilos e organização.

**Google Gemini, no layout da Home.** Só com as imagens, a Home não saiu parecida com o Figma. Como não havia MCP, usei o Gemini mais para o final do projeto para resolver o design dessa página, reorganizando os elementos e aproximando do layout original.

O OpenCode também usou o modelo Big Pickle, além do DeepSeek V4.1, na escrita do código.

## Interação 1 — Análise inicial e planejamento

**Prompt (resumo):** "Vamos iniciar o desenvolvimento do projeto Coffee Delivery. Antes de implementar qualquer coisa, quero que você faça uma análise completa do projeto e das especificações."

**Objetivo:** que ele lesse AGENTS, PRD, TECH, TASKS e STYLE GUIDE, olhasse o repositório e me avisasse de qualquer divergência antes de mexer em arquivo.

**Resumo da resposta:** o projeto era só um scaffold Vite + React + TypeScript, sem dependências do produto. As 4 imagens de referência estavam em `./assets/figma`. Faltavam Router, styled-components, RHF/Zod, testes, scripts e os assets de catálogo e logo. Ele também notou que o TASKS_SPEC era uma proposta derivada.

**Decisão:** não deixei que ele alterasse nada nessa etapa. Eu só queria o diagnóstico antes de liberar a execução.

**Evidência:** o diagnóstico ficou no chat, e nenhum arquivo foi modificado.

## Interação 2 — Execução incremental das tarefas

**Prompt (resumo):** "A partir de agora, você tem autonomia para executar o projeto de ponta a ponta, seguindo rigorosamente o fluxo Spec Driven... Não pare para pedir autorização entre tarefas."

**Objetivo:** que ele implementasse T-01 a T-16 sem commits nem push automáticos, mantendo a qualidade e registrando o que ficasse pendente.

**Resumo da resposta:** ele instalou as dependências e implementou tipos, catálogo, tokens, temas, componentes, contexto, reducer, schemas, ViaCEP, checkout, tela de sucesso, testes e documentação.

**Decisão:** fazer uma tarefa de cada vez, validando com lint, typecheck, testes e build, e não commitar, por instrução minha.

**Evidência:** rodei `npm run lint`, `npm run typecheck`, `npm run test:run` (50 testes) e `npm run build`, e testei o fluxo no navegador em `http://127.0.0.1:5173`.

## Interação 3 — Correção de lint no `useCep`

**Prompt (resumo):** levei para o agente o erro real do `npm run lint`: `react-hooks/set-state-in-effect` em `useCep.ts`.

**Objetivo:** tirar o `setState` síncrono de dentro do efeito sem perder os estados `idle/loading/success/not-found/error`.

**Resumo da resposta:** o hook passou a guardar só o resultado da consulta e a derivar o `loading` quando o resultado não bate com o CEP atual.

**Decisão:** manter o `AbortController` e derivar o estado, em vez de sincronizar com efeito.

**Evidência:** o lint passou sem erros, os testes TC-24 e TC-25 passaram e o ViaCEP de verdade preencheu o endereço no navegador.

## Interação 4 — Imagens provisórias e troca pelas oficiais

**Prompt (resumo):** "Para imagens de produtos e logo ausentes, utilize soluções provisórias coerentes... Registre o que precisa ser substituído."

**Objetivo:** seguir com o visual sem o agente inventar assets que contrariassem o Style Guide.

**Resumo da resposta:** como `./assets/figma` só tinha os PNGs das páginas, ele não tinha as imagens individuais e criou SVGs provisórios de xícaras e um `hero.svg` provisório. Depois eu baixei os assets do Figma: um PNG oficial para cada um dos 14 cafés e o `hero.png`.

**Decisão:** usar os PNGs oficiais em `src/assets/coffees` e trocar o `hero.svg` pelo `hero.png` do Figma. Só a ilustração de entrega continua provisória.

**Evidência:** o `src/data/coffees.ts` importa os 14 PNGs, e rodei build e testes de novo depois da troca.

## Logo e favicon criados com IA

A logo foi criada pelo DeepSeek V4.1, pelo OpenCode, escrevendo o SVG em código. Não usei nenhum gerador de imagem.

- **Prompt:** criar uma marca simples para "Coffee Delivery", com xícara roxa e vapor, legível em tamanho pequeno, usando `purple-dark` e `purple` do Style Guide.
- **Resultado:** `src/assets/logo-icon.svg` e `public/favicon.svg`.
- **Justificativa:** é vetorial, leve e combina com a paleta oficial.

## O que fiz por conta própria

A IA escreveu boa parte do código, mas o projeto não saiu sozinho: o rumo, a conferência e vários acertos foram meus.

Eu montei o plano antes de qualquer linha de código, definindo o escopo, as tecnologias e as regras nas specs. Criei o projeto base na mão, com `npm create vite@8 .` (React e TypeScript), exportei as telas do Figma e organizei a pasta de referências. Durante o desenvolvimento decidi qual ferramenta entrava em cada etapa, e foi por isso que levei a Home para o Gemini quando vi que só com imagens ela não ia ficar certa.

Também fui eu que percebi que o agente tinha usado imagens provisórias no lugar das reais. Baixei do Figma todas as imagens dos cafés, renomeei cada arquivo para o café certo e troquei o `hero.svg` pelo `hero.png` oficial. No `src/data/coffees.ts` também atualizei na mão os valores dos cafés. Ao longo do caminho li o que ele gerava, rodei os testes, abri o fluxo no navegador e, quando o lint quebrou, levei o erro de volta para ele resolver.

## Decisões técnicas e pendências

1. **Dependências:** `@phosphor-icons/react` (ícones do Style Guide), `react-router-dom`, `styled-components`, `react-hook-form`, `zod` 4 e `@hookform/resolvers` 7. Para testes, `vitest` 5 com Testing Library e jsdom.
2. **Zod 4:** as mensagens usam a sintaxe da versão instalada. O CEP é validado com `refine` e normalizado quando o pedido é criado.
3. **Tag `alcoólico`:** o agente adicionou essa tag ao tipo `CoffeeTag` porque as imagens mostram ela no Cubano e no Irlandês, e o TECH_SPEC listava só quatro tags.
4. **Tema escuro:** a estrutura está completa, mas o Style Guide só descreve o tema claro. As cores do escuro são provisórias e ainda preciso validar.
5. **Assets:** as imagens dos 14 cafés e o hero são os PNGs oficiais do Figma, que baixei e renomeei. A ilustração de entrega ainda é provisória e falta trocar pelo arquivo oficial.
6. **Contextos:** no Windows, arquivos que diferem só em maiúsculas dão conflito no TypeScript. Por isso os providers ficaram em `CartProvider.tsx` e `ThemeProvider.tsx`, e os contextos em `cartContext.ts` e `themeContext.ts`.
7. **Commits e push:** não fiz nenhum nessa execução, porque pedi ao agente para não fazer.
8. **Responsividade:** o layout é mobile first, mas ainda falta eu conferir à mão em 320, 375/390, 768 e 1280/1440 px.
9. **Contraste do botão primário:** o Style Guide manda texto branco sobre o amarelo `#DBAC2C`, e essa combinação não chega a 4,5:1. Mantive como está no Figma e deixei a divergência registrada para decidir depois.
