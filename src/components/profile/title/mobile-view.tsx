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
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../common/loading/spinner";
import { TO_EDITPROFILE_PAGE } from "../../../utils/constants/routes";
import { PROFILE_PIC_URL } from "../../../utils/constants/url";
import { useUserContext } from "../../../utils/context/user";
import { UserProfile } from "../../../utils/types/user";
import { useStyles } from "./styles";
import ProfileTitleUnfollowModal from "./modal/unfollow";
import NotSupportedModal from "../../../common/not-supported-modal";

interface Props {
  user: UserProfile;
  submitted: boolean;
  onToggleFollow: () => void;
}

const ProfileTitleMobileView: React.FC<Props> = ({
  user,
  onToggleFollow,
  submitted,
}) => {
  // Global State Hooks
  const { user: authUser } = useUserContext()!;

  // State Hooks
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  // Other Styles
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
    <Hidden smUp>
      <NotSupportedModal open={open1} onClose={() => setOpen1(false)} />
      <ProfileTitleUnfollowModal
        open={open}
        onClose={() => setOpen(false)}
        user={user}
        onToggleFollow={onToggleFollow}
      />
      <Grid container className={classes.root} alignItems="center" spacing={3}>
        <Grid xs={3} item>
          <Avatar
            src={PROFILE_PIC_URL}
            className={classes.avatar}
            alt="image"
          />
        </Grid>
        <Grid xs={8} item style={{ marginLeft: "0.5rem" }}>
          <Typography className={classes.username} variant="h5">
            <span style={{ marginRight: "1rem" }}>{user.username}</span>
          </Typography>
          {user.username === authUser?.username ? (
            <Link to={TO_EDITPROFILE_PAGE} className={classes.editBtn}>
              Edit Profile
            </Link>
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
        <Grid xs={12} item>
          <Typography variant="body1">
            <strong>{user.name}</strong>
          </Typography>
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
          <Typography variant="body1">{user.bio}</Typography>
        </Grid>
        <Grid xs={12} item>
          <Typography color="textSecondary" variant="body1">
            Followed by <strong style={{ color: "black" }}>iamsheriff</strong>{" "}
            +6more
          </Typography>
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
          <Typography>
            <strong>{user.posts?.length}</strong>
          </Typography>
          <Typography color="textSecondary">posts</Typography>
        </Grid>
        <Grid item>
          <Typography>
            <strong>{user.followersCount}</strong>
          </Typography>
          <Typography color="textSecondary">followers</Typography>
        </Grid>
        <Grid item>
          <Typography>
            <strong>{user.followingCount}</strong>
          </Typography>
          <Typography color="textSecondary">following</Typography>
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default ProfileTitleMobileView;
