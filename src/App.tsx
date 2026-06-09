import { useState, useRef, useCallback, useEffect } from "react";
import { 
  FiSearch, FiDatabase, FiUploadCloud, FiFileText, FiFolder, 
  FiTrash2, FiPlus, FiChevronDown, FiChevronUp, FiX, 
  FiCheckCircle, FiAlertTriangle, FiActivity, FiLayers
} from "react-icons/fi";

// ── Config ─────────────────────────────────────────────────────────────────
const API = "http://localhost:5000/logs";

// ── Types ──────────────────────────────────────────────────────────────────
interface IndexedFilePair {
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

interface HighlightItem {
  text: string;
  marked: string;
}

interface SearchHit {
  id: string;
  filename_event: string;
  filename_log: string;
  app_name: string;
  pair_id: string;
  line_count: number;
  file_size: number;
  score: number;
  highlights: HighlightItem[];
}

interface SearchResult {
  total: number;
  max_score: number;
  hits: SearchHit[];
}

interface ESStatus {
  status: string;
  documents: number;
}

interface MetricQueryDetail {
  query: string;
  target_log: string;
  rr: number;
  ndcg_5: number;
  retrieved_top_5: string[];
}

interface MetricResultItem {
  mrr: number;
  ndcg_5: number;
  queries: MetricQueryDetail[];
}

interface MetricsResponse {
  [strategyName: string]: MetricResultItem;
}

// ── Helpers ────────────────────────────────────────────────────────────────
function categorize(text: string) {
  if (/[Ff]ailed password/i.test(text))    return { label: "FAILED AUTH",  color: "#ef4444" };
  if (/[Ii]nvalid user/i.test(text))       return { label: "INVALID USER", color: "#f97316" };
  if (/[Aa]ccepted/i.test(text))           return { label: "ACCEPTED",     color: "#22c55e" };
  if (/[Dd]isconnect/i.test(text))         return { label: "DISCONNECT",   color: "#a78bfa" };
  if (/[Cc]onnection closed/i.test(text))  return { label: "CLOSED",       color: "#94a3b8" };
  if (/maximum authentication/i.test(text))return { label: "MAX ATTEMPTS", color: "#fb923c" };
  if (/pam_unix/i.test(text))              return { label: "PAM FAILURE",  color: "#f43f5e" };
  if (/[Ee]rror/i.test(text))              return { label: "ERROR",        color: "#fbbf24" };
  if (/[Ww]arn/i.test(text))               return { label: "WARNING",      color: "#facc15" };
  return { label: "OTHER", color: "#6b7280" };
}

function fmt(n: number | string) { 
  return Number(n).toLocaleString("pt-BR"); 
}

function fileSize(bytes?: number) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      background: `${color}20`, color, border: `1px solid ${color}40`,
      borderRadius: 4, padding: "2px 8px", fontSize: 10,
      fontWeight: 700, letterSpacing: "0.5px", whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

function StatusDot({ status }: { status: string }) {
  const color = status === "green" ? "#22c55e" : status === "yellow" ? "#f59e0b" : "#ef4444";
  return (
    <span style={{
      display: "inline-block", width: 8, height: 8,
      borderRadius: "50%", background: color,
      boxShadow: `0 0 6px ${color}`,
    }} />
  );
}

// ── Markdown Render ────────────────────────────────────────────────────────
function renderMarkdown(text?: string) {
  if (!text) {
    return <span style={{ color: "#4a5d78", fontStyle: "italic", textAlign: "left", display: "block" }}>Conteúdo do evento não disponível.</span>;
  }
  
  const lines = text.split("\n");
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  const elements: React.ReactNode[] = [];
  
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    
    // Toggle code blocks
    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${idx}`} style={{
            background: "#020408", border: "1px solid #162033",
            borderRadius: 6, padding: "10px 14px", overflowX: "auto",
            fontFamily: "monospace", color: "#4ade80", fontSize: "11px",
            textAlign: "left", margin: "8px 0", whiteSpace: "pre-wrap",
            wordBreak: "break-all"
          }}>
            {codeBlockLines.join("\n")}
          </pre>
        );
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }
    
    if (inCodeBlock) {
      codeBlockLines.push(line);
      return;
    }
    
    // Headers
    if (trimmed.startsWith("# ")) {
      elements.push(<h1 key={idx} style={{ color: "#dde8f8", fontSize: "1.35em", marginTop: "14px", marginBottom: "8px", borderBottom: "1px solid #162033", paddingBottom: "4px", fontWeight: 700, textAlign: "left" }}>{trimmed.slice(2)}</h1>);
      return;
    }
    if (trimmed.startsWith("## ")) {
      elements.push(<h2 key={idx} style={{ color: "#3b82f6", fontSize: "1.15em", marginTop: "12px", marginBottom: "8px", fontWeight: 600, textAlign: "left" }}>{trimmed.slice(3)}</h2>);
      return;
    }
    if (trimmed.startsWith("### ")) {
      elements.push(<h3 key={idx} style={{ color: "#7ab8e0", fontSize: "1.05em", marginTop: "10px", marginBottom: "6px", fontWeight: 600, textAlign: "left" }}>{trimmed.slice(4)}</h3>);
      return;
    }
    // Horizontal line
    if (trimmed === "---") {
      elements.push(<hr key={idx} style={{ border: "none", borderTop: "1px solid #162033", margin: "14px 0" }} />);
      return;
    }
    // List items
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      elements.push(
        <div key={idx} style={{ display: "flex", gap: "6px", alignItems: "flex-start", marginLeft: "12px", marginBottom: "4px", textAlign: "left" }}>
          <span style={{ color: C.accent }}>•</span>
          <span style={{ fontSize: "12px", color: "#b8cce0", lineHeight: "1.4" }}>{trimmed.slice(2)}</span>
        </div>
      );
      return;
    }
    if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^(\d+)\.\s(.*)/);
      elements.push(
        <div key={idx} style={{ display: "flex", gap: "6px", alignItems: "flex-start", marginLeft: "12px", marginBottom: "4px", textAlign: "left" }}>
          <span style={{ color: C.accent, fontSize: "11px", fontWeight: 700 }}>{match ? match[1] : idx}.</span>
          <span style={{ fontSize: "12px", color: "#b8cce0", lineHeight: "1.4" }}>{match ? match[2] : trimmed}</span>
        </div>
      );
      return;
    }
    
    // Check if line looks like it is part of a crash dump/stack trace to style it format-like
    if (trimmed.startsWith("at ") || trimmed.startsWith("Process:") || trimmed.startsWith("FATAL EXCEPTION:") || trimmed.includes("Exception:") || trimmed.includes("Error:")) {
      elements.push(
        <div key={idx} style={{
          fontFamily: "monospace", color: "#f87171", background: "rgba(225, 29, 72, 0.05)",
          padding: "2px 6px", borderRadius: 4, fontSize: "11px", wordBreak: "break-all",
          whiteSpace: "pre-wrap", textAlign: "left", margin: "2px 0"
        }}>
          {line}
        </div>
      );
      return;
    }

    // Normal paragraph
    if (trimmed) {
      elements.push(
        <p key={idx} style={{ margin: "0 0 6px 0", fontSize: "12px", whiteSpace: "pre-wrap", wordBreak: "break-word", textAlign: "left", color: "#b8cce0", lineHeight: "1.5" }}>
          {line}
        </p>
      );
    } else {
      elements.push(<div key={idx} style={{ height: "6px" }} />);
    }
  });
  
  if (inCodeBlock && codeBlockLines.length > 0) {
    elements.push(
      <pre key="code-extra" style={{
        background: "#020408", border: "1px solid #162033",
        borderRadius: 6, padding: "10px 14px", overflowX: "auto",
        fontFamily: "monospace", color: "#4ade80", fontSize: "11px",
        textAlign: "left", margin: "8px 0", whiteSpace: "pre-wrap",
        wordBreak: "break-all"
      }}>
        {codeBlockLines.join("\n")}
      </pre>
    );
  }
  
  return <div style={{ display: "flex", flexDirection: "column", gap: "2px", textAlign: "left" }}>{elements}</div>;
}

// ── Visual Constants ────────────────────────────────────────────────────────
const C = {
  bg: "#07090f", 
  panel: "#0c1422", 
  border: "#162033",
  accent: "#3b82f6", 
  text: "#b8cce0", 
  muted: "#526d8c", 
  faint: "#101b2d",
};

export default function App() {
  const [activeTab, setActiveTab]         = useState<"search" | "files" | "metrics">("search");
  
  // ES indexed files/pairs
  const [indexedFiles, setIndexedFiles]   = useState<IndexedFilePair[]>([]);
  const [esStatus, setEsStatus]           = useState<ESStatus | null>(null);
  
  // Upload pairs state
  const [isUploadOpen, setIsUploadOpen]   = useState(false);
  const [uploading, setUploading]         = useState(false);
  const [uploadError, setUploadError]     = useState<string | null>(null);
  const [eventFile, setEventFile]         = useState<File | null>(null);
  const [logFile, setLogFile]             = useState<File | null>(null);
  const [appNameInput, setAppNameInput]   = useState("");
  const [pairIdInput, setPairIdInput]     = useState("");

  // Bulk Import state
  const [importing, setImporting]         = useState(false);
  const [globalMessage, setGlobalMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // Search state
  const [query, setQuery]                 = useState("");
  const [searchType, setSearchType]       = useState<"log" | "event">("log");
  const [results, setResults]             = useState<SearchResult | null>(null);
  const [searching, setSearching]         = useState(false);
  const [searchError, setSearchError]     = useState<string | null>(null);
  const [expandedHit, setExpandedHit]     = useState<string | null>(null);
  
  // Files list visual state
  const [expandedFileId, setExpandedFileId] = useState<string | null>(null);
  
  // Metrics evaluation state
  const [metricsLoading, setMetricsLoading] = useState(false);
  const [metricsData, setMetricsData]       = useState<MetricsResponse | null>(null);
  const [metricsError, setMetricsError]     = useState<string | null>(null);
  const [expandedMetricStrategy, setExpandedMetricStrategy] = useState<string | null>(null);

  useEffect(() => {
    fetchHealth();
    fetchFiles();
  }, []);

  // Clear global alerts after 5 seconds
  useEffect(() => {
    if (globalMessage) {
      const t = setTimeout(() => setGlobalMessage(null), 5000);
      return () => clearTimeout(t);
    }
  }, [globalMessage]);

  async function fetchHealth() {
    try {
      const r = await fetch(`${API}/health`);
      const d = await r.json();
      setEsStatus(d);
    } catch {
      setEsStatus({ status: "unavailable", documents: 0 });
    }
  }

  async function fetchFiles() {
    try {
      const r = await fetch(`${API}/files`);
      const d = await r.json();
      setIndexedFiles(d.files || []);
    } catch {
      // ES Offline / Failed
    }
  }

  // ── Upload ────────────────────────────────────────────────────────────────
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventFile || !logFile) {
      setUploadError("Por favor, selecione ambos os arquivos (Evento e Log).");
      return;
    }

    setUploading(true);
    setUploadError(null);

    const form = new FormData();
    form.append("event_file", eventFile);
    form.append("log_file", logFile);
    if (appNameInput.trim()) form.append("app_name", appNameInput.trim());
    if (pairIdInput.trim()) form.append("pair_id", pairIdInput.trim());

    try {
      const r = await fetch(`${API}/upload`, { method: "POST", body: form });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Erro ao fazer upload");

      setGlobalMessage({
        type: "ok",
        text: `✅ Par de arquivos indexado com sucesso: Evento (${d.file?.filename_event || "importado"}) & Log (${d.file?.filename_log || "importado"}).`,
      });
      
      // Reset upload modal form
      setEventFile(null);
      setLogFile(null);
      setAppNameInput("");
      setPairIdInput("");
      setIsUploadOpen(false);
      
      await fetchFiles();
      await fetchHealth();
    } catch (err: any) {
      setUploadError(err.message || "Erro de conexão ao enviar arquivos.");
    } finally {
      setUploading(false);
    }
  };

  // ── Bulk Import ───────────────────────────────────────────────────────────
  const triggerBulkImport = async () => {
    setImporting(true);
    setGlobalMessage(null);
    try {
      const r = await fetch(`${API}/import`, { method: "POST" });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Erro ao importar em lote");

      setGlobalMessage({
        type: "ok",
        text: `🚀 Importação em lote realizada! ${d.imported} pares importados e indexados com sucesso.`,
      });
      await fetchFiles();
      await fetchHealth();
    } catch (err: any) {
      setGlobalMessage({ type: "err", text: `❌ Erro na importação: ${err.message}` });
    } finally {
      setImporting(false);
    }
  };

  // ── Get IR Metrics ────────────────────────────────────────────────────────
  const fetchMetrics = async () => {
    setMetricsLoading(true);
    setMetricsError(null);
    setMetricsData(null);
    try {
      const r = await fetch(`${API}/metrics`);
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Erro ao buscar métricas");
      setMetricsData(d);
    } catch (err: any) {
      setMetricsError(err.message || "Erro ao calcular métricas.");
    } finally {
      setMetricsLoading(false);
    }
  };

  // ── Search ────────────────────────────────────────────────────────────────
  const doSearch = async (q = query) => {
    if (!q.trim()) return;
    setSearching(true);
    setSearchError(null);
    setResults(null);
    setExpandedHit(null);

    try {
      const r = await fetch(`${API}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, search_type: searchType, size: 10 }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Erro de busca");
      setResults(d);
    } catch (err: any) {
      setSearchError(err.message || "Falha na comunicação de busca.");
    } finally {
      setSearching(false);
    }
  };

  // ── Delete File ───────────────────────────────────────────────────────────
  async function removeFile(id: string) {
    if (!confirm("Deseja realmente remover este par do índice?")) return;
    try {
      const r = await fetch(`${API}/files/${id}`, { method: "DELETE" });
      if (!r.ok) throw new Error("Erro na remoção do servidor");
      setIndexedFiles(prev => prev.filter(f => f.id !== id));
      setResults(null);
      setGlobalMessage({ type: "ok", text: "🗑️ Par removido do índice com sucesso." });
      await fetchHealth();
    } catch (err: any) {
      alert("Erro ao remover: " + err.message);
    }
  }

  const maxScore = results?.max_score || 1;

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontSize: "14px", lineHeight: "1.6", background: C.bg, minHeight: "100vh", color: C.text, textAlign: "left" }}>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div style={{ background: C.panel, borderBottom: `1px solid ${C.border}`, padding: "24px 32px 20px" }}>
        
        {/* Title & Status */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{
            width: 38, height: 38, borderRadius: 9, flexShrink: 0,
            background: "linear-gradient(135deg,#2563eb,#4f46e5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 24px rgba(79,70,229,.4)",
          }}>
            <FiSearch style={{ color: "#fff", fontSize: "18px" }} />
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#dde8f8" }}>
              Busca por Similaridade de Eventos e Logs
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
              Recuperação de Informação · Elasticsearch BM25
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            {esStatus && (
              <div style={{
                background: C.faint, border: `1px solid ${C.border}`,
                borderRadius: 8, padding: "6px 12px",
                display: "flex", alignItems: "center", gap: 8, fontSize: 11,
              }}>
                <StatusDot status={esStatus.status} />
                <span style={{ color: C.muted }}>Elasticsearch:</span>
                <span style={{ color: C.accent }}>{fmt(esStatus.documents)} docs</span>
              </div>
            )}

            <button
              onClick={triggerBulkImport}
              disabled={importing}
              style={{
                background: importing ? "#111827" : "rgba(34, 197, 94, 0.1)",
                border: `1px solid ${importing ? C.border : "rgba(34, 197, 94, 0.3)"}`,
                color: importing ? C.muted : "#22c55e",
                borderRadius: 8, padding: "8px 14px", fontSize: 11, fontWeight: 600,
                cursor: importing ? "not-allowed" : "pointer",
                transition: "all 0.2s"
              }}
            >
              {importing ? "Importando..." : <span style={{ display: "flex", alignItems: "center", gap: 6 }}><FiUploadCloud /> Importar em Lote</span>}
            </button>

            <button
              onClick={() => setIsUploadOpen(true)}
              style={{
                background: "linear-gradient(135deg,#2563eb,#4f46e5)",
                border: "none", color: "#fff",
                borderRadius: 8, padding: "8px 14px", fontSize: 11, fontWeight: 600,
                cursor: "pointer", boxShadow: "0 0 12px rgba(79,70,229,.3)"
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><FiPlus /> Novo Par</span>
            </button>
          </div>
        </div>

        {/* Global Notifications */}
        {globalMessage && (
          <div style={{
            background: globalMessage.type === "ok" ? "rgba(34,197,94,.08)" : "rgba(239,68,68,.08)",
            border: `1px solid ${globalMessage.type === "ok" ? "#22c55e40" : "#ef444440"}`,
            borderRadius: 8, padding: "8px 14px",
            fontSize: 11, color: globalMessage.type === "ok" ? "#22c55e" : "#ef4444",
            marginBottom: 14,
            animation: "fadeUp 0.3s ease"
          }}>
            {globalMessage.text}
          </div>
        )}

        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: 10, borderBottom: `1px solid ${C.border}`, paddingBottom: 0, marginTop: 10 }}>
          <button
            onClick={() => setActiveTab("search")}
            style={{
              background: "none", border: "none",
              borderBottom: `2px solid ${activeTab === "search" ? C.accent : "transparent"}`,
              color: activeTab === "search" ? "#fff" : C.muted,
              padding: "10px 16px", fontSize: 12, fontWeight: activeTab === "search" ? 700 : 500,
              cursor: "pointer", transition: "all 0.2s", marginBottom: -1
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><FiSearch /> Consulta</span>
          </button>
          <button
            onClick={() => setActiveTab("files")}
            style={{
              background: "none", border: "none",
              borderBottom: `2px solid ${activeTab === "files" ? C.accent : "transparent"}`,
              color: activeTab === "files" ? "#fff" : C.muted,
              padding: "10px 16px", fontSize: 12, fontWeight: activeTab === "files" ? 700 : 500,
              cursor: "pointer", transition: "all 0.2s", marginBottom: -1
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><FiFolder /> Documentos ({indexedFiles.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("metrics")}
            style={{
              background: "none", border: "none",
              borderBottom: `2px solid ${activeTab === "metrics" ? C.accent : "transparent"}`,
              color: activeTab === "metrics" ? "#fff" : C.muted,
              padding: "10px 16px", fontSize: 12, fontWeight: activeTab === "metrics" ? 700 : 500,
              cursor: "pointer", transition: "all 0.2s", marginBottom: -1
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><FiLayers /> Avaliação</span>
          </button>
        </div>
      </div>

      {/* ── Tab Contents ────────────────────────────────────────────────── */}
      <div style={{ padding: "24px 32px" }}>

        {/* TAB 1: Search */}
        {activeTab === "search" && (
          <div>
            {/* Search toggles & Switch */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 11, color: searchType === "event" ? C.accent : C.muted, fontWeight: searchType === "event" ? 700 : 400 }}>Busca por Evento</span>
                
                {/* Visual Toggle Switch */}
                <div 
                  onClick={() => setSearchType(searchType === "log" ? "event" : "log")}
                  style={{
                    width: 44, height: 22, borderRadius: 11, background: searchType === "log" ? C.accent : "#1e293b",
                    position: "relative", cursor: "pointer", transition: "background 0.2s"
                  }}
                >
                  <div style={{
                    width: 16, height: 16, borderRadius: "50%", background: "#fff",
                    position: "absolute", top: 3, left: searchType === "log" ? 25 : 3,
                    transition: "left 0.2s"
                  }} />
                </div>
                
                <span style={{ fontSize: 11, color: searchType === "log" ? C.accent : C.muted, fontWeight: searchType === "log" ? 700 : 400 }}>Busca por Log</span>
              </div>
              <span style={{ fontSize: 10, color: C.muted }}>
                Busca pelo conteúdo textual de {searchType === "log" ? "logs (.log)" : "eventos (.md)"} indexados
              </span>
            </div>

            {/* Search Input Box */}
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.accent, fontSize: 16, pointerEvents: "none" }}>⌕</span>
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && doSearch()}
                  placeholder={searchType === "log" ? "Cole o log de referência aqui..." : "Digite o evento/descrição de referência..."}
                  style={{
                    width: "100%", boxSizing: "border-box",
                    background: "#0a1220", border: `1px solid ${C.border}`,
                    borderRadius: 10, padding: "13px 14px 13px 44px",
                    color: C.text, fontSize: 12, outline: "none",
                  }}
                  onFocus={e => e.target.style.borderColor = C.accent}
                  onBlur={e => e.target.style.borderColor = C.border}
                />
              </div>
              <button
                onClick={() => doSearch()}
                disabled={!indexedFiles.length || !query.trim() || searching}
                style={{
                  background: indexedFiles.length && query.trim() && !searching
                    ? "linear-gradient(135deg,#2563eb,#4f46e5)" : "#111827",
                  border: "none", borderRadius: 10, padding: "0 24px",
                  color: indexedFiles.length && query.trim() ? "#fff" : "#2a3a50",
                  fontSize: 13, fontWeight: 600,
                  cursor: indexedFiles.length && !searching ? "pointer" : "not-allowed",
                  boxShadow: indexedFiles.length && query.trim() ? "0 0 18px rgba(79,70,229,.3)" : "none",
                  whiteSpace: "nowrap",
                }}
              >
                {searching ? "Buscando…" : "Buscar"}
              </button>
            </div>

            {/* Helper message */}
            {!indexedFiles.length && (
              <div style={{ fontSize: 11, color: "#e11d48", padding: "12px", border: "1px solid #e11d4833", borderRadius: 8, background: "#8813371a", textAlign: "center", marginBottom: 20 }}>
                ⚠️ O índice do Elasticsearch está vazio. Use o botão <b>Importar em Lote</b> ou <b>Novo Par</b> acima para indexar arquivos.
              </div>
            )}

            {/* Default State */}
            {results === null && !searching && !searchError && indexedFiles.length > 0 && (
              <div style={{ textAlign: "center", padding: "48px 0", color: "#1e3a5f" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>📋</div>
                <div style={{ fontSize: 13 }}>
                  {fmt(indexedFiles.length)} par(es) de arquivos disponíveis no índice. Faça sua busca por similaridade.
                </div>
              </div>
            )}

            {/* Spinner */}
            {searching && (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{
                  display: "inline-block", width: 36, height: 36,
                  border: "3px solid #0f2040", borderTopColor: C.accent,
                  borderRadius: "50%", animation: "spin .8s linear infinite",
                }} />
                <div style={{ marginTop: 14, color: "#1e3a5f", fontSize: 12 }}>
                  Consultando Elasticsearch…
                </div>
              </div>
            )}

            {/* Error */}
            {searchError && (
              <div style={{
                background: "#1a0a0a", border: "1px solid #4a1010",
                borderRadius: 10, padding: "14px 18px", color: "#ef4444", fontSize: 12,
              }}>
                ❌ {searchError}
              </div>
            )}

            {/* Results Grid / List */}
            {results && !searching && (
              <div>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 16 }}>
                  {results.total} resultado(s) encontrado(s) · score máximo: <span style={{ color: C.accent }}>{maxScore.toFixed(2)}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {results.hits.map((hit, rank) => {
                    const pct = maxScore > 0 ? (hit.score / maxScore) * 100 : 0;
                    const isExpanded = expandedHit === hit.id;
                    const noMatch = hit.score === 0;

                    return (
                      <div key={hit.id} style={{
                        background: C.panel,
                        border: `1px solid ${noMatch ? C.faint : C.border}`,
                        borderLeft: `3px solid ${noMatch ? "#1a2a3e" : rank === 0 ? "#f59e0b" : C.accent}`,
                        borderRadius: 12, overflow: "hidden", opacity: noMatch ? 0.45 : 1,
                        animation: `fadeUp .3s ease ${rank * 0.06}s both`,
                      }}>
                        {/* Hit Header */}
                        <div
                          onClick={() => !noMatch && setExpandedHit(isExpanded ? null : hit.id)}
                          style={{ padding: "14px 18px", cursor: noMatch ? "default" : "pointer", position: "relative", overflow: "hidden" }}
                        >
                          <div style={{
                            position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct}%`,
                            background: rank === 0 ? "rgba(245,158,11,.04)" : "rgba(59,130,246,.03)",
                            pointerEvents: "none", transition: "width .6s ease",
                          }} />

                          <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
                            {/* Badge rank */}
                            <div style={{
                              minWidth: 30, height: 30, borderRadius: 7, flexShrink: 0,
                              background: rank === 0 && !noMatch ? "linear-gradient(135deg,#f59e0b,#d97706)" : "#0a1220",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 12, fontWeight: 800,
                              color: rank === 0 && !noMatch ? "#000" : "#2a4060",
                              border: rank === 0 ? "none" : `1px solid ${C.faint}`,
                            }}>
                              {rank + 1}
                            </div>

                            {/* Details */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                                <span style={{ fontSize: 13, color: "#dde8f8", fontWeight: 700 }}>
                                  App: {hit.app_name} (ID: {hit.pair_id})
                                </span>
                                {rank === 0 && !noMatch && <Pill label="MELHOR MATCH" color="#f59e0b" />}
                              </div>
                              <div style={{ display: "flex", gap: 12, marginTop: 5, fontSize: 10, color: C.muted, flexWrap: "wrap" }}>
                                <span>Evento: {hit.filename_event}</span>
                                <span>Log: {hit.filename_log}</span>
                                <span>{fmt(hit.line_count)} linhas</span>
                                <span>{fileSize(hit.file_size)}</span>
                              </div>
                            </div>

                            {/* Scores */}
                            <div style={{ textAlign: "right", minWidth: 100 }}>
                              <div style={{ fontSize: 16, fontWeight: 700, color: noMatch ? "#1e3050" : rank === 0 ? "#f59e0b" : C.accent }}>
                                {hit.score.toFixed(2)}
                              </div>
                              <div style={{ marginTop: 5, width: 100, height: 4, background: "#0a1220", borderRadius: 4, overflow: "hidden" }}>
                                <div style={{
                                  height: "100%", width: `${pct}%`,
                                  background: rank === 0
                                    ? "linear-gradient(90deg,#f59e0b88,#f59e0b)"
                                    : "linear-gradient(90deg,#3b82f688,#3b82f6)",
                                  borderRadius: 4, transition: "width .6s ease",
                                }} />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Expand Details (Side-by-Side Event & Log) */}
                        {isExpanded && (
                          <div style={{ borderTop: `1px solid ${C.border}`, padding: "16px 20px", background: "#080e1a" }}>
                            {hit.highlights && hit.highlights.length > 0 && (
                              <div style={{ marginBottom: 14 }}>
                                <div style={{ fontSize: 10, color: C.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
                                  Trechos Relevantes Encontrados:
                                </div>
                                {hit.highlights.map((h, hi) => (
                                  <div key={hi} style={{
                                    padding: "8px 12px", background: "#050911", border: `1px solid ${C.border}`,
                                    borderRadius: 6, marginBottom: 6, fontSize: 11, color: "#99b0c7",
                                    lineBreak: "anywhere", lineHeight: 1.5, textAlign: "left"
                                  }}>
                                    <span dangerouslySetInnerHTML={{ __html: h.marked }} />
                                  </div>
                                ))}
                              </div>
                            )}

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "8px" }}>
                              {/* Left Column: Event Markdown */}
                              <div style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{ fontSize: 10, color: C.accent, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5, textAlign: "left" }}>
                                  Descrição do Evento
                                </div>
                                <div style={{
                                  background: "#050911", padding: "12px 16px", borderRadius: 8,
                                  border: `1px solid ${C.border}`, maxHeight: "300px", overflowY: "auto",
                                  textAlign: "left"
                                }}>
                                  {renderMarkdown(hit.event_content)}
                                </div>
                              </div>

                              {/* Right Column: Log Console */}
                              <div style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{ fontSize: 10, color: "#f87171", fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5, textAlign: "left" }}>
                                  Conteúdo do Log
                                </div>
                                <pre style={{
                                  background: "#010409", border: `1px solid ${C.border}`,
                                  borderRadius: 8, padding: "12px 16px", overflowY: "auto",
                                  fontFamily: "monospace", color: "#f0f6fc", fontSize: "11px",
                                  maxHeight: "300px", textAlign: "left", margin: 0,
                                  whiteSpace: "pre-wrap", wordBreak: "break-all"
                                }}>
                                  {hit.log_content || "Conteúdo do log não disponível."}
                                </pre>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: File Pairs List */}
        {activeTab === "files" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 11, color: C.muted }}>
                Pares de arquivos de Logs e Eventos persistidos no indexador
              </span>
              <span style={{ fontSize: 11, color: C.accent, fontWeight: 700 }}>
                {indexedFiles.length} Par(es)
              </span>
            </div>

            {indexedFiles.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 0", border: `1px dashed ${C.border}`, borderRadius: 12 }}>
                <FiFolder style={{ fontSize: 32, color: C.muted, marginBottom: 12, display: "inline-block" }} />
                <span style={{ fontSize: 12, color: C.muted, display: "block" }}>Nenhum par de arquivos indexado.</span>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {indexedFiles.map(f => {
                  const isExpanded = expandedFileId === f.id;
                  
                  return (
                    <div key={f.id} style={{
                      background: C.panel, border: `1px solid ${C.border}`,
                      borderRadius: 10, overflow: "hidden"
                    }}>
                      {/* Row Header */}
                      <div 
                        onClick={() => setExpandedFileId(isExpanded ? null : f.id)}
                        style={{ padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <FiLayers style={{ color: C.accent, fontSize: 16 }} />
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#dde8f8" }}>
                              App: {f.app_name} <span style={{ color: C.muted, fontWeight: 400 }}>· ID: {f.pair_id}</span>
                            </div>
                            <div style={{ display: "flex", gap: 12, marginTop: 4, fontSize: 10, color: C.muted }}>
                              <span>Evento: <b style={{ color: "#7cb8e0" }}>{f.filename_event}</b></span>
                              <span>Log: <b style={{ color: "#7cb8e0" }}>{f.filename_log}</b></span>
                              <span>·</span>
                              <span>{fmt(f.line_count)} linhas</span>
                              <span>{fileSize(f.file_size)}</span>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 16 }} onClick={e => e.stopPropagation()}>
                          <span style={{ fontSize: 10, color: C.muted }}>
                            {new Date(f.uploaded_at).toLocaleString("pt-BR")}
                          </span>
                          
                          <button
                            onClick={() => removeFile(f.id)}
                            style={{ 
                              background: "none", border: "none", color: "#e11d48", 
                              cursor: "pointer", fontSize: 13, padding: 4
                            }}
                            title="Remover par"
                          >
                            <FiTrash2 />
                          </button>

                          <button
                            onClick={() => setExpandedFileId(isExpanded ? null : f.id)}
                            style={{
                              background: "none", border: "none", color: C.muted,
                              cursor: "pointer", fontSize: 12, padding: 4
                            }}
                          >
                            {isExpanded ? (
                              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><FiChevronUp /> Ocultar</span>
                            ) : (
                              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><FiChevronDown /> Visualizar</span>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Expandable Markdown & Log Visualizer */}
                      {isExpanded && (
                        <div style={{ 
                          borderTop: `1px solid ${C.border}`, 
                          background: "#080e1a", 
                          padding: "20px 24px",
                          animation: "fadeUp 0.2s ease"
                        }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                            {/* Left Column: Event Description */}
                            <div style={{ display: "flex", flexDirection: "column" }}>
                              <div style={{ 
                                display: "flex", 
                                justifyContent: "space-between", 
                                alignItems: "center", 
                                borderBottom: "1px solid #162033", 
                                paddingBottom: 8, 
                                marginBottom: 12 
                              }}>
                                <span style={{ fontSize: 10, color: C.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
                                  Descrição do Evento
                                </span>
                                <span style={{ fontSize: 9, color: C.muted }}>
                                  {f.filename_event}
                                </span>
                              </div>
                              <div style={{ 
                                background: "#0a1324", 
                                padding: "16px 20px", 
                                borderRadius: 8, 
                                border: "1px solid #162033",
                                maxHeight: 350, 
                                overflowY: "auto",
                                textAlign: "left"
                              }}>
                                {renderMarkdown(f.event_content)}
                              </div>
                            </div>

                            {/* Right Column: Log File */}
                            <div style={{ display: "flex", flexDirection: "column" }}>
                              <div style={{ 
                                display: "flex", 
                                justifyContent: "space-between", 
                                alignItems: "center", 
                                borderBottom: "1px solid #162033", 
                                paddingBottom: 8, 
                                marginBottom: 12 
                              }}>
                                <span style={{ fontSize: 10, color: "#f87171", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
                                  Conteúdo do Log
                                </span>
                                <span style={{ fontSize: 9, color: C.muted }}>
                                  {f.filename_log}
                                </span>
                              </div>
                              <pre style={{ 
                                background: "#010409", 
                                padding: "16px 20px", 
                                borderRadius: 8, 
                                border: "1px solid #162033",
                                maxHeight: 350, 
                                overflowY: "auto",
                                fontFamily: "monospace",
                                color: "#f0f6fc",
                                fontSize: "11px",
                                textAlign: "left",
                                margin: 0,
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-all"
                              }}>
                                {f.log_content || "Conteúdo do log não disponível."}
                              </pre>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Metrics Dashboard */}
        {activeTab === "metrics" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#dde8f8", display: "block" }}>
                  Avaliação de Relevância
                </span>
                <span style={{ fontSize: 11, color: C.muted }}>
                  Calcula métricas de MRR e nDCG@5 sobre as consultas gabaritadas
                </span>
              </div>
              <button
                onClick={fetchMetrics}
                disabled={metricsLoading}
                style={{
                  background: "linear-gradient(135deg,#2563eb,#4f46e5)",
                  border: "none", color: "#fff", borderRadius: 8,
                  padding: "10px 20px", fontSize: 12, fontWeight: 600,
                  cursor: metricsLoading ? "not-allowed" : "pointer",
                  boxShadow: "0 0 16px rgba(79,70,229,.3)",
                  whiteSpace: "nowrap"
                }}
              >
                {metricsLoading ? "Calculando..." : <span style={{ display: "flex", alignItems: "center", gap: 6 }}><FiActivity /> Executar Avaliação</span>}
              </button>
            </div>

            {/* Error Message */}
            {metricsError && (
              <div style={{
                background: "#1a0a0a", border: "1px solid #4a1010",
                borderRadius: 10, padding: "14px 18px", color: "#ef4444", fontSize: 12,
                marginBottom: 20
              }}>
                <FiAlertTriangle style={{ display: "inline-block", marginRight: 6 }} /> {metricsError}
              </div>
            )}

            {/* Default prompt */}
            {!metricsData && !metricsLoading && !metricsError && (
              <div style={{ textAlign: "center", padding: "64px 0", border: `1px dashed ${C.border}`, borderRadius: 12 }}>
                <FiActivity style={{ fontSize: 32, color: C.muted, display: "inline-block", marginBottom: 12 }} />
                <span style={{ fontSize: 12, color: C.muted, display: "block", marginBottom: 14 }}>
                  Nenhuma avaliação calculada para esta sessão.
                </span>
                <span style={{ fontSize: 11, color: "#475c75" }}>
                  Clique no botão acima para iniciar a busca automatizada das queries de teste no banco de dados e obter a comparação de algoritmos.
                </span>
              </div>
            )}

            {/* Spinner */}
            {metricsLoading && (
              <div style={{ textAlign: "center", padding: "64px 0" }}>
                <div style={{
                  display: "inline-block", width: 42, height: 42,
                  border: "3px solid #0f2040", borderTopColor: C.accent,
                  borderRadius: "50%", animation: "spin .8s linear infinite",
                }} />
                <div style={{ marginTop: 16, color: "#1e3a5f", fontSize: 13 }}>
                  Executando consultas experimentais e compilando estatísticas...
                </div>
              </div>
            )}

            {/* Metrics Dashboard Table */}
            {metricsData && !metricsLoading && (
              <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "fadeUp 0.3s ease" }}>
                
                {/* Visual Cards Summary */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
                  {Object.entries(metricsData).map(([strategy, value]) => {
                    const isBestMRR = Math.max(...Object.values(metricsData).map(v => v.mrr)) === value.mrr;
                    
                    return (
                      <div key={strategy} style={{
                        background: C.panel, border: `1px solid ${isBestMRR ? "#f59e0b88" : C.border}`,
                        borderRadius: 12, padding: "16px 20px", position: "relative", overflow: "hidden"
                      }}>
                        {isBestMRR && (
                          <div style={{
                            position: "absolute", right: -25, top: 12, background: "#f59e0b",
                            color: "#000", fontSize: 8, fontWeight: 800, padding: "4px 24px",
                            transform: "rotate(45deg)", letterSpacing: 0.5
                          }}>
                            BEST
                          </div>
                        )}
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#dde8f8", display: "block", marginBottom: 12, paddingRight: 30 }}>
                          {strategy}
                        </span>

                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.muted, marginBottom: 2 }}>
                              <span>MRR</span>
                              <span style={{ color: C.accent, fontWeight: 700 }}>{(value.mrr * 100).toFixed(1)}%</span>
                            </div>
                            <div style={{ height: 6, background: "#0a1220", borderRadius: 3, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${value.mrr * 100}%`, background: "linear-gradient(90deg, #3b82f6, #60a5fa)", borderRadius: 3 }} />
                            </div>
                          </div>

                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.muted, marginBottom: 2 }}>
                              <span>nDCG@5</span>
                              <span style={{ color: "#22c55e", fontWeight: 700 }}>{(value.ndcg_5 * 100).toFixed(1)}%</span>
                            </div>
                            <div style={{ height: 6, background: "#0a1220", borderRadius: 3, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${value.ndcg_5 * 100}%`, background: "linear-gradient(90deg, #22c55e, #4ade80)", borderRadius: 3 }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Strategy Details Table */}
                <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}`, background: C.faint }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#dde8f8" }}>
                      Tabela Comparativa de Estratégias
                    </span>
                  </div>
                  
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, color: C.muted }}>
                        <th style={{ padding: "12px 18px" }}>Estratégia de Busca</th>
                        <th style={{ padding: "12px 18px", width: 100, textAlign: "center" }}>MRR</th>
                        <th style={{ padding: "12px 18px", width: 100, textAlign: "center" }}>nDCG@5</th>
                        <th style={{ padding: "12px 18px", width: 130, textAlign: "right" }}>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(metricsData).map(([strategy, value]) => {
                        const isExpanded = expandedMetricStrategy === strategy;
                        
                        return (
                          <>
                            <tr key={strategy} style={{ borderBottom: `1px solid ${C.border}`, background: isExpanded ? "rgba(59, 130, 246, 0.02)" : "transparent" }}>
                              <td style={{ padding: "14px 18px", fontWeight: 600, color: "#dde8f8" }}>
                                {strategy}
                              </td>
                              <td style={{ padding: "14px 18px", textAlign: "center", color: C.accent, fontWeight: 700 }}>
                                {value.mrr.toFixed(4)}
                              </td>
                              <td style={{ padding: "14px 18px", textAlign: "center", color: "#22c55e", fontWeight: 700 }}>
                                {value.ndcg_5.toFixed(4)}
                              </td>
                              <td style={{ padding: "14px 18px", textAlign: "right" }}>
                                <button
                                  onClick={() => setExpandedMetricStrategy(isExpanded ? null : strategy)}
                                  style={{
                                    background: "rgba(59, 130, 246, 0.08)", border: "none",
                                    color: C.accent, borderRadius: 6, padding: "5px 10px",
                                    cursor: "pointer", fontSize: 10, fontWeight: 600
                                  }}
                                >
                                  {isExpanded ? (
                                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><FiChevronUp /> Recolher</span>
                                  ) : (
                                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><FiChevronDown /> Detalhes</span>
                                  )}
                                </button>
                              </td>
                            </tr>

                            {/* Detail Subtable of Queries */}
                            {isExpanded && (
                              <tr>
                                <td colSpan={4} style={{ padding: "16px 24px", background: "#080e1a", borderBottom: `1px solid ${C.border}` }}>
                                  <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
                                    Desempenho por Query Experimental:
                                  </div>
                                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {value.queries.map((qDetail, qIdx) => (
                                      <div key={qIdx} style={{
                                        background: "#0a1324", padding: "10px 14px", border: `1px solid ${C.border}`,
                                        borderRadius: 8, fontSize: 11
                                      }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                          <span style={{ color: "#fff", fontWeight: 600 }}>Query: "{qDetail.query}"</span>
                                          <div style={{ display: "flex", gap: 10 }}>
                                            <span style={{ color: C.accent }}>RR: <b>{qDetail.rr.toFixed(3)}</b></span>
                                            <span style={{ color: "#22c55e" }}>nDCG@5: <b>{qDetail.ndcg_5.toFixed(3)}</b></span>
                                          </div>
                                        </div>
                                        <div style={{ fontSize: 10, color: C.muted }}>
                                          <div style={{ marginBottom: 2 }}>Target Log esperado: <code style={{ color: "#9aa3b2" }}>{qDetail.target_log}</code></div>
                                          <div>Recuperados (Top 5): <span style={{ color: "#5086b6" }}>{qDetail.retrieved_top_5.join(", ") || "Nenhum"}</span></div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

              </div>
            )}
          </div>
        )}

      </div>

      {/* ── Modal: Create File Pair ──────────────────────────────────────── */}
      {isUploadOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(3, 5, 10, 0.85)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000, animation: "fadeUp 0.2s ease"
        }}>
          <div style={{
            background: C.panel, border: `1px solid ${C.border}`,
            borderRadius: 16, width: "90%", maxWidth: 500, padding: 24,
            boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#dde8f8" }}>
                Enviar Novo Par (Evento + Log)
              </span>
              <button
                onClick={() => {
                  setIsUploadOpen(false);
                  setUploadError(null);
                }}
                style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 16 }}
              >
                <FiX />
              </button>
            </div>

            {uploadError && (
              <div style={{
                background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: 8, padding: 10, color: "#ef4444", fontSize: 11, marginBottom: 14
              }}>
                <FiAlertTriangle style={{ display: "inline-block", marginRight: 6 }} /> {uploadError}
              </div>
            )}

            <form onSubmit={handleUploadSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Event File Input (.md, .txt) */}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 6 }}>
                  Arquivo de Evento / Issue (.md, .txt) *
                </label>
                <div style={{
                  border: `1px dashed ${eventFile ? C.accent : C.border}`,
                  borderRadius: 8, padding: "14px 18px", textAlign: "center",
                  background: eventFile ? "rgba(59, 130, 246, 0.03)" : C.faint,
                  position: "relative", cursor: "pointer"
                }} onClick={() => document.getElementById("event-file-input")?.click()}>
                  <FiFileText style={{ fontSize: 24, color: C.accent, display: "inline-block", marginBottom: 6 }} />
                  <span style={{ fontSize: 11, color: eventFile ? "#fff" : C.muted, display: "block" }}>
                    {eventFile ? eventFile.name : "Clique para selecionar o arquivo de Evento"}
                  </span>
                  <input
                    id="event-file-input"
                    type="file"
                    accept=".md,.txt"
                    style={{ display: "none" }}
                    onChange={e => e.target.files && setEventFile(e.target.files[0])}
                  />
                </div>
              </div>

              {/* Log File Input (.log) */}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 6 }}>
                  Arquivo de Log (.log) *
                </label>
                <div style={{
                  border: `1px dashed ${logFile ? C.accent : C.border}`,
                  borderRadius: 8, padding: "14px 18px", textAlign: "center",
                  background: logFile ? "rgba(59, 130, 246, 0.03)" : C.faint,
                  position: "relative", cursor: "pointer"
                }} onClick={() => document.getElementById("log-file-input")?.click()}>
                  <FiActivity style={{ fontSize: 24, color: "#f87171", display: "inline-block", marginBottom: 6 }} />
                  <span style={{ fontSize: 11, color: logFile ? "#fff" : C.muted, display: "block" }}>
                    {logFile ? logFile.name : "Clique para selecionar o arquivo de Log"}
                  </span>
                  <input
                    id="log-file-input"
                    type="file"
                    accept=".log"
                    style={{ display: "none" }}
                    onChange={e => e.target.files && setLogFile(e.target.files[0])}
                  />
                </div>
              </div>

              {/* App Name Input (Optional) */}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 6 }}>
                  Nome da Aplicação / App Name (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: ActivityDiary (deduzido se vazio)"
                  value={appNameInput}
                  onChange={e => setAppNameInput(e.target.value)}
                  style={{
                    width: "100%", boxSizing: "border-box", background: "#0a1220",
                    border: `1px solid ${C.border}`, borderRadius: 8, padding: 10,
                    color: C.text, fontSize: 11, outline: "none"
                  }}
                />
              </div>

              {/* Pair ID Input (Optional) */}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 6 }}>
                  ID do Par / Issue ID (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: 118 (deduzido se vazio)"
                  value={pairIdInput}
                  onChange={e => setPairIdInput(e.target.value)}
                  style={{
                    width: "100%", boxSizing: "border-box", background: "#0a1220",
                    border: `1px solid ${C.border}`, borderRadius: 8, padding: 10,
                    color: C.text, fontSize: 11, outline: "none"
                  }}
                />
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 10 }}>
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  style={{
                    background: "none", border: `1px solid ${C.border}`, color: C.muted,
                    borderRadius: 8, padding: "10px 18px", fontSize: 12, fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  style={{
                    background: "linear-gradient(135deg,#2563eb,#4f46e5)", border: "none", color: "#fff",
                    borderRadius: 8, padding: "10px 20px", fontSize: 12, fontWeight: 600,
                    cursor: uploading ? "not-allowed" : "pointer",
                    boxShadow: "0 0 16px rgba(79,70,229,.3)"
                  }}
                >
                  {uploading ? "Indexando..." : "Submeter Par"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global CSS animations */}
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin   { to { transform: rotate(360deg); } }
        input::placeholder { color: #354a66; }
        * { scrollbar-width: thin; scrollbar-color: #162033 transparent; }
      `}</style>
    </div>
  );
}