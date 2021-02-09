import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100vw",
    position: "relative",
  },
  addIcon: {
    fontSize: "1.5rem",
    color: "#fff",
    marginRight: "0.7rem",
  },
  addBtn: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    bottom: "3%",
    left: "30%",
    textTransform: "none",
    color: "#fff",
  },
  bgImage: {
    height: "100vh",
    width: "100%",
  },
  closeBtn: {
    fontSize: "2rem",
    cursor: "pointer",
    position: "absolute",
    color: "#fff",
    top: "2%",
    left: "5%",
  },
  retryBtn: {
    textTransform: "none",
    padding: 0,
    fontSize: "inherit",
    color: theme.palette.primary.main,
    background: "transparent",
  },
}));
