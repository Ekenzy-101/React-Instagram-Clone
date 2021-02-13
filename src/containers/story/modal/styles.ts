import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

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
  dangerBtn: {
    color: red[600],
    fontWeight: 700,
  },
  primaryBtn: {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
}));
