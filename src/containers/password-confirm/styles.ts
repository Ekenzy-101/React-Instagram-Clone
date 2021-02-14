import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      display: "block",
    },
  },
  formWrapper: {
    [theme.breakpoints.up("sm")]: {
      padding: "1rem 3rem 5rem 3rem",
    },
    [theme.breakpoints.only("xs")]: {
      padding: "1rem",
      width: "",
    },
  },
  icon: {
    width: "70px",
    height: "70px",
    display: "block",
    margin: "auto",
    marginBottom: "0.5rem",
  },
  legend: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#8e8e8e",
    marginBottom: "1rem",
  },
  text: {
    textAlign: "center",
    fontWeight: 500,
    marginBottom: "1rem",
  },
  errorMessage: {
    textAlign: "center",
    fontWeight: 500,
    marginBottom: "1rem",
    [theme.breakpoints.only("xs")]: {
      marginTop: "5rem",
    },
  },
  wrapper: {
    width: "388px",
    margin: "auto",
    display: "block",
    [theme.breakpoints.down("xs")]: {
      width: "85%",
      marginTop: "4rem",
    },
    [theme.breakpoints.up("sm")]: {
      background: theme.palette.background.paper,
      border: "1px solid rgba(var(--b6a,219,219,219),1)",
    },
  },
}));
