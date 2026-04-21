import { SummaryText } from "./styles";
import { IResultsSummaryProps } from "./types";

export function ResultsSummary({ total }: IResultsSummaryProps) {
  return (
    <SummaryText>
      {total} arquivo{total !== 1 ? "s" : ""} com correspondência - ordenados
      por score BM25
    </SummaryText>
  );
}
