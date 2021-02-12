import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    width: "95%",
    margin: "auto",
    display: "flex",
    flexWrap: "nowrap",
    overflow: "auto",
  },
  avatar: {
    width: "30px",
    height: "30px",
    marginRight: "0.5rem",
  },
  image: {
    width: "90vw",
    marginLeft: "0.5rem",
    minHeight: "60vh",
  },
  input: {
    height: "20px !important",
  },
  smallImage: {
    width: "50px",
    height: "50px",
    marginLeft: "0.5rem",
  },
  textarea: {
    flexGrow: 1,
    color: "#262626",
    fontFamily: "Roboto",
    letterSpacing: "0.2px",
    height: "50px",
    resize: "none",
    border: "none",
    outline: "none",
  },
  wrapper: {
    background: theme.palette.background.paper,
    borderBottom: "1px solid rgba(var(--b6a,219,219,219),1)",
    borderTop: "1px solid rgba(var(--b6a,219,219,219),1)",
    padding: "0.8rem",
    width: "100%",
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "space-between",
  },
}));
