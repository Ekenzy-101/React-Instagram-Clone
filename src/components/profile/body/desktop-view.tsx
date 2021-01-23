import clsx from "clsx";
import { Divider, Grid, Hidden, Typography } from "@material-ui/core";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import GridSvg from "../../../common/svgs/GridSvg";
import SavedSvg from "../../../common/svgs/SavedSvg";
import TaggedSvg from "../../../common/svgs/TaggedSvg";
import { UserProfile } from "../../../utils/types/user";
import { useUserContext } from "../../../utils/context/user";
import { useStyles } from "./style";
interface Props {
  user: UserProfile;
}

const ProfileBodyDesktopView: React.FC<Props> = ({ user }) => {
  // Global State Hooks
  const { user: authUser } = useUserContext()!;
  // Other Hooks
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  // Event Handler
  const handleClick = (path: string) => {
    history.push(path);
  };

  // Other Logic
  const getClassName = (path: string) => {
    if (location.pathname === path)
      return clsx(classes.gridItem, classes.activeGridItem);

    return classes.gridItem;
  };

  const TAGGED_URL = `/${user.username}/tagged/`;
  const SAVED_URL = `/${user.username}/saved/`;
  const ROOT_URL = `/${user.username}/`;

  const isAuthUser = authUser?.id === user?.id;
  // JSX
  return (
    <Hidden xsDown>
      <div className={classes.root}>
        <Divider />
        <Grid
          container
          justify="center"
          style={{ margin: "3px 0", textAlign: "center" }}
          alignItems="center"
          spacing={3}
        >
          <Grid
            item
            className={getClassName(ROOT_URL)}
            onClick={() => handleClick(ROOT_URL)}
          >
            <GridSvg width={16} height={16} />
            <Typography
              style={{ marginLeft: "0.6rem" }}
              color="textSecondary"
              variant="caption"
            >
              <strong>POSTS</strong>
            </Typography>
          </Grid>
          {isAuthUser ? (
            <Grid
              item
              className={getClassName(SAVED_URL)}
              onClick={() => handleClick(SAVED_URL)}
            >
              <SavedSvg width={16} height={16} />
              <Typography
                style={{ marginLeft: "0.6rem" }}
                color="textSecondary"
                variant="caption"
              >
                <strong>SAVED</strong>
              </Typography>
            </Grid>
          ) : null}
          <Grid
            item
            className={getClassName(TAGGED_URL)}
            onClick={() => handleClick(TAGGED_URL)}
          >
            <TaggedSvg width={16} height={16} />
            <Typography
              style={{ marginLeft: "0.6rem" }}
              color="textSecondary"
              variant="caption"
            >
              <strong>TAGGED</strong>
            </Typography>
          </Grid>
        </Grid>
        <Divider />
      </div>
    </Hidden>
  );
};

export default ProfileBodyDesktopView;
