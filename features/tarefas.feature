# language: pt
Funcionalidade: Cadastro de tarefas
  Como usuário da lista de tarefas
  Quero cadastrar e consultar minhas tarefas
  Para organizar minhas atividades

  @principal
  Cenário: Cadastrar e consultar uma tarefa válida
    Dado que acesso a lista de tarefas vazia
    Quando informo o título "Revisar cenários E2E"
    E clico em adicionar tarefa
    Então vejo a mensagem de sucesso "Tarefa cadastrada com sucesso."
    E a lista contém apenas a tarefa "Revisar cenários E2E"
    Quando recarrego a página
    Então a lista contém apenas a tarefa "Revisar cenários E2E"

  @negativo
  Cenário: Impedir o cadastro de uma tarefa sem título
    Dado que acesso a lista de tarefas vazia
    Quando deixo o título em branco
    E clico em adicionar tarefa
    Então vejo a mensagem de erro "Informe o título da tarefa."
    E a lista permanece vazia
    Quando recarrego a página
    Então a lista permanece vazia
