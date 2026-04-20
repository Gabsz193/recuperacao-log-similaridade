# Estágio 1: Build
FROM python:3.9-alpine AS builder

WORKDIR /app

# Instala dependências de compilação (se necessário para pacotes python)
RUN apk add --no-cache gcc musl-dev linux-headers

COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Estágio 2: Produção (Imagem final)
FROM python:3.9-alpine

WORKDIR /app

# Copia as dependências do builder
COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH

# Copia a pasta do módulo inteira
# Isso já leva o flaskr/__init__.py e todo o resto
COPY flaskr/ ./flaskr/

# Variáveis de ambiente
ENV FLASK_APP=flaskr
ENV FLASK_RUN_HOST=0.0.0.0
ENV PYTHONUNBUFFERED=1
ENV ELASTICSEARCH_HOST=http://localhost:9200

EXPOSE 5000

CMD ["flask", "run"]