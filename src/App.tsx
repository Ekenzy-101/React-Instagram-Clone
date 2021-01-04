import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import "./App.css";

import Routes from "./routes";
import { UserProvider } from "./utils/context/user";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0095f6",
    },
  },
});

const App: React.FC = () => {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
