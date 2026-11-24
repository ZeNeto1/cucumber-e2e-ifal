# Cenários e escopo

**Sistema-alvo:** TaskLab, aplicação web didática local. A interface usa HTML, CSS e JavaScript; uma API Node.js recebe e consulta tarefas, armazenadas em memória enquanto o servidor permanece em execução. Não há serviços externos.

## CT01 — Fluxo principal: cadastrar e consultar uma tarefa válida

- Ação inicial: acessar a lista vazia pelo navegador.
- Percurso: preencher o título fictício `Revisar cenários E2E`, clicar em Adicionar tarefa, observar a confirmação e consultar a lista; recarregar a página.
- Resultado esperado: exibir `Tarefa cadastrada com sucesso.`, apresentar somente a tarefa informada e mantê-la após a recarga da página enquanto o servidor está ativo.
- Verificações: mensagem, título, quantidade de itens e contador, antes/depois da recarga.

## CT02 — Caso negativo: impedir o cadastro sem título

- Ação inicial: acessar uma nova lista vazia pelo navegador.
- Percurso: deixar o campo de título vazio e clicar em Adicionar tarefa; recarregar a página.
- Resultado esperado: exibir `Informe o título da tarefa.`, manter zero tarefas e continuar com a lista vazia após a recarga.
- Verificações: mensagem de validação, ausência de itens e contador zerado, antes/depois da recarga.

## Delimitação

Cucumber → definições JavaScript → Playwright → Chromium → interface web → API HTTP local → armazenamento em memória → resultado visual. O teste percorre a interação real pelo navegador; não intercepta nem simula as requisições da aplicação. As asserções são realizadas na interface, não diretamente no código da API.

Não permite afirmar que existe persistência em banco de dados, que a aplicação é segura, que suporta todos os navegadores, que tem desempenho adequado sob carga ou que outras entradas inválidas são rejeitadas. A lista de cada cenário é isolada por uma nova instância do servidor.
