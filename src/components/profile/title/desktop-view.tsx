import React from "react";
import { Avatar, Button, Grid, Typography } from "@material-ui/core";
import { PROFILE_PIC_URL } from "../../../utils/constants/url";
import { useStyles } from "./styles";

const ProfileTitleDesktopView = () => {
  const classes = useStyles();
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
                kenzy_d_coder
              </Typography>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.followBtn}
                disableElevation
              >
                Follow Back
              </Button>
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
                <strong>0</strong> posts
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <strong>275</strong> followers
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <strong>699</strong> following
              </Typography>
            </Grid>
          </Grid>

          <Grid xs={12} item>
            <Typography variant="body1">
              <strong>Ayobowale Adeyanju</strong>
            </Typography>
            <Typography variant="body1">KCOB</Typography>
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
