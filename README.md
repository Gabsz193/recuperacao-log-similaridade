# 🔍 Recuperação de Logs por Similaridade

## 📋 Sobre o Projeto

Este projeto implementa um sistema de **recuperação de informação baseado em similaridade** aplicado a arquivos de log. Dado um log de referência (uma linha ou trecho), o sistema busca nos arquivos indexados aqueles cujo conteúdo é mais similar, ranqueando os resultados por relevância.

O objetivo é auxiliar engenheiros e desenvolvedores a identificar rapidamente **onde um determinado tipo de evento já ocorreu** em sistemas que geram grandes volumes de logs, acelerando o processo de depuração.

## 🏗️ Arquitetura

## 🧠 Como o BM25 Funciona Aqui

O **BM25 (Best Match 25)** é o algoritmo de ranking padrão do Elasticsearch. Ele calcula a relevância de cada documento para uma query combinando:

- **TF (Term Frequency)** — quantas vezes o termo aparece no arquivo, com saturação (mais ocorrências ajudam, mas com retorno decrescente)
- **IDF (Inverse Document Frequency)** — penaliza termos muito comuns entre todos os arquivos
- **Normalização por tamanho** — arquivos maiores não ganham vantagem injusta

## 📋 Arquivos e Requisitos do Sistema

Para executar o projeto localmente ou via contêineres, certifique-se de que os seguintes arquivos e pastas estejam na raiz do repositório:

1. **`julgamento_relevancia_40_queries.xlsx`**: Planilha contendo o gabarito das buscas e os julgamentos de relevância (qrels) de 1 a 5 para as 40 queries experimentais. Usado no cálculo automatizado de MRR e nDCG@5.
2. **Diretório `pares_logs_issues/`**: Contendo a pasta `out/` com os subdiretórios de cada aplicação (ex: `OmniNotes`, `ActivityDiary`). Cada pasta de aplicação deve conter os arquivos de texto de eventos (`issue_<id>.md`) e seus respectivos logs correspondentes (`log_<id>.log`).
3. **`docker-compose.yml`**: Configuração dos serviços orchestrados (Elasticsearch, Flask API, Frontend Vite).

## 🚀 Como Rodar

### Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop) ou Docker Engine instalado e rodando

### Execução via Docker Compose

Para compilar e iniciar todos os serviços da aplicação de forma integrada, execute o seguinte comando no diretório raiz do projeto:

```bash
docker compose up --build -d
```

Após a inicialização bem-sucedida de todos os contêineres:
- **Interface Web (Frontend):** Disponível em [http://localhost:3000](http://localhost:3000) (com suporte a Tema Claro e Tema Escuro dinâmico conforme a preferência do navegador)
- **Serviço de API (Backend):** Disponível em [http://localhost:5000](http://localhost:5000)
- **Elasticsearch:** Disponível em [http://localhost:9200](http://localhost:9200)

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
  "search_type": "log_custom",
  "size": 10
}
```

**Opções de `search_type`:**
- `log_standard`: Consulta no texto bruto do log sem filtros adicionais.
- `log_custom`: Consulta inteligente no log utilizando analisador com remoção de IPs, IDs e timestamps.
- `event_standard`: Consulta focada na descrição textual da issue/evento.
- `hybrid`: Busca combinada em ambos os campos considerando a melhor pontuação.

---

### `POST /logs/import`
Realiza a varredura recursiva de diretórios sob `pares_logs_issues/out` e indexa todos os pares encontrados no Elasticsearch.

---

### `GET /logs/metrics`
Calcula as métricas globais e individuais de MRR e nDCG@5 a partir da planilha Excel para as quatro estratégias de busca.

---

### `DELETE /logs/files/:id`
Remove um par do índice pelo seu ID de documento.

---

### `GET /logs/charts/metrics`
Retorna a renderização em PNG do gráfico comparativo de barras horizontais exibindo o MRR e o nDCG@5 de todas as estratégias de busca.

---

### `GET /logs/charts/wordcloud`
Retorna a renderização em PNG da Nuvem de Palavras gerada sobre o conteúdo dos eventos indexados.

---

### `GET /logs/charts/word-freq`
Retorna a renderização em PNG do gráfico com as 10 palavras mais frequentes observadas nos eventos.

---

## 📂 Estrutura do Código

O projeto foi totalmente modularizado para facilitar a manutenção e legibilidade:

### Backend (Python/Flask)
- `server/flaskr/logs/services.py`: Fachada principal do serviço de logs.
- `server/flaskr/logs/elasticsearch_service.py`: Conexão, mapeamento de índice e execução de queries no Elasticsearch.
- `server/flaskr/logs/metrics_service.py`: Lógica de leitura de planilhas Excel e cálculo de métricas de relevância IR com `ir_measures`.
- `server/flaskr/logs/analysis_service.py`: Renderização de gráficos com Matplotlib e Nuvem de Palavras.
- `server/flaskr/logs/controller.py`: Mapeamento de payloads de requisição HTTP e controllers de rotas.

### Frontend (React/TypeScript/Vite)
- `src/App.tsx`: Orquestrador e coordenador principal das abas e estados globais.
- `src/types.ts`: Interfaces TypeScript compartilhadas.
- `src/utils/helpers.tsx`: Constantes visuais compatíveis com os temas Claro/Escuro do sistema e componentes visuais comuns.
- `src/components/`:
  - `UploadModal.tsx`: Diálogo para submeter novos arquivos de logs.
  - `SearchTab.tsx`: Tela de consultas textuais ao indexador.
  - `DocumentsTab.tsx`: Listagem e exclusão de documentos.
  - `MetricsTab.tsx`: Painel de visualização de performance (MRR, nDCG@5) e detalhes de queries.
  - `AnalysisTab.tsx`: Visualização de gráficos estatísticos e word clouds.

---

## Avaliação de Relevância e Métricas

O sistema calcula as métricas de avaliação utilizando a biblioteca especializada `ir-measures` com base nos julgamentos de relevância (qrels) definidos na planilha de avaliação. As métricas adotadas são:

### Mean Reciprocal Rank (MRR)
O MRR mede a eficácia do sistema em retornar o primeiro documento relevante (neste caso, o log correto associado à issue, classificado com relevância de nível 5) o mais alto possível no ranking.

A fórmula para o Reciprocal Rank (RR) de uma consulta $q$ é:
$$RR(q) = \frac{1}{\text{rank}_q}$$
Onde $\text{rank}_q$ é a posição (1-based) do documento esperado no resultado da busca. O MRR final é a média aritmética dos valores de RR para todas as consultas do conjunto de teste $Q$:
$$MRR = \frac{1}{|Q|} \sum_{q \in Q} RR(q)$$

### Discounted Cumulative Gain (nDCG@5)
O nDCG@5 avalia a qualidade do ordenamento do ranking considerando a relevância graduada atribuída aos logs de 1 a 5 (onde a resposta exata possui relevância 5, e julgamentos inferiores possuem valores decrescentes).

A fórmula para o Discounted Cumulative Gain (DCG@k) no rank $k=5$ é calculada de forma linear pela biblioteca `ir-measures` (baseada na ferramenta padrão `trec_eval`):
$$DCG@5 = \sum_{i=1}^{5} \frac{\text{rel}_i}{\log_2(i + 1)}$$
Onde $\text{rel}_i$ é o nível de relevância atribuído ao documento na posição $i$.

Para normalizar, o score é dividido pelo Ideal DCG (IDCG@5), que representa o score de ordenamento perfeito caso os documentos fossem classificados na ordem decrescente ideal de relevância:
$$nDCG@5 = \frac{DCG@5}{IDCG@5}$$