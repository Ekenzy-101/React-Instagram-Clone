import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    boxShadow: "none",
    borderRadius: "6px",
    border: "1px solid rgba(var(--b6a,219,219,219),1)",
    [theme.breakpoints.down(735)]: {
      border: "none",
    },
  },
  avatar: {
    width: "2.5rem",
    height: "2.5rem",
    marginLeft: "auto",
    [theme.breakpoints.down(735)]: {
      marginLeft: "0",
      marginRight: "1.5rem",
    },
  },
  avatarWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2rem 0 1rem 0",
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
    color: "#fff !important",
    fontSize: "0.9rem",
    padding: "4px 8px",
    minHeight: "33px",
    background: `${theme.palette.primary.main} !important`,
  },
  text: {
    fontSize: "0.9rem",
  },

  wrapper: {
    [theme.breakpoints.down(735)]: {
      display: "flex",
      alignItems: "center",
      width: "90%",
      margin: "0 auto 0.5rem auto",
      textAlign: "left",
    },
  },
}));
