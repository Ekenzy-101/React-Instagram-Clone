import { Grid, Avatar, Typography, Button, Divider } from "@material-ui/core";
import React from "react";
import { PROFILE_PIC_URL } from "../../../utils/constants/url";
import { useStyles } from "./styles";

const ProfileTitleMobileView = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.root} alignItems="center" spacing={3}>
        <Grid xs={2} item>
          <Avatar
            src={PROFILE_PIC_URL}
            className={classes.avatar}
            alt="image"
          />
        </Grid>
        <Grid xs={9} item style={{ marginLeft: "0.5rem" }}>
          <Typography className={classes.username} variant="h5">
            kenzy_d_coder
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.followBtn}
            disableElevation
          >
            Follow Back
          </Button>
        </Grid>
        <Grid xs={12} item>
          <Typography variant="body1">
            <strong>Ayobowale Adeyanju</strong>
          </Typography>
          <Typography variant="body1">KCOB</Typography>
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
            <strong>0</strong>
          </Typography>
          <Typography color="textSecondary">posts</Typography>
        </Grid>
        <Grid item>
          <Typography>
            <strong>275</strong>
          </Typography>
          <Typography color="textSecondary">followers</Typography>
        </Grid>
        <Grid item>
          <Typography>
            <strong>699</strong>
          </Typography>
          <Typography color="textSecondary">following</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileTitleMobileView;
