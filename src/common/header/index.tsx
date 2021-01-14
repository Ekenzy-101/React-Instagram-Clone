import { Hidden, Avatar, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  IG_MONOCHROME_LOGO_URL,
  PROFILE_PIC_URL,
} from "../../utils/constants/url";
import { useStyles } from "./styles";
import CustomSearch from "../search";
import DirectSvg from "../svgs/DirectSvg";
import ExploreSvg from "../svgs/ExploreSvg";
import HomeSvg from "../svgs/HomeSvg";
import LoveSvg from "../svgs/LoveSvg";
import {
  TO_ACTIVITY_PAGE,
  TO_EXPLORE_PAGE,
  TO_HOME_PAGE,
  TO_LOGIN_PAGE,
  TO_SIGNUP_PAGE,
} from "../../utils/constants/routes";
import HeaderMenu from "./menu";
import clsx from "clsx";
import { useUserContext } from "../../utils/context/user";
import NotSupportedModal from "../not-supported-modal";

const DesktopViewHeader = () => {
  // Global State Hooks
  const { user } = useUserContext()!;

  // State Hooks
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  // Other Hooks
  const classes = useStyles();
  const { pathname } = useLocation();

  // Event Handlers
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  // JSX
  return (
    <Hidden only="xs">
      <NotSupportedModal open={open} onClose={() => setOpen(false)} />
      <Link to={TO_HOME_PAGE} className={classes.navLink}>
        <Avatar
          src={IG_MONOCHROME_LOGO_URL}
          className={classes.brandLogo}
          variant="square"
        />
      </Link>
      <div className={classes.searchContainer}>
        <CustomSearch />
      </div>
      <Grid container className={classes.gridIconContainer} spacing={3}>
        {user ? (
          <>
            <Grid item>
              <Link to={TO_HOME_PAGE} className={classes.navLink}>
                <HomeSvg />
              </Link>
            </Grid>
            <Grid item>
              <DirectSvg onClick={() => setOpen(true)} />
            </Grid>
            <Grid item>
              <Link to={TO_EXPLORE_PAGE} className={classes.navLink}>
                <ExploreSvg />
              </Link>
            </Grid>
            <Grid item>
              <Link to={TO_ACTIVITY_PAGE} className={classes.navLink}>
                <LoveSvg active={pathname === TO_ACTIVITY_PAGE} />
              </Link>
            </Grid>
            <Grid item>
              <Avatar
                src={PROFILE_PIC_URL}
                className={classes.profilePic}
                onClick={(e) => handleClick(e)}
                aria-controls="header-menu"
                aria-haspopup="true"
              />
              <HeaderMenu
                setAnchorElement={setAnchorElement}
                anchorElement={anchorElement}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid className={classes.gridItem} item>
              <Link
                to={TO_LOGIN_PAGE}
                className={clsx(classes.loginBtn, classes.navLink)}
              >
                Log In
              </Link>
            </Grid>
            <Grid className={classes.gridItem} item>
              <Link
                to={TO_SIGNUP_PAGE}
                className={clsx(classes.signUpBtn, classes.navLink)}
              >
                Sign Up
              </Link>
            </Grid>
          </>
        )}
      </Grid>
    </Hidden>
  );
};

export default DesktopViewHeader;
