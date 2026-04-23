import { useState, useCallback } from "react";

import {
  AppContainer,
  HeaderContainer,
  HeaderRow,
  Logo,
  TitleGroup,
  Title,
  Subtitle,
  UploadMessageBox,
  UploadHint,
  ContentWrapper,
} from "./styles";

import {
  uploadFilesRequest,
  searchRequest,
} from "../services/api";

import { fmt } from "../utils/format";

import { Results } from "../components/Results";
import { SearchSection } from "../components/SearchSection";
import { FilesChip } from "../components/FilesChip";
import useLoadFiles from "../hooks/useLoadFiles";
import StatusES from "../components/StatusES";
import FileDropzone from "../components/FileDropzone";

export default function App() {
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<{ type: "ok" | "err"; text: string }>();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const [animKey, setAnimKey] = useState(0);
  const [expanded, setExpanded] = useState(null);

  const { data: indexedFiles, isLoading: isFilesLoading } = useLoadFiles();

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
            `${f.filename} (${f.action === "indexed" ? "indexado" : "atualizado"
            }, ${fmt(f.lineCount)} linhas)`,
        )
        .join(", ");

      setUploadMsg({ type: "ok", text });

      setResults(null);
    } catch (e: any) {
      setUploadMsg({ type: "err", text: e.message });
    } finally {
      setUploading(false);
    }
  }, []);

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

            <StatusES />
          </HeaderRow>

          <ContentWrapper>
            <FileDropzone />

            <FilesChip />

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
