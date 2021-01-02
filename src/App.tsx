import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import "./App.css";

import Routes from "./routes";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0095f6",
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
