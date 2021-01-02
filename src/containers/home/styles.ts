import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    minHeight: "calc(100vh - 3.4rem)",
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
