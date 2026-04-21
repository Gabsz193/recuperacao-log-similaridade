export interface ISearchBarProps {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
  disabled?: boolean;
  loading?: boolean;
}
