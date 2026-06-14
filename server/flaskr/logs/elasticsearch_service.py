import os
from elasticsearch import Elasticsearch

class ElasticsearchService:
    def __init__(self):
        self.es = Elasticsearch(os.getenv("ELASTICSEARCH_HOST"))
        self.index = "log-files"
        self.ensure_index()

    def ensure_index(self):
        exists = self.es.indices.exists(index=self.index)
        if exists:
            try:
                mapping = self.es.indices.get_mapping(index=self.index)
                props = mapping.get(self.index, {}).get("mappings", {}).get("properties", {})
                if "filename_event" not in props:
                    self.es.indices.delete(index=self.index)
                    exists = False
            except Exception:
                self.es.indices.delete(index=self.index, ignore_unavailable=True)
                exists = False

        if not exists:
            self.es.indices.create(
                index=self.index,
                mappings={
                    "properties": {
                        "filename_event": {"type": "keyword"},
                        "filename_log":   {"type": "keyword"},
                        "app_name":       {"type": "keyword"},
                        "pair_id":        {"type": "keyword"},
                        "event_content":  {
                            "type": "text",
                            "analyzer": "standard",
                        },
                        "log_content":    {
                            "type": "text",
                            "analyzer": "log_analyzer",
                            "term_vector": "with_positions_offsets",
                            "fields": {
                                "standard": {
                                    "type": "text",
                                    "analyzer": "standard"
                                }
                            }
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
                                "pattern": r"(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[\d+\]|\d{2}:\d{2}:\d{2}|port \d+)",
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

    def execute_search(self, query_body, highlight_fields, size=10):
        highlight = {}
        if highlight_fields:
            highlight["fields"] = {
                field: {
                    "fragment_size": 200,
                    "number_of_fragments": 5,
                    "pre_tags": ["<<<"],
                    "post_tags": [">>>"],
                }
                for field in highlight_fields
            }

        result = self.es.search(
            index=self.index,
            size=size,
            query=query_body,
            highlight=highlight if highlight_fields else None,
            _source=["filename_event", "filename_log", "app_name", "pair_id", "line_count", "file_size", "event_content", "log_content"],
        )

        hits = []
        for hit in result["hits"]["hits"]:
            highlights = []
            if "highlight" in hit:
                for field in highlight_fields:
                    for fragment in hit["highlight"].get(field, []):
                        highlights.append({
                            "text": fragment.replace("<<<", "").replace(">>>", "").strip(),
                            "marked": fragment,
                        })

            hits.append({
                "id": hit["_id"],
                "filename_event": hit["_source"].get("filename_event"),
                "filename_log": hit["_source"].get("filename_log"),
                "app_name": hit["_source"].get("app_name"),
                "pair_id": hit["_source"].get("pair_id"),
                "line_count": hit["_source"].get("line_count"),
                "file_size": hit["_source"].get("file_size"),
                "event_content": hit["_source"].get("event_content"),
                "log_content": hit["_source"].get("log_content"),
                "score": hit.get("_score"),
                "highlights": highlights,
            })

        return {
            "total": result["hits"]["total"]["value"],
            "max_score": result["hits"]["max_score"] or 0.0,
            "hits": hits,
        }

    def health(self):
        health = self.es.cluster.health()
        stats = self.es.count(index=self.index)
        return {
            "status": health.get("status"),
            "documents": stats.get("count"),
        }
