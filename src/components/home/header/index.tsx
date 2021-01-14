import { AppBar, Toolbar, Avatar, Hidden } from "@material-ui/core";
import React, { useState } from "react";

import {
  CAMERA_LOGO_URL,
  IG_MONOCHROME_LOGO_URL,
} from "../../../utils/constants/url";
import DirectSvg from "../../../common/svgs/DirectSvg";
import { useStyles } from "./styles";
import DesktopViewHeader from "../../../common/header";
import NotSupportedModal from "../../../common/not-supported-modal";

const HomeHeader = () => {
  // State Hooks
  const [open, setOpen] = useState(false);

  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <>
      <NotSupportedModal open={open} onClose={() => setOpen(false)} />
      <AppBar position="sticky" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Hidden smUp>
            <Avatar src={CAMERA_LOGO_URL} className={classes.cameraIcon} />
            <Avatar
              src={IG_MONOCHROME_LOGO_URL}
              className={classes.brandLogo}
              variant="square"
            />
            <DirectSvg onClick={() => setOpen(true)} />
          </Hidden>

          <DesktopViewHeader />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default HomeHeader;
