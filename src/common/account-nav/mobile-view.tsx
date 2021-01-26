import {
  Paper,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Hidden,
} from "@material-ui/core";
import { ArrowForwardIos, Close } from "@material-ui/icons";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

import {
  TO_EDITPROFILE_PAGE,
  TO_HOME_PAGE,
  TO_PASSWORDCHANGE_PAGE,
} from "../../utils/constants/routes";
import { logout } from "../../utils/services/authService";
import { debug } from "../../utils/services/debugService";
import { modalState } from "../../utils/types/modal";
import LogoutModal from "../logout-modal";
import { useStyles } from "./styles";

interface Props {
  onClose: () => void;
}

const AccountNavMobileView: React.FC<Props> = ({ onClose }) => {
  // State Hooks
  const [show, setShow] = useState<modalState>("none");

  // Other Hooks
  const classes = useStyles();
  const history = useHistory();

  // Event Handlers
  const handleClick = (path: string) => {
    history.push(path);
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.replace(TO_HOME_PAGE);
    } catch (error) {
      debug.error(error?.response?.status, error?.response?.data);

      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        toast(error?.response?.data);
      } else {
        toast("An unexpected error occured. Please try again");
      }
    }
  };

  // JSX
  return (
    <Paper className={classes.root}>
      <Hidden smUp>
        <LogoutModal
          open={show === "logout"}
          mobileView
          onClose={() => setShow("none")}
          onLogout={handleLogout}
        />
        <AppBar position="sticky" className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
            <Close className={classes.backIcon} onClick={onClose} />
            <Typography
              variant="h6"
              color="textPrimary"
              style={{ fontWeight: 600 }}
            >
              Options
            </Typography>
            <p></p>
          </Toolbar>
        </AppBar>
        <Typography color="textSecondary" className={classes.title}>
          ACCOUNT
        </Typography>
        <List>
          <ListItem
            onClick={() => handleClick(TO_EDITPROFILE_PAGE)}
            className={classes.listItem}
          >
            <ListItemText primary="Edit Profile" />
            <ListItemSecondaryAction>
              <ArrowForwardIos className={classes.forwardIcon} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem
            onClick={() => handleClick(TO_PASSWORDCHANGE_PAGE)}
            className={classes.listItem}
          >
            <ListItemText primary="Change Password" />
            <ListItemSecondaryAction>
              <ArrowForwardIos className={classes.forwardIcon} />
            </ListItemSecondaryAction>
          </ListItem>
          <br />
          <ListItem
            onClick={() => setShow("logout")}
            className={classes.listItem}
          >
            <ListItemText
              primaryTypographyProps={{ className: classes.dangerText }}
              primary="Log Out"
            />
            <ListItemSecondaryAction>
              <ArrowForwardIos className={classes.forwardIcon} />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Hidden>
    </Paper>
  );
};

export default AccountNavMobileView;
