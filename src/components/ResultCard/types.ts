export interface IResultCardProps {
  hit: any;
  index: number;
  maxScore: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}
