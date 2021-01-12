import { Grid, Avatar, Typography, Button, Divider } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { TO_EDITPROFILE_PAGE } from "../../../utils/constants/routes";
import { PROFILE_PIC_URL } from "../../../utils/constants/url";
import { useUserContext } from "../../../utils/context/user";
import { UserProfile } from "../../../utils/types/user";
import { useStyles } from "./styles";

interface Props {
  user: UserProfile;
}

const ProfileTitleMobileView: React.FC<Props> = ({ user }) => {
  // Global State Hooks
  const { user: authUser } = useUserContext()!;

  // Other Styles
  const classes = useStyles();

  // JSX
  return (
    <>
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
          ) : (
            <Button
              variant="contained"
              color="primary"
              className={classes.followBtn}
              disableElevation
            >
              Follow Back
            </Button>
          )}
        </Grid>
        <Grid xs={12} item>
          <Typography variant="body1">
            <strong>{user.name}</strong>
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
    </>
  );
};

export default ProfileTitleMobileView;
