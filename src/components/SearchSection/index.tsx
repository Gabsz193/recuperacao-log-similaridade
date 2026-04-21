import { SearchBar } from "../SearchBar";
import { SearchButton } from "../SearchButton";
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
      <SearchButton
        onClick={onSearch}
        disabled={disabled || loading}
        loading={loading}
      />
    </SearchSectionContainer>
  );
}
