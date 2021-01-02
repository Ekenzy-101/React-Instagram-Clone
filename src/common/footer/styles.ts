import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    width: "100%",
    borderTop: "0.5px solid rgba(var(--b6a,219,219,219),1)",
    position: "fixed",
    top: "auto",
    bottom: 0,
    zIndex: 10,
  },
  addIcon: {
    border: "1.3px solid #262626",
    borderRadius: "8px",
    padding: "1px",
    color: "#262626",
  },
  avatarWrapper: {
    borderRadius: "50%",
    background: theme.palette.background.paper,
    padding: "2.4px",
  },
  avatar: {
    width: "22px",
    height: "22px",
  },
  gridItem: {
    borderRadius: "50%",
    padding: "1px",
    background: "#262626",
  },
  navLink: {
    textDecoration: "none",
    // padding: "0 10px !important",
  },
  searchIcon: {
    fontSize: "27px",
    color: "#262626",
    opacity: 0.8,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
