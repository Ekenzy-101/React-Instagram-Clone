import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    height: "56px",
    width: "100%",
    borderTop: "0.5px solid rgba(var(--b6a,219,219,219),1)",
    position: "fixed",
    top: "auto",
    bottom: 0,
    zIndex: 10,
  },
  mainText: {
    fontWeight: 600,
    letterSpacing: 1,
  },
  text: {
    textAlign: "center",
  },
  textGroup: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  toolbar: {},
}));
