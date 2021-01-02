import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    minHeight: "100vh",
  },
  wrapper: {
    margin: "auto",
    width: "90%",
    display: "block",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginBottom: "70px",
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: "70px",
    },
  },
}));
