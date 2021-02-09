import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "92vw",
    fontSize: "0.9rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  retryBtn: {
    textTransform: "none",
    padding: 0,
    fontSize: "inherit",
    color: theme.palette.primary.main,
    background: "transparent",
  },
}));
