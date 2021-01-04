import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  greyLogo: {
    width: "70px",
    height: "70px",
    opacity: 0.6,
  },
}));
