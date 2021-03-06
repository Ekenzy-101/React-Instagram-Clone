import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    boxShadow: "none",
    width: "inherit",
    maxWidth: "inherit",
    height: "50px",
    left: 0,
    borderTop: "0.5px solid rgba(var(--b6a,219,219,219),1)",
    top: "auto",
    bottom: 0,
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
  offset: theme.mixins.toolbar,

  searchIcon: {
    fontSize: "27px",
    color: "#262626",
    opacity: 0.8,
  },
  toolbar: {
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "50px",
  },
}));
