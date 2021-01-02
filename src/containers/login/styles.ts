import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  linkWrapper: {
    textAlign: "right",
    textDecoration: "none !important",
    margin: "0.3rem 0 1.2rem 0",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));
