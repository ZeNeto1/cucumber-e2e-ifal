# TaskLab — testes E2E com Cucumber.js e Playwright

IFAL — Campus Maceió | Bacharelado em Sistemas de Informação | Qualidade de Software

Projeto didático para demonstrar BDD e automação de testes de ponta a ponta em um cadastro de tarefas local. O Cucumber interpreta cenários em Gherkin; o Playwright controla o Chromium; as verificações usam `node:assert/strict`.

## Ferramentas e versões

| Ferramenta | Versão adotada |
|---|---|
| Node.js | 22.x (com npm) |
| Cucumber.js (`@cucumber/cucumber`) | 12.2.0 |
| Playwright | 1.56.1 |
| Navegador | Chromium instalado pelo Playwright |

## Instalação e execução

Pré-requisitos: Node.js 22, npm, acesso à internet para instalar dependências e navegador. Git é opcional para rodar localmente. Não há credenciais, banco de dados externo ou arquivo `.env`.

Na raiz do projeto, execute:

```bash
npm install
npx playwright install chromium
npm test
```

No Linux, se faltarem bibliotecas do sistema, use `npx playwright install --with-deps chromium`. Depois da primeira instalação, versionem o `package-lock.json` gerado; os demais integrantes podem usar `npm ci` no lugar de `npm install`.

O servidor e o navegador são iniciados e encerrados automaticamente para cada cenário. Não é necessário rodar `npm start` antes dos testes. Para abrir o sistema manualmente, use `npm start` e visite <http://127.0.0.1:3000> (Ctrl+C encerra o servidor).

Para visualizar o navegador durante o teste, no PowerShell:

```powershell
$env:BROWSER_VISIBLE = '1'
npm test
Remove-Item Env:BROWSER_VISIBLE
```

No Bash: `BROWSER_VISIBLE=1 npm test`. Para executar somente um cenário: `npm test -- --tags @principal` ou `npm test -- --tags @negativo`.

## Resumo dos cenários

| Cenário | Ação inicial e percurso | Resultado esperado |
|---|---|---|
| Fluxo principal | Abrir lista vazia, preencher título fictício, adicionar e recarregar página | Confirmação de sucesso, exatamente uma tarefa com o título e permanência após recarga. |
| Caso negativo | Abrir lista vazia, deixar o título vazio, adicionar e recarregar página | Mensagem de validação, zero tarefas e lista ainda vazia após recarga. |

O percurso cobre navegador, interface, requisições HTTP reais à API local e armazenamento em memória do servidor. Não cobre persistência após reinício, banco de dados, autenticação, concorrência, desempenho ou segurança abrangente. Cada teste usa uma instância independente do sistema; os dados são fictícios.

## Resultados e evidências

- `relatorios/cucumber.html`: relatório HTML com passos e capturas anexadas.
- `relatorios/cucumber.json`: resultado estruturado produzido pela ferramenta.
- GitHub Actions: executa os testes após push, pull request ou acionamento manual e publica os arquivos como artefato.

**Antes da entrega:** executar `npm test` ou o workflow, conferir os estados reais, registrar os resultados em `docs/REFLEXAO.md`, salvar os relatórios gerados e versioná-los. Um teste negativo aprovado significa que o sistema recusou corretamente a entrada inválida, não que o teste falhou.

## Organização

- `app/`: aplicação web local de demonstração.
- `features/tarefas.feature`: especificação dos dois cenários em português.
- `features/step_definitions/`: ligação dos passos Gherkin ao Playwright.
- `features/support/`: preparação e limpeza dos ambientes de teste.
- `docs/`: cenários, reflexão e material de apoio para o seminário.
- `relatorios/`: evidências reais de execução.

Referências: [Gherkin](https://cucumber.io/docs/gherkin/reference/), [Cucumber.js](https://github.com/cucumber/cucumber-js/tree/v12.2.0), [Playwright](https://playwright.dev/docs/library), [Cypress](https://docs.cypress.io/app/get-started/why-cypress).
