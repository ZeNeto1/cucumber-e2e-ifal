const form = document.querySelector('#task-form');
const input = document.querySelector('#title');
const button = form.querySelector('button');
const error = document.querySelector('#error');
const success = document.querySelector('#success');
const list = document.querySelector('#tasks');
const empty = document.querySelector('#empty');
const count = document.querySelector('#count');

function show(element, message) {
  element.textContent = message;
  element.hidden = !message;
}
async function loadTasks() {
  const response = await fetch('/api/tarefas');
  if (!response.ok) throw new Error('Não foi possível consultar as tarefas.');
  const tasks = await response.json();
  list.replaceChildren(...tasks.map(task => {
    const item = document.createElement('li');
    item.textContent = task.titulo;
    return item;
  }));
  empty.hidden = tasks.length !== 0;
  count.textContent = `${tasks.length} ${tasks.length === 1 ? 'tarefa' : 'tarefas'}`;
}
form.addEventListener('submit', async event => {
  event.preventDefault();
  show(error, '');
  show(success, '');
  button.disabled = true;
  try {
    const response = await fetch('/api/tarefas', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo: input.value })
    });
    const data = await response.json();
    if (!response.ok) {
      show(error, data.erro);
      return;
    }
    input.value = '';
    await loadTasks();
    show(success, 'Tarefa cadastrada com sucesso.');
  } catch {
    show(error, 'Não foi possível cadastrar a tarefa.');
  } finally {
    button.disabled = false;
  }
});
loadTasks().catch(errorDetail => show(error, errorDetail.message));
