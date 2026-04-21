import { SearchBar } from "../SearchBar";
import { SearchButton } from "../SearchButton";
import { SearchSectionContainer } from "./styles";

interface SearchSectionProps {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function SearchSection({
  query,
  setQuery,
  onSearch,
  disabled,
  loading,
}: SearchSectionProps) {
  return (
    <SearchSectionContainer>
      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={onSearch}
        disabled={disabled}
        loading={loading}
      />
      <SearchButton
        onClick={onSearch}
        disabled={disabled || loading}
        loading={loading}
      />
    </SearchSectionContainer>
  );
}
