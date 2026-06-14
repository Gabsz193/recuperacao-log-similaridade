import React, { useState } from "react";
import { FiActivity, FiFileText } from "react-icons/fi";
import { C } from "../utils/helpers";

interface AnalysisTabProps {
  indexedFilesCount: number;
  apiBaseUrl: string;
}

export default function AnalysisTab({ indexedFilesCount, apiBaseUrl }: AnalysisTabProps) {
  const [chartTimestamp, setChartTimestamp] = useState<number>(Date.now());

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-header)", display: "block" }}>
            Análise de Termos dos Eventos
          </span>
          <span style={{ fontSize: 11, color: C.muted }}>
            Visualização de termos recorrentes e frequências nas descrições de issues indexadas
          </span>
        </div>
        <button
          onClick={() => setChartTimestamp(Date.now())}
          style={{
            background: "linear-gradient(135deg,#2563eb,#4f46e5)",
            border: "none", color: "#fff", borderRadius: 8,
            padding: "10px 20px", fontSize: 12, fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 0 16px rgba(79,70,229,.3)",
            whiteSpace: "nowrap"
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><FiActivity /> Atualizar Análise</span>
        </button>
      </div>

      {indexedFilesCount === 0 ? (
        <div style={{ textAlign: "center", padding: "64px 0", border: `1px dashed ${C.border}`, borderRadius: 12 }}>
          <FiFileText style={{ fontSize: 32, color: C.muted, display: "inline-block", marginBottom: 12 }} />
          <span style={{ fontSize: 12, color: C.muted, display: "block" }}>
            Nenhum par de arquivos indexado. Indexe documentos para visualizar a análise.
          </span>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "start", animation: "fadeUp 0.3s ease" }}>
          {/* Nuvem de Palavras */}
          <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-header)" }}>
              Nuvem de Palavras dos Eventos
            </div>
            <div style={{ background: "var(--app-bg)", borderRadius: 8, padding: 10, display: "flex", justifyContent: "center", alignItems: "center", border: `1px solid ${C.border}` }}>
              <img
                src={`${apiBaseUrl}/charts/wordcloud?t=${chartTimestamp}`}
                alt="Nuvem de Palavras"
                style={{ maxWidth: "100%", height: "auto", borderRadius: 4 }}
              />
            </div>
          </div>

          {/* Top 10 Palavras */}
          <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-header)" }}>
              Palavras mais Frequentes
            </div>
            <div style={{ background: "var(--app-bg)", borderRadius: 8, padding: 10, display: "flex", justifyContent: "center", alignItems: "center", border: `1px solid ${C.border}` }}>
              <img
                src={`${apiBaseUrl}/charts/word-freq?t=${chartTimestamp}`}
                alt="Top 10 Palavras"
                style={{ maxWidth: "100%", height: "auto", borderRadius: 4 }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
