import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  avatar: {
    width: "40px",
    height: "40px",
    margin: "auto",
  },
  multiPhoto: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 0",
    height: "32px",
    width: "32px",
    position: "absolute",
    right: "2%",
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
