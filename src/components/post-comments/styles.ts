import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.paper,
    height: "3.4rem",
    boxShadow: "none",
    borderBottom: "1px solid rgba(var(--b6a,219,219,219),1)",
  },
  commentWrapper: {
    flexGrow: 1,
    background: theme.palette.background.default,
    boxShadow: "none",
    borderBottom: "1px solid rgba(var(--b6a,219,219,219),1)",
    top: "3.4rem",
  },
  avatar: {
    width: "30px",
    height: "30px",
    marginRight: "16px",
  },
  backIcon: {
    cursor: "pointer",
    color: "#262626",
    width: "25px",
    height: "25px",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 0,
    height: "100%",
    width: "100%",
    margin: "auto",
  },
}));
