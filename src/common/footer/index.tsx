import { Avatar, AppBar, Grid, Hidden, Toolbar } from "@material-ui/core";
import { Add, SearchOutlined } from "@material-ui/icons";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import React from "react";
import toast from "react-hot-toast";

import { useStyles } from "./styles";
import HomeSvg from "../svgs/HomeSvg";
import LoveSvg from "../svgs/LoveSvg";
import { DEFAULT_PROFILE_PIC_URL } from "../../utils/constants/url";
import {
  TO_ACTIVITY_PAGE,
  TO_CREATESTYLE_PAGE,
  TO_EXPLORE_PAGE,
  TO_HOME_PAGE,
  TO_PROFILE_PAGE,
} from "../../utils/constants/routes";
import { useUser } from "../../utils/context/user";
import CustomToast from "../toast";

const Footer: React.FC = () => {
  // Global State Hooks
  const { user } = useUser();

  // Other Hooks
  const { path, url, params } = useRouteMatch();
  const classes = useStyles();
  const history = useHistory();

  // Event Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;

    const supportedTypes = ["image/png", "image/jpeg"];

    for (const file of files) {
      if (supportedTypes.every((type) => file.type !== type)) {
        toast(<CustomToast message="Image is not a supported format" />);
        return;
      }
    }

    if (files?.length > 5) {
      toast(<CustomToast message="Please select a maximum of 5 images" />);
      return;
    }
    if (files?.length <= 5 && files?.length > 0) {
      history.push(TO_CREATESTYLE_PAGE, files);
    }
  };

  // JSX
  if (!user) return null;
  return (
    <Hidden smUp>
      <>
        <AppBar position="fixed" className={classes.root}>
          <Toolbar className={classes.toolbar}>
            <Link
              to={{
                pathname: TO_HOME_PAGE,
                state: { from: path, ...params },
              }}
              className={classes.navLink}
            >
              <HomeSvg />
            </Link>

            <Link
              to={{
                pathname: TO_EXPLORE_PAGE,
                state: { from: path, ...params },
              }}
              className={classes.navLink}
            >
              <SearchOutlined
                className={classes.searchIcon}
                style={{
                  opacity: url === TO_EXPLORE_PAGE ? 1 : 0.7,
                }}
              />
            </Link>
            <div className="file-input-wrapper">
              <Add className={classes.addIcon} />
              <input
                type="file"
                multiple
                accept="image/png,image/jpeg"
                id="file-input"
                onChange={handleChange}
              />
            </div>
            <Link
              to={{
                pathname: TO_ACTIVITY_PAGE,
                state: { from: path, ...params },
              }}
              className={classes.navLink}
            >
              <LoveSvg active={url === TO_ACTIVITY_PAGE} />
            </Link>
            <Link
              to={{
                pathname: `/${user?.username}/`,
                state: { from: path, ...params },
              }}
              className={classes.navLink}
            >
              <Grid
                item
                className={classes.gridItem}
                style={{
                  background:
                    path === TO_PROFILE_PAGE ? "#262626" : "transparent",
                }}
              >
                <div className={classes.avatarWrapper}>
                  <Avatar
                    src={
                      user?.image_url
                        ? user?.image_url
                        : DEFAULT_PROFILE_PIC_URL
                    }
                    className={classes.avatar}
                  />
                </div>
              </Grid>
            </Link>
          </Toolbar>
        </AppBar>
      </>
    </Hidden>
  );
};

export default Footer;
