import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    minHeight: "100vh",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  wrapper: {
    margin: "auto",
    display: "block",
    [theme.breakpoints.down("xs")]: {
      marginTop: "50px",
      width: "100%",
    },
  },
}));
