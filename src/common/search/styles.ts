import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "350px",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down(730)]: {
      width: "270px",
    },
    [theme.breakpoints.down(650)]: {
      width: "220px",
    },
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
  cancelLink: {
    color: "#262626",
    marginLeft: "1rem",
    textDecoration: "none",
    fontWeight: 550,
    cursor: "pointer",
  },
  input: {
    fontSize: "0.9rem",
  },
  inputBase: (props: { status?: string }) => ({
    background: theme.palette.background.default,
    height: "1.75rem",
    width: "215px",
    [theme.breakpoints.down(730)]: {
      width: "190px",
    },
    borderRadius: "4px",
    border: "0.3px solid rgba(var(--b6a,219,219,219),1) !important",
    fontSize: "1rem",
    paddingLeft: props.status === "focused" ? "0.5rem" : "3rem",
    paddingRight: "0.4rem",
    [theme.breakpoints.down("xs")]: {
      height: "35px",
      fontSize: "1.1rem",
      background: theme.palette.background.paper,
    },
    "&:focus": {
      [theme.breakpoints.down("xs")]: {
        borderColor: "#262626",
      },
    },
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
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.1rem",
    },
  },
  username: {
    color: "#262626",
    fontSize: "0.9rem",
  },
}));
