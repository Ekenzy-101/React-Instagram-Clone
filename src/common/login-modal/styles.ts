import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    width: "100%",
    position: "relative",
    maxWidth: "400px",
  },
  brandLogo: {
    width: "170px",
    height: "70px",
    margin: "0rem auto 1.2rem auto",
  },
  closeButton: {
    position: "absolute",
    color: "#8e8e8e",
    top: "5%",
    right: "5%",
    cursor: "pointer",
  },
  darkLink: {
    textDecoration: "none",
    color: theme.palette.primary.dark,
    fontSize: "0.8rem",
  },
  divider: {
    border: "1px solid rgba(var(--b6a,219,219,219),1)",
    width: "110px",
    alignSelf: "center",
  },
  dividerGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1.2rem auto 1.2rem auto",
  },
  facebookLogo: {
    width: "16px",
    height: "16px",
    marginRight: "0.5rem",
  },
  facebookLoginBtn: {
    marginBottom: "0.5rem",
    textTransform: "none",
    color: theme.palette.primary.dark,
  },
  linkWrapper: {
    textAlign: "center",
    textDecoration: "none !important",
    display: "block",
    fontSize: "0.9rem",
  },
  legend: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#8e8e8e",
    marginBottom: "1rem",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  smallWrapper: {
    padding: "1.5rem !important",
  },
  wrapper: {
    background: theme.palette.background.paper,
    padding: "2rem 4rem 1.2rem 4rem",
    [theme.breakpoints.down(450)]: {
      width: "100%",
      padding: "2rem 2rem 1.2rem 2rem",
    },
    width: "400px",
    margin: "auto",
  },
}));
