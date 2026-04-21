import { SearchBarContainer, InputWrapper, Icon, Input } from "./styles";

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function SearchBar({
  query,
  setQuery,
  onSearch,
  disabled,
  loading,
}: SearchBarProps) {
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
