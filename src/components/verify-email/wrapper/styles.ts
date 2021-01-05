import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mailLogo: {
    width: "100px",
    height: "100px",
    margin: "0rem auto 1.2rem auto",
    display: "block",
  },
  linkWrapper: {
    textAlign: "center",
  },
  legend: {
    fontWeight: 600,
    textAlign: "center",
    margin: "1rem 0",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  resendBtn: {
    textTransform: "none",
  },
  secondaryText: {
    fontWeight: 600,
    textAlign: "center",
    marginBottom: "1rem",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "-11px",
      marginRight: "-11px",
    },
    fontSize: "0.9rem",
  },
  smallWrapper: {
    padding: "1rem !important",
  },
  wrapper: {
    margin: "auto auto 10px auto",
    padding: "2.5rem",
    background: theme.palette.background.paper,
    [theme.breakpoints.down("xs")]: {
      background: theme.palette.background.default,
      width: "95%",
      margin: "auto",
    },
    [theme.breakpoints.up("sm")]: {
      width: "380px",
      border: "1px solid rgba(var(--b6a,219,219,219),1)",
    },
  },
}));
