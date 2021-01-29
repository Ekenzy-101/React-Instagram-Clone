import { Divider, Grid, Hidden } from "@material-ui/core";
import { CropDinOutlined } from "@material-ui/icons";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import GridSvg from "../../../common/svgs/GridSvg";
import SavedSvg from "../../../common/svgs/SavedSvg";
import TaggedSvg from "../../../common/svgs/TaggedSvg";
import { User } from "../../../utils/types/user";
import { useUser } from "../../../utils/context/user";
import { useStyles } from "./style";
interface Props {
  user: User;
}

const ProfileBodyMobileView: React.FC<Props> = ({ user }) => {
  // Global State Hooks
  const { user: authUser } = useUser()!;

  // Other Hooks
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  // Event Handler
  const handleClick = (path: string) => {
    history.push(path);
  };

  // Other Logic
  const getFillColor = (path: string) => {
    if (location.pathname === path) return "#0095f6";

    return "#8e8e8e";
  };

  const TAGGED_URL = `/${user.username}/tagged/`;
  const SAVED_URL = `/${user.username}/saved/`;
  const ROOT_URL = `/${user.username}/`;

  const isAuthUser = authUser?.id === user?.id;
  // JSX
  return (
    <Hidden smUp>
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
        {isAuthUser ? (
          <Grid onClick={() => handleClick(SAVED_URL)} item>
            <SavedSvg fill={getFillColor(SAVED_URL)} />
          </Grid>
        ) : null}
        <Grid onClick={() => handleClick(TAGGED_URL)} item>
          <TaggedSvg fill={getFillColor(TAGGED_URL)} />
        </Grid>
      </Grid>
      <Divider />
    </Hidden>
  );
};

export default ProfileBodyMobileView;
