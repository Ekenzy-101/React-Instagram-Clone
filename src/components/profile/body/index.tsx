import { Hidden } from "@material-ui/core";
import React from "react";
import ProfileBodyDesktopView from "./desktop-view";
import ProfileBodyMobileView from "./mobile-view";

const ProfileBody = () => {
  return (
    <>
      <Hidden smUp>
        <ProfileBodyMobileView />
      </Hidden>
      <Hidden xsDown>
        <ProfileBodyDesktopView />
      </Hidden>
    </>
  );
};

export default ProfileBody;
