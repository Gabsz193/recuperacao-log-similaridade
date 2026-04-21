import { SummaryText } from "./styles";

interface ResultsSummaryProps {
  total: number;
}

export function ResultsSummary({ total }: ResultsSummaryProps) {
  return (
    <SummaryText>
      {total} arquivo{total !== 1 ? "s" : ""} com correspondência - ordenados
      por score BM25
    </SummaryText>
  );
}
