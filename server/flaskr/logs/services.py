from datetime import datetime
from elasticsearch import Elasticsearch

class LogService:
    def __init__(self):
        self.es = Elasticsearch("http://localhost:9200")
        self.index = "log-files"
        self.ensure_index()

    def ensure_index(self):
        exists = self.es.indices.exists(index=self.index)
        if not exists:
            self.es.indices.create(
                index=self.index,
                mappings={
                    "properties": {
                        "filename":   {"type": "keyword"},
                        "content":    {
                            "type": "text",
                            "analyzer": "log_analyzer",
                            "term_vector": "with_positions_offsets",
                        },
                        "line_count": {"type": "integer"},
                        "file_size":  {"type": "long"},
                        "uploaded_at": {"type": "date"},
                    }
                },
                settings={
                    "analysis": {
                        "analyzer": {
                            "log_analyzer": {
                                "type": "custom",
                                "tokenizer": "standard",
                                "filter": ["lowercase", "log_stop_words"],
                                "char_filter": ["log_normalizer"],
                            }
                        },
                        "char_filter": {
                            "log_normalizer": {
                                "type": "pattern_replace",
                                "pattern": "(\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|\\[\\d+\\]|\\d{2}:\\d{2}:\\d{2}|port \\d+)",
                                "replacement": " ",
                            }
                        },
                        "filter": {
                            "log_stop_words": {
                                "type": "stop",
                                "stopwords": ["the", "a", "an", "is", "by", "for", "from", "to", "at", "in", "of"],
                            }
                        },
                    }
                },
            )

    def _count_lines(self, content):
        return sum(1 for line in content.splitlines() if line.strip())

    def upload_files(self, files):
        results = []

        for uploaded_file in files:
            content = uploaded_file.read().decode("utf-8")
            line_count = self._count_lines(content)
            file_size = len(content.encode("utf-8"))

            existing = self.es.search(
                index=self.index,
                query={"term": {"filename": uploaded_file.filename}},
                size=1,
            )

            doc_body = {
                "filename": uploaded_file.filename,
                "content": content,
                "line_count": line_count,
                "file_size": file_size,
                "uploaded_at": datetime.utcnow().isoformat() + "Z",
            }

            if existing["hits"]["total"]["value"] > 0:
                doc_id = existing["hits"]["hits"][0]["_id"]
                self.es.update(index=self.index, id=doc_id, doc=doc_body)
                results.append({"filename": uploaded_file.filename, "action": "updated", "lineCount": line_count})
            else:
                self.es.index(index=self.index, document=doc_body)
                results.append({"filename": uploaded_file.filename, "action": "indexed", "lineCount": line_count})

        self.es.indices.refresh(index=self.index)
        return results

    def list_files(self):
        result = self.es.search(
            index=self.index,
            size=100,
            query={"match_all": {}},
            _source=["filename", "line_count", "file_size", "uploaded_at"],
            sort=[{"uploaded_at": {"order": "desc"}}],
        )
        return [
            {
                "id": hit["_id"],
                **hit["_source"],
            }
            for hit in result["hits"]["hits"]
        ]

    def delete_file(self, file_id):
        self.es.delete(index=self.index, id=file_id)
        self.es.indices.refresh(index=self.index)

    def search(self, query_text, size=10):
        result = self.es.search(
            index=self.index,
            size=size,
            query={
                "match": {
                    "content": {
                        "query": query_text,
                        "operator": "or",
                        "fuzziness": "AUTO",
                    }
                }
            },
            highlight={
                "fields": {
                    "content": {
                        "fragment_size": 200,
                        "number_of_fragments": 5,
                        "pre_tags": ["<<<"],
                        "post_tags": [">>>"],
                    }
                }
            },
            _source=["filename", "line_count", "file_size"],
        )

        hits = []
        for hit in result["hits"]["hits"]:
            highlights = [
                {
                    "text": fragment.replace("<<<", "").replace(">>>", "").strip(),
                    "marked": fragment,
                }
                for fragment in hit.get("highlight", {}).get("content", [])
            ]

            hits.append({
                "id": hit["_id"],
                "filename": hit["_source"]["filename"],
                "line_count": hit["_source"]["line_count"],
                "file_size": hit["_source"]["file_size"],
                "score": hit.get("_score"),
                "highlights": highlights,
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
