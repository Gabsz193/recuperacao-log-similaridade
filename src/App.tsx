import { useState, useEffect } from "react";
import { 
  FiSearch, FiUploadCloud, FiFolder, 
  FiPlus, FiActivity, FiLayers
} from "react-icons/fi";

// -- Components & Helpers --
import UploadModal from "./components/UploadModal";
import SearchTab from "./components/SearchTab";
import DocumentsTab from "./components/DocumentsTab";
import MetricsTab from "./components/MetricsTab";
import AnalysisTab from "./components/AnalysisTab";
import { C, fmt, StatusDot } from "./utils/helpers";
import { IndexedFilePair, ESStatus } from "./types";

// ── Config ─────────────────────────────────────────────────────────────────
const API = "http://localhost:5000/logs";

export default function App() {
  const [activeTab, setActiveTab]         = useState<"search" | "files" | "metrics" | "analysis">("search");
  
  // ES indexed files/pairs
  const [indexedFiles, setIndexedFiles]   = useState<IndexedFilePair[]>([]);
  const [esStatus, setEsStatus]           = useState<ESStatus | null>(null);
  
  // Upload pairs state
  const [isUploadOpen, setIsUploadOpen]   = useState(false);

  // Bulk Import state
  const [importing, setImporting]         = useState(false);
  const [globalMessage, setGlobalMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

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
        text: `Importação em lote realizada! ${d.imported} pares importados e indexados com sucesso.`,
      });
      await fetchFiles();
      await fetchHealth();
    } catch (err: any) {
      setGlobalMessage({ type: "err", text: `Erro na importação: ${err.message}` });
    } finally {
      setImporting(false);
    }
  };

  const handleUploadSuccess = (msg: string) => {
    setGlobalMessage({ type: "ok", text: msg });
    fetchFiles();
    fetchHealth();
  };

  const handleRemoveSuccess = (msg: string) => {
    setGlobalMessage({ type: "ok", text: msg });
    fetchFiles();
    fetchHealth();
  };

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
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text-header)" }}>
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
                background: importing ? "var(--app-faint)" : "rgba(34, 197, 94, 0.1)",
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
              color: activeTab === "search" ? "var(--text-header)" : C.muted,
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
              color: activeTab === "files" ? "var(--text-header)" : C.muted,
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
              color: activeTab === "metrics" ? "var(--text-header)" : C.muted,
              padding: "10px 16px", fontSize: 12, fontWeight: activeTab === "metrics" ? 700 : 500,
              cursor: "pointer", transition: "all 0.2s", marginBottom: -1
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><FiLayers /> Avaliação</span>
          </button>
          <button
            onClick={() => setActiveTab("analysis")}
            style={{
              background: "none", border: "none",
              borderBottom: `2px solid ${activeTab === "analysis" ? C.accent : "transparent"}`,
              color: activeTab === "analysis" ? "var(--text-header)" : C.muted,
              padding: "10px 16px", fontSize: 12, fontWeight: activeTab === "analysis" ? 700 : 500,
              cursor: "pointer", transition: "all 0.2s", marginBottom: -1
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><FiActivity /> Análise</span>
          </button>
        </div>
      </div>

      {/* ── Tab Contents ────────────────────────────────────────────────── */}
      <div style={{ padding: "24px 32px" }}>
        {activeTab === "search" && (
          <SearchTab indexedFilesCount={indexedFiles.length} apiBaseUrl={API} />
        )}
        {activeTab === "files" && (
          <DocumentsTab indexedFiles={indexedFiles} onRemoveSuccess={handleRemoveSuccess} apiBaseUrl={API} />
        )}
        {activeTab === "metrics" && (
          <MetricsTab apiBaseUrl={API} />
        )}
        {activeTab === "analysis" && (
          <AnalysisTab indexedFilesCount={indexedFiles.length} apiBaseUrl={API} />
        )}
      </div>

      {/* ── Modal: Create File Pair ──────────────────────────────────────── */}
      <UploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
        onUploadSuccess={handleUploadSuccess} 
        apiBaseUrl={API} 
      />

      {/* Global CSS animations */}
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin   { to { transform: rotate(360deg); } }
        input::placeholder { color: var(--app-muted); }
        * { scrollbar-width: thin; scrollbar-color: var(--app-border) transparent; }
      `}</style>
    </div>
  );
}