import React from "react";
import { Avatar, Button, Grid, Typography } from "@material-ui/core";
import { PROFILE_PIC_URL } from "../../../utils/constants/url";
import { useStyles } from "./styles";
import { UserProfile } from "../../../utils/types/user";
import { useUserContext } from "../../../utils/context/user";
import SettingsSvg from "../../../common/svgs/SettingsSvg";
import { TO_EDITPROFILE_PAGE } from "../../../utils/constants/routes";
import { Link } from "react-router-dom";
interface Props {
  user: UserProfile;
}

const ProfileTitleDesktopView: React.FC<Props> = ({ user }) => {
  // Global State Hooks
  const { user: authUser } = useUserContext()!;

  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <>
      <Grid
        container
        className={classes.root}
        justify="space-evenly"
        spacing={3}
      >
        <Grid xs={3} item>
          <Avatar
            src={PROFILE_PIC_URL}
            className={classes.avatar}
            alt="image"
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
            <Typography component="a" variant="body1">
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
    </>
  );
};

export default ProfileTitleDesktopView;
