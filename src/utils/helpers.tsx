import React from "react";

export const C = {
  bg: "var(--app-bg)",
  panel: "var(--app-panel)",
  border: "var(--app-border)",
  accent: "var(--app-accent)",
  text: "var(--app-text)",
  muted: "var(--app-muted)",
  faint: "var(--app-faint)",
};

export function categorize(text: string) {
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

export function fmt(n: number | string) { 
  return Number(n).toLocaleString("pt-BR"); 
}

export function fileSize(bytes?: number) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      background: `${color}20`, color, border: `1px solid ${color}40`,
      borderRadius: 4, padding: "2px 8px", fontSize: 10,
      fontWeight: 700, letterSpacing: "0.5px", whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

export function StatusDot({ status }: { status: string }) {
  const color = status === "green" ? "#22c55e" : status === "yellow" ? "#f59e0b" : "#ef4444";
  return (
    <span style={{
      display: "inline-block", width: 8, height: 8,
      borderRadius: "50%", background: color,
      boxShadow: `0 0 6px ${color}`,
    }} />
  );
}

export function renderMarkdown(text?: string) {
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
            background: "var(--code-block-bg)", border: "1px solid var(--app-border)",
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
      elements.push(<h1 key={idx} style={{ color: "var(--text-header)", fontSize: "1.35em", marginTop: "14px", marginBottom: "8px", borderBottom: "1px solid var(--app-border)", paddingBottom: "4px", fontWeight: 700, textAlign: "left" }}>{trimmed.slice(2)}</h1>);
      return;
    }
    if (trimmed.startsWith("## ")) {
      elements.push(<h2 key={idx} style={{ color: "var(--app-accent)", fontSize: "1.15em", marginTop: "12px", marginBottom: "8px", fontWeight: 600, textAlign: "left" }}>{trimmed.slice(3)}</h2>);
      return;
    }
    if (trimmed.startsWith("### ")) {
      elements.push(<h3 key={idx} style={{ color: "#7ab8e0", fontSize: "1.05em", marginTop: "10px", marginBottom: "6px", fontWeight: 600, textAlign: "left" }}>{trimmed.slice(4)}</h3>);
      return;
    }
    // Horizontal line
    if (trimmed === "---") {
      elements.push(<hr key={idx} style={{ border: "none", borderTop: "1px solid var(--app-border)", margin: "14px 0" }} />);
      return;
    }
    // List items
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      elements.push(
        <div key={idx} style={{ display: "flex", gap: "6px", alignItems: "flex-start", marginLeft: "12px", marginBottom: "4px", textAlign: "left" }}>
          <span style={{ color: C.accent }}>•</span>
          <span style={{ fontSize: "12px", color: "var(--app-text)", lineHeight: "1.4" }}>{trimmed.slice(2)}</span>
        </div>
      );
      return;
    }
    if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^(\d+)\.\s(.*)/);
      elements.push(
        <div key={idx} style={{ display: "flex", gap: "6px", alignItems: "flex-start", marginLeft: "12px", marginBottom: "4px", textAlign: "left" }}>
          <span style={{ color: C.accent, fontSize: "11px", fontWeight: 700 }}>{match ? match[1] : idx}.</span>
          <span style={{ fontSize: "12px", color: "var(--app-text)", lineHeight: "1.4" }}>{match ? match[2] : trimmed}</span>
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
        <p key={idx} style={{ margin: "0 0 6px 0", fontSize: "12px", whiteSpace: "pre-wrap", wordBreak: "break-word", textAlign: "left", color: "var(--app-text)", lineHeight: "1.5" }}>
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
        background: "var(--code-block-bg)", border: "1px solid var(--app-border)",
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
