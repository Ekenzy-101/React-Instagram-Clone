import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100vw",
    paddingBottom: "3rem",
  },
  wrapper: {
    maxWidth: "895px",
    margin: "auto",
    [theme.breakpoints.down(735)]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: "30px",
    },
  },
}));
