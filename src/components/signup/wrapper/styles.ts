import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.only("sm")]: {
      background: theme.palette.background.paper,
    },
  },
  brandLogo: {
    width: "170px",
    height: "70px",
    margin: "0rem auto 1.2rem auto",
  },
  divider: {
    border: "1px solid rgba(var(--b6a,219,219,219),1)",
    width: "100px",
    alignSelf: "center",
  },
  dividerGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.2rem",
  },
  facebookLogo: {
    width: "20px",
    height: "20px",
    marginRight: "0.5rem",
  },
  facebookLoginBtn: {
    marginBottom: "1.2rem",
    textTransform: "none",
  },
  linkWrapper: {
    textAlign: "center",
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
  },
  smallWrapper: {
    padding: "1rem !important",
  },
  wrapper: {
    margin: "auto auto 10px auto",
    padding: "2.5rem",
    background: theme.palette.background.paper,
    [theme.breakpoints.down("xs")]: {
      paddingBottom: "0.5rem",
      width: "95%",
      margin: "auto",
    },
    [theme.breakpoints.up("sm")]: {
      width: "350px",
      border: "1px solid rgba(var(--b6a,219,219,219),1)",
    },
  },
}));
