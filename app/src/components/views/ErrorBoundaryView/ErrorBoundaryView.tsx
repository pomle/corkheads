import { env } from "process";
import React from "react";
import ErrorView from "../ErrorView";

function printError(error: Error) {
  if (env.NODE_ENV === "production") {
    return "Unknown error has occured";
  }
  return error.message;
}

interface ErrorBoundaryProps {
  nav: React.ReactNode;
  children: React.FC;
}

interface ErrorBoundaryState {
  error?: Error;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {};
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorView nav={this.props.nav}>
          {printError(this.state.error)}
        </ErrorView>
      );
    }

    return this.props.children({});
  }
}

export default ErrorBoundary;
