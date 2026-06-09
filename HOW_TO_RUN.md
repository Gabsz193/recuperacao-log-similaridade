# 🚀 Como Rodar o Projeto (Recuperação de Logs por Similaridade)

Este arquivo serve como contexto sobre o funcionamento e execução do projeto.

## 🏗️ Arquitetura e Portas

O projeto utiliza **Docker Compose** na raiz do repositório para orquestrar três serviços principais:

1. **Frontend (Vite / React)**:
   - **Diretório**: `./` (raiz do projeto)
   - **Porta**: `3000`
   - **Acesso**: [http://localhost:3000](http://localhost:3000)
   - **Definição no Compose**: Serviço `frontend` que builda o `Dockerfile` da raiz e expõe a porta `3000` (usando `npm run preview`).

2. **Backend (Python / Flask)**:
   - **Diretório**: `./server`
   - **Porta**: `5000`
   - **Acesso**: [http://localhost:5000](http://localhost:5000)
   - **Definição no Compose**: Serviço `api` que builda o `Dockerfile` dentro do diretório `./server`. Conecta-se ao Elasticsearch no host `http://elasticsearch:9200`.

3. **Banco de Dados / Motor de Busca (Elasticsearch)**:
   - **Imagem**: `docker.elastic.co/elasticsearch/elasticsearch:8.12.1`
   - **Porta**: `9200`
   - **Acesso**: [http://localhost:9200](http://localhost:9200)
   - **Definição no Compose**: Serviço `elasticsearch` com segurança e SSL desativados para facilidade de desenvolvimento.

---

## 🏃 Como Rodar

Para iniciar todos os serviços de forma integrada usando Docker Compose, execute o seguinte comando na raiz do projeto:

```bash
docker compose up -d
```

### Comandos Úteis de Gerenciamento

- **Parar os serviços**:
  ```bash
  docker compose down
  ```
- **Ver os logs**:
  ```bash
  docker compose logs -f
  ```
- **Reconstruir imagens após alterações**:
  ```bash
  docker compose up -d --build
  ```

---

## 💻 Modo de Desenvolvimento (Compilação Dinâmica / Hot Reloading)

Para desenvolver no frontend com hot-reloading (compilação dinâmica), você pode desligar o serviço do frontend no Docker e executá-lo diretamente no host usando o Vite Dev Server:

1. **Inicie o Backend e o Elasticsearch no Docker**:
   ```bash
   docker compose up -d
   ```

2. **Pare o contêiner do frontend do Docker**:
   ```bash
   docker compose stop frontend
   ```

3. **Instale e rode o frontend localmente**:
   ```bash
   npm install
   npm run dev
   ```

Isso disponibilizará o frontend em **http://localhost:5173** com suporte a Hot Module Replacement (HMR), consumindo a API Flask que continua ativa na porta `5000` via Docker.

