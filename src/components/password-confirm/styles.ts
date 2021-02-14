import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  appbar: {
    background: theme.palette.background.paper,
    top: 0,
    zIndex: 10,
    height: "3.4rem",
    boxShadow: "none",
    borderBottom: "1px solid rgba(var(--b6a,219,219,219),1)",
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
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 0,
    height: "100%",
    maxWidth: "975px",
    width: "100%",
    margin: "auto",
    [theme.breakpoints.up("xs")]: {
      minHeight: "52px",
    },
  },
}));
