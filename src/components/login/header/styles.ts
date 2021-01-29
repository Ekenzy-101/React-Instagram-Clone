import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: theme.palette.background.paper,
    height: "3.4rem",
    boxShadow: "none",
    borderBottom: "1px solid rgba(var(--b6a,219,219,219),1)",
  },
  backIcon: {
    cursor: "pointer",
    color: "#262626",
    width: "25px",
    height: "25px",
  },
  toolbar: {
    justifyContent: "space-between",
    padding: "0 16px",
  },
}));
