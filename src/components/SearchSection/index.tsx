import { SearchBar } from "../SearchBar";
import { Button } from "../Button";
import { SearchSectionContainer } from "./styles";
import { ISearchSectionProps } from "./types";

export function SearchSection({
  query,
  setQuery,
  onSearch,
  disabled,
  loading,
}: ISearchSectionProps) {
  return (
    <SearchSectionContainer>
      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={onSearch}
        disabled={disabled}
        loading={loading}
      />
      <Button onClick={onSearch} disabled={disabled} loading={loading}>
        Buscar
      </Button>
    </SearchSectionContainer>
  );
}
