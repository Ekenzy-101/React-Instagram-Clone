import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100vw",
    paddingBottom: "3.2rem",
    [theme.breakpoints.down(735)]: {
      background: theme.palette.background.paper,
    },
  },
  wrapper: {
    maxWidth: "895px",
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      marginTop: "30px",
    },
  },
}));
