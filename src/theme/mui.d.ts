import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    log: {
      invalidUser: string;
      disconnect: string;
      closed: string;
      maxAttempts: string;
      pamFailure: string;
      error: string;
      warning: string;
      other: string;
      hint: string;
    };
    gradient: {
      primaryStart: string;
      primaryEnd: string;
      primaryHoverStart: string;
      primaryHoverEnd: string;
    };
    background: Palette["background"] & {
      surface: string;
      surfaceDark: string;
    };
  }

  interface TypeBackground {
    surface?: string;
    surfaceDark?: string;
  }

  interface PaletteOptions {
    log?: {
      invalidUser?: string;
      disconnect?: string;
      closed?: string;
      maxAttempts?: string;
      pamFailure?: string;
      error?: string;
      warning?: string;
      other?: string;
      hint?: string;
    };
    gradient?: {
      primaryStart?: string;
      primaryEnd?: string;
      primaryHoverStart?: string;
      primaryHoverEnd?: string;
    };
    background?: PaletteOptions["background"] & {
      surface?: string;
      surfaceDark?: string;
    };
  }

  interface PaletteColor {
    default?: string;
  }

  interface SimplePaletteColorOptions {
    default?: string;
  }
}
