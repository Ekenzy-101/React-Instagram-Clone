import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100vw",
  },
  wrapper: {
    margin: "auto",
    maxWidth: "816px",
    display: "block",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginBottom: "49px",
    },
    [theme.breakpoints.between(601, 735)]: {
      width: "600px",
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: "4vh",
    },
  },
}));
