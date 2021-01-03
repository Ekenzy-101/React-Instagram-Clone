import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  text: {
    fontSize: "0.9rem",
    margin: "2.5rem 0 0.5rem 0",
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
