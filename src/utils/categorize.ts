import { theme } from "../theme";

export function categorize(text: string) {
  if (/[Ff]ailed password/i.test(text))
    return {
      label: "FAILED AUTH",
      color: theme.palette.log.pamFailure,
    };

  if (/[Ii]nvalid user/i.test(text))
    return {
      label: "INVALID USER",
      color: theme.palette.log.invalidUser,
    };

  if (/[Aa]ccepted/i.test(text))
    return {
      label: "ACCEPTED",
      color: theme.palette.success.main,
    };

  if (/[Dd]isconnect/i.test(text))
    return {
      label: "DISCONNECT",
      color: theme.palette.log.disconnect,
    };

  if (/[Cc]onnection closed/i.test(text))
    return {
      label: "CLOSED",
      color: theme.palette.log.closed,
    };

  if (/maximum authentication/i.test(text))
    return {
      label: "MAX ATTEMPTS",
      color: theme.palette.log.maxAttempts,
    };

  if (/pam_unix/i.test(text))
    return {
      label: "PAM FAILURE",
      color: theme.palette.log.pamFailure,
    };

  if (/[Ee]rror/i.test(text))
    return {
      label: "ERROR",
      color: theme.palette.log.error,
    };

  if (/[Ww]arn/i.test(text))
    return {
      label: "WARNING",
      color: theme.palette.log.warning,
    };

  return {
    label: "OTHER",
    color: theme.palette.log.other,
  };
}
