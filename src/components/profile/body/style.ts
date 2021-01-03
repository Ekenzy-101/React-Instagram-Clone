import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: "16px 8px",
    [theme.breakpoints.only("xs")]: {
      margin: "8px 4px",
    },
    [theme.breakpoints.up("sm")]: {
      margin: "16px auto",
      maxWidth: "760px",
    },
  },
  feedIcon: {
    fontSize: "1.5rem",
    color: "#8e8e8e",
  },
  gridItem: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginRight: "2rem",
  },
  gridTile: {},
  gridTilePic: {
    width: "100%",
    height: "15.5rem",
  },
  username: {
    marginBottom: "0.4rem",
  },
}));
