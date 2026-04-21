import { ButtonSearch } from "./styles";
import { ISearchButtonProps } from "./types";

export function SearchButton({
  onClick,
  disabled,
  loading,
}: ISearchButtonProps) {
  return (
    <ButtonSearch
      variant="contained"
      disableElevation
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Buscando…" : "Buscar"}
    </ButtonSearch>
  );
}
