import React from "react";
import { Button, Card, Grid, Typography } from "@material-ui/core";
import { useStyles } from "./style";
import { CameraOutlined } from "@material-ui/icons";

const ProfileBodyCard: React.FC = () => {
  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <Grid item>
      <Card variant="outlined" className={classes.card}>
        <div
          className={classes.svgWrapper}
          style={{ marginBottom: "0.3rem", width: "55px", height: "55px" }}
        >
          <CameraOutlined width={30} height={30} />
        </div>
        <Typography
          variant="h6"
          style={{ marginBottom: "0.5rem", textAlign: "center" }}
        >
          Complete Profile
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          className={classes.bodyContent}
        >
          Add your name and bio so friends can find you
        </Typography>
        <Button
          variant="contained"
          disableElevation
          className={classes.gridItemBtn}
        >
          Edit Profile
        </Button>
      </Card>
    </Grid>
  );
};

export default ProfileBodyCard;
