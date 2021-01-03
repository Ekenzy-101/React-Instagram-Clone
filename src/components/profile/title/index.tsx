import { Hidden } from "@material-ui/core";
import React from "react";
import ProfileTitleDesktopView from "./desktop-view";
import ProfileTitleMobileView from "./mobile-view";

const ProfileTitle = () => {
  return (
    <>
      <Hidden smUp>
        <ProfileTitleMobileView />
      </Hidden>
      <Hidden xsDown>
        <ProfileTitleDesktopView />
      </Hidden>
    </>
  );
};

export default ProfileTitle;
