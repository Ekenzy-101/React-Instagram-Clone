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
  activeGridItem: {
    borderTop: "1px solid #000",
  },
  bodyRoot: {
    width: "100%",
    minHeight: "322px",
    paddingBottom: "3.4rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bodyWrapper: {
    margin: "auto",
    width: "325px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  bodyTitle: {
    marginBottom: "1rem",
    textAlign: "center",
  },
  bodyContent: {
    textAlign: "center",
    fontSize: "14px",
  },
  card: {
    width: "250px",
    height: "238px",
    padding: "0 10px",
    background: theme.palette.background.paper,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  cameraLogo: {
    width: "40px",
    height: "40px",
  },
  feedIcon: {
    fontSize: "1.5rem",
    color: "#8e8e8e",
  },
  flexContainer: {
    margin: "auto 0.5rem",
    width: "98%",
    flexWrap: "nowrap",
    overflowX: "auto",
  },
  gridItem: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginRight: "2rem",
    marginTop: "-4px",
    cursor: "pointer",
  },
  gridItemBtn: {
    textTransform: "none",
    margin: "auto",
    color: "#fff",
    background: `${theme.palette.primary.main} !important`,
  },
  svgWrapper: {
    width: "62px",
    height: "62px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    margin: "1rem auto",
    border: "2px solid #222",
  },
  username: {
    marginBottom: "0.4rem",
  },
}));
