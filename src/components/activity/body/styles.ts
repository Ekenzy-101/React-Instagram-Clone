import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {},
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
  shareBtn: {
    background: "#fff",
    color: theme.palette.primary.main,
    textTransform: "none",
    boxShadow: "none",
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
}));
