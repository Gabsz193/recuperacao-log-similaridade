import React, { useState } from "react";
import { FiFolder, FiLayers, FiTrash2, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { C, fmt, fileSize, renderMarkdown } from "../utils/helpers";
import { IndexedFilePair } from "../types";

interface DocumentsTabProps {
  indexedFiles: IndexedFilePair[];
  onRemoveSuccess: (message: string) => void;
  apiBaseUrl: string;
}

export default function DocumentsTab({ indexedFiles, onRemoveSuccess, apiBaseUrl }: DocumentsTabProps) {
  const [expandedFileId, setExpandedFileId] = useState<string | null>(null);

  async function removeFile(id: string) {
    if (!confirm("Deseja realmente remover este par do índice?")) return;
    try {
      const r = await fetch(`${apiBaseUrl}/files/${id}`, { method: "DELETE" });
      if (!r.ok) throw new Error("Erro na remoção do servidor");
      onRemoveSuccess("Par removido do índice com sucesso.");
    } catch (err: any) {
      alert("Erro ao remover: " + err.message);
    }
  }

  return (
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
                      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-header)" }}>
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
                    background: "var(--expanded-bg)", 
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
                          borderBottom: "1px solid var(--app-border)", 
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
                          background: "var(--inner-bg)", 
                          padding: "16px 20px", 
                          borderRadius: 8, 
                          border: "1px solid var(--app-border)",
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
                          borderBottom: "1px solid var(--app-border)", 
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
                          background: "var(--code-block-bg)", 
                          padding: "16px 20px", 
                          borderRadius: 8, 
                          border: "1px solid var(--app-border)",
                          maxHeight: 350, 
                          overflowY: "auto",
                          fontFamily: "monospace",
                          color: "var(--app-text)",
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
  );
}
