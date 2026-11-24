const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

// Cada instância tem sua própria lista de tarefas, mantida apenas em memória.
function createServer() {
  const tasks = [];
  const assets = {
    '/': ['index.html', 'text/html; charset=utf-8'],
    '/app.js': ['app.js', 'text/javascript; charset=utf-8'],
    '/style.css': ['style.css', 'text/css; charset=utf-8']
  };
  const json = (res, status, body) => {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(body));
  };
  return http.createServer(async (req, res) => {
    if (req.method === 'GET' && Object.hasOwn(assets, req.url)) {
      const [file, mime] = assets[req.url];
      res.writeHead(200, { 'Content-Type': mime });
      res.end(fs.readFileSync(path.join(__dirname, 'public', file)));
    } else if (req.method === 'GET' && req.url === '/api/tarefas') {
      json(res, 200, tasks);
    } else if (req.method === 'POST' && req.url === '/api/tarefas') {
      try {
        let body = '';
        for await (const chunk of req) body += chunk;
        const data = JSON.parse(body);
        const title = typeof data?.titulo === 'string' ? data.titulo.trim() : '';
        if (!title) return json(res, 400, { erro: 'Informe o título da tarefa.' });
        const task = { id: tasks.length + 1, titulo: title };
        tasks.push(task);
        json(res, 201, task);
      } catch {
        json(res, 400, { erro: 'Dados inválidos.' });
      }
    } else {
      json(res, 404, { erro: 'Página não encontrada.' });
    }
  });
}

function startServer(port = 0) {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once('error', reject);
    server.listen(port, '127.0.0.1', () => {
      server.removeListener('error', reject);
      resolve({ server, url: `http://127.0.0.1:${server.address().port}` });
    });
  });
}

if (require.main === module) {
  startServer(3000).then(({ url }) => console.log(`TaskLab: ${url}`)).catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}
module.exports = { startServer };
