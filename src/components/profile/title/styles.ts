import { makeStyles } from "@material-ui/core";

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
  checkIcon: {
    fontSize: "0.8rem",
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
    textTransform: "none",
    boxShadow: "none",
    width: "7rem",
    color: "#fff",
    background: `${theme.palette.primary.main} !important`,
  },
  followingBtn: {
    textTransform: "none",
    boxShadow: "none",
    color: "#000",
    border: "1px solid rgba(var(--b6a,219,219,219),1)",
    background: "#fff !important",
  },
  gridItem: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  optionBtn: {
    textTransform: "none",
    boxShadow: "none",
    color: "#000",
    border: "1px solid rgba(var(--b6a,219,219,219),1)",
    background: "#fff !important",
    minWidth: "55px",
    height: "38px",
    marginLeft: "1rem",
    padding: "6px 0",
  },
  // danBtn: {
  //   color: red[600],
  //   fontWeight: 600,
  // },
  peopleIcon: {
    fontSize: "1rem",
  },
  username: {
    marginBottom: "0.4rem",
    marginRight: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyItems: "space-between",
  },
}));
