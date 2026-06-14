import React, { useState } from "react";
import { FiX, FiFileText, FiActivity, FiAlertTriangle } from "react-icons/fi";
import { C } from "../utils/helpers";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (message: string) => void;
  apiBaseUrl: string;
}

export default function UploadModal({ isOpen, onClose, onUploadSuccess, apiBaseUrl }: UploadModalProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [eventFile, setEventFile] = useState<File | null>(null);
  const [logFile, setLogFile] = useState<File | null>(null);
  const [appNameInput, setAppNameInput] = useState("");
  const [pairIdInput, setPairIdInput] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
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
      const r = await fetch(`${apiBaseUrl}/upload`, { method: "POST", body: form });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Erro ao fazer upload");

      onUploadSuccess(
        `Par de arquivos indexado com sucesso: Evento (${d.file?.filename_event || "importado"}) & Log (${d.file?.filename_log || "importado"}).`
      );
      
      // Reset form
      setEventFile(null);
      setLogFile(null);
      setAppNameInput("");
      setPairIdInput("");
      onClose();
    } catch (err: any) {
      setUploadError(err.message || "Erro de conexão ao enviar arquivos.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "var(--modal-bg)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, animation: "fadeUp 0.2s ease"
    }}>
      <div style={{
        background: C.panel, border: `1px solid ${C.border}`,
        borderRadius: 16, width: "90%", maxWidth: 500, padding: 24,
        boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-header)" }}>
            Enviar Novo Par (Evento + Log)
          </span>
          <button
            onClick={() => {
              onClose();
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

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
              <span style={{ fontSize: 11, color: eventFile ? "var(--app-text)" : C.muted, display: "block" }}>
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
              <span style={{ fontSize: 11, color: logFile ? "var(--app-text)" : C.muted, display: "block" }}>
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
                width: "100%", boxSizing: "border-box", background: "var(--input-bg)",
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
                width: "100%", boxSizing: "border-box", background: "var(--input-bg)",
                border: `1px solid ${C.border}`, borderRadius: 8, padding: 10,
                color: C.text, fontSize: 11, outline: "none"
              }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 10 }}>
            <button
              type="button"
              onClick={onClose}
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
  );
}
