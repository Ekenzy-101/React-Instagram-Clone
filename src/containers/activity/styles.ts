import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100vw",
  },
  wrapper: {
    width: "598px",
    margin: "auto",
    display: "block",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: "30px",
    },
  },
}));
