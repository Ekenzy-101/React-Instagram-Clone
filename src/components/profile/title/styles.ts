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
    [theme.breakpoints.only("xs")]: {
      width: "60px",
      height: "60px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "120px",
      height: "120px",
      margin: "auto",
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
  },
}));
