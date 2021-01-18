import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.paper,
    height: "3.4rem",
    boxShadow: "none",
    borderBottom: "1px solid rgba(var(--b6a,219,219,219),1)",
  },
  avatar: {
    width: "2.7rem",
    height: "2.7rem",
  },
  backIcon: {
    cursor: "pointer",
    color: "#262626",
  },
  followBtn: {
    textTransform: "none",
    boxShadow: "none",
    color: "#fff",
    minWidth: "75px",
    fontSize: "0.9rem",
    background: `${theme.palette.primary.main} !important`,
  },
  followingBtn: {
    textTransform: "none",
    boxShadow: "none",
    color: "#000",
    border: "1px solid rgba(var(--b6a,219,219,219),1)",
    background: "#fff !important",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  text: {
    fontSize: "0.9rem",
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
  wrapper: {
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    marginBottom: "1rem",
  },
}));
