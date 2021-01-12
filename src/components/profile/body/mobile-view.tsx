import { Divider, Grid } from "@material-ui/core";
import { CropDinOutlined } from "@material-ui/icons";
import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import GridSvg from "../../../common/svgs/GridSvg";
import SavedSvg from "../../../common/svgs/SavedSvg";
import TaggedSvg from "../../../common/svgs/TaggedSvg";
import { UserProfile } from "../../../utils/types/user";
import ProfileBodyPosts from "./posts";
import ProfileBodySaved from "./saved";
import ProfileBodyTagged from "./tagged";
import { useStyles } from "./style";
import {
  TO_PROFILESAVED_PAGE,
  TO_PROFILETAGGED_PAGE,
  TO_PROFILE_PAGE,
} from "../../../utils/constants/routes";

interface Props {
  user: UserProfile;
}

const ProfileBodyMobileView: React.FC<Props> = ({ user }) => {
  // Other Hooks
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const handleClick = (path: string) => {
    history.push(path);
  };

  const getFillColor = (path: string) => {
    if (location.pathname === path) return "#0095f6";

    return "#8e8e8e";
  };

  const TAGGED_URL = `/${user.username}/tagged/`;
  const SAVED_URL = `/${user.username}/saved/`;
  const ROOT_URL = `/${user.username}/`;
  // JSX
  return (
    <>
      <Divider />
      <Grid
        container
        justify="space-around"
        style={{
          margin: "-6px auto -8px auto",
          textAlign: "center",
          width: "100%",
        }}
        alignItems="center"
        spacing={3}
      >
        <Grid onClick={() => handleClick(ROOT_URL)} item>
          <GridSvg fill={getFillColor(ROOT_URL)} />
        </Grid>
        <Grid item>
          <CropDinOutlined className={classes.feedIcon} />
        </Grid>
        <Grid onClick={() => handleClick(SAVED_URL)} item>
          <SavedSvg fill={getFillColor(SAVED_URL)} />
        </Grid>
        <Grid onClick={() => handleClick(TAGGED_URL)} item>
          <TaggedSvg fill={getFillColor(TAGGED_URL)} />
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
    </>
  );
};

export default ProfileBodyMobileView;
