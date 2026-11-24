# PRD_SPEC — Product Requirements Document

> **Projeto Final 05 — Coffee Delivery (React + TypeScript + IA)**
> Disciplina: Single Page Application (SPA)
> Versão: 1.1 · Status: base para validação do aluno · Documento vivo.

Documentos relacionados: `TECH_SPEC.md`, `TASKS_SPEC.md`, `STYLE_GUIDE.md` e `../AGENTS.md`.

## 1. Visão geral

### 1.1 Produto
Coffee Delivery é uma SPA de e-commerce de cafeteria. O cliente consulta um catálogo de cafés, escolhe quantidades, monta um carrinho, informa endereço de entrega, seleciona uma forma de pagamento fictícia e recebe a confirmação de um pedido simulado.

Não haverá backend, autenticação, banco de dados ou pagamento real.

### 1.2 Objetivos
**Produto**
- Permitir concluir o fluxo Home → Checkout → Confirmação em desktop e celular.
- Exibir subtotal, entrega e total de forma consistente.
- Preservar carrinho e tema após atualizar a página.
- Ter identidade visual própria, com versões light e dark.

**Aprendizagem**
- Planejar antes de implementar.
- Modelar estado com Context API, `useReducer` e imutabilidade.
- Construir uma SPA com React Router, formulários, validação e persistência local.
- Usar IA criticamente, testar, versionar e conseguir explicar o código.

### 1.3 Público
- Cliente fictício: pessoa que deseja consultar cafés e concluir um pedido de forma simples.
- Avaliador: verifica funcionamento, qualidade do código, documentação, testes e uso de IA.

## 2. Escopo

### 2.1 Dentro do escopo
- Catálogo local com imagem, nome, descrição, preço e tags.
- Seleção de quantidade e adição ao carrinho.
- Contador de unidades no Header.
- Carrinho editável e persistido em `localStorage`.
- Checkout com endereço consultado via ViaCEP, pagamento fictício e resumo de valores.
- Tela de sucesso com snapshot do pedido.
- Tema claro/escuro persistido.
- Interface responsiva.
- Logo original criada com auxílio de IA, integrada ao Header e favicon.
- Testes da lógica e dos fluxos principais.

### 2.2 Fora do escopo
Backend, API própria, banco de dados, autenticação, contas, histórico multiusuário, pagamento real, gateway, cupons, frete por distância, painel administrativo, internacionalização, múltiplas moedas, rastreamento, notificações e chatbot dentro da aplicação.

## 3. Referências visuais

**Não há dependência de Figma nem de MCP do Figma.** As imagens enviadas pelo aluno e a transcrição do Design System são as fontes visuais oficiais para a implementação.

O agente deve consultar `STYLE_GUIDE.md` antes de implementar componentes ou estilos. Esse documento contém a paleta HEX, tipografia, estados dos componentes, ícones e diretrizes para imagens. As imagens de referência enviadas pelo aluno continuam sendo a fonte para layout, proporções, espaçamentos e detalhes visuais não descritos no texto.

O agente deve reproduzir o que estiver demonstrado e distinguir observações de inferências. Não deve inventar detalhes ausentes nem substituir a referência por um template genérico. Se faltar uma referência necessária para uma decisão visual importante, deve perguntar ou apresentar uma proposta para aprovação.

## 4. Fluxos

### 4.1 Fluxo principal
`Home (/) → Checkout (/checkout) → Confirmação (/success)`

- Home: apresenta catálogo, permite ajustar quantidade e adicionar cafés.
- Checkout: permite editar itens, consultar CEP, completar número/complemento, selecionar pagamento e revisar valores.
- Confirmação: salva snapshot do pedido, limpa o carrinho e apresenta os dados confirmados.

### 4.2 Fluxos alternativos
| Situação | Comportamento |
|---|---|
| Carrinho vazio em `/checkout` | Mostrar estado vazio e link para Home; impedir confirmação. |
| CEP inválido | Mostrar erro e não chamar a API. |
| CEP não encontrado | Informar e permitir preenchimento manual. |
| Falha da API | Informar falha e permitir tentar novamente ou preencher manualmente. |
| Formulário inválido | Impedir confirmação, anunciar erros e focar o primeiro campo inválido. |
| `/success` sem pedido válido | Mostrar estado vazio e link para Home. |
| Refresh | Recuperar carrinho e tema do `localStorage`. |

## 5. Requisitos funcionais

Cada requisito possui critério verificável.

| ID | Requisito | Critério de aceite | Verificação |
|---|---|---|---|
| RF-01 | Exibir catálogo | Todos os cafés apresentam imagem, nome, descrição, preço e tag; sem imagem quebrada. | Manual/Teste |
| RF-02 | Selecionar quantidade | Quantidade inteira entre 1 e 99; controles funcionam e valores inválidos são rejeitados/corrigidos. | Teste |
| RF-03 | Adicionar ao carrinho | Adicionar produto repetido soma à linha existente. | Teste |
| RF-04 | Contador no Header | Contador soma unidades, não tipos de produto. | Teste |
| RF-05 | Editar carrinho | Aumentar, diminuir e remover atualiza quantidades e totais. | Teste |
| RF-06 | Persistir carrinho | Refresh recupera itens; dados inválidos não quebram a aplicação. | Teste/Manual |
| RF-07 | Navegar por rotas | `/`, `/checkout` e `/success` navegam sem recarregamento completo. | Manual/Teste |
| RF-08 | Endereço e CEP | CEP válido preenche rua, bairro, cidade e UF; número e complemento são manuais; erros são tratados. | Teste/Manual |
| RF-09 | Forma de pagamento | Exigir exatamente uma opção: crédito, débito ou dinheiro. | Teste |
| RF-10 | Exibir valores | Subtotal, entrega e total são calculados corretamente em centavos. | Teste |
| RF-11 | Bloquear confirmação inválida | Não confirmar com carrinho vazio ou formulário inválido; feedback acessível. | Teste/Manual |
| RF-12 | Confirmar pedido fictício | Sucesso exibe resumo correspondente ao checkout. | Teste/Manual |
| RF-13 | Limpar carrinho | Após confirmação, carrinho zera sem perder o snapshot do pedido. | Teste |
| RF-14 | Tema claro/escuro | Alternância global, persistência e fallback para preferência do sistema. | Teste/Manual |
| RF-15 | Responsividade | Fluxo utilizável em 320, 375/390, 768 e 1280/1440 px, sem rolagem horizontal involuntária. | Manual |
| RF-16 | Logo com IA | Logo aplicada no Header e favicon; processo documentado. | Manual |

## 6. Regras de negócio

| ID | Regra | Definição |
|---|---|---|
| RN-01 | Quantidade | Mínimo 1 e máximo 99. No carrinho, diminuir de 1 é bloqueado; remoção ocorre pelo botão Remover. |
| RN-02 | Produto único | Um único registro por `coffeeId`; adicionar novamente soma a quantidade, limitada a 99. |
| RN-03 | Frete | Taxa fictícia fixa de R$ 3,50; zero quando o carrinho está vazio; definida somente em `pricing.ts`. |
| RN-04 | Dinheiro | Valores internos em centavos inteiros; BRL formatado apenas na interface. |
| RN-05 | Pagamento | Crédito, débito ou dinheiro; informativo, sem transação e sem coleta de cartão. |
| RN-06 | Persistência | Carrinho e último pedido são armazenados separadamente. Pedido concluído é snapshot independente. |
| RN-07 | CEP | ViaCEP; preencher logradouro, bairro, cidade e UF; número e complemento permanecem manuais. Tratar loading, inválido, não encontrado, falha e resposta incompleta. |
| RN-08 | Dados | Catálogo local tipado; ViaCEP é a única API externa funcional prevista. |
| RN-09 | Estados vazios | Estado vazio no checkout e em sucesso quando não houver pedido válido. |
| RN-10 | Integridade | Só confirmar com ao menos um item válido, formulário válido e pagamento selecionado. Itens desconhecidos são descartados na hidratação. |

## 7. Requisitos não funcionais

### 7.1 Acessibilidade
- HTML semântico, navegação por teclado e foco visível.
- Labels associados; erros ligados aos campos com `aria-describedby` e `aria-invalid`.
- Mensagens anunciadas com `aria-live`/`role="alert"` quando apropriado.
- Botões de ícone com nome acessível.
- Contraste mínimo de referência: 4,5:1 para texto e 3:1 para componentes/estados.
- Não depender apenas de cor; imagens com `alt` adequado.
- Alvos de toque de aproximadamente 44 × 44 px.

### 7.2 Responsividade
Testar 320, 375/390, 768 e 1280/1440 px. Não deformar imagens, sobrepor conteúdo ou introduzir rolagem horizontal involuntária. O layout mobile deve seguir as referências mobile fornecidas, não ser presumido como mera redução do desktop.

### 7.3 Desempenho e robustez
- Imagens otimizadas, dimensões definidas e carregamento lazy quando apropriado.
- Consulta de CEP somente com oito dígitos; cancelar requisições anteriores.
- Leitura defensiva de `localStorage`.
- Code splitting apenas se houver benefício real.
- Meta orientativa: Lighthouse ≥ 90 em Performance e Acessibilidade, sem sacrificar fidelidade visual ou funcionalidade.

### 7.4 Compatibilidade e qualidade
Últimas duas versões de Chrome, Edge, Firefox e Safari, quando possível. TypeScript `strict`, lint sem erros relevantes, testes passando e commits semânticos.

## 8. Branding e temas

- Criar uma proposta original de logo com ferramenta de IA.
- Registrar ferramenta, prompt, resultado e motivo da escolha.
- **Adotar a paleta e a tipografia documentadas em `STYLE_GUIDE.md` como referência oficial**: amarelo e roxo, Baloo 2 para títulos e Roboto para textos.
- Não substituir os HEX definidos no Style Guide por tonalidades aproximadas ou escolhidas livremente.
- Integrar logo no Header e favicon.
- Verificar legibilidade em tamanho pequeno e termos de uso da ferramenta.
- Tema claro/escuro deve afetar todas as telas e componentes, não apenas o fundo. A paleta fornecida descreve a referência clara; não reutilizar automaticamente as cores claras como paleta dark.
- Se não houver imagem de referência dark suficiente, propor tokens dark para aprovação antes de definir os valores finais.
- Sem preferência salva, usar `prefers-color-scheme`.

## 9. Critérios gerais de aceite

- [ ] RF-01 a RF-16 atendidos.
- [ ] RN-01 a RN-10 respeitadas.
- [ ] Fluxo completo funciona em desktop e mobile.
- [ ] Temas claro e escuro funcionam e persistem.
- [ ] Carrinho persiste; `/success` sem pedido apresenta estado vazio.
- [ ] Sem erros de TypeScript; lint e testes executados.
- [ ] Aplicação publicada e repositório com histórico de commits.
- [ ] SPECs atualizadas; pelo menos três interações de IA registradas em `docs/AI_USAGE.md`.
- [ ] Branding com IA documentado.
- [ ] Aluno consegue explicar o fluxo de estado e as principais decisões.

## 10. Decisões de produto

| ID | Decisão | Motivo |
|---|---|---|
| D-01 | Frete fixo de R$ 3,50 | Simplicidade e previsibilidade. |
| D-02 | Decremento bloqueado em 1 | Evitar remoção acidental; botão Remover é explícito. |
| D-03 | Máximo 99 unidades por café | Limite previsível. |
| D-04 | Valores em centavos | Evitar erros de ponto flutuante. |
| D-05 | ViaCEP | API pública sem chave para consulta de CEP. |
| D-06 | Snapshot do último pedido | Independência em relação ao carrinho limpo. |
| D-07 | styled-components | Escolha alinhada ao escopo técnico do projeto. |
| D-08 | Tema inicial segue sistema | Respeitar preferência do dispositivo. |
| D-09 | Imagens fornecidas pelo aluno são a referência visual | Não há MCP nem dependência do Figma. |
