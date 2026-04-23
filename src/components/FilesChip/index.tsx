import useDeleteFile from "../../hooks/useDeleteFile";
import useLoadFiles from "../../hooks/useLoadFiles";
import { fileSize, fmt } from "../../utils/format";
import { Chip, FileName, FilesContainer, RemoveButton } from "./styles";

export function FilesChip() {
  const { data: files, isLoading } = useLoadFiles();  
  const { mutate: deleteFile } = useDeleteFile();


  if (isLoading) return <div>Carregando arquivos...</div>;
  

  return (
    <FilesContainer>
      {files.map((f) => (
        <Chip key={f.filename}>
          📄
          <FileName>{f.filename}</FileName>
          <span>{fmt(f.line_count)} linhas</span>
          <span>{fileSize(128718)}</span>
          <RemoveButton onClick={() => deleteFile(f.filename)}>×</RemoveButton>
        </Chip>
      ))}
    </FilesContainer>
  );
}
