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
  collapse: {
    "& div": {
      display: " inline",
      "& div": {
        display: "inline !important",
      },
    },
  },
  commentArea: {
    border: "none",
    outline: "none",
    display: "flex",
    flexGrow: 1,
    resize: "none",
    background: "inherit",
    fontFamily: "inherit",
  },
  commentBtn: {
    color: "inherit",
    fontWeight: 550,
    textTransform: "none",
    padding: "0",
    marginLeft: "12px",
    background: "#fff !important",
  },
  commentByAvatar: {
    width: "30px",
    height: "30px",
  },
  commentByBody: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    marginLeft: "15px",
  },
  commentByGroup: {
    display: "flex",
    marginBottom: "0.3rem",
    [theme.breakpoints.between("xs", 735)]: {
      marginBottom: "0.8rem",
    },
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
    [theme.breakpoints.down("xs")]: {
      padding: "0 9px !important",
    },
  },
  commentContent: {
    maxHeight: "385px",
    minHeight: "385px",
    overflow: "auto",
    [theme.breakpoints.down(825)]: {
      maxHeight: "360px",
      minHeight: "360px",
    },
    [theme.breakpoints.down(790)]: {
      maxHeight: "340px",
      minHeight: "340px",
    },
    [theme.breakpoints.down(770)]: {
      maxHeight: "320px",
      minHeight: "320px",
    },
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
    padding: "10px 13px !important",
    fontWeight: "bold",
  },
  likedByGroup: {
    display: "flex",
    alignItems: "center",
  },
  likedByAvatar: {
    width: "20px",
    height: "20px",
    marginRight: "5px",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    cursor: "pointer",
  },
  media: {
    paddingBottom: "125%",
  },
  mobileCommentByBody: {
    marginRight: "15px",
    float: "left",
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      marginRight: "9px",
      fontSize: "0.9rem",
    },
  },
  replyByBody: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    marginLeft: "15px",
  },
  rounded: {
    borderRadius: "0.7rem",
    background: "#fff",
    margin: "10px 0 !important",
    border: "1px solid rgba(var(--b6a,219,219,219),1)",
  },
  seeMoreBtn: {
    color: theme.palette.text.secondary,
    background: "#fff !important",
    textTransform: "none",
    minWidth: 0,
    fontWeight: 550,
    padding: "0 3px",
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
  submitBtn: {
    textTransform: "capitalize",
    color: `${theme.palette.primary.main} !important`,
    fontWeight: 600,
    padding: "0 !important",
    width: "fit-content",
    minWidth: "0",
  },
  text: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
    },
  },
  username: {
    fontSize: "1rem",
    marginBottom: "2px",
    marginRight: "5px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
    },
  },
}));
