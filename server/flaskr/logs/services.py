from datetime import datetime
import os
import re

from .elasticsearch_service import ElasticsearchService
from .metrics_service import MetricsService
from .analysis_service import AnalysisService

class LogService:
    def __init__(self):
        self.es_service = ElasticsearchService()
        self.es = self.es_service.es
        self.index = self.es_service.index

    def _count_lines(self, content):
        return sum(1 for line in content.splitlines() if line.strip())

    def upload_pair(self, event_file, log_file, app_name=None, pair_id=None):
        event_content = event_file.read().decode("utf-8", errors="ignore")
        log_content = log_file.read().decode("utf-8", errors="ignore")

        # Deduce metadata
        if not pair_id:
            for name in [log_file.filename, event_file.filename]:
                if name:
                    match = re.search(r'(?:log|issue)_([a-zA-Z0-9_-]+)\.', name)
                    if match:
                        pair_id = match.group(1)
                        break
        if not app_name:
            for name in [log_file.filename, event_file.filename]:
                if name:
                    parts = name.replace('\\', '/').split('/')
                    if len(parts) > 1:
                        app_name = parts[0]
                        break
            if not app_name:
                app_name = 'unknown'
        if not pair_id:
            pair_id = 'unknown'

        filename_event = event_file.filename or f"issue_{pair_id}.md"
        filename_log = log_file.filename or f"log_{pair_id}.log"
        
        line_count = self._count_lines(log_content)
        file_size = len(log_content.encode("utf-8")) + len(event_content.encode("utf-8"))

        doc_body = {
            "filename_event": filename_event,
            "filename_log": filename_log,
            "app_name": app_name,
            "pair_id": pair_id,
            "event_content": event_content,
            "log_content": log_content,
            "line_count": line_count,
            "file_size": file_size,
            "uploaded_at": datetime.utcnow().isoformat() + "Z",
        }

        # Use filename_log as document id to prevent duplicates
        self.es.index(index=self.index, id=filename_log, document=doc_body)
        self.es.indices.refresh(index=self.index)

        return {
            "filename_event": filename_event,
            "filename_log": filename_log,
            "app_name": app_name,
            "pair_id": pair_id,
            "action": "indexed",
            "lineCount": line_count
        }

    def list_files(self):
        result = self.es.search(
            index=self.index,
            size=100,
            query={"match_all": {}},
            _source=["filename_event", "filename_log", "app_name", "pair_id", "line_count", "file_size", "uploaded_at", "event_content", "log_content"],
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

    def _execute_search(self, query_body, highlight_fields, size=10):
        return self.es_service.execute_search(query_body, highlight_fields, size)

    def search_log_standard(self, query_text, size=10):
        query_body = {
            "match": {
                "log_content.standard": {
                    "query": query_text,
                    "operator": "or",
                    "fuzziness": "AUTO"
                }
            }
        }
        return self._execute_search(query_body, ["log_content.standard"], size)

    def search_log_custom(self, query_text, size=10):
        query_body = {
            "match": {
                "log_content": {
                    "query": query_text,
                    "operator": "or",
                    "fuzziness": "AUTO"
                }
            }
        }
        return self._execute_search(query_body, ["log_content"], size)

    def search_event_standard(self, query_text, size=10):
        query_body = {
            "match": {
                "event_content": {
                    "query": query_text,
                    "operator": "or",
                    "fuzziness": "AUTO"
                }
            }
        }
        return self._execute_search(query_body, ["event_content"], size)

    def search_hybrid(self, query_text, size=10):
        query_body = {
            "multi_match": {
                "query": query_text,
                "fields": ["log_content", "event_content"],
                "type": "best_fields",
                "operator": "or",
                "fuzziness": "AUTO"
            }
        }
        return self._execute_search(query_body, ["log_content", "event_content"], size)

    def search(self, query_text, search_type='log', size=10):
        if search_type == 'log_standard':
            return self.search_log_standard(query_text, size)
        elif search_type == 'log' or search_type == 'log_custom':
            return self.search_log_custom(query_text, size)
        elif search_type == 'event' or search_type == 'event_standard':
            return self.search_event_standard(query_text, size)
        elif search_type == 'hybrid':
            return self.search_hybrid(query_text, size)
        else:
            return self.search_log_custom(query_text, size)

    def import_pairs(self):
        base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "pares_logs_issues", "out"))
        if not os.path.exists(base_dir):
            base_dir = os.path.abspath("pares_logs_issues/out")
            
        if not os.path.exists(base_dir):
            raise FileNotFoundError(f"Directory not found: {base_dir}")

        imported_count = 0
        
        for root, dirs, files in os.walk(base_dir):
            for file in files:
                if file.startswith("issue_") and file.endswith(".md"):
                    pair_id = file[len("issue_"):-len(".md")]
                    log_file_name = f"log_{pair_id}.log"
                    if log_file_name in files:
                        event_path = os.path.join(root, file)
                        log_path = os.path.join(root, log_file_name)
                        
                        rel_event_path = os.path.relpath(event_path, base_dir)
                        rel_log_path = os.path.relpath(log_path, base_dir)
                        
                        app_name = os.path.basename(root)
                        
                        with open(event_path, "r", encoding="utf-8", errors="ignore") as f:
                            event_content = f.read()
                        with open(log_path, "r", encoding="utf-8", errors="ignore") as f:
                            log_content = f.read()
                            
                        line_count = self._count_lines(log_content)
                        file_size = len(log_content.encode("utf-8")) + len(event_content.encode("utf-8"))
                        
                        doc_body = {
                            "filename_event": rel_event_path,
                            "filename_log": rel_log_path,
                            "app_name": app_name,
                            "pair_id": pair_id,
                            "event_content": event_content,
                            "log_content": log_content,
                            "line_count": line_count,
                            "file_size": file_size,
                            "uploaded_at": datetime.utcnow().isoformat() + "Z",
                        }
                        
                        self.es.index(index=self.index, id=rel_log_path, document=doc_body)
                        imported_count += 1
                        
        self.es.indices.refresh(index=self.index)
        return imported_count

    def calculate_metrics(self):
        return MetricsService.calculate_metrics(self)

    def health(self):
        return self.es_service.health()

    def generate_metrics_chart(self):
        metrics = self.calculate_metrics()
        return AnalysisService.generate_metrics_chart(metrics)

    def generate_wordcloud_chart(self):
        return AnalysisService.generate_wordcloud_chart(self.es, self.index)

    def generate_word_freq_chart(self):
        return AnalysisService.generate_word_freq_chart(self.es, self.index)
