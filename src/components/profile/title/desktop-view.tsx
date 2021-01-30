import React, { useState } from "react";
import { Person, Check } from "@material-ui/icons";
import { Link, useRouteMatch } from "react-router-dom";
import { Avatar, Button, Grid, Hidden, Typography } from "@material-ui/core";

import { useStyles } from "./styles";
import ProfileTitleUnfollowModal from "./modal/unfollow";
import ProfileTitlePictureModal from "./modal/picture";
import { LOADING_GIF_URL, PROFILE_PIC_URL } from "../../../utils/constants/url";
import { User } from "../../../utils/types/user";
import { useUser } from "../../../utils/context/user";
import { TO_EDITPROFILE_PAGE } from "../../../utils/constants/routes";
import SettingsSvg from "../../../common/svgs/SettingsSvg";
import LoadingSpinner from "../../../common/loading/spinner";
import NotSupportedModal from "../../../common/not-supported-modal";
import LoginModal from "../../../common/login-modal";
import { modalState } from "../../../utils/types/modal";
import UsersModal from "../../../common/users-modal";
import useFollow from "../../../common/hooks/useFollow";
import useProfile from "../../../common/hooks/useProfile";
interface Props {
  user: User;
}

const ProfileTitleDesktopView: React.FC<Props> = ({ user }) => {
  // Global State Hooks
  const { user: authUser } = useUser();

  // State Hooks
  const [show, setShow] = useState<modalState>("none");

  // Other Hooks
  const classes = useStyles();
  const { handleToggleFollow, submitted } = useFollow();
  const { path, params } = useRouteMatch();
  const {
    handleDeleteProfilePicture,
    handleUploadProfilePicture,
    isDeleting,
    isUploading,
  } = useProfile();

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
    <Hidden xsDown>
      <UsersModal
        title="Followers"
        open={show === "followers"}
        onClose={() => setShow("none")}
        users={user.followers!}
      />
      <UsersModal
        title="Following"
        open={show === "following"}
        onClose={() => setShow("none")}
        users={user.following!}
      />
      <ProfileTitleUnfollowModal
        open={show === "unfollow"}
        onClose={() => setShow("none")}
        user={user}
      />
      <ProfileTitlePictureModal
        open={show === "profile-picture"}
        onClose={() => setShow("none")}
        onDelete={handleDeleteProfilePicture}
        onUpload={handleUploadProfilePicture}
      />
      <NotSupportedModal
        open={show === "not-supported"}
        onClose={() => setShow("none")}
      />
      <LoginModal open={show === "login"} onClose={() => setShow("none")} />
      <Grid
        container
        className={classes.root}
        justify="space-evenly"
        spacing={3}
      >
        <Grid xs={3} item>
          {isUploading || isDeleting ? (
            <Avatar src={LOADING_GIF_URL} className={classes.avatar} />
          ) : isAuthUser && !user.image_url ? (
            <div className="file-input-wrapper">
              <input
                type="file"
                id="file-input"
                accept="image/png,image/jpeg"
                style={{ width: 150, height: 150 }}
                onChange={handleUploadProfilePicture}
              />
              <Avatar src={PROFILE_PIC_URL} className={classes.avatar} />
            </div>
          ) : isAuthUser && user.image_url ? (
            <Avatar
              src={user.image_url}
              onClick={() => setShow("profile-picture")}
              className={classes.avatar}
            />
          ) : (
            <Avatar
              src={user.image_url ? user.image_url : PROFILE_PIC_URL}
              className={classes.avatar}
            />
          )}
        </Grid>

        <Grid xs={7} item style={{ marginLeft: "0.5rem" }}>
          <Grid container>
            <Grid item>
              <Typography className={classes.username} variant="h5">
                {user.username}
              </Typography>
            </Grid>

            <Grid style={{ display: "flex", alignItems: "center" }} item>
              {user.username === authUser?.username ? (
                <>
                  <Link
                    to={{
                      pathname: TO_EDITPROFILE_PAGE,
                      state: { from: path, ...params },
                    }}
                    className={classes.editBtn}
                  >
                    Edit Profile
                  </Link>
                  <SettingsSvg width={24} height={24} />
                </>
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
                  onClick={
                    authUser
                      ? () => handleToggleFollow(user)
                      : () => setShow("login")
                  }
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
          </Grid>

          <Grid
            container
            justify="space-between"
            style={{ margin: "0 0 0 -11px", width: "88%" }}
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography>
                <strong>{user.posts?.length}</strong> posts
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                onClick={
                  authUser ? () => setShow("followers") : () => setShow("login")
                }
                className={classes.link}
              >
                <strong>{user.followersCount}</strong> followers
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                onClick={
                  authUser ? () => setShow("following") : () => setShow("login")
                }
                className={classes.link}
              >
                <strong>{user.followingCount}</strong> following
              </Typography>
            </Grid>
          </Grid>

          <Grid xs={12} item>
            <Typography variant="body1">
              <strong>{user.name}</strong>
            </Typography>
            <Typography variant="body1">{user.bio}</Typography>
            <Typography
              component="a"
              style={{
                color: "#00376b",
                fontWeight: 600,
                textDecoration: "none",
              }}
              href={user.website}
              referrerPolicy="no-referrer"
              rel="no-opener"
            >
              {user.website}
            </Typography>
          </Grid>
          <br />
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
      </Grid>
    </Hidden>
  );
};

export default ProfileTitleDesktopView;
