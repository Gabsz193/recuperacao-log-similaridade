import { fileSize, fmt } from "../../utils/format";
import { Chip, FileName, FilesContainer, RemoveButton } from "./styles";

export function FilesChip({ files, onRemove }) {
  if (!files.length) return null;

  return (
    <FilesContainer>
      {files.map((f) => (
        <Chip key={f.id}>
          📄
          <FileName>{f.filename}</FileName>
          <span>{fmt(f.line_count)} linhas</span>
          <span>{fileSize(f.file_size)}</span>
          <RemoveButton onClick={() => onRemove(f.id)}>×</RemoveButton>
        </Chip>
      ))}
    </FilesContainer>
  );
}
