import { SearchBarContainer, InputWrapper, Icon, Input } from "./styles";
import { ISearchBarProps } from "./types";

export function SearchBar({
  query,
  setQuery,
  onSearch,
  disabled,
  loading,
}: ISearchBarProps) {
  return (
    <SearchBarContainer>
      <InputWrapper>
        <Icon>⌕</Icon>

        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="Cole o log de referência aqui..."
        />
      </InputWrapper>
    </SearchBarContainer>
  );
}
