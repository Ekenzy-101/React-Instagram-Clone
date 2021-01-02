import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    border: "1px solid rgba(var(--b6a,219,219,219),1)",
    width: "130px",
    alignSelf: "center",
  },
  dividerGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1.2rem auto",
  },
  formWrapper: {
    [theme.breakpoints.up("sm")]: {
      padding: "1rem 3rem 0 3rem",
    },
    [theme.breakpoints.only("xs")]: {
      padding: "1rem",
    },
  },
  icon: {
    width: "7rem",
    height: "7rem",
    display: "block",
    margin: "auto",
  },
  legend: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#8e8e8e",
    marginBottom: "1rem",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.black,
    fontWeight: 600,
  },
  text: {
    textAlign: "center",
    fontWeight: 500,
    marginBottom: "1rem",
  },
  wrapper: {
    width: "388px",
    margin: "auto",
    display: "block",
    [theme.breakpoints.down("xs")]: {
      width: "85%",
    },
    [theme.breakpoints.up("sm")]: {
      background: theme.palette.background.paper,
      border: "1px solid rgba(var(--b6a,219,219,219),1)",
    },
    // marginTop: "50px",
  },
}));
