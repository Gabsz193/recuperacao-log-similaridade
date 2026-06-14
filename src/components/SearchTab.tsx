import React, { useState } from "react";
import { FiSearch, FiFileText, FiAlertTriangle } from "react-icons/fi";
import { C, fmt, fileSize, Pill, renderMarkdown } from "../utils/helpers";
import { SearchResult } from "../types";

interface SearchTabProps {
  indexedFilesCount: number;
  apiBaseUrl: string;
}

export default function SearchTab({ indexedFilesCount, apiBaseUrl }: SearchTabProps) {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<"log_standard" | "log_custom" | "event_standard" | "hybrid">("log_custom");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [expandedHit, setExpandedHit] = useState<string | null>(null);

  const doSearch = async (q = query) => {
    if (!q.trim()) return;
    setSearching(true);
    setSearchError(null);
    setResults(null);
    setExpandedHit(null);

    try {
      const r = await fetch(`${apiBaseUrl}/search`, {
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

  const maxScore = results?.max_score || 1;

  return (
    <div>
      {/* Search Type Segmented Control */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          {[
            { id: "log_standard", label: "Log Standard", desc: "Busca no texto bruto do log" },
            { id: "log_custom", label: "Log Custom (Analyzer)", desc: "Busca em log com limpeza de ruídos" },
            { id: "event_standard", label: "Event Search", desc: "Busca na descrição da issue/evento" },
            { id: "hybrid", label: "Hybrid Search", desc: "Busca combinada em log e issue" }
          ].map(opt => {
            const isActive = searchType === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSearchType(opt.id as any)}
                style={{
                  flex: "1 1 auto",
                  minWidth: "150px",
                  background: isActive ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : C.panel,
                  border: `1px solid ${isActive ? C.accent : C.border}`,
                  color: isActive ? "#fff" : "var(--app-text)",
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontSize: 11,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textAlign: "center",
                  boxShadow: isActive ? "0 0 12px rgba(37, 99, 235, 0.2)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 700 }}>{opt.label}</span>
                <span style={{ fontSize: 9, opacity: isActive ? 0.9 : 0.6, fontWeight: 400 }}>{opt.desc}</span>
              </button>
            );
          })}
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.muted, padding: "0 4px" }}>
          <span>
            {searchType === "log_standard" && "Tipo: Busca simples por termos no log bruto."}
            {searchType === "log_custom" && "Tipo: Busca inteligente no log utilizando analisador com remoção de ruídos (IP, Hora, etc)."}
            {searchType === "event_standard" && "Tipo: Busca por palavras-chave na descrição textual da issue."}
            {searchType === "hybrid" && "Tipo: Busca combinada utilizando a melhor pontuação entre o log normalizado e a issue."}
          </span>
          <span>Elasticsearch BM25</span>
        </div>
      </div>

      {/* Search Input Box */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.accent, display: "flex", alignItems: "center", pointerEvents: "none" }}><FiSearch /></span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && doSearch()}
            placeholder={
              searchType === "log_standard" || searchType === "log_custom"
                ? "Cole o log de referência aqui..."
                : searchType === "event_standard"
                ? "Digite o evento/descrição de referência..."
                : "Digite a descrição ou cole o log de referência..."
            }
            style={{
              width: "100%", boxSizing: "border-box",
              background: "var(--input-bg)", border: `1px solid ${C.border}`,
              borderRadius: 10, padding: "13px 14px 13px 44px",
              color: C.text, fontSize: 12, outline: "none",
            }}
            onFocus={e => e.target.style.borderColor = C.accent}
            onBlur={e => e.target.style.borderColor = C.border}
          />
        </div>
        <button
          onClick={() => doSearch()}
          disabled={!indexedFilesCount || !query.trim() || searching}
          style={{
            background: indexedFilesCount && query.trim() && !searching
              ? "linear-gradient(135deg,#2563eb,#4f46e5)" : "var(--button-disabled)",
            border: "none", borderRadius: 10, padding: "0 24px",
            color: indexedFilesCount && query.trim() ? "#fff" : "var(--text-disabled)",
            fontSize: 13, fontWeight: 600,
            cursor: indexedFilesCount && !searching ? "pointer" : "not-allowed",
            boxShadow: indexedFilesCount && query.trim() ? "0 0 18px rgba(79,70,229,.3)" : "none",
            whiteSpace: "nowrap",
          }}
        >
          {searching ? "Buscando…" : "Buscar"}
        </button>
      </div>

      {/* Helper message */}
      {!indexedFilesCount && (
        <div style={{ fontSize: 11, color: "#e11d48", padding: "12px", border: "1px solid #e11d4833", borderRadius: 8, background: "#8813371a", textAlign: "center", marginBottom: 20 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <FiAlertTriangle /> O índice do Elasticsearch está vazio. Use o botão <b>Importar em Lote</b> ou <b>Novo Par</b> acima para indexar arquivos.
          </span>
        </div>
      )}

      {/* Default State */}
      {results === null && !searching && !searchError && indexedFilesCount > 0 && (
        <div style={{ textAlign: "center", padding: "48px 0", color: "#1e3a5f" }}>
          <div style={{ fontSize: 36, marginBottom: 12, color: C.muted, display: "flex", justifyContent: "center" }}>
            <FiFileText />
          </div>
          <div style={{ fontSize: 13 }}>
            {fmt(indexedFilesCount)} par(es) de arquivos disponíveis no índice. Faça sua busca por similaridade.
          </div>
        </div>
      )}

      {/* Spinner */}
      {searching && (
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <div style={{
            display: "inline-block", width: 36, height: 36,
            border: "3px solid var(--app-faint)", borderTopColor: C.accent,
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
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <FiAlertTriangle /> {searchError}
          </span>
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
                  borderLeft: `3px solid ${noMatch ? "var(--app-border)" : rank === 0 ? "#f59e0b" : C.accent}`,
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
                        background: rank === 0 && !noMatch ? "linear-gradient(135deg,#f59e0b,#d97706)" : "var(--badge-bg)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 800,
                        color: rank === 0 && !noMatch ? "#000" : "#2a4060",
                        border: rank === 0 ? "none" : `1px solid ${C.border}`,
                      }}>
                        {rank + 1}
                      </div>

                      {/* Details */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 13, color: "var(--text-header)", fontWeight: 700 }}>
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
                        <div style={{ marginTop: 5, width: 100, height: 4, background: "var(--app-faint)", borderRadius: 4, overflow: "hidden" }}>
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
                    <div style={{ borderTop: `1px solid ${C.border}`, padding: "16px 20px", background: "var(--expanded-bg)" }}>
                      {hit.highlights && hit.highlights.length > 0 && (
                        <div style={{ marginBottom: 14 }}>
                          <div style={{ fontSize: 10, color: C.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
                            Trechos Relevantes Encontrados:
                          </div>
                          {hit.highlights.map((h, hi) => (
                            <div key={hi} style={{
                              padding: "8px 12px", background: "var(--inner-bg)", border: `1px solid ${C.border}`,
                              borderRadius: 6, marginBottom: 6, fontSize: 11, color: "var(--app-text)",
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
                            background: "var(--inner-bg)", padding: "12px 16px", borderRadius: 8,
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
                            background: "var(--code-block-bg)", border: `1px solid ${C.border}`,
                            borderRadius: 8, padding: "12px 16px", overflowY: "auto",
                            fontFamily: "monospace", color: "var(--app-text)", fontSize: "11px",
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
  );
}
