export type IResultsProps = {
  searching: boolean;
  results: any;
  error?: string | null;
  expanded: string | null;
  setExpanded: (id: string | null) => void;
};
