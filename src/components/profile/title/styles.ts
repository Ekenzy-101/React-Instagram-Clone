import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: "16px 8px",
    [theme.breakpoints.only("xs")]: {
      margin: "8px 4px",
    },
    [theme.breakpoints.up("md")]: {
      margin: "16px auto",
      maxWidth: "760px",
    },
  },
  avatar: {
    margin: "auto",
    [theme.breakpoints.only("xs")]: {
      width: "75px",
      height: "75px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "150px",
      height: "150px",
    },
  },
  editBtn: {
    textTransform: "none",
    textDecoration: "none",
    textAlign: "center",
    fontWeight: 600,
    display: "block",
    padding: "0.4rem 1rem",
    borderRadius: "5px",
    color: "#000",
    border: "1px solid rgba(var(--b6a,219,219,219),1)",
    background: "#fff !important",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      marginRight: "1rem",
    },
  },
  feedIcon: {
    fontSize: "1.5rem",
    color: "#8e8e8e",
  },
  followBtn: {
    textTransform: "capitalize",
  },
  gridItem: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  danBtn: {
    color: red[600],
    fontWeight: 600,
  },
  username: {
    marginBottom: "0.4rem",
    marginRight: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyItems: "space-between",
  },
}));
