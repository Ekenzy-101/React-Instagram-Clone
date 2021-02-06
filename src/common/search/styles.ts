import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "350px",
    display: "flex",
    justifyContent: "center",
  },
  avatar: {
    width: 38,
    height: 38,
    marginRight: 10,
  },
  cancel: {
    fontSize: "1rem",
    color: theme.palette.action.disabled,
    cursor: "pointer",
    zIndex: 4959,
  },
  input: {
    fontSize: "0.9rem",
  },
  inputBase: (props: { status?: string }) => ({
    background: theme.palette.background.default,
    height: "1.75rem",
    width: "215px",
    borderRadius: "4px",
    border: "0.3px solid rgba(var(--b6a,219,219,219),1)",
    fontSize: "1rem",
    paddingLeft: props.status === "focused" ? "0.5rem" : "3rem",
    paddingRight: "0.4rem",
  }),
  link: {
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit",
    display: "block",
  },
  listBox: {
    padding: 0,
    margin: 0,
    width: "100%",
    maxHeight: 362,
    overflow: "auto",
    "& li": {
      borderBottom: "1px solid rgba(var(--b6a,219,219,219),1)",
      padding: 0,
      margin: 0,
    },
  },
  menuItem: {
    width: "100%",
    height: 60,
    display: "flex",
    alignItems: "center",
    padding: "8px 14px",
  },
  name: {
    fontSize: "0.9rem",
  },
  searchIcon: {
    fontSize: "1rem",
    color: theme.palette.action.disabled,
    fontWeight: "bold",
  },
  username: {
    color: "#262626",
    fontSize: "0.9rem",
  },
}));
