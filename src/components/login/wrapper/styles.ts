import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      background: theme.palette.background.paper,
      paddingBottom: "3rem",
    },
  },
  brandLogo: {
    width: "170px",
    height: "70px",
    margin: "0rem auto 1.2rem auto",
  },
  divider: {
    border: "1px solid rgba(var(--b6a,219,219,219),1)",
    width: "110px",
    alignSelf: "center",
  },
  dividerGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1.2rem auto 1.2rem auto",
  },
  facebookLogo: {
    width: "16px",
    height: "16px",
    marginRight: "0.5rem",
  },
  facebookLoginBtn: {
    marginBottom: "0.5rem",
    textTransform: "none",
    color: theme.palette.primary.dark,
    [theme.breakpoints.only("xs")]: {
      color: theme.palette.common.white,
    },
  },
  linkWrapper: {
    textAlign: "center",
    textDecoration: "none !important",
  },
  legend: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#8e8e8e",
    marginBottom: "1rem",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  darkLink: {
    textDecoration: "none",
    color: theme.palette.primary.dark,
    fontSize: "0.8rem",
  },
  smallWrapper: {
    padding: "1rem !important",
    [theme.breakpoints.down("xs")]: {
      padding: "0rem !important",
    },
  },
  wrapper: {
    margin: "auto auto 10px auto",
    padding: "2.5rem",
    // display: "block",
    background: theme.palette.background.paper,
    [theme.breakpoints.down("xs")]: {
      padding: "2.5rem 2.5rem 1.2rem 2.5rem",
      width: "95%",
      margin: "auto",
    },
    [theme.breakpoints.up("sm")]: {
      width: "380px",
      border: "1px solid rgba(var(--b6a,219,219,219),1)",
    },
  },
}));
