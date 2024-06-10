import { Component, ErrorInfo, PropsWithChildren } from "react";

import { ErrorBoundaryState } from "./error-boundary.types";

export class ErrorBoundary extends Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    /**
     * ! Nota:
     * * aqui pode registrar o erro em um serviço de relatórios
     * * de erro como (Sentry, datadog e etc.).
     * */
    // eslint-disable-next-line no-console
    console.error("ErrorBoundary capturou um erro", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // TODO: IMPLEMENTAR UMA UI DE FALHA
      return <h1>Algo deu errado.</h1>;
    }

    return this.props.children;
  }
}
