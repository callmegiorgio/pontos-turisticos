# Sobre

Este repositório contém uma mini-aplicação web que lista pontos turísticos
cadastrados pelo usuário. O repositório está dividido em duas pastas, `client`,
que contém o código do front-end da aplicação, desenvolvido com React, e `server`,
que contém o código do back-end da aplicação, desenvolvido com Express.js e SQLite.

# Requisitos

A aplicação utiliza Node.js e npm, então é preciso tê-los instalados para continuar.
Para baixar o Node.js, visite https://nodejs.org/.

Durante o desenvolvimento, foram utilizados Node.js e npm nas versões 18.10 e 8.19,
respectivamente.

# Instalação

Para instalar as dependências da aplicação, vá para os diretórios `client` e `server`
e execute `npm install`:

```sh
> cd client
> npm install
> cd ../server
> npm install
```

# Uso

## Cliente

Para compilar a aplicação web, vá para o diretório `client` e defina a variável
de ambiente `VITE_SERVER_URL` para o endereço do servidor. Isso pode ser feito
criando um arquivo `.env` no diretório raiz do cliente:

```sh
VITE_SERVER_URL=http://localhost:8000
```

Em seguida, execute `npm run build`:

```sh
> npm run build
```

Após o procedimento, a aplicação estará disponível no diretório `dist`. Use `npm run preview`
para rodar um servidor que servirá a aplicação compilada.

Alternativamente, pode-se rodar a aplicação em modo de desenvolvimento:

```sh
> npm run dev
```

Em ambos os casos, o website ficará disponível localmente num endereço informado no terminal
(e.g. "http://localhost:5173/").

## Servidor

O procedimento é semelhante para o servidor, exceto que este se encontra no diretório
`server` e é executado com o comando `npm run start`:

```sh
> cd server
> npm run start
```

Isso fará o servidor rodar na porta padrão 8000 (http://localhost:8000/). O servidor
também pode rodar em modo de desenvolvimento com `npm run dev`, e recebe as seguintes
variáveis de ambiente:
- `PORT`, define a porta na qual o servidor ouvirá por conexões.
- `DB_TYPE`, define o tipo de banco de dados usado. Valores aceitáveis são `sqlite`
   e `mssql`.
- `DB_CONN`, define a conexão com o banco de dados. Se `DB_TYPE` for `sqlite`, 
  `DB_CONN` pode ser `:memory:` para abrir um banco de dados na memória ou o caminho
  de um arquivo SQLite. Se `DB_TYPE` for `mssql`, `DB_CONN` é uma string de conexão
  SQL Server cujo formato é definido [aqui][mssql-connection-string].

Por exemplo, para configurar o servidor para usar SQL Server com a Autenticação do Windows,
crie o seguinte arquivo `.env`:

```sh
DB_TYPE=mssql
DB_CONN="Driver={SQL Server Native Client 11.0};Server=<NomeServidor>;Database=<NomeBanco>;Trusted_Connection=yes;"
```

onde `<NomeServidor>` é um nome tal como `WINDOWS-PC\SQLEXPRESS` e `<NomeBanco>` é o nome
do banco de dados utilizado.

Para configurar o servidor para utilizar o SQL Server com credenciais de usuário, defina
os parametros `Uid` e `Pwd`, e remova `Trusted_Connection=yes`:

```sh
DB_TYPE=mssql
DB_CONN="Driver={SQL Server Native Client 11.0};Server=<NomeServidor>;Database=<NomeBanco>;Uid=<Usuario>;Pwd=<Senha>"
```

  [mssql-connection-string]: <https://learn.microsoft.com/en-us/dotnet/api/system.data.odbc.odbcconnection.connectionstring?view=dotnet-plat-ext-5.0>