import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.paper,
    height: "3.4rem",
    boxShadow: "none",
    borderBottom: "1px solid rgba(var(--b6a,219,219,219),1)",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
