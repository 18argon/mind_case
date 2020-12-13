# Crud para o processo seletivo da Mind Consulting

O projeto é composto de um backend desenvolvido usando Node.js, Express.js, e MongoDB.
O frontend foi desenvolvido usando o framework React.

## Requisítos
-   Node 14 LTS
-   MongoDB
-   npm

## Instruções para rodar
 

### Backend
Copiar a pasta `uploads` em dump para `backend` e importar o dump do banco para a sua base de dados.

Na pasta backend, criar o arquivo .env que siga o seguinte exemplo.
``` dotenv
PORT=3000
MONGODB_URI=mongodb://root:root@localhost:27017/mind-crud?authSource=admin
DEBUG=false
JWT_ACCESS_SECRET=access_secret
JWT_REFRESH_SECRET=refresh_secret
```

Após rodar os seguintes comandos.
``` bash
$ npm ci
$ npm start
```

### Frontend
Nas pasta frontend, criar o arquivo .env com o conteúdo.
``` dotenv
REACT_APP_BACKEND_URL=http://localhost:3000
PORT=8080
```
Onde REACT_APP_BACKEND_URL é a URL para acessar o backend.
Em seguida rodar os seguintes comando.
``` bash
$ npm ci
$ npm start
```

Após executado os comando o site pode ser acessado em `http://localhost:8080`
se usar o mesmo arquivo de configuração.

O sistema pode ser acessado com usuário admin "admin@email.com", com senha "senha".
Ou criado um novo usuário.
