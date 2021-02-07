import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 38,
    height: 38,
    marginRight: 10,
  },
  link: {
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit",
    display: "block",
  },
  menuItem: {
    width: "100%",
    height: 60,
    display: "flex",
    alignItems: "center",
    padding: "8px 14px",
  },
  multiPhoto: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 0",
    height: "32px",
    width: "32px",
    position: "absolute",
    right: "2%",
  },
  name: {
    fontSize: "0.9rem",
  },
  username: {
    color: "#262626",
    fontSize: "0.9rem",
  },
}));
