import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100vw",
    paddingBottom: "3.2rem",
  },
  activeLink: {
    fontWeight: 600,
    borderLeft: "2px solid #000",
  },
  appbar: {
    flexGrow: 1,
    background: theme.palette.background.paper,
    height: "3.4rem",
    boxShadow: "none",
    borderBottom: "1px solid rgba(var(--b6a,219,219,219),1)",
  },
  backIcon: {
    cursor: "pointer",
    color: "#262626",
    fontSize: "1.8rem",
  },
  dangerText: {
    color: red[600],
    fontWeight: 500,
  },
  forwardIcon: {
    cursor: "pointer",
    color: "#8e8e8e",
  },
  list: {
    padding: "0",
  },
  listItem: {
    [theme.breakpoints.up("sm")]: {
      padding: "0",
    },
    [theme.breakpoints.down("xs")]: {
      background: theme.palette.background.paper,
      borderTop: "0.5px solid rgba(var(--b6a,219,219,219),1)",
      borderBottom: "0.5px solid rgba(var(--b6a,219,219,219),1)",
    },
  },
  navLink: {
    textDecoration: "none",
    color: "inherit",
    width: "100%",
    padding: "9px 16px 9px 30px",
  },
  title: {
    fontWeight: 600,
    margin: "1rem 0.5rem 0rem 1rem",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 0,
    height: "100%",
    width: "100%",
    margin: "auto",
  },
}));
