import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    boxShadow: "none",
    height: "3.4rem",
    borderBottom: "1px solid rgba(var(--b6a,219,219,219),1)",
  },
  icon: {
    color: "#262626",
    width: "24px",
    height: "24px",
    cursor: "pointer",
  },
  btn: {
    textTransform: "none",
    fontSize: "1.1rem",
    padding: 0,
    color: theme.palette.primary.main,
  },
  text: {
    color: "#262626",
    textAlign: "center",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    minHeight: 0,
    height: "100%",
  },
}));
