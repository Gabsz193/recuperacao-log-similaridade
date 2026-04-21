import { useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { DropzoneContainer, Icon, Text, Hint } from "./styles";
import { IDropzoneProps } from "./types";

export function Dropzone({
  uploading,
  dragging,
  setDragging,
  onDrop,
  onUpload,
}: IDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  return (
    <DropzoneContainer
      dragging={dragging}
      uploading={uploading}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
    >
      <Icon $spin={uploading}>{uploading ? "⏳" : "📂"}</Icon>

      <Text>
        {uploading ? (
          "Indexando no Elasticsearch…"
        ) : (
          <>
            Arraste arquivos{" "}
            <span style={{ color: theme.palette.primary.main }}>.log</span> aqui
            ou clique para selecionar
          </>
        )}
      </Text>

      <Hint>
        Múltiplos arquivos · txt, log, csv · indexados permanentemente no ES
      </Hint>

      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        onChange={(e) => onUpload(e.target.files)}
      />
    </DropzoneContainer>
  );
}
