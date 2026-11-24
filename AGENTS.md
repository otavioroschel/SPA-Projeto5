# AGENTS.md — Diretrizes para o assistente de IA

Este arquivo orienta qualquer assistente de IA que atue neste repositório (OpenCode, Codex, Copilot ou equivalente). Leia-o integralmente antes de agir.

## 1. Regra principal: leia a documentação antes de alterar código

Antes de qualquer alteração, leia nesta ordem:

1. `docs/PRD_SPEC.md` — o que construir: RF-01 a RF-16 e RN-01 a RN-10.
2. `docs/TECH_SPEC.md` — como construir: stack, arquitetura, tipos, estado, rotas e testes.
3. `docs/TASKS_SPEC.md` — sequência de implementação e tarefa atual.
4. As imagens de referência visual fornecidas pelo aluno para a tarefa em questão.

Não existe dependência de Figma neste projeto. **Não presuma que terá acesso ao arquivo Figma, ao MCP do Figma ou à API do Figma.** As imagens fornecidas pelo aluno são a fonte visual oficial.

Se houver contradição entre documentos, pare, explique a divergência e peça decisão. Não altere requisitos ou decisões silenciosamente. Se uma decisão aprovada mudar, proponha a atualização do documento correspondente.

## 2. Contexto do projeto

- Projeto: Coffee Delivery — projeto final da disciplina Single Page Application (SPA).
- Produto: SPA de cafeteria com catálogo, carrinho, checkout (endereço consultado via API de CEP e pagamento fictício) e confirmação.
- Fora do escopo: backend, autenticação, banco de dados, pagamento real, painel administrativo e chatbot dentro do app.
- Objetivo pedagógico: o aluno deve compreender e conseguir explicar o código. Priorize clareza, previsibilidade e soluções proporcionais ao problema.

## 3. Referências visuais — regra obrigatória


As imagens em `assets/figma/` são referências visuais oficiais do projeto.

- Consulte as quatro imagens antes de implementar ou alterar interfaces.
- Compare os layouts desktop e mobile para entender o comportamento responsivo.
- Observe também as versões light e dark, respeitando o que cada imagem demonstra.
- Não substitua elementos visuais por aproximações sem justificativa.
- Em caso de divergência entre as imagens e o STYLE_GUIDE.md, não decida silenciosamente: informe a divergência e peça orientação.
- Não altere, renomeie ou sobrescreva as imagens originais.

Ao receber imagens:

1. Identifique a tela, estado, tema e viewport representados, quando essas informações puderem ser inferidas.
2. Observe e registre antes de implementar: estrutura, hierarquia, alinhamento, espaçamentos, dimensões relativas, cores, tipografia, bordas, sombras, ícones, imagens, estados de interação e comportamento responsivo visível.
3. Diferencie o que está claramente demonstrado do que é apenas inferência. Não invente medidas exatas quando a imagem não permite medi-las.
4. Se houver imagens de desktop e mobile, trate ambas como referências obrigatórias; não deduza o layout mobile apenas reduzindo o desktop.
5. Se houver versões light e dark, implemente ambas conforme as imagens.
6. Se faltar uma referência essencial ou houver conflito entre imagens, pergunte antes de tomar uma decisão visual relevante.
7. Não substitua o design por uma interface genérica, por um template pronto ou por preferências estéticas próprias.
8. Não gere nem substitua logos, fotos, ilustrações ou ícones sem autorização. Use os assets fornecidos; se faltar um asset, informe e proponha opções.
9. Não afirme ter analisado o Figma. Não tente acessá-lo por MCP, API ou navegador.

Antes de codificar uma tarefa de UI, apresente uma breve análise da referência visual e os pontos que serão reproduzidos. Se o aluno já tiver aprovado a análise e a tarefa, não repita perguntas desnecessárias.

## 4. Tecnologias

React + Vite + TypeScript (`strict`) · React Router · Context API + `useReducer` · hooks customizados · `localStorage` · React Hook Form + Zod · styled-components · ViaCEP · Vitest + React Testing Library · Playwright opcional · ESLint + Prettier · Git/GitHub.

Não adicione bibliotecas sem justificar a necessidade e registrar a decisão em `docs/TECH_SPEC.md`.

## 5. Processo de trabalho

- Execute uma tarefa pequena por vez, seguindo `docs/TASKS_SPEC.md`.
- Antes de implementar, apresente: objetivo, RF/RN relacionados, dependências, arquivos que pretende criar/alterar, critérios de aceite e plano de testes.
- Aguarde a validação do aluno antes de começar a implementação.
- Não implemente a aplicação inteira de uma vez.
- Explique decisões e conceitos relevantes (Context API, `useReducer`, hooks, props, TypeScript, formulários e persistência) em linguagem acessível.
- Faça alterações somente no escopo da tarefa aprovada.
- Rode os comandos de qualidade realmente disponíveis no `package.json`. Nunca declare que um comando passou sem executá-lo.
- Ao concluir, informe arquivos alterados, comportamento implementado, testes executados e resultados. Marque a tarefa como concluída e sugira um commit semântico.
- Peça ao aluno que valide o resultado antes de avançar.

## 6. Boas práticas obrigatórias

### TypeScript
- `strict: true`; não usar `any`.
- Prefira tipos explícitos e úteis. Use `unknown` com validação quando necessário.
- Tipos de domínio em `src/types/`; tipos derivados de schemas podem usar `z.infer`.

### Estado e imutabilidade
- Reducers devem ser puros e imutáveis.
- Não mutar estado ou arrays (`push`, `splice`, atribuição direta).
- Calcule valores derivados (linhas, subtotais, total de unidades e totais) em vez de duplicá-los no estado.

### Dinheiro
- Armazene e calcule valores em centavos inteiros.
- Formate para BRL somente na apresentação, com `Intl.NumberFormat`.
- A taxa de entrega deve existir em um único lugar: `DELIVERY_FEE_CENTS` em `src/utils/pricing.ts`.

### Arquitetura
- Separe dados, tipos, componentes, páginas, contextos, reducers, hooks, schemas, utilitários, estilos e testes conforme `TECH_SPEC.md`.
- Não concentre regras de negócio em `App.tsx` ou em componentes visuais.
- Componentes pequenos, com props tipadas e responsabilidades claras. Não crie abstrações desnecessárias.

### Acessibilidade e interface
- Use HTML semântico, labels associados, foco visível, navegação por teclado e mensagens de erro acessíveis.
- Use `aria-invalid`, `aria-describedby` e `aria-live` quando aplicável.
- Respeite contraste nos dois temas e alvos de toque adequados.
- Adote mobile first e valide os viewports definidos no PRD.
- Fidelidade às imagens de referência é obrigatória, sem ignorar acessibilidade.

### Persistência e dados externos
- Use as chaves versionadas definidas em `PRD_SPEC.md` e `TECH_SPEC.md`.
- Leia `localStorage` defensivamente (`try/catch` + validação).
- ViaCEP: consultar somente com 8 dígitos; cancelar requisições anteriores; tratar carregamento, CEP não encontrado, falha de rede e resposta incompleta.
- Nunca sobrescrever número e complemento informados pelo usuário ao preencher o endereço.

### Segurança e privacidade
- Não coletar dados de cartão nem simular transações reais.
- Não commitar tokens, senhas ou segredos.
- Não incluir dados pessoais reais nos exemplos ou testes.

## 7. Limites do agente

Não:
- Gere a aplicação inteira de uma só vez.
- Adicione funcionalidades fora do PRD (cupons, login, backend, múltiplas moedas etc.).
- Altere SPECs sem avisar, justificar e obter validação.
- Refatore arquivos fora da tarefa corrente.
- Use `any`, `@ts-ignore` ou `eslint-disable` como atalho.
- Tome decisões visuais relevantes sem referência ou validação.
- Diga que executou testes, analisou imagens ou consultou ferramentas quando isso não ocorreu.
- Faça alterações em lote sem explicar o escopo.

## 8. Commits

Use Conventional Commits: `feat:`, `fix:`, `docs:`, `test:`, `refactor:` ou `style:`. Uma tarefa deve gerar, em geral, um commit coerente. Mantenha o idioma das mensagens consistente no repositório.

## 9. Testes e qualidade

Toda lógica nova (reducer, pricing, schema, storage e regras de CEP) deve ter testes adequados.

Antes de concluir uma tarefa, execute, se os scripts existirem:
- `npm run lint`
- `npm run typecheck`
- `npm run test:run`
- `npm run build` quando a alteração puder afetar a compilação ou antes de marcos de entrega.

Para UI, verifique manualmente os temas e ao menos um viewport mobile pertinente. Registre limitações e testes que não puderam ser executados.

## 10. Registro do uso de IA

Documente em `docs/AI_USAGE.md` pelo menos três interações relevantes: prompt, objetivo, resumo da resposta, decisão tomada e evidência (commit, print ou teste). Registre também a ferramenta, prompt, resultado e justificativa do branding criado com IA.


## Git e versionamento

- Faça um commit ao concluir cada tarefa do TASKS_SPEC.md.
- Cada commit deve representar uma implementação funcional e validada.
- Utilize mensagens descritivas no padrão Conventional Commits.
- Não faça commits de tarefas incompletas ou com validações pendentes.
- Nunca execute git push sem autorização explícita.
- Não inclua arquivos sensíveis, credenciais ou segredos nos commits.

## 12. Checklist antes de entregar uma tarefa

- [ ] Li as SPECs e a tarefa corresponde à próxima tarefa aprovada.
- [ ] Considerei as imagens de referência pertinentes, sem presumir acesso ao Figma.
- [ ] Citei os IDs RF/RN atendidos.
- [ ] Não usei `any` nem mutação de estado.
- [ ] Valores monetários permanecem em centavos.
- [ ] Lint, typecheck, testes e build pertinentes foram executados; resultados informados.
- [ ] Acessibilidade, responsividade e temas foram verificados quando aplicável.
- [ ] Expliquei decisões, arquivos alterados e limitações.
- [ ] Sugeri commit semântico e pedi validação do aluno.
