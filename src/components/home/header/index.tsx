import { AppBar, Toolbar, Avatar, Hidden } from "@material-ui/core";
import { PhotoCameraOutlined } from "@material-ui/icons";
import React from "react";

import { IG_MONOCHROME_LOGO_URL } from "../../../utils/constants/url";
import DirectSvg from "../../../common/svgs/DirectSvg";
import { useStyles } from "./styles";
import DesktopViewHeader from "../../../common/header";

const HomeHeader = () => {
  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Hidden smUp>
          <PhotoCameraOutlined className={classes.cameraIcon} />
          <Avatar
            src={IG_MONOCHROME_LOGO_URL}
            className={classes.brandLogo}
            variant="square"
          />
          <DirectSvg />
        </Hidden>

        <DesktopViewHeader />
      </Toolbar>
    </AppBar>
  );
};

export default HomeHeader;
