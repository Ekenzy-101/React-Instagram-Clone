import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    boxShadow: "none",
    borderRadius: "6px",
    border: "1px solid rgba(var(--b6a,219,219,219),1)",
  },
  activeLink: {
    fontWeight: 600,
    borderLeft: "2px solid #000",
  },
  avatar: {
    width: "2.5rem",
    height: "2.5rem",
    marginLeft: "auto",
    [theme.breakpoints.down(735)]: {
      marginLeft: "0",
      marginRight: "1rem",
    },
  },
  avatarWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2rem 0 1rem 0",
  },
  secondaryText: {
    width: "300px",
    fontSize: "0.75rem",
    [theme.breakpoints.down(735)]: {
      width: "90%",
      margin: "0 auto 0.5rem auto",
      textAlign: "left",
    },
  },
  selectBtn: {
    textTransform: "none",
    boxShadow: "none",
    fontSize: "0.9rem",
    padding: 0,
    background: "transparent !important",
  },
  submitBtn: {
    textTransform: "none",
    boxShadow: "none",
    color: "#fff",
    fontSize: "0.9rem",
    padding: "4px 8px",
    background: `${theme.palette.primary.main} !important`,
  },
  text: {
    [theme.breakpoints.down(735)]: {
      width: "90%",
      margin: "0 auto 0.5rem auto",
      textAlign: "left",
    },
  },
  wrapper: {
    [theme.breakpoints.down(735)]: {
      width: "90%",
      margin: "0 auto 0.5rem auto",
      textAlign: "left",
    },
  },
}));
