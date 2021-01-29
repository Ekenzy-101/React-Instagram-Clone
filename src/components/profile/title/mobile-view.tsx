import {
  Grid,
  Avatar,
  Typography,
  Button,
  Divider,
  Hidden,
} from "@material-ui/core";
import { Check, Person } from "@material-ui/icons";
import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import LoadingSpinner from "../../../common/loading/spinner";
import { TO_EDITPROFILE_PAGE } from "../../../utils/constants/routes";
import { LOADING_GIF_URL, PROFILE_PIC_URL } from "../../../utils/constants/url";
import { useUser } from "../../../utils/context/user";
import { User } from "../../../utils/types/user";
import { useStyles } from "./styles";
import ProfileTitleUnfollowModal from "./modal/unfollow";
import NotSupportedModal from "../../../common/not-supported-modal";
import { modalState } from "../../../utils/types/modal";
import { useFollow } from "../../../utils/context/follow";
interface Props {
  user: User;
  isUploading: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileTitleMobileView: React.FC<Props> = (props) => {
  const { user, isUploading, onUpload } = props;
  // Global State Hooks
  const { user: authUser } = useUser();
  const { handleToggleFollow, submitted } = useFollow();

  // State Hooks
  const [show, setShow] = useState<modalState>("none");

  // Other Styles
  const classes = useStyles();
  const { path, params } = useRouteMatch();

  // Other Logic
  const isFollowingUser = (id: string) => {
    return authUser?.followers?.some((f) => f.id === id);
  };

  const isFollowedByUser = (id: string) => {
    return authUser?.following?.some((f) => f.id === id);
  };

  const getRelatedUser: () => User | undefined = () => {
    const authUserFollowing = authUser?.following;
    let relatedUser: User | undefined;
    if (authUserFollowing) {
      authUserFollowing.forEach((u) => {
        relatedUser = user?.followers?.find((f) => f.id === u.id);
        if (relatedUser) return;
      });
    }
    return relatedUser;
  };

  const firstRelatedUser = getRelatedUser();

  const isAuthUser = authUser?.id === user.id;

  // JSX
  return (
    <Hidden smUp>
      <NotSupportedModal
        open={show === "not-supported"}
        onClose={() => setShow("none")}
      />
      <ProfileTitleUnfollowModal
        open={show === "unfollow"}
        onClose={() => setShow("none")}
        user={user}
      />
      <Grid container className={classes.root} alignItems="center" spacing={3}>
        <Grid xs={3} item>
          {isAuthUser ? (
            <div className="file-input-wrapper">
              <input
                type="file"
                id="file-input"
                accept="image/png,image/jpeg"
                style={{ width: 75, height: 75 }}
                onChange={onUpload}
              />
              <Avatar
                src={
                  isUploading
                    ? LOADING_GIF_URL
                    : user.image_url
                    ? PROFILE_PIC_URL
                    : PROFILE_PIC_URL
                }
                className={classes.avatar}
                alt="image"
              />
            </div>
          ) : (
            <Avatar
              src={PROFILE_PIC_URL}
              className={classes.avatar}
              alt="image"
            />
          )}
        </Grid>
        <Grid xs={8} item style={{ marginLeft: "0.5rem" }}>
          <Typography className={classes.username} variant="h5">
            <span style={{ marginRight: "1rem" }}>{user.username}</span>
          </Typography>
          {user.username === authUser?.username ? (
            <Link
              to={{
                pathname: TO_EDITPROFILE_PAGE,
                state: { from: path, ...params },
              }}
              className={classes.editBtn}
            >
              Edit Profile
            </Link>
          ) : isFollowedByUser(user?.id!) ? (
            <>
              <Button
                onClick={() => setShow("not-supported")}
                className={classes.followingBtn}
              >
                Message
              </Button>
              <Button
                onClick={() => setShow("unfollow")}
                className={classes.optionBtn}
              >
                <Person className={classes.peopleIcon} />
                <Check className={classes.checkIcon} />
              </Button>
            </>
          ) : (
            <Button
              className={classes.followBtn}
              onClick={() => handleToggleFollow(user)}
            >
              {submitted ? (
                <LoadingSpinner width={24} height={24} />
              ) : isFollowingUser(user?.id!) ? (
                "Follow Back"
              ) : (
                "Follow"
              )}
            </Button>
          )}
        </Grid>
        <Grid xs={12} item>
          <Typography style={{ width: "95%" }} variant="body1">
            <strong>{user.name}</strong>
          </Typography>
          <Typography
            component="a"
            style={{
              color: "#00376b",
              fontWeight: 600,
              textDecoration: "none",
              width: "95%",
            }}
            href={user.website}
            referrerPolicy="no-referrer"
            rel="no-opener"
          >
            {user.website}
          </Typography>
          <Typography style={{ width: "95%" }} variant="body1">
            {user.bio}
          </Typography>
        </Grid>
        <Grid xs={12} item>
          {firstRelatedUser ? (
            <Typography color="textSecondary" variant="body1">
              <strong>
                Followed by{" "}
                <Link
                  className={classes.link}
                  style={{ color: "#262626" }}
                  to={{
                    pathname: `/${firstRelatedUser?.username}/`,
                    state: { from: path, ...params },
                  }}
                >
                  {firstRelatedUser?.username}
                </Link>
              </strong>{" "}
            </Typography>
          ) : null}{" "}
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        justify="space-around"
        style={{ margin: "-2px 0", textAlign: "center" }}
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <Typography style={{ width: "100%", textAlign: "center" }}>
            <strong>{user.posts?.length}</strong>
          </Typography>
          <Typography color="textSecondary">posts</Typography>
        </Grid>
        <Grid item>
          <Link
            className={classes.link}
            to={{
              pathname: `/${user.username}/followers/`,
              state: { from: path, ...params },
            }}
          >
            <Typography style={{ width: "100%", textAlign: "center" }}>
              <strong>{user.followersCount}</strong>
            </Typography>
            <Typography color="textSecondary">followers</Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link
            className={classes.link}
            to={{
              pathname: `/${user.username}/following/`,
              state: { from: path, ...params },
            }}
          >
            <Typography style={{ width: "100%", textAlign: "center" }}>
              <strong>{user.followingCount}</strong>
            </Typography>
            <Typography color="textSecondary">following</Typography>
          </Link>
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default ProfileTitleMobileView;
