## Teste Neoway

Teste técnico para o processo seletivo de Analista Desenvolvimento para FullStack

## Objetivo

Desenvolver uma aplicação de validação de CPF/CNPJ que deve conter uma interface (UI) para gerenciamento de CPF/CNPJ (CRUD) com a possibilidade filtros, ordenação e marcação de alguns em uma blacklist.

## Tecnologias

- Typescript
- Node.js
- React.js
- MongoDB

## Instruções

- Clonar este repositório

#### Instalação do MongoDB

1. Instalar o Docker
2. Executar comando no cmd "sudo docker pull mongo"
3. Criar um container executando o comando "docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:latest"
4. Abrir bash do mongo "docker exec -it mongodb bash"
5. Executar "mongo"
6. Executar comando "db.setProfilingLevel(2)" para configurar o banco para gravar Logs.

#### Instalando o backend

1. Configurar arquivo .env na pasta /backend (padrão: localhost:8080, banco: localhost:27017/teste)
2. Executar "npm run dev" na pasta /backend

#### Instalando o frontend

1. Configurar arquivo .env na pasta /frontend de acordo com o endereço do backend (padrão: localhost:8080)
2. Executar o comando "npm run build"
3. Instalar o pacote serve "npm install -g serve"
4. Executar o comando "serve -s build -l PORTA" substituindo PORTA pela porta desejada (padrão: 5000)

## Acesso

basta acessar a URL inserida e a porta (padrão: http://localhost:5000)
