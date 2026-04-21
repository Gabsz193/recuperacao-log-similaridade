import { IResultCardProps } from "./types";
import {
  ResultCardContainer,
  ScoreBackground,
  ResultRow,
  RankBadge,
  FileInfo,
  FileNameRow,
  FileName,
  Pill,
  FileMetaRow,
  FileMeta,
  ExpandToggle,
  ScoreSection,
  ScoreValue,
  ScoreBarContainer,
  ScoreBar,
  HighlightBox,
  HighlightDescription,
  HighlightItem,
} from "./styles";
import { fileSize } from "../../utils/format";
import { categorize } from "../../utils/categorize";
import { theme } from "../../theme";

export function ResultCard({
  hit,
  index,
  maxScore,
  isExpanded,
  onToggleExpand,
}: IResultCardProps) {
  const noMatch = hit.score === 0;
  const pct = maxScore > 0 ? (hit.score / maxScore) * 100 : 0;

  return (
    <ResultCardContainer
      onClick={!noMatch ? onToggleExpand : undefined}
      $index={index}
      $rank={index}
      $noMatch={noMatch}
      $pct={pct}
    >
      <ScoreBackground $pct={pct} $rank={index} />
      <ResultRow>
        <RankBadge index={index + 1}>{index + 1}</RankBadge>

        <FileInfo>
          <FileNameRow>
            <FileName>📄 {hit.filename}</FileName>
            {index === 0 && !noMatch && (
              <Pill $color={theme.palette.warning.main}>MELHOR MATCH</Pill>
            )}
            {noMatch && (
              <Pill $color={theme.palette.secondary.main}>SEM MATCH</Pill>
            )}
          </FileNameRow>
          <FileMetaRow>
            <FileMeta>{hit.line_count} linhas</FileMeta>
            <FileMeta>{fileSize(hit.file_size)}</FileMeta>
            {!noMatch && hit.highlights?.length > 0 && (
              <ExpandToggle>
                {!isExpanded
                  ? `▼ ${hit.highlights.length} trecho(s) similar(es)`
                  : "▲ ocultar"}
              </ExpandToggle>
            )}
          </FileMetaRow>
        </FileInfo>

        <ScoreSection>
          <ScoreValue $noMatch={noMatch} $rank={index}>
            {hit.score.toFixed(2)}
          </ScoreValue>
          <ScoreBarContainer>
            <ScoreBar $pct={pct} $rank={index} />
          </ScoreBarContainer>
        </ScoreSection>
      </ResultRow>

      {isExpanded && hit.highlights?.length > 0 && (
        <HighlightBox>
          <HighlightDescription>
            Trechos mais relevantes — destacados pelo Elasticsearch:
          </HighlightDescription>
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
    </ResultCardContainer>
  );
}
