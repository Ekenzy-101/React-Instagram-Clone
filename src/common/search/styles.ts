import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    height: "1.75rem",
    width: "215px",
    borderRadius: "3px",
    border: "0.3px solid rgba(var(--b6a,219,219,219),1)",
    fontSize: "1rem",
    paddingLeft: "3rem",
  },
  searchIcon: {
    fontSize: "1rem",
    color: theme.palette.action.disabled,
  },
}));
