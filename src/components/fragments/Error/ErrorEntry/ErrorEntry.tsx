import React from "react";
import { ErrorEntry, Severity } from "components/context/ErrorContext";
import AlertMessage from "components/ui/typography/AlertMessage";
import ErrorMessage from "components/ui/typography/ErrorMessage";

interface ErrorEntryMessageProps {
  errorEntry: ErrorEntry;
}

const ErrorEntryMessage: React.FC<ErrorEntryMessageProps> = ({
  errorEntry
}) => {
  const severity = errorEntry.severity;
  if (severity === Severity.Alert) {
    return <AlertMessage>{errorEntry.error.message}</AlertMessage>;
  }
  return <ErrorMessage>{errorEntry.error.message}</ErrorMessage>;
};

export default ErrorEntryMessage;
