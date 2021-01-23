import React, { useState } from "react";
import { Avatar, Button, Grid, Hidden, Typography } from "@material-ui/core";
import { PROFILE_PIC_URL } from "../../../utils/constants/url";
import { useStyles } from "./styles";
import { UserProfile } from "../../../utils/types/user";
import { useUserContext } from "../../../utils/context/user";
import SettingsSvg from "../../../common/svgs/SettingsSvg";
import { TO_EDITPROFILE_PAGE } from "../../../utils/constants/routes";
import { Link } from "react-router-dom";
import { Person, Check } from "@material-ui/icons";
import LoadingSpinner from "../../../common/loading/spinner";
import ProfileTitleUnfollowModal from "./modal/unfollow";
import NotSupportedModal from "../../../common/not-supported-modal";
interface Props {
  user: UserProfile;
  submitted: boolean;
  onToggleFollow: () => void;
}

const ProfileTitleDesktopView: React.FC<Props> = ({
  user,
  onToggleFollow,
  submitted,
}) => {
  // Global State Hooks
  const { user: authUser } = useUserContext()!;

  // State Hooks
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  // Other Hooks
  const classes = useStyles();

  // Other Logic
  const isFollowingUser = user.followers?.some(
    (follower) => follower?.id === authUser?.id
  );
  const isFollowedByUser = user.following?.some(
    (follower) => follower?.id === authUser?.id
  );

  // JSX
  return (
    <Hidden xsDown>
      <ProfileTitleUnfollowModal
        open={open}
        onClose={() => setOpen(false)}
        user={user}
        onToggleFollow={onToggleFollow}
      />
      <NotSupportedModal open={open1} onClose={() => setOpen1(false)} />
      <Grid
        container
        className={classes.root}
        justify="space-evenly"
        spacing={3}
      >
        <Grid xs={3} item>
          <Avatar
            src={user.image_url ? user.image_url : PROFILE_PIC_URL}
            className={classes.avatar}
            alt={user.username}
          />
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
                  <Link to={TO_EDITPROFILE_PAGE} className={classes.editBtn}>
                    Edit Profile
                  </Link>
                  <SettingsSvg width={24} height={24} />
                </>
              ) : isFollowingUser ? (
                <>
                  <Button
                    onClick={() => setOpen1(true)}
                    className={classes.followingBtn}
                  >
                    Message
                  </Button>
                  <Button
                    onClick={() => setOpen(true)}
                    className={classes.optionBtn}
                  >
                    <Person className={classes.peopleIcon} />
                    <Check className={classes.checkIcon} />
                  </Button>
                </>
              ) : (
                <Button className={classes.followBtn} onClick={onToggleFollow}>
                  {submitted ? "" : isFollowedByUser ? "Follow Back" : "Follow"}
                  {submitted ? <LoadingSpinner width={24} height={24} /> : null}
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
              <Typography>
                <strong>{user.followersCount}</strong> followers
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
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
            <Typography color="textSecondary" variant="body1">
              Followed by <strong style={{ color: "black" }}>iamsheriff</strong>{" "}
              +6more
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default ProfileTitleDesktopView;
