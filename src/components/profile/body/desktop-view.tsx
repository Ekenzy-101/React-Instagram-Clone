import { Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import GridSvg from "../../../common/svgs/GridSvg";
import TaggedSvg from "../../../common/svgs/TaggedSvg";
import { POST_PIC_URL } from "../../../utils/constants/url";
import { useStyles } from "./style";

const ProfileBodyDesktopView = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Divider />
      <Grid
        container
        justify="center"
        style={{ margin: "3px 0", textAlign: "center" }}
        alignItems="center"
        spacing={3}
      >
        <Grid item className={classes.gridItem}>
          <GridSvg width={16} height={16} />
          <Typography
            style={{ marginLeft: "0.6rem" }}
            color="textSecondary"
            variant="caption"
          >
            <strong>POSTS</strong>
          </Typography>
        </Grid>
        <Grid item className={classes.gridItem}>
          <TaggedSvg width={16} height={16} />
          <Typography
            style={{ marginLeft: "0.6rem" }}
            color="textSecondary"
            variant="caption"
          >
            <strong>TAGGED</strong>
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <div className="explore-grid-container" style={{ padding: 0 }}>
        <div className="explore-grid-item single-grid-square">
          <img src={POST_PIC_URL} alt="Post" />
        </div>
        <div className="explore-grid-item single-grid-square">
          <img src={POST_PIC_URL} alt="Post" />
        </div>
        <div className="explore-grid-item single-grid-square">
          <img src={POST_PIC_URL} alt="Post" />
        </div>
      </div>
    </div>
  );
};

export default ProfileBodyDesktopView;
