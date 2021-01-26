import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "1.5rem",
  },
  avatar: {
    width: "2.7rem",
    height: "2.7rem",
  },
  closeButton: {
    color: theme.palette.common.black,
    cursor: "pointer",
  },
  content: {
    width: "45vw",
    maxWidth: "400px",
    padding: "5px 0 0 0",
    maxHeight: "356px",
    minHeight: "200px",
    overflow: "auto",
  },
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 9px",
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
  primaryBtn: {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
  text: {
    fontSize: "0.9rem",
  },
  title: {
    textAlign: "center",
    fontSize: "1rem",
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    marginBottom: "1rem",
  },
}));
