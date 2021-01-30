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
import ProfileTitlePictureModal from "./modal/picture";
import NotSupportedModal from "../../../common/not-supported-modal";
import { modalState } from "../../../utils/types/modal";
import useFollow from "../../../common/hooks/useFollow";
import useProfile from "../../../common/hooks/useProfile";
import LoginModal from "../../../common/login-modal";
interface Props {
  user: User;
}

const ProfileTitleMobileView: React.FC<Props> = ({ user }) => {
  // Global State Hooks
  const { user: authUser } = useUser();

  // State Hooks
  const [show, setShow] = useState<modalState>("none");

  // Other Styles
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
      <ProfileTitlePictureModal
        open={show === "profile-picture"}
        onClose={() => setShow("none")}
        onDelete={handleDeleteProfilePicture}
        onUpload={handleUploadProfilePicture}
      />
      <LoginModal open={show === "login"} onClose={() => setShow("none")} />
      <Grid container className={classes.root} alignItems="center" spacing={3}>
        <Grid xs={3} item>
          {isUploading || isDeleting ? (
            <Avatar src={LOADING_GIF_URL} className={classes.avatar} />
          ) : isAuthUser && !user.image_url ? (
            <div className="file-input-wrapper">
              <input
                type="file"
                id="file-input"
                accept="image/png,image/jpeg"
                style={{ width: 75, height: 75 }}
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
          {authUser ? (
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
          ) : (
            <div className={classes.link} onClick={() => setShow("login")}>
              <Typography style={{ width: "100%", textAlign: "center" }}>
                <strong>{user.followersCount}</strong>
              </Typography>
              <Typography color="textSecondary">followers</Typography>
            </div>
          )}
        </Grid>
        <Grid item>
          {authUser ? (
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
          ) : (
            <div className={classes.link} onClick={() => setShow("login")}>
              <Typography style={{ width: "100%", textAlign: "center" }}>
                <strong>{user.followingCount}</strong>
              </Typography>
              <Typography color="textSecondary">following</Typography>
            </div>
          )}
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default ProfileTitleMobileView;
