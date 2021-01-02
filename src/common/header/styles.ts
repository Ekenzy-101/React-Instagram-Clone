import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  brandLogo: {
    width: "103px",
    height: "29px",
    cursor: "pointer",
  },
  gridIconContainer: {
    width: "fit-content",
  },
  navLink: {
    cursor: "pointer",
    textDecoration: "none",
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
