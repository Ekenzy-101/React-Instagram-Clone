import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  activeLink: {
    fontWeight: 600,
    borderLeft: "2px solid #000",
  },
  list: {
    padding: "0",
  },
  listItem: {
    padding: "0",
  },
  navLink: {
    textDecoration: "none",
    color: "inherit",
    width: "100%",
    padding: "9px 16px 9px 30px",
  },
}));
