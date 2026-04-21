import { ButtonRoot } from "./styles";
import { IButtonProps } from "./types";

export function Button({ onClick, disabled, loading, children }: IButtonProps) {
  return (
    <ButtonRoot
      variant="contained"
      disableElevation
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Buscando…" : children}
    </ButtonRoot>
  );
}
