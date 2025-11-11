import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100vw",
    paddingBottom: "3.2rem",
    [theme.breakpoints.down("xs")]: {
      background: theme.palette.background.paper,
    },
  },
  appbar: {
    flexGrow: 1,
    background: theme.palette.background.paper,
    height: "3.4rem",
    boxShadow: "none",
    borderBottom: "1px solid rgba(var(--b6a,219,219,219),1)",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  subTitle: {
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: 600,
    marginBottom: "2rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.3rem",
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 0,
    height: "100%",
    maxWidth: "975px",
    width: "100%",
    margin: "auto",
  },
  wrapper: {
    maxWidth: "970px",
    padding: "40px",
    margin: "auto",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));
