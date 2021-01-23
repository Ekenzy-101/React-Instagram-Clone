import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "2.7rem",
    height: "2.7rem",
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
  wrapper: {
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    marginBottom: "1rem",
  },
}));
