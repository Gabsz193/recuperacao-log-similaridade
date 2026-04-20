from datetime import datetime
import re
import os
from elasticsearch import Elasticsearch, helpers


class LogService:
    def __init__(self):
        self.es = Elasticsearch(os.getenv("ELASTICSEARCH_HOST"))
        self.index = "log-files-2"
        self.ensure_index()

    def ensure_index(self):
        exists = self.es.indices.exists(index=self.index)
        if not exists:
            self.es.indices.create(
                index=self.index,
                settings={
                    "index": {
                        "similarity": {
                            "default": {
                                "type": "BM25"  # Garante o algoritmo BM25
                            }
                        }
                    },
                    "analysis": {
                        "analyzer": {
                            "log_analyzer": {
                                "type": "custom",
                                "tokenizer": "standard",
                                "filter": ["lowercase", "stop", "asciifolding"]
                            }
                        }
                    }
                },
                mappings={
                    "properties": {
                        "timestamp": {"type": "date"},
                        "pid": {"type": "integer"},
                        "tid": {"type": "integer"},
                        "level": {"type": "keyword"},  # I, E, W
                        "tag": {"type": "text", "analyzer": "standard"},
                        "message": {
                            "type": "text",
                            "analyzer": "log_analyzer",
                            "term_vector": "with_positions_offsets",
                        },
                        "filename": {"type": "keyword"},
                        "raw_log": {"type": "text", "index": False},
                    }
                },
            )

    def _count_lines(self, content):
        return sum(1 for line in content.splitlines() if line.strip())

    def upload_files(self, files):
        results = []

        log_pattern = re.compile(
            r'(?P<date>\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3})\s+(?P<pid>\d+)\s+(?P<tid>\d+)\s+(?P<level>\w)\s+(?P<tag>[^:]+):\s+(?P<message>.*)')

        for uploaded_file in files:
            content = uploaded_file.read().decode("utf-8")
            lines = content.splitlines()

            self.es.delete_by_query(
                index=self.index,
                query={"match": {"filename": uploaded_file.filename}},
                refresh=True
            )

            actions = []
            uploaded_at = datetime.utcnow().isoformat() + "Z"
            current_year = datetime.now().year

            for line in lines:
                match = log_pattern.match(line)
                if match:

                    data = match.groupdict()
                    doc = {
                        "_index": self.index,
                        "_source": {
                            "filename": uploaded_file.filename,
                            "timestamp": f"{current_year}-{data['date'].replace(' ', 'T')}Z",
                            "pid": int(data["pid"]),
                            "tid": int(data["tid"]),
                            "level": data["level"],
                            "tag": data["tag"],
                            "message": data["message"],
                            "uploaded_at": uploaded_at,
                            "raw_log": line,
                        }
                    }
                    actions.append(doc)

            if actions:
                helpers.bulk(self.es, actions)
                results.append({
                    "filename": uploaded_file.filename,
                    "action": "indexed",
                    "lineCount": len(actions)
                })

        self.es.indices.refresh(index=self.index)
        return results

    def list_files(self):
        query = {
            "size": 0,  # Não queremos as linhas individuais, apenas os grupos
            "aggs": {
                "files_grouped": {
                    "terms": {
                        "field": "filename",
                        "size": 100
                    },
                    "aggs": {
                        "total_lines": {"value_count": {"field": "filename"}},
                        "last_upload": {"max": {"field": "uploaded_at"}}
                    }
                }
            }
        }

        result = self.es.search(index=self.index, body=query)

        # Formatando para o seu React receber uma lista limpa
        files = []
        for bucket in result["aggregations"]["files_grouped"]["buckets"]:
            files.append({
                "filename": bucket["key"],
                "line_count": bucket["total_lines"]["value"],
                "uploaded_at": bucket["last_upload"]["value_as_string"]
            })

        return files

    def delete_file(self, file_id):
        self.es.delete(index=self.index, id=file_id)
        self.es.indices.refresh(index=self.index)

    def search(self, query_text, size=10):
        result = self.es.search(
            index=self.index,
            size=size,
            query={
                "multi_match": {
                    "query": query_text,
                    "fields": ["message^3", "tag^1.5"],
                    "operator": "or",
                    "fuzziness": "AUTO",
                }
            },
            highlight={
                "fields": {
                    "message": {
                        "pre_tags": ["<mark>"],
                        "post_tags": ["</mark>"],
                    },
                    "tag": {}
                }
            },
            _source=["filename", "timestamp", "level", "tag", "message", "raw_log"],
        )

        hits = []
        for hit in result["hits"]["hits"]:
            source = hit["_source"]

            highlight_data = hit.get("highlight", {})
            message_highlight = highlight_data.get("message", [source["message"]])[0]
            message_fragments = highlight_data.get("message", [source["message"]])

            # Gerando a lista de highlights conforme o formato solicitado
            highlights = [
                {
                    # Remove as tags de marcação para ter o texto limpo
                    "text": fragment.replace("<mark>", "").replace("</mark>", "").strip(),
                    # Mantém o texto com as tags para o React renderizar
                    "marked": fragment,
                }
                for fragment in message_fragments
            ]

            hits.append({
                "id": hit["_id"],
                "score": hit["_score"],
                "filename": source["filename"],
                "timestamp": source["timestamp"],
                "level": source["level"],
                "tag": source["tag"],
                "message": source["message"],
                "highlighted_message": message_highlight,
                "highlights": highlights,
                "raw": source["raw_log"],
            })

        return {
            "total": result["hits"]["total"]["value"],
            "max_score": result["hits"]["max_score"],
            "hits": hits,
        }

    def health(self):
        health = self.es.cluster.health()
        stats = self.es.count(index=self.index)
        return {
            "status": health.get("status"),
            "documents": stats.get("count"),
        }