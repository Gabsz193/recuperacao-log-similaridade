import {
  ResultsWrapper,
  CenterState,
  LoadingText,
  EmptyIcon,
  EmptyText,
  ResultCard,
  ResultRow,
  RankBadge,
  FileInfo,
  FileName,
  FileMeta,
  HighlightBox,
  HighlightItem,
} from "./styles";

import { ResultsSummary } from "../ResultsSummary";
import { fileSize } from "../../utils/format";
import { IResultsProps } from "./types";
import { categorize } from "../../utils/categorize";

export function Results({
  searching,
  results,
  error,
  expanded,
  setExpanded,
}: IResultsProps) {
  const total = results?.total ?? results?.hits?.length ?? 0;
  const hasHits = results?.hits?.length > 0;

  return (
    <ResultsWrapper>
      {searching && (
        <CenterState>
          <span>⏳</span>
          <LoadingText>Consultando Elasticsearch…</LoadingText>
        </CenterState>
      )}

      {!searching && error && (
        <CenterState>
          <EmptyIcon>❌</EmptyIcon>
          <EmptyText>{error}</EmptyText>
        </CenterState>
      )}

      {!searching && !error && !hasHits && results && (
        <CenterState>
          <EmptyIcon>📋</EmptyIcon>
          <EmptyText>Nenhum resultado encontrado</EmptyText>
        </CenterState>
      )}

      {!searching && !error && hasHits && <ResultsSummary total={total} />}

      {!searching &&
        !error &&
        hasHits &&
        results.hits.map((hit: any, index: number) => {
          const isExpanded = expanded === hit.id;
          const noMatch = hit.score === 0;

          return (
            <ResultCard
              key={hit.id}
              onClick={
                !noMatch
                  ? () => setExpanded(isExpanded ? null : hit.id)
                  : undefined
              }
              $index={index}
            >
              <ResultRow>
                <RankBadge>{index + 1}</RankBadge>

                <FileInfo>
                  <FileName>📄 {hit.filename}</FileName>
                  <FileMeta>
                    {hit.line_count} linhas · {fileSize(hit.file_size)}
                  </FileMeta>
                </FileInfo>
              </ResultRow>

              {isExpanded && hit.highlights?.length > 0 && (
                <HighlightBox>
                  {hit.highlights.map((h: any, i: number) => {
                    const cat = categorize(h.text);

                    return (
                      <HighlightItem key={i} $color={cat.color}>
                        <span>{cat.label}</span>
                        <span>{h.text}</span>
                      </HighlightItem>
                    );
                  })}
                </HighlightBox>
              )}
            </ResultCard>
          );
        })}
    </ResultsWrapper>
  );
}
