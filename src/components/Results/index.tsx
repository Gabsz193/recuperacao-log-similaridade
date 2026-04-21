import {
  ResultsWrapper,
  CenterState,
  LoadingText,
  EmptyIcon,
  EmptyText,
  Spinner,
} from "./styles";

import { ResultsSummary } from "../ResultsSummary";
import { ResultCard } from "../ResultCard";
import { IResultsProps } from "./types";

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
          <Spinner />
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

          return (
            <ResultCard
              key={hit.id}
              hit={hit}
              index={index}
              maxScore={results.max_score || 1}
              isExpanded={isExpanded}
              onToggleExpand={() => setExpanded(isExpanded ? null : hit.id)}
            />
          );
        })}
    </ResultsWrapper>
  );
}
