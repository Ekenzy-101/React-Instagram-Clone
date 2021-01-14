import { AppBar, Toolbar, Hidden, Typography } from "@material-ui/core";
import React from "react";
import { ArrowBackIos, PersonAddOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import { useStyles } from "./styles";
import DesktopViewHeader from "../../../common/header";
import { UserProfile } from "../../../utils/types/user";
import { useUserContext } from "../../../utils/context/user";
import SettingsSvg from "../../../common/svgs/SettingsSvg";
import MobileViewHeader from "../../../common/header/mobile-view";
interface Props {
  user: UserProfile;
}

const ProfileHeader: React.FC<Props> = ({ user }) => {
  // Global Hooks
  const { user: authUser } = useUserContext()!;

  // Other Hooks
  const classes = useStyles();
  const history = useHistory();

  const isAuthUserPage = authUser?.username === user.username;

  // JSX
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        {isAuthUserPage ? (
          <Hidden smUp>
            <SettingsSvg />
            <Typography color="textPrimary" variant="h6">
              {user.username}
            </Typography>
            <PersonAddOutlined className={classes.icon} />
          </Hidden>
        ) : authUser ? (
          <Hidden smUp>
            <ArrowBackIos
              className={classes.icon}
              onClick={() => history.goBack()}
            />
            <Typography color="textPrimary" variant="h6">
              {user.username}
            </Typography>
            <Typography></Typography>
          </Hidden>
        ) : (
          <MobileViewHeader />
        )}

        <DesktopViewHeader />
      </Toolbar>
    </AppBar>
  );
};

export default ProfileHeader;
