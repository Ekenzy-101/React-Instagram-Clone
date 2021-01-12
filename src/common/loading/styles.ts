import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  appbar: {
    background: theme.palette.background.paper,
    boxShadow: "none",
    height: "54px",
    borderBottom: "1px solid rgba(var(--b6a,219,219,219),1)",
  },
  greyLogo: {
    width: "70px",
    height: "70px",
    opacity: 0.6,
  },
  toolbar: {
    justifyContent: "center",
  },
  wrapper: {
    background: "rgba(0,0,0,0.5)",
    position: "absolute",
    height: "100vh",
    width: "100%",
    zIndex: 999999,
  },
}));
