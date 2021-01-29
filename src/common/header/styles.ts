import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  brandLogo: {
    width: "103px",
    height: "29px",
    cursor: "pointer",
  },
  gridIconContainer: {
    width: "auto",
  },
  gridItem: {
    paddingLeft: "3px !important",
    paddingRight: "3px !important",
  },
  navLink: {
    cursor: "pointer",
    textDecoration: "none",
  },
  link: {
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit",
  },
  listItemIcon: {
    minWidth: "30px",
  },
  loginBtn: {
    background: theme.palette.primary.main,
    color: "#fff",
    borderRadius: "4px",
    padding: "5px 9px",
    fontWeight: 600,
  },
  menuItem: {
    width: 230,
    height: 37,
  },
  signUpBtn: {
    color: theme.palette.primary.main,
    background: "#fff",
    borderRadius: "4px",
    padding: "5px 9px",
    fontWeight: 600,
  },
  profilePic: {
    width: "25px",
    height: "25px",
    cursor: "pointer",
  },
  searchContainer: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
  },
}));
