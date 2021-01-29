import React, { Component, ErrorInfo } from "react";
import { debug } from "../utils/services/debugService";

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error: any): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    debug.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something Went Wrong</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
