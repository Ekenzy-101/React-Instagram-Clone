import { Paper, Typography } from "@material-ui/core";
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
      return (
        <Paper
          square
          variant="outlined"
          style={{
            height: "100vh",
            width: "100vw",
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography color="textPrimary" variant="h6">
            Something went wrong. Please try refreshing the page if error
            persists
          </Typography>
        </Paper>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
