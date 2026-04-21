import { useState, useEffect, useCallback } from "react";

import {
  AppContainer,
  HeaderContainer,
  HeaderRow,
  Logo,
  TitleGroup,
  Title,
  Subtitle,
  StatusBox,
  StatusDot,
  UploadMessageBox,
  UploadHint,
  ContentWrapper,
} from "./styles";

import {
  fetchFiles,
  fetchHealth,
  uploadFilesRequest,
  searchRequest,
  deleteFile,
} from "../services/api";

import { theme } from "../theme";
import { fmt } from "../utils/format";

import { Results } from "../components/Results";
import { SearchSection } from "../components/SearchSection";
import { FilesChip } from "../components/FilesChip";
import { Dropzone } from "../components/Dropzone";

export default function App() {
  const [indexedFiles, setIndexedFiles] = useState([]);
  const [esStatus, setEsStatus] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const [animKey, setAnimKey] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const [h, f] = await Promise.all([fetchHealth(), fetchFiles()]);
      setEsStatus(h);
      setIndexedFiles(f.files || []);
    } catch {
      setEsStatus({ status: "down", documents: 0 });
    }
  }

  async function doSearch(q = query) {
    if (!q.trim()) return;

    setSearching(true);
    setSearchError(null);
    setResults(null);
    setExpanded(null);

    try {
      const d = await searchRequest(q);
      setResults(d);
      setAnimKey((k) => k + 1);
    } catch (e: any) {
      setSearchError(e.message);
    } finally {
      setSearching(false);
    }
  }

  const uploadFiles = useCallback(async (files: any) => {
    if (!files?.length) return;

    setUploading(true);
    setUploadMsg(null);

    const form = new FormData();
    [...files].forEach((f) => form.append("files", f));

    try {
      const d = await uploadFilesRequest(form);

      const text = d.files
        .map(
          (f: any) =>
            `${f.filename} (${
              f.action === "indexed" ? "indexado" : "atualizado"
            }, ${fmt(f.lineCount)} linhas)`,
        )
        .join(", ");

      setUploadMsg({ type: "ok", text });

      await load();
      setResults(null);
    } catch (e: any) {
      setUploadMsg({ type: "err", text: e.message });
    } finally {
      setUploading(false);
    }
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      uploadFiles(e.dataTransfer.files);
    },
    [uploadFiles],
  );

  async function removeFile(id: string) {
    try {
      await deleteFile(id);
      setIndexedFiles((prev) => prev.filter((f: any) => f.id !== id));
      setResults(null);
      await load();
    } catch (e) {
      console.error(e);
    }
  }

  const getColor = () => {
    if (!esStatus) return theme.palette.error.main;
    if (esStatus.status === "green") return theme.palette.success.main;
    if (esStatus.status === "yellow") return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  return (
    <AppContainer>
      <HeaderContainer>
        <HeaderRow>
          <Logo>⌕</Logo>

          <TitleGroup>
            <Title>Log File Similarity Search</Title>
            <Subtitle>
              Elasticsearch BM25 · arquivos persistidos no índice
            </Subtitle>
          </TitleGroup>

          {esStatus && (
            <StatusBox>
              <StatusDot color={getColor()} />
              Elasticsearch
              <span>{esStatus.documents} docs</span>
            </StatusBox>
          )}
        </HeaderRow>

        <ContentWrapper>
          {uploadMsg && (
            <UploadMessageBox type={uploadMsg.type}>
              {uploadMsg.text}
            </UploadMessageBox>
          )}

          <Dropzone
            uploading={uploading}
            dragging={dragging}
            setDragging={setDragging}
            onDrop={onDrop}
            onUpload={uploadFiles}
          />

          <FilesChip files={indexedFiles} onRemove={removeFile} />

          <SearchSection
            query={query}
            setQuery={setQuery}
            onSearch={() => doSearch()}
            disabled={!indexedFiles.length || !query.trim()}
            loading={searching}
          />

          {!indexedFiles.length && !uploading && (
            <UploadHint>
              ↑ Faça upload de pelo menos um arquivo .log para indexar no
              Elasticsearch
            </UploadHint>
          )}
        </ContentWrapper>
      </HeaderContainer>

      <Results
        key={animKey}
        searching={searching}
        results={results}
        error={searchError}
        expanded={expanded}
        setExpanded={setExpanded}
      />
    </AppContainer>
  );
}
