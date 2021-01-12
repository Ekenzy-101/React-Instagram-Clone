import { Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import ProfileBodyPosts from "./posts";
import GridSvg from "../../../common/svgs/GridSvg";
import TaggedSvg from "../../../common/svgs/TaggedSvg";
import { UserProfile } from "../../../utils/types/user";
import { useStyles } from "./style";
import ProfileBodySaved from "./saved";
import SavedSvg from "../../../common/svgs/SavedSvg";
import ProfileBodyTagged from "./tagged";
import clsx from "clsx";
import {
  TO_PROFILESAVED_PAGE,
  TO_PROFILETAGGED_PAGE,
  TO_PROFILE_PAGE,
} from "../../../utils/constants/routes";

interface Props {
  user: UserProfile;
}

const ProfileBodyDesktopView: React.FC<Props> = ({ user }) => {
  // Other Hooks
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const handleClick = (path: string) => {
    history.push(path);
  };

  const getClassName = (path: string) => {
    if (location.pathname === path)
      return clsx(classes.gridItem, classes.activeGridItem);

    return classes.gridItem;
  };

  const TAGGED_URL = `/${user.username}/tagged/`;
  const SAVED_URL = `/${user.username}/saved/`;
  const ROOT_URL = `/${user.username}/`;

  // JSX
  return (
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
      <Switch>
        <Route exact path={TO_PROFILE_PAGE}>
          <ProfileBodyPosts posts={user.posts!} />
        </Route>
        <Route exact path={TO_PROFILESAVED_PAGE}>
          <ProfileBodySaved />
        </Route>
        <Route exact path={TO_PROFILETAGGED_PAGE}>
          <ProfileBodyTagged />
        </Route>
      </Switch>
    </div>
  );
};

export default ProfileBodyDesktopView;
