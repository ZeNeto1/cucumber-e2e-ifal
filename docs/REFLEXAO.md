# Reflexão sobre a execução

A execução dos testes automatizados foi realizada utilizando Cucumber.js e Playwright, com Node.js 22 e navegador Chromium.

Foram executados dois cenários, totalizando 14 passos. Ambos os cenários foram aprovados, sem ocorrência de falhas, com tempo total de execução de aproximadamente 2,223 segundos.

O primeiro cenário validou o cadastro de uma tarefa com título preenchido, verificando a mensagem de sucesso, a exibição do item na lista e sua permanência após a atualização da página.

O segundo cenário validou o comportamento do sistema diante de uma tentativa de cadastro sem título, verificando a apresentação da mensagem de erro e a permanência da lista vazia.

**Resultados observados:**
- CT01 — Cadastro de tarefa válida: aprovado.
- CT02 — Impedir cadastro sem título: aprovado.
- Total: 2 cenários e 14 passos aprovados.

**Limitação identificada:** A aplicação utiliza armazenamento em memória, portanto os dados não permanecem salvos após o encerramento do servidor. Os testes validam a permanência dos dados durante a atualização da página, mas não a persistência após reiniciar a aplicação.

**Conclusão:** Os resultados demonstram que a combinação Cucumber.js e Playwright foi capaz de automatizar e validar os comportamentos definidos nos cenários. Também foi possível observar como a utilização do BDD permite descrever os testes em uma linguagem mais próxima da compreensão humana, enquanto o Playwright realiza as interações automatizadas com o navegador.