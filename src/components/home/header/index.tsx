import { AppBar, Toolbar, Avatar, Hidden } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  CAMERA_LOGO_URL,
  IG_MONOCHROME_LOGO_URL,
} from "../../../utils/constants/url";
import DirectSvg from "../../../common/svgs/DirectSvg";
import { useStyles } from "./styles";
import DesktopViewHeader from "../../../common/header";
import NotSupportedModal from "../../../common/not-supported-modal";
import { TO_CREATESTORY_PAGE } from "../../../utils/constants/routes";

const HomeHeader = () => {
  // State Hooks
  const [open, setOpen] = useState(false);

  // Other Hooks
  const classes = useStyles();
  const history = useHistory();

  // Event Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      history.replace(TO_CREATESTORY_PAGE, file);
    }
  };

  // JSX
  return (
    <>
      <NotSupportedModal open={open} onClose={() => setOpen(false)} />
      <AppBar position="sticky" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Hidden smUp>
            <div className="file-input-wrapper">
              <Avatar src={CAMERA_LOGO_URL} className={classes.cameraIcon} />
              <input
                type="file"
                accept="image/png,image/jpeg"
                id="file-input"
                onChange={handleChange}
              />
            </div>
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
