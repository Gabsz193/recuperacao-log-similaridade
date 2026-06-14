import React, { useState } from "react";
import { FiActivity, FiAlertTriangle, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { C } from "../utils/helpers";
import { MetricsResponse } from "../types";

interface MetricsTabProps {
  apiBaseUrl: string;
}

export default function MetricsTab({ apiBaseUrl }: MetricsTabProps) {
  const [metricsLoading, setMetricsLoading] = useState(false);
  const [metricsData, setMetricsData] = useState<MetricsResponse | null>(null);
  const [metricsError, setMetricsError] = useState<string | null>(null);
  const [chartTimestamp, setChartTimestamp] = useState<number>(Date.now());
  const [expandedMetricStrategy, setExpandedMetricStrategy] = useState<string | null>(null);

  const fetchMetrics = async () => {
    setMetricsLoading(true);
    setMetricsError(null);
    setMetricsData(null);
    try {
      const r = await fetch(`${apiBaseUrl}/metrics`);
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Erro ao buscar métricas");
      setMetricsData(d);
      setChartTimestamp(Date.now());
    } catch (err: any) {
      setMetricsError(err.message || "Erro ao calcular métricas.");
    } finally {
      setMetricsLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-header)", display: "block" }}>
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
            border: "3px solid var(--app-faint)", borderTopColor: C.accent,
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
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-header)", display: "block", marginBottom: 12, paddingRight: 30 }}>
                    {strategy}
                  </span>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.muted, marginBottom: 2 }}>
                        <span>MRR</span>
                        <span style={{ color: C.accent, fontWeight: 700 }}>{(value.mrr * 100).toFixed(1)}%</span>
                      </div>
                      <div style={{ height: 6, background: "var(--app-faint)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${value.mrr * 100}%`, background: "linear-gradient(90deg, #3b82f6, #60a5fa)", borderRadius: 3 }} />
                      </div>
                    </div>

                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.muted, marginBottom: 2 }}>
                        <span>nDCG@5</span>
                        <span style={{ color: "#22c55e", fontWeight: 700 }}>{(value.ndcg_5 * 100).toFixed(1)}%</span>
                      </div>
                      <div style={{ height: 6, background: "var(--app-faint)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${value.ndcg_5 * 100}%`, background: "linear-gradient(90deg, #22c55e, #4ade80)", borderRadius: 3 }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual Chart Card */}
          <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-header)", marginBottom: 16, textAlign: "left" }}>
              Desempenho Comparativo das Estratégias (MRR e nDCG@5)
            </div>
            <div style={{ background: "var(--app-bg)", borderRadius: 8, padding: "16px", display: "flex", justifyContent: "center", alignItems: "center", border: `1px solid ${C.border}` }}>
              <img
                src={`${apiBaseUrl}/charts/metrics?t=${chartTimestamp}`}
                alt="Gráfico Comparativo de Métricas"
                style={{ maxWidth: "100%", height: "auto", borderRadius: 4 }}
              />
            </div>
          </div>

          {/* Strategy Details Table */}
          <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}`, background: C.faint }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-header)" }}>
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
                    <React.Fragment key={strategy}>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: isExpanded ? "rgba(59, 130, 246, 0.02)" : "transparent" }}>
                        <td style={{ padding: "14px 18px", fontWeight: 600, color: "var(--text-header)" }}>
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
                          <td colSpan={4} style={{ padding: "16px 24px", background: "var(--expanded-bg)", borderBottom: `1px solid ${C.border}` }}>
                            <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
                              Desempenho por Query Experimental:
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                              {value.queries.map((qDetail, qIdx) => (
                                <div key={qIdx} style={{
                                  background: "var(--inner-bg)", padding: "10px 14px", border: `1px solid ${C.border}`,
                                  borderRadius: 8, fontSize: 11
                                }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                    <span style={{ color: "var(--text-header)", fontWeight: 600 }}>Query: "{qDetail.query}"</span>
                                    <div style={{ display: "flex", gap: 10 }}>
                                      <span style={{ color: C.accent }}>RR: <b>{qDetail.rr.toFixed(3)}</b></span>
                                      <span style={{ color: "#22c55e" }}>nDCG@5: <b>{qDetail.ndcg_5.toFixed(3)}</b></span>
                                    </div>
                                  </div>
                                  <div style={{ fontSize: 10, color: C.muted }}>
                                    <div style={{ marginBottom: 2 }}>Target Log esperado: <code style={{ color: "var(--app-text)" }}>{qDetail.target_log}</code></div>
                                    <div>Recuperados (Top 5): <span style={{ color: "#5086b6" }}>{qDetail.retrieved_top_5.join(", ") || "Nenhum"}</span></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  );
}
