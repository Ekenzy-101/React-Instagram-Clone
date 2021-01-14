import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.paper,
    height: "3.4rem",
    boxShadow: "none",
    borderBottom: "1px solid rgba(var(--b6a,219,219,219),1)",
  },
  icon: {
    width: "30px",
    height: "30px",
    color: "#494949",
    cursor: "pointer",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 0,
    height: "100%",
    maxWidth: "975px",
    width: "100%",
    margin: "auto",
  },
  username: {
    fontWeight: "bold",
  },
}));
