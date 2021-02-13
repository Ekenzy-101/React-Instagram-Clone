import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    width: "100%",
    border: "0.5px solid rgba(var(--b6a,219,219,219),1)",
    padding: "16px 0 16px  20px",
    flexWrap: "nowrap",
    overflow: "auto",
    minHeight: "110px",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "30px",
    },
  },
  addIcon: {
    width: 20,
    height: 20,
    color: theme.palette.primary.main,
    background: "#fff",
    borderRadius: "50%",
  },
  avatarWrapper: {
    borderRadius: "50%",
    background: theme.palette.background.paper,
    padding: "2.4px",
  },
  avatar: {
    width: "56px",
    height: "56px",
  },
  gridItem: {
    borderRadius: "50%",
    padding: "2px",
    background: "linear-gradient(to left, #C13584 0%, #F77737 90%)",
  },
  username: {
    marginTop: "5px",
    lineHeight: 1,
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: "20px",
  },
}));
