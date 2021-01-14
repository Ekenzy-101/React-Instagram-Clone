import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {},
  dialogBtn: {
    textAlign: "center",
    cursor: "pointer",
    borderBottom: "none",
    fontSize: "0.9rem",
    width: "18rem",
    [theme.breakpoints.only("xs")]: {
      width: "16rem",
    },
  },
  primaryBtn: {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
}));
