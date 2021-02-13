import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: "#1a1a1a",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100vw",
    overflow: "hidden",
    position: "relative",
  },
  addIcon: {
    fontSize: "1.5rem",
    color: "#fff",
    marginRight: "0.7rem",
  },
  brandLogo: {
    width: 103,
    height: 29,
    position: "absolute",
    top: "2%",
    left: "2%",
  },
  closeBtn: {
    fontSize: "2rem",
    cursor: "pointer",
    position: "absolute",
    color: "#fff",
    top: "2%",
    right: "2%",
    zIndex: 5,
  },
  controlIcon: {
    color: "#fff",
    fontSize: "1.5rem",
  },
  deleteBtn: {
    color: "#fff",
    fontSize: "1.5rem",
    zIndex: 1200,
    position: "absolute",
    top: "2%",
    right: "4%",
    [theme.breakpoints.down("xs")]: {
      bottom: "2%",
      top: "auto",
      right: "4%",
    },
  },
  headerWrapper: {
    display: "flex",
    position: "relative",
    minWidth: "200px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  username: {
    color: "#fff",
    background: "transparent",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: "99vh",
    [theme.breakpoints.down("xs")]: {
      height: "auto",
    },
  },
}));
