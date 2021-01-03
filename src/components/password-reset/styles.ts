import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  appbar: {
    background: theme.palette.background.paper,
    position: "fixed",
    top: 0,
    zIndex: 10,
  },
  brandLogo: {
    width: "103px",
    height: "29px",
    cursor: "pointer",
    marginLeft: "10rem",
    [theme.breakpoints.down("md")]: {
      marginLeft: "2rem",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
    },
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.black,
    fontWeight: 600,
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("xs")]: {
      minHeight: "52px",
    },
  },
  footer: {
    background: theme.palette.background.default,
    [theme.breakpoints.down("xs")]: {
      position: "fixed",
      top: "auto",
      bottom: 0,
      zIndex: 10,
    },
  },
}));
