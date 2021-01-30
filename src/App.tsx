import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { Toaster } from "react-hot-toast";
import React from "react";

import "./App.css";
import "./styles.css";
import Routes from "./routes";
import { InputImagesProvider } from "./utils/context/inputImages";
import { UserProvider } from "./utils/context/user";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.REACT_APP_GRAPHQL_API,
  credentials: "include",
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0095f6",
    },
  },
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <InputImagesProvider>
          <ThemeProvider theme={theme}>
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: {
                  margin: "0",
                  maxWidth: "100vw",
                  fontSize: "0.9rem",
                  width: "100vw",
                  borderRadius: 0,
                  background: "#333",
                  color: "#fff",
                  zIndex: 9999,
                },
                duration: 5000,
              }}
              reverseOrder={false}
            />
            <Routes />
          </ThemeProvider>
        </InputImagesProvider>
      </UserProvider>
    </ApolloProvider>
  );
};

export default App;
