<h1>📡 Email Automation Orchestrator </h1>

O Email Automation Orchestrator é um microserviço backend projetado para monitorar contas de e-mail, validar estados operacionais, executar rotinas automáticas e expor endpoints internos para controle manual.
Ele simula processos utilizados em plataformas de infraestrutura B2B voltadas para entregabilidade, automações e integração de APIs.

<h2>📌 Objetivos do Projeto</h2>

Monitorar periodicamente o status de contas de e-mail.

Integrar com uma API externa fake (JSON Server).

Gravar e atualizar dados localmente em SQLite.

Acionar automações internas com base em regras de negócio.

Registrar logs operacionais.

Disponibilizar endpoints REST para ações manuais.

<h2>🛠 Tecnologias Utilizadas</h2>

Node.js 18+

Express

Axios

SQLite3

node-cron

Winston

dotenv

JSON Server

Cors

<h2>📂 Estrutura do Projeto</h2>

ORQUESTRADOR-EMAILS
|
+-- automacoes
|   +-- alertas.js
|   +-- pausaSeguranca.js
|   +-- validarDominio.js
|
+-- banco
|   +-- conexao.js
|
+-- logs
|   +-- app.log
|
+-- monitores
|   +-- monitorContas.js
|
+-- rotas
|   +-- contas.js
|
+-- scheduler
|   +-- cron.js
|
+-- .env
+-- .gitignore
+-- db.json
+-- package.json
+-- package-lock.json
+-- README.md
+-- servidor.js


<h2>🗄 Banco de Dados (SQLite)</h2>

O sistema utiliza SQLite como armazenamento local.

Estrutura da tabela:
accounts (
  id INTEGER PRIMARY KEY,
  domain TEXT,
  status TEXT,
  reputation INTEGER,
  last_update TEXT
)


Essa tabela recebe atualizações automáticas e manuais.

<h2>🌐 API Fake (JSON Server)</h2>

O arquivo db.json simula o comportamento de uma API externa usada pelo orquestrador.

Executar a API fake:
json-server --watch db.json --port 3001


Rotas simuladas:

GET /accounts

GET /accounts/:id

<h2>🔍 Monitoramento Automático</h2>

O módulo monitorContas.js executa:

Consulta à API externa

Validação de domínio

Avaliação de reputação

Detecção de limites operacionais

Atualização do banco SQLite

Acionamento de automações internas

Registro de logs

<h2>⚙️ Automações</h2>

As automações estão em /automacoes:

validarDominio.js

Revalida o domínio quando está inválido.

pausaSeguranca.js

Ativa cooldown quando a reputação está baixa.

alertas.js

Gera alertas quando limites operacionais estão próximos.

<h2>🚀 API Interna (Express)</h2>

As rotas internas estão em /rotas/contas.js.

GET /accounts

Retorna todas as contas armazenadas no banco.

POST /accounts/:id/validate

Aciona a rotina de validação manual.

POST /accounts/:id/cooldown

Executa manualmente a pausa de segurança.

<h2>⏱ Scheduler (node-cron)</h2>

O arquivo /scheduler/cron.js executa:

Monitoramento automático a cada 2 minutos

Logs de execução

Tratamento de falhas

Integração direta com monitorContas.js

<h2>🧩 Arquitetura do Sistema</h2>

Fluxo principal:

Cron executa o monitoramento.

Monitor consulta a API fake.

Regras internas avaliam o estado da conta.

Automações são acionadas quando necessário.

Dados são registrados no SQLite.

Logs são gerados continuamente.

API interna permite controle manual.

<h2>▶ Como Rodar o Projeto</h2>
# 1. Instalar dependências:
npm install

# 2. Iniciar API externa:
json-server --watch db.json --port 3001

# 3. Iniciar servidor principal:
node servidor.js

# 4. Testar rotas no navegador ou Postman:
GET http://localhost:3000/accounts
POST http://localhost:3000/accounts/1/validate
POST http://localhost:3000/accounts/1/cooldown

<h2>📊 Logs</h2>

Os logs são armazenados em:

Console

Arquivo /logs/app.log

Eles registram erros, eventos e automações acionadas.

<h2>🛣 Próximas Evoluções</h2>

Dockerfile + docker-compose

Autenticação JWT

Health-check e métricas

Testes automatizados (Jest)

Dashboard de visualização

🤝 Contribuição


