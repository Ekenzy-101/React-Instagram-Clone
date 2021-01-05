import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    height: "50px",
    width: "100%",
    borderTop: "0.5px solid rgba(var(--b6a,219,219,219),1)",
    position: "fixed",
    top: "auto",
    bottom: 0,
    zIndex: 10,
  },
  facebookLogo: {
    width: "16px",
    height: "16px",
    marginRight: "0.5rem",
  },
  facebookLoginBtn: {
    textTransform: "none",
    height: "100%",
    borderRadius: 0,
  },
  toolbar: {
    padding: 0,
    background: theme.palette.primary.main,
  },
}));
