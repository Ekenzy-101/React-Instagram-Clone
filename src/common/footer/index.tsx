import { Avatar, AppBar, Grid, Hidden, Toolbar } from "@material-ui/core";
import { Add, SearchOutlined } from "@material-ui/icons";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import React from "react";

import { useStyles } from "./styles";
import HomeSvg from "../svgs/HomeSvg";
import LoveSvg from "../svgs/LoveSvg";
import { PROFILE_PIC_URL } from "../../utils/constants/url";
import {
  TO_ACTIVITY_PAGE,
  TO_CREATESTYLE_PAGE,
  TO_EXPLORE_PAGE,
  TO_HOME_PAGE,
  TO_PROFILE_PAGE,
} from "../../utils/constants/routes";
import { useUserContext } from "../../utils/context/user";

const Footer: React.FC = () => {
  // Global State Hooks
  const { user } = useUserContext()!;

  // Other Hooks
  const { path, url } = useRouteMatch();
  const classes = useStyles();
  const history = useHistory();

  // Event Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      history.push(TO_CREATESTYLE_PAGE, files);
    }
  };

  // JSX
  return (
    <Hidden smUp>
      <>
        <AppBar position="fixed" className={classes.root}>
          <Toolbar className={classes.toolbar}>
            <Link to={TO_HOME_PAGE} className={classes.navLink}>
              <HomeSvg />
            </Link>

            <Link to={TO_EXPLORE_PAGE} className={classes.navLink}>
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
                id="file-input"
                onChange={handleChange}
              />
            </div>
            <Link to={TO_ACTIVITY_PAGE} className={classes.navLink}>
              <LoveSvg active={url === TO_ACTIVITY_PAGE} />
            </Link>
            <Link to={`/${user?.username}/`} className={classes.navLink}>
              <Grid
                item
                className={classes.gridItem}
                style={{
                  background:
                    path === TO_PROFILE_PAGE ? "#262626" : "transparent",
                }}
              >
                <div className={classes.avatarWrapper}>
                  <Avatar src={PROFILE_PIC_URL} className={classes.avatar} />
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
