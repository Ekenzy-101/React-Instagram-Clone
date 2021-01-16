import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    position: "relative",
    border: "none",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "60px",
      border: "0.5px solid rgba(var(--b6a,219,219,219),1)",
    },
  },
  avatar: {
    width: "30px",
    height: "30px",
  },
  avatarWrapper: {
    borderRadius: "50%",
    background: theme.palette.background.paper,
    padding: "2.4px",
  },
  cardActions: {
    display: "flex",
    paddingLeft: "12px",
    paddingRight: "12px",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "14px",
      paddingRight: "14px",
    },
  },
  cardContent: {
    padding: "1px 12px",
    [theme.breakpoints.down("xs")]: {
      padding: "1px 14px",
    },
  },
  commentArea: {
    border: "none",
    outline: "none",
    display: "flex",
    flexGrow: 1,
    resize: "none",
    fontFamily: "inherit",
  },
  commentByAvatar: {
    width: "30px",
    height: "30px",
  },
  commentByBody: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    margin: "auto 20px",
  },
  commentByGroup: {
    display: "flex",
    marginBottom: "0.5rem",
  },
  commentContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 12px !important",
    borderTop: "0.5px solid rgba(var(--b6a,219,219,219),1)",
    marginTop: "10px",
    minHeight: "55px",
    maxHeight: "80px",
  },
  commentContent: {
    minHeight: "calc(100% - 210px)",
  },
  createdAt: {
    textTransform: "uppercase",
    fontWeight: 500,
  },
  gridItem: {
    borderRadius: "50%",
    padding: "2px",
    background: "linear-gradient(to left, #C13584 0%, #F77737 90%)",
  },
  groupIcons: {
    display: "flex",
    justifyContent: "space-between",
    width: "6.5rem",
  },
  header: {
    padding: "10px 13px",
    fontWeight: "bold",
  },
  likedByGroup: {
    display: "flex",
    alignItems: "center",
  },
  likedByAvatar: {
    width: "1.2rem",
    height: "1.2rem",
    marginRight: "5px",
  },
  link: {
    color: "#000",
    textDecoration: "none",
  },
  media: {
    paddingBottom: "125%",
  },
  stepper: {
    display: "flex",
    width: "100%",
    margin: "auto",
    position: "absolute",
    top: "40%",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  stepperButton: {
    width: "1.5rem",
    height: "1.5rem",
    margin: "0 0.7rem",
    padding: "1px",
    textAlign: "center",
    color: theme.palette.action.disabled,
    background: theme.palette.common.white,
  },
  stepperButtonIcon: {
    fontSize: "15px !important",
  },
}));
