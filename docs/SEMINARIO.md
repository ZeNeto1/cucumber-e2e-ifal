# Seminário — roteiro e material de apoio (15 minutos)

## 1. Contexto e escopo — integrante 1 (3 min)

- Teste E2E: percurso da ação do usuário até o resultado observável.
- Sistema TaskLab: cadastro e consulta de tarefas locais com dados fictícios.
- Dois cenários: fluxo principal e caso negativo.
- Diagrama: Gherkin → Cucumber → passos JavaScript → Playwright → Chromium → interface/API → resultado na tela.
- Escopo: navegador, interface, API e memória; não há banco de dados nem avaliação geral de segurança.

## 2. Ferramenta e implementação — integrante 2 (4 min)

- BDD (Behavior-Driven Development): colaboração e descrição de comportamentos esperados; não é apenas automação.
- Gherkin: Funcionalidade, Cenário, Dado, Quando, Então, E.
- Mostrar `features/tarefas.feature` e uma definição em `tarefas.steps.js`.
- Explicar `Before`/`After`: preparação, isolamento, captura e limpeza.
- Mostrar `npm install`, `npx playwright install chromium` e `npm test`.

## 3. Demonstração e interpretação — integrante 3 (4 min)

- Executar o cenário principal com navegador visível; se possível, rodar ambos.
- Abrir `relatorios/cucumber.html` e explicar estados e passos reais.
- Um cenário negativo aprovado significa que a validação ocorreu como esperado.
- Mostrar o registro do grupo, a dificuldade realmente observada e a solução.
- Se houver impedimento, usar relatório ou vídeo de execução anterior, identificando que não é ao vivo.

## 4. Comparação e conclusão — integrante 4 (4 min)

Comparação entre a combinação Cucumber.js + Playwright e o Cypress App (sem integração BDD adicional). Base documental; não houve execução do Cypress neste projeto.

| Critério | Cucumber.js + Playwright | Cypress App |
|---|---|---|
| Linguagem | Gherkin para especificações e JS/TS para passos | JS/TS para testes, com comandos Cypress |
| Configuração | Configurar runner, steps, hooks e navegador | Runner e comandos integrados, configuração própria do Cypress |
| Navegadores | Chromium, Firefox e WebKit via Playwright; aqui só Chromium | Navegadores Chromium e Firefox; suporte WebKit experimental, conforme documentação |
| Depuração | Inspector do Playwright; capturas por hooks; relatório HTML Cucumber | Interface interativa, histórico de comandos e snapshots; capturas e relatórios |
| Adequação | Equipes que valorizam especificações legíveis e colaboração BDD | Equipes que preferem testes web escritos diretamente em código e runner integrado |

Conclusão proposta: ambas podem automatizar os percursos do TaskLab; Cucumber + Playwright separa a descrição comportamental da execução, mas exige código de ligação e manutenção dos passos. Cypress pode ser adequado quando se prioriza a experiência integrada do runner. Relacionar a conclusão aos resultados reais, sem alegar comparação de velocidade ou estabilidade não medida.

## Perguntas para os quatro integrantes revisarem

1. Por que Cucumber não substitui Playwright? Porque descreve/interpreta cenários e executa definições, enquanto Playwright realiza a automação no navegador.
2. Por que o teste negativo pode passar? Porque o objetivo é verificar se uma entrada inválida é rejeitada.
3. Por que não é possível concluir que existe persistência em banco? O armazenamento é em memória; a recarga não reinicia o servidor.
4. O que acontece quando o texto de um passo não corresponde a nenhuma definição? O Cucumber sinaliza passo indefinido; a execução não comprova o comportamento.

## Referências documentais

- Cucumber — Gherkin: https://cucumber.io/docs/gherkin/reference/
- Cucumber — palavras-chave em português: https://cucumber.io/docs/gherkin/languages/
- Cucumber.js v12.2.0 — documentação: https://github.com/cucumber/cucumber-js/tree/v12.2.0/docs
- Cucumber.js — relatórios: https://github.com/cucumber/cucumber-js/blob/v12.2.0/docs/formatters.md
- Playwright — biblioteca: https://playwright.dev/docs/library
- Playwright — navegadores: https://playwright.dev/docs/browsers
- Playwright — depuração: https://playwright.dev/docs/debug
- Cypress — visão geral: https://docs.cypress.io/app/get-started/why-cypress
- Cypress — navegadores: https://docs.cypress.io/app/references/launching-browsers
- Cypress — relatórios: https://docs.cypress.io/app/tooling/reporters
- Cypress — modo interativo: https://docs.cypress.io/app/get-started/open-the-app
