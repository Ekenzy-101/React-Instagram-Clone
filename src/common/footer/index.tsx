import { Avatar, AppBar, Grid, Hidden, Toolbar } from "@material-ui/core";
import { Add, SearchOutlined } from "@material-ui/icons";
import { Link, useRouteMatch } from "react-router-dom";
import React from "react";

import { useStyles } from "./styles";
import HomeSvg from "../svgs/HomeSvg";
import LoveSvg from "../svgs/LoveSvg";
import { PROFILE_PIC_URL } from "../../utils/constants/url";
import {
  TO_EXPLORE_PAGE,
  TO_HOME_PAGE,
  TO_PROFILE_PAGE,
} from "../../utils/constants/routes";

const Footer: React.FC = () => {
  // Other Hooks
  const { path, url } = useRouteMatch();
  const classes = useStyles();

  // JSX
  return (
    <Hidden smUp>
      <AppBar position="sticky" className={classes.root}>
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
          <Link to="add" className={classes.navLink}>
            <Add className={classes.addIcon} />
          </Link>
          <Link to="/activity" className={classes.navLink}>
            <LoveSvg />
          </Link>
          <Link to="/kenzy_d_coder" className={classes.navLink}>
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
    </Hidden>
  );
};

export default Footer;
