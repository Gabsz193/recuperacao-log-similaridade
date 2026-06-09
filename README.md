# 🔍 Recuperação de Logs por Similaridade

> Encontre arquivos de log semelhantes a uma entrada de referência para acelerar a depuração de problemas em sistemas distribuídos.

---

## 📋 Sobre o Projeto

Este projeto implementa um sistema de **recuperação de informação baseado em similaridade** aplicado a arquivos de log. Dado um log de referência (uma linha ou trecho), o sistema busca nos arquivos indexados aqueles cujo conteúdo é mais similar, ranqueando os resultados por relevância.

O objetivo é auxiliar engenheiros e desenvolvedores a identificar rapidamente **onde um determinado tipo de evento já ocorreu** em sistemas que geram grandes volumes de logs, acelerando o processo de depuração.

---

## 🏗️ Arquitetura

```
┌─────────────────┐     HTTP      ┌─────────────────┐     REST API    ┌──────────────────────┐
│                 │  ──────────►  │                 │  ────────────►  │                      │
│   React (Vite)  │               │  Express (API)  │                 │   Elasticsearch 8.x  │
│   Frontend      │  ◄──────────  │   porta 3001    │  ◄────────────  │   porta 9200         │
│                 │   JSON        │                 │    BM25 nativo  │                      │
└─────────────────┘               └─────────────────┘                 └──────────────────────┘
```

### Por que essa arquitetura?

A versão inicial do projeto implementava o algoritmo BM25 diretamente no browser (JavaScript puro). Essa abordagem tem limitações claras: o índice é perdido ao fechar a aba, fica limitado à RAM do navegador e não escala para grandes volumes. A migração para Elasticsearch resolve todos esses problemas:

| Critério | BM25 no browser | Elasticsearch |
|---|---|---|
| Persistência do índice | ❌ Perdido ao fechar | ✅ Permanente em disco |
| Volume suportado | ~MBs (RAM do browser) | Bilhões de documentos |
| Velocidade | Linear (JS) | Índice invertido otimizado |
| Highlight de trechos | Manual (regex) | Nativo |
| Normalização de logs | Regex manual | `char_filter` configurável |

---

## 🧠 Como o BM25 Funciona Aqui

O **BM25 (Best Match 25)** é o algoritmo de ranking padrão do Elasticsearch. Ele calcula a relevância de cada documento para uma query combinando:

- **TF (Term Frequency)** — quantas vezes o termo aparece no arquivo, com saturação (mais ocorrências ajudam, mas com retorno decrescente)
- **IDF (Inverse Document Frequency)** — penaliza termos muito comuns entre todos os arquivos
- **Normalização por tamanho** — arquivos maiores não ganham vantagem injusta

Antes da indexação, um **`log_analyzer` customizado** normaliza o conteúdo via `char_filter`, removendo variáveis que não carregam significado semântico:

```
192.168.1.10  →  (removido)
07:32:51      →  (removido)  
sshd[5506]    →  sshd
port 22       →  (removido)
```

Isso garante que dois logs como:
```
Failed password for root from 192.168.1.1 port 22 ssh2
Failed password for root from 10.0.0.5 port 2222 ssh2
```
sejam tratados como semanticamente idênticos.

---

## 🚀 Como Rodar

### Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop) ou Docker Engine instalado e rodando

### Execução via Docker Compose

Para compilar e iniciar todos os serviços da aplicação de forma integrada (Elasticsearch, API em Python/Flask e Frontend em React/Vite), basta executar o comando a seguir no diretório raiz do projeto:

```bash
docker-compose up --build -d
```

Após a inicialização bem-sucedida de todos os contêineres:
- **Interface Web (Frontend):** Disponível em [http://localhost:3000](http://localhost:3000)
- **Serviço de API (Backend):** Disponível em [http://localhost:5000](http://localhost:5000)
- **Elasticsearch:** Disponível em [http://localhost:9200](http://localhost:9200)

---

## 📦 Importação dos Documentos (Dataset)

A aplicação suporta a importação automática em lote dos 69 pares de issues/logs estruturados a partir da pasta `pares_logs_issues`. Há duas maneiras de realizar esta importação:

### Opção A: Pela Interface Gráfica (Recomendado)
1. Acesse o Frontend em `http://localhost:3000`.
2. No canto superior direito, clique no botão **"Importar em Lote"**.
3. O sistema varrerá os diretórios, indexará os pares no Elasticsearch e atualizará o contador de documentos na tela.

### Opção B: Via Terminal (Curl)
Você também pode disparar a indexação em lote chamando diretamente a rota da API pelo terminal:
```bash
curl -X POST http://localhost:5000/logs/import
```

---

## 📡 Endpoints da API

### `GET /logs/health`
Retorna o status do cluster Elasticsearch e o total de documentos indexados.

```json
{ "status": "green", "documents": 69 }
```

---

### `POST /logs/upload`
Indexa um par de documentos (evento e log correspondente). Aceita `multipart/form-data`.

**Campos:**
- `event_file`: Arquivo de issue/evento (`.md` ou `.txt`)
- `log_file`: Arquivo de log correspondente (`.log` ou `.txt`)
- `app_name` (opcional): Nome da aplicação correspondente
- `pair_id` (opcional): Identificador único do par

---

### `GET /logs/files`
Lista todos os pares de logs e eventos atualmente indexados no Elasticsearch.

---

### `POST /logs/search`
Busca arquivos similares usando o algoritmo BM25 no Elasticsearch.

**Body:**
```json
{
  "query": "app crashes opening settings screen",
  "search_type": "event",
  "size": 10
}
```

---

### `POST /logs/import`
Realiza a varredura recursiva de diretórios sob `pares_logs_issues/out` e indexa todos os pares no Elasticsearch.

---

### `GET /logs/metrics`
Calcula as métricas de MRR e nDCG@5 a partir do gabarito XLSX para as quatro estratégias de busca implementadas.

---

### `DELETE /logs/files/:id`
Remove um par do índice pelo seu ID de documento.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Frontend | React 19 + Vite |
| Backend | Python 3 + Flask |
| Motor de busca | Elasticsearch 8.12 |
| Containerização | Docker + Docker Compose |
| Algoritmo de ranking | BM25 (nativo do Elasticsearch) |
| Bibliotecas Auxiliares | openpyxl (leitura de planilhas de métricas), react-icons (interface minimalista) |
---

## 📄 Licença

Este projeto é desenvolvido para fins acadêmicos na **Universidade Federal do Amazonas (UFAM)** — disciplina de Recuperação de Informações.
