import clsx from "clsx";
import { Hidden, Avatar, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

import {
  IG_MONOCHROME_LOGO_URL,
  DEFAULT_PROFILE_PIC_URL,
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
import { useUser } from "../../utils/context/user";
import NotSupportedModal from "../not-supported-modal";
import { modalState } from "../../utils/types/modal";

const DesktopViewHeader = () => {
  // Global State Hooks
  const { user } = useUser();

  // State Hooks
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [show, setShow] = useState<modalState>("none");

  // Other Hooks
  const classes = useStyles();
  const { pathname } = useLocation();
  const { path, params } = useRouteMatch();

  // Event Handlers
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  // JSX
  return (
    <Hidden only="xs">
      <NotSupportedModal
        open={show === "not-supported"}
        onClose={() => setShow("none")}
      />
      <Link
        to={{ pathname: TO_HOME_PAGE, state: { from: path, ...params } }}
        className={classes.navLink}
      >
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
              <Link
                to={{
                  pathname: TO_HOME_PAGE,
                  state: { from: path, ...params },
                }}
                className={classes.navLink}
              >
                <HomeSvg />
              </Link>
            </Grid>
            <Grid item>
              <DirectSvg onClick={() => setShow("not-supported")} />
            </Grid>
            <Grid item>
              <Link
                to={{
                  pathname: TO_EXPLORE_PAGE,
                  state: { from: path, ...params },
                }}
                className={classes.navLink}
              >
                <ExploreSvg />
              </Link>
            </Grid>
            <Grid item>
              <Link
                to={{
                  pathname: TO_ACTIVITY_PAGE,
                  state: { from: path, ...params },
                }}
                className={classes.navLink}
              >
                <LoveSvg active={pathname === TO_ACTIVITY_PAGE} />
              </Link>
            </Grid>
            <Grid item>
              <Avatar
                src={
                  user?.image_url ? user?.image_url : DEFAULT_PROFILE_PIC_URL
                }
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
                to={{
                  pathname: `${TO_LOGIN_PAGE}?next=${encodeURIComponent(
                    pathname
                  )}`,
                  state: pathname,
                }}
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
