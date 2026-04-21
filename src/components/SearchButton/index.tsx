import { Button } from "@mui/material";
import { ButtonSearch } from "./styles";

interface SearchButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function SearchButton({
  onClick,
  disabled,
  loading,
}: SearchButtonProps) {
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
