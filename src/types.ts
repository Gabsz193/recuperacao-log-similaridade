export interface IndexedFilePair {
  id: string;
  filename_event: string;
  filename_log: string;
  app_name: string;
  pair_id: string;
  line_count: number;
  file_size: number;
  uploaded_at: string;
  event_content?: string;
  log_content?: string;
}

export interface HighlightItem {
  text: string;
  marked: string;
}

export interface SearchHit {
  id: string;
  filename_event: string;
  filename_log: string;
  app_name: string;
  pair_id: string;
  line_count: number;
  file_size: number;
  score: number;
  highlights: HighlightItem[];
  event_content?: string;
  log_content?: string;
}

export interface SearchResult {
  total: number;
  max_score: number;
  hits: SearchHit[];
}

export interface ESStatus {
  status: string;
  documents: number;
}

export interface MetricQueryDetail {
  query: string;
  target_log: string;
  rr: number;
  ndcg_5: number;
  retrieved_top_5: string[];
}

export interface MetricResultItem {
  mrr: number;
  ndcg_5: number;
  queries: MetricQueryDetail[];
}

export interface MetricsResponse {
  [strategyName: string]: MetricResultItem;
}
